import { useState } from 'react';

export const useRequestAdvancedFilter = (category) => {
	const [filterList, setFilterList] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [checkedItems, setCheckedItems] = useState([]);
	const [list, setList] = useState([]);

	setSearchTerm('');
	category = category.toLowerCase();

	let checkingIt = checkedItems;

	if (checkingIt.includes(category)) {
		checkingIt = checkedItems.filter((item, index) => item !== category);
	} else {
		checkingIt.push(category);
	}

	if (!checkingIt.includes('all')) {
		if (checkingIt.length !== 0) {
			let advancedSearchResult = list.filter((item) => {
				if (checkingIt.includes(item?.status?.toLowerCase())) {
					return item;
				} else return false;
			});
			setCheckedItems(checkingIt);
			setSearchTerm(true);
			setFilterList(advancedSearchResult);
		} else {
			setCheckedItems(checkingIt);
			setSearchTerm(false);
			setList(list);
		}
	} else {
		setSearchTerm(false);
		setList(list);
	}

	return {
		filterList,
		searchTerm,
	};
};
