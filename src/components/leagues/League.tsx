import React, { useState } from "react";
import { useDoc } from "@/hooks/firebase";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Button, Modal, List, Popconfirm, Collapse, Switch } from "antd";
import DogSelector from "@/components/admin/DogSelector";
import firebase, { firestore } from "firebase/app";
import styled from "styled-components";
import useRouter from "use-react-router";

const FloatRight = styled.div`
  float: right;
`;

interface DogProps {
  id: string;
  grade: Number;
  remove: (doc: firestore.DocumentSnapshot) => void;
}

function Dog({ id, grade, remove }: DogProps) {
  const { history } = useRouter();
  const [value, loading, error] = useDoc("dogs", id);

  function goToLogPoints(): void {
    if (!id) return;
    history.push(`/points/${id}`);
  }

  if (loading || error || !value) return <Loading />;

  const data = value.data();

  if (!data) return <Error error={`No dog with for ${id}`} />;

  return (
    <List.Item
      actions={[
        <Button onClick={goToLogPoints}>Add points</Button>,
        <Popconfirm
          title="Are you sure you want to delete this dog? It is not possible to reverse this."
          onConfirm={remove.bind(null, value)}
        >
          <Button icon="delete" type="danger">
            Delete
          </Button>
        </Popconfirm>
      ]}
    >
      {data.name} (Grade: {grade}){" "}
    </List.Item>
  );
}

interface LeagueProps {
  doc: firestore.DocumentSnapshot;
}
export default function League({ doc }: LeagueProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const data = doc.data();
  const dogs =
    (data && data.dogs && Object.entries<{ grade: number }>(data.dogs)) || [];

  if (!data) return <Loading />;

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function onSelect(dog: firestore.DocumentSnapshot) {
    const dogData = dog.data();
    const leagueData = doc.data();

    if (!dogData || !leagueData) return;

    const entry = { grade: dogData.grade };

    const leagueDogs = { ...leagueData.dogs, [dog.id]: entry };

    firebase
      .firestore()
      .collection("leagues")
      .doc(doc.id)
      .update({ dogs: leagueDogs });
  }

  function removeDogFromLeague(dog: firestore.DocumentSnapshot) {
    const leagueData = doc.data();

    if (!leagueData) return;

    const leagueDogs = { ...leagueData.dogs };

    delete leagueDogs[dog.id];

    firebase
      .firestore()
      .collection("leagues")
      .doc(doc.id)
      .update({ dogs: leagueDogs });
  }

  function toggleOpen(state: boolean, e: MouseEvent) {
    e.stopPropagation();
    firebase
      .firestore()
      .collection("leagues")
      .doc(doc.id)
      .update({ open: state });
  }

  async function toggleCurrent(state: boolean, e: MouseEvent) {
    e.stopPropagation();

    //Get the currently open leagues
    const currentLeagues = await firebase
      .firestore()
      .collection("leagues")
      .where("current", "==", true)
      .get();

    // Make the other leagues not current
    currentLeagues.forEach(doc => {
      firebase
        .firestore()
        .collection("leagues")
        .doc(doc.id)
        .update({ current: false });
    });

    //Make this league current
    firebase
      .firestore()
      .collection("leagues")
      .doc(doc.id)
      .update({ current: state });
  }

  return (
    <Collapse>
      <Collapse.Panel
        key="id"
        header={
          <h2>
            {data.name} ({data.sport})
            <FloatRight>
              <Switch
                unCheckedChildren="Closed"
                checkedChildren="Open"
                checked={data.open || false}
                onChange={toggleOpen}
              />
              <Switch
                checkedChildren="Current"
                unCheckedChildren="Old"
                checked={data.current || false}
                onChange={toggleCurrent}
              />
            </FloatRight>
          </h2>
        }
      >
        <Button
          type="primary"
          icon="plus"
          onClick={openModal}
          block
          disabled={!data.open}
        >
          Add dogs
        </Button>
        <List
          dataSource={dogs}
          renderItem={([dog, details]) => (
            <Dog id={dog} grade={details.grade} remove={removeDogFromLeague} />
          )}
        />
        <Modal
          title="Select a dog"
          visible={modalOpen}
          onOk={closeModal}
          onCancel={closeModal}
        >
          <DogSelector leagueId={doc.id} onSelect={onSelect} />
        </Modal>
      </Collapse.Panel>
    </Collapse>
  );
}
