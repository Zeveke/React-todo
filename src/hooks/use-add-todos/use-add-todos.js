import styles from './use-add-todos.module.css';
import { useState } from 'react';

export const AddToDos = ({ addMarker, setAddMarker }) => {
	const [fieldValue, setFieldValue] = useState('');

	const onRequestAddToDos = (event, value) => {
		if (value) {
			event.preventDefault();
			fetch(`http://localhost:3005/todos`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					value,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((response) => {
					console.log(response);
					setAddMarker(!addMarker);
					setFieldValue('');
				});
		} else {
			alert('Введите задачу');
			setFieldValue('');
			event.preventDefault();
		}
	};

	return (
		<div>
			<form
				className={styles.form}
				onSubmit={(event) => onRequestAddToDos(event, fieldValue)}
			>
				<input
					name="toDosField"
					type="text"
					value={fieldValue}
					placeholder="Введите задачу..."
					onChange={({ target }) => setFieldValue(target.value)}
				></input>
				<button type="submit">Создать новую задачу</button>
			</form>
		</div>
	);
};
