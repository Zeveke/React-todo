import styles from './default-todo-realisation.module.css';
import { ref, remove } from 'firebase/database';
import { db } from '../../../../firebase';

export const DefaultToDoRealisation = ({
	actualToDoValue,
	setIsToDoInModificationProcess,
	toDoId,
}) => {
	const onRequestDeleteToDo = () => {
		const toDoToDelete = ref(db, `todos/${toDoId}`);

		remove(toDoToDelete).then((response) => {
			console.log(response);
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
