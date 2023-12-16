import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { ToDosListOutput } from './out-todo-list/list-output';
import { AddToDos } from './hooks/add-todos/add-todos';
import { ToDosSearch } from './hooks/todos-search/todos-search';
import { ToDosSort } from './hooks/todos-sort/todos-sort';

export const App = () => {
	const [toDos, setToDos] = useState([]);
	const [changeToDosMarker, setChangeToDosMarker] = useState(false);
	const [fieldSearchValue, setFieldSearchValue] = useState('');
	const [isSortChecked, setIsSortChecked] = useState(false);

	useEffect(() => {
		const acceptCustomQuerySearchAndSort = (fieldSearchValue, isSortChecked) => {
			let request = '';

			if (fieldSearchValue) {
				request += `?q=${fieldSearchValue}`;
			}

			if (isSortChecked && fieldSearchValue) {
				request += '&_sort=value';
			} else if (isSortChecked) {
				request += '?_sort=value';
			}

			return request;
		};

		fetch(
			`http://localhost:3005/todos${acceptCustomQuerySearchAndSort(
				fieldSearchValue,
				isSortChecked,
			)}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				mode: 'cors',
				cache: 'default',
			},
		)
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDos(loadedToDos);
			});
	}, [changeToDosMarker, fieldSearchValue, isSortChecked]);

	return (
		<div className={styles.container}>
			<div className={styles.toDosItemList}>
				<h3 className={styles.header}>Лист задач</h3>
				<div className={styles.settings}>
					<ToDosSort checked={isSortChecked} setChecked={setIsSortChecked} />
					<ToDosSearch setConfirmedSearchValue={setFieldSearchValue} />
				</div>
				<ToDosListOutput
					changingMarket={changeToDosMarker}
					setChangingMarker={setChangeToDosMarker}
					toDosList={toDos}
				/>
			</div>
			<AddToDos addMarker={changeToDosMarker} setAddMarker={setChangeToDosMarker} />
		</div>
	);
};
