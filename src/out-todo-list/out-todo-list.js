import styles from './out-todo-list.module.css';

export const OutTodoList = ({ toDosList }) => {
	return (
		<ol>
			{toDosList.map((toDo, index) => (
				<li key={index} className={styles.todoItem}>
					{toDo.title}
				</li>
			))}
		</ol>
	);
};
