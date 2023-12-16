import { StandIndepensTodo } from './stand-indepens-todo/stand-indepens-todo';
import { v4 as uuidv4 } from 'uuid';

export const TodosListOutput = ({ todosList }) => {
	return (
		<div>
			{todosList.map((ToDo) => (
				<StandIndepensTodo key={uuidv4()} toDoId={ToDo[0]} task={ToDo[1]} />
			))}
		</div>
	);
};
