import { useState } from 'react';

export const useRequestCompletedItem = (idSelected) => {
	const [list, setList] = useState([]);

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
	setList(completedList);

	return {
		setList,
		list,
		completedList,
	};
};
