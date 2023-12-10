import { useState } from 'react';

export const useRequestHandleSearch = (val, list) => {
	const [filterList, setFilterList] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

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
