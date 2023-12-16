import styles from './updating-process-realisation.module.css';
import { useRef } from 'react';

export const UpdatingProcessRealisation = ({
	actualToDoValue,
	setActualToDoValue,
	setIsToDoInModificationProcess,
	reRecordMarker,
	setReRecordMarker,
	toDoId,
}) => {
	const initialFieldValue = useRef(actualToDoValue);

	const onRequestUpdateToDo = (value) => {
		fetch(`http://localhost:3005/todos/${toDoId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				value,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setReRecordMarker(!reRecordMarker);
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
