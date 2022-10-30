import { FC, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IColorItem } from "../../types";

import styles from './TestListScreen.module.scss';

const data = [
  { id: '20e7d217', color: '#bd1ed0', isLocked: true },
  { id: '08aa68fc', color: '#68ba9e', isLocked: true },
  { id: 'ddbfa264', color: '#8c4b20', isLocked: true },
  { id: 'a2ef87a7', color: '#d574a3', isLocked: true },
];

const TestListScreen: FC = () => {
  const [list, setList] = useState<IColorItem[]>(data);

  return (
    <div className={styles.wrapper}>
      <DragDropContext onDragEnd={() => { }}>
        <Droppable droppableId="droppableList">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              className={styles.list}
              {...provided.droppableProps}>
              {
                list.map((el, index) => (
                  <Draggable
                    key={el.id}
                    draggableId={el.id}
                    index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles.listBox}
                      >
                        <div
                          style={{ background: el.color }} className={styles.listItem}></div>
                      </li>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
};

export default TestListScreen;
