import styles from './add-todos.module.css';
import { useState } from 'react';
import { db } from '../../firebase';
import { ref, push } from 'firebase/database';

export const AddTodos = () => {
	const [fieldValue, setFieldValue] = useState('');

	const onRequestAddTodos = (event, value) => {
		if (value) {
			event.preventDefault();

			const toDosDbRef = ref(db, 'todos');

			push(toDosDbRef, {
				text: value,
			}).then((response) => {
				console.log(response);
				setFieldValue('');
			});
		} else {
			alert('Введите задачу');
			setFieldValue('');
			event.preventDefault();
			return false;
		}
	};

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={(event) => onRequestAddTodos(event, fieldValue)}
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
