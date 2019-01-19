import { useRef, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase/app';

export function useDoc(collection, id) {
	const db = firebase.firestore();
	if (!id) return { loading: true };
	const query = db.collection(collection).doc(id);
	return { ...useCollection(query), doc: query };
}

export function useQuery(collection, ...rest) {
	const db = firebase.firestore();
	const query = db.collection(collection).where(...rest);
	return useCollection(query);
}

export function useProfile() {
	const response = useRef({
		loading: false,
		doc: null,
		value: null,
		error: null
	});

	const { initialising, user } = useAuthState(firebase.auth());
	const { loading, error, value, doc } = useDoc('profiles', user && user.uid);

	if (initialising || loading) {
		response.current.loading = true;
	} else {
		response.current.loading = false;
	}
	if (error) response.current.error = error;

	response.current.doc = doc;
	response.current.value = value;
	return response.current;
}

// export function useHasProfile() {
// 	const requiredValues = ['firstName', 'lastName'];
// 	const hasProfile = useRef(null);
// 	const { loading, error, value } = useProfile();

// 	if (hasProfile.current) return hasProfile.current;

// 	if (loading) hasProfile.current = null;
// 	if (error) hasProfile.current = false;
// 	if (!value) {
// 		hasProfile.current = false;
// 		return hasProfile.current;
// 	}

// 	const data = value.data();
// 	const doesHaveValues = requiredValues.map((key) => {
// 		return !!data[key];
// 	});

// 	if (!doesHaveValues.every((val) => val)) {
// 		return false;
// 	}

// 	hasProfile.current = !!value;
// 	return hasProfile.current;
// }