import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <div className="text-base">
      <DndProvider backend={HTML5Backend}>
        <Story />
      </DndProvider>
    </div>
  ),
];
