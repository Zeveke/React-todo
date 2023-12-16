import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteItem = (itemIndex) => {
	const [list, setList] = useState({});

	const todoDbRef = ref(db, 'todos');

	remove(todoDbRef);

	let updatedList = list.filter((item) => item.id !== itemIndex);
	setList(updatedList);

	return {
		updatedList,
	};
};
