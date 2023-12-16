import { StandalndepensTodo } from './stand-indepens-todo/standIndepensTodo';
import { v4 as uuidv4 } from 'uuid';

export const ToDosListOutput = ({ changingMarket, setChangingMarker, toDosList }) => {
	return (
		<div>
			{toDosList.map((toDo) => (
				<StandalndepensTodo
					key={uuidv4()}
					rewritingMarker={changingMarket}
					setRewritingMarker={setChangingMarker}
					task={toDo}
				/>
			))}
		</div>
	);
};
