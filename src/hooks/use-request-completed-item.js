import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestCompletedItem = (idSelected) => {
	const [list, setList] = useState({});

	useEffect(() => {
		const todosDbRef = ref(db, 'todos');

		onValue(todosDbRef, (snapshot) => {
			const completedList = snapshot.val();
			setList(completedList);
		});
	});
	let completedList = list.map((item) => {
		if (item.id === idSelected) {
			if (item.status === 'active') {
				item['status'] = 'completed';
				return item;
			} else {
				return { ...item, status: 'active' };
			}
		} else {
			return item;
		}
	});

	return {
		setList,
		list,
		completedList,
	};
};
