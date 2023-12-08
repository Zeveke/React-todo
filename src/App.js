import { useState } from 'react';
import './App.css';
import ListItems from './components/ListItems';
import { filterCategory } from './data';

function App() {
	const [note, setNote] = useState('');
	const [list, setList] = useState([]);
	const [id, setId] = useState(1);
	const [filterList, setFilterList] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [checkedItems, setCheckedItems] = useState([]);

	const addTheNote = () => {
		if (note.trim() === '') {
			return;
		}
		setId((id) => id + 1);
		let notes = {
			id: id,
			todo: note.trim(),
			status: 'active',
		};
		list.push(notes);
		setList(list);
		setNote('');
	};

	const handleInputChange = (e) => {
		if (e.keyCode) return;
		addTheNote();
	};

	const deleteItem = (itemIndex) => {
		let updatedList = list.filter((item, index) => item.id !== itemIndex);
		setList(updatedList);
	};

	const completedItem = (idSelected, itemSelected) => {
		let completedList = list.map((item, index) => {
			if (item.id === idSelected) {
				if (item.status === 'active') {
					item['status'] = 'completed';
					return item;
				} else {
					return { ...item, status: 'active' };
				}
			} else {
				return item;
			}
		});
		setList(completedList);
	};

	const handleSearch = (val) => {
		setSearchTerm(val);
		let searchResult = list.filter((item) => {
			if (item.todo.toLowerCase().includes(val.toLowerCase())) {
				return item;
			} else return false;
		});
		setFilterList(searchResult);
	};

	const advancedFilter = (category) => {
		setSearchTerm('');
		category = category.toLowerCase();

		let checkingIt = checkedItems;

		if (checkingIt.includes(category)) {
			checkingIt = checkedItems.filter((item, index) => item !== category);
		} else {
			checkingIt.push(category);
		}

		if (!checkingIt.includes('all')) {
			if (checkingIt.length !== 0) {
				let advancedSearchResult = list.filter((item) => {
					if (checkingIt.includes(item?.status?.toLowerCase())) {
						return item;
					} else return false;
				});
				setCheckedItems(checkingIt);
				setSearchTerm(true);
				setFilterList(advancedSearchResult);
			} else {
				setCheckedItems(checkingIt);
				setSearchTerm(false);
				setList(list);
			}
		} else {
			setSearchTerm(false);
			setList(list);
		}
	};

	return (
		<div className="App">
			<div className="contentContainer">
				<h2>Список задачи</h2>

				<section>
					<input
						type="text"
						className="addingNote"
						value={note || ''}
						onChange={(e) => setNote(e.target.value)}
						onKeyUp={(e) => handleInputChange(e)}
						placeholder="Пиши задачу..."
						disabled={searchTerm ? true : false}
					/>

					<button type="button" onClick={() => addTheNote()}>
						Добавить
					</button>
				</section>

				<section className="search">
					<input
						type="text"
						className="addingNote"
						placeholder="Поиск задачи..."
						onInput={(e) => handleSearch(e.target.value)}
					/>
				</section>

				<section className="filterSection">
					{filterCategory.map((category, index) => {
						return (
							<div className="advancedFilter" key={index}>
								<label htmlFor={category.name}>{category.name}</label>
								<input
									type="checkbox"
									id={category.name}
									className="filterCategories"
									value={searchTerm || ''}
									onChange={() => advancedFilter(category.name)}
								/>
							</div>
						);
					})}
				</section>

				<section className="listArea">
					<section className="listing">
						{!searchTerm && (
							<>
								{list.length === 0 && (
									<div className="noResults">Нет результата поиска</div>
								)}
								{list.length > 0 &&
									list.map((item, index) => {
										return (
											<ListItems
												key={index}
												{...item}
												deleteItem={deleteItem}
												completedItem={completedItem}
											></ListItems>
										);
									})}
							</>
						)}

						{searchTerm && (
							<>
								{filterList.length === 0 && (
									<div className="noResults">
										Фильтр не дал результата!
									</div>
								)}
								{filterList.length > 0 &&
									filterList.map((item, index) => {
										return (
											<ListItems
												key={index}
												{...item}
												deleteItem={deleteItem}
												completedItem={completedItem}
											></ListItems>
										);
									})}
							</>
						)}
					</section>
				</section>
			</div>
		</div>
	);
}

export default App;
