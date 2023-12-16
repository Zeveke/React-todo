import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { TodosListOutput } from './todo-list-output/todo-list-output';
import { AddTodos } from './components/add-todos/add-todos';
import { TodosSearch } from './components/todos-search/todos-search';
import { TodosSort } from './components/todos-sort/todos-sort';
import { onValue } from 'firebase/database';
import { db } from './firebase';
import { ref } from 'firebase/database';

export const App = () => {
	const [toDos, setToDos] = useState([]);
	const [fieldSearchValue, setFieldSearchValue] = useState('');
	const [isSortChecked, setIsSortChecked] = useState(false);

	useEffect(() => {
		const toDoListDbRef = ref(db, 'todos');
		return onValue(toDoListDbRef, (snapshot) => {
			const loadedToDos = snapshot.val() || {};

			const sortAndSearchCheck = (toDos, fieldSearchValue, isSortChecked) => {
				const convertedTodos = [];

				Object.entries(toDos).forEach((toDo) => {
					const id = toDo[0];
					const { text } = toDo[1];
					convertedTodos.push([id, text]);
				});

				if (isSortChecked) {
					convertedTodos.sort((a, b) => a[1].localeCompare(b[1]));
				}

				let searchedToDos = [];
				if (Boolean(fieldSearchValue)) {
					searchedToDos = convertedTodos.filter((toDo) =>
						toDo[1].includes(fieldSearchValue),
					);
					return searchedToDos;
				} else {
					return convertedTodos;
				}
			};

			setToDos(sortAndSearchCheck(loadedToDos, fieldSearchValue, isSortChecked));
		});
	}, [fieldSearchValue, isSortChecked]);

	return (
		<div className={styles.container}>
			<div className={styles.toDosItemList}>
				<h3 className={styles.header}>Лист задач</h3>
				<div className={styles.settings}>
					<TodosSort checked={isSortChecked} setChecked={setIsSortChecked} />
					<TodosSearch setConfirmedSearchValue={setFieldSearchValue} />
				</div>
				<TodosListOutput
					todosList={toDos}
					isChecked={isSortChecked}
					setFieldSearchValue={setFieldSearchValue}
				/>
			</div>
			<AddTodos />
		</div>
	);
};
