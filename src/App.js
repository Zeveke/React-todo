import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { OutTodoList } from './out-todo-list/out-todo-list';

export const App = () => {
	const [toDos, setToDos] = useState([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDos(loadedToDos);
			});
	}, []);

	return (
		<div className={styles.container}>
			<h3 className={styles.header}>Лист задач</h3>
			{<OutTodoList toDosList={toDos} />}
		</div>
	);
};
