import { useState } from 'react';
import { DefaultToDoRealisation } from './types-todo-realisations/default-todo-realisation/default-todo-realisation';
import { UpdatingProcessToDoRealisation } from './types-todo-realisations/updating-process-todo-realisation/updating-process-todo-realisation';
export const StandIndepensTodo = ({ toDoId, task }) => {
	const [currentToDoValue, setCurrentToDoValue] = useState(task);
	const [isToDoInUpdatingProcess, setIsToDoInUpdatingProcess] = useState(false);

	return isToDoInUpdatingProcess === false ? (
		<DefaultToDoRealisation
			actualToDoValue={currentToDoValue}
			setIsToDoInModificationProcess={setIsToDoInUpdatingProcess}
			toDoId={toDoId}
		/>
	) : (
		<UpdatingProcessToDoRealisation
			actualToDoValue={currentToDoValue}
			setActualToDoValue={setCurrentToDoValue}
			setIsToDoInModificationProcess={setIsToDoInUpdatingProcess}
			toDoId={toDoId}
		/>
	);
};
