import { useState } from 'react';
import { DefaultToDoRealisation } from './types-realisations/todo-default-realisation/default-realisation';
import { UpdatingProcessRealisation } from './types-realisations/updating-process-realisation/updating-process-realisation';

export const StandalndepensTodo = ({ rewritingMarker, setRewritingMarker, task }) => {
	const toDoId = task.id;

	const [currentToDoValue, setCurrentToDoValue] = useState(task.value);
	const [isToDoInUpdatingProcess, setIsToDoInUpdatingProcess] = useState(false);

	return isToDoInUpdatingProcess === false ? (
		<DefaultToDoRealisation
			actualToDoValue={currentToDoValue}
			setIsToDoInModificationProcess={setIsToDoInUpdatingProcess}
			reRecordMarker={rewritingMarker}
			setReRecordMarker={setRewritingMarker}
			toDoId={toDoId}
		/>
	) : (
		<UpdatingProcessRealisation
			actualToDoValue={currentToDoValue}
			setActualToDoValue={setCurrentToDoValue}
			setIsToDoInModificationProcess={setIsToDoInUpdatingProcess}
			reRecordMarker={rewritingMarker}
			setReRecordMarker={setRewritingMarker}
			toDoId={toDoId}
		/>
	);
};
