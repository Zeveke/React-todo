import styles from './default-realisation.module.css';

export const DefaultToDoRealisation = ({
	actualToDoValue,
	setIsToDoInModificationProcess,
	reRecordMarker,
	setReRecordMarker,
	toDoId,
}) => {
	const onRequestDeleteToDo = () => {
		fetch(`http://localhost:3005/todos/${toDoId}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setReRecordMarker(!reRecordMarker);
			});
	};

	return (
		<div className={styles.todoItem}>
			<div>{actualToDoValue}</div>
			<div>
				<button
					type="button"
					onClick={() => {
						setIsToDoInModificationProcess(true);
					}}
				>
					Изменить
				</button>
				<button
					type="button"
					onClick={() => {
						onRequestDeleteToDo();
					}}
				>
					Удалить
				</button>
			</div>
		</div>
	);
};
