import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import { List, Button, Modal } from 'antd';
import Form from '@/components/shows/Form';

export default function LogPoints({ match }) {
	const [modalOpen, setModalOpen] = useState(false);

	const { dogId } = match.params;
	const dogDoc = firebase
		.firestore()
		.collection('dogs')
		.doc(dogId);

	const showsCollection = dogDoc.collection('shows');

	const shows = useCollection(showsCollection);

	if (shows.error) return <Error error={shows.error} />;

	if (shows.loading) return <Loading />;

	function openModal() {
		setModalOpen(true);
	}

	function closeModal() {
		setModalOpen(false);
	}

	return (
		<>
			<List
				header={<h1>Shows</h1>}
				footer={
					<Button block icon="plus" onClick={openModal}>
						Add
					</Button>
				}
				dataSource={shows.value.docs}
				renderItem={(show) => {
					const data = show.data();
					return (
						<List.Item>
							<Link
								key={show.id}
								to={`/points/${dogId}/${show.id}`}
							>
								{data.name} ({data.league})
							</Link>
						</List.Item>
					);
				}}
			/>
			<Modal
				title="Add a show"
				visible={modalOpen}
				onCancel={closeModal}
				footer={<></>}
			>
				<Form onSave={closeModal} dogDoc={dogDoc} />
			</Modal>
		</>
	);
}
