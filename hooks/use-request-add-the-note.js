import { useState } from 'react';

export const useRequestAddTheNote = () => {
	const [note, setNote] = useState('');
	const [list, setList] = useState([]);
	const [id, setId] = useState(1);

	if (note.trim() === '') {
		return;
	}
	setId((id) => id + 1);
	let notes = {
		id: id,
		todo: note.trim(),
		status: 'active',
	};
	list.push(notes);
	setList(list);
	setNote('');

	return {
		setNote,
		id,
		setId,
		setList,
	};
};
