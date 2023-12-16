import { useState } from 'react';
import { ref, sort } from 'firebase/database';
import { db } from '../firebase';

export const useRequestHandleSearch = (val, list) => {
	const [filterList, setFilterList] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const todosDbRef = ref(db, 'todos');

	sort(todosDbRef, {});

	setSearchTerm(val);
	let searchResult = list.filter((item) => {
		if (item.todo.toLowerCase().includes(val.toLowerCase())) {
			return item;
		} else return false;
	});
	setFilterList(searchResult);

	return {
		filterList,
		searchTerm,
	};
};
