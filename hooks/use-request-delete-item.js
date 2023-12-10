import { useState } from 'react';

export const useRequestDeleteItem = (itemIndex) => {
	const [list, setList] = useState([]);

	let updatedList = list.filter((item) => item.id !== itemIndex);
	setList(updatedList);

	return {
		updatedList,
	};
};
