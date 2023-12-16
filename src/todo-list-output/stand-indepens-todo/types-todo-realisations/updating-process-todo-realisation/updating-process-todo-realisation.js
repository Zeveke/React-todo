import styles from './updating-process-todo-realisation.module.css';
import { useRef } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../../../../firebase';

export const UpdatingProcessToDoRealisation = ({
	actualToDoValue,
	setActualToDoValue,
	setIsToDoInModificationProcess,
	toDoId,
}) => {
	const initialFieldValue = useRef(actualToDoValue);

	const onRequestUpdateToDo = (value) => {
		const updatingToDoDbRef = ref(db, `todos/${toDoId}`);

		set(updatingToDoDbRef, {
			text: value,
		}).then((response) => {
			console.log(response);
		});
	};

	return (
		<div className={styles.todoItem}>
			<input
				name="changingToDosField"
				type="text"
				value={actualToDoValue}
				onChange={({ target }) => setActualToDoValue(target.value)}
			/>
			<div>
				<button
					type="button"
					onClick={() => {
						setActualToDoValue(initialFieldValue.current);
						setIsToDoInModificationProcess(false);
					}}
				>
					Отменить
				</button>
				<button
					type="button"
					onClick={() => {
						setIsToDoInModificationProcess(false);
						onRequestUpdateToDo(actualToDoValue);
					}}
				>
					Сохранить
				</button>
			</div>
		</div>
	);
};
