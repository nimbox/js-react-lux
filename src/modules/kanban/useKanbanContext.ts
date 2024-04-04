import { useContext } from 'react';
import { KanbanContext } from './Kanban';


export const useKanbanContext = () => useContext(KanbanContext);
