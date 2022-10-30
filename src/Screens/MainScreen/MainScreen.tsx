import React, { FC, useEffect, useRef, useState } from "react";
import ColorItem from "../../Components/ColorItem/ColorItem";
import Container from "../../Components/Container/Container";
import { IColorItem } from "../../types";
import { HiRefresh } from 'react-icons/hi';
import tinycolor from "tinycolor2";
import { AiOutlineLock, AiOutlineUnlock, AiOutlinePlus } from 'react-icons/ai';
import { toggleLockState } from "../../services/toggleLockState";
import { Color } from "../../services/classes";
import { setRandomColor } from "../../services/setRandomColor";
import { arrayMoveImmutable } from 'array-move';

import styles from './MainScreen.module.scss';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from "react-beautiful-dnd";

const MainScreen: FC = () => {
  const [colorList, setColorList] = useState<IColorItem[]>([]);
  const [allIsLocked, setAllIsLocked] = useState<boolean>(false);
  const [toastIsActive, setToastIsActive] = useState(false);
  const [gradient, setGradient] = useState('');
  const constraintsRef = useRef(null);

  const { innerWidth: width, innerHeight: height } = window;

  const setRandomGradient = () => {
    if (colorList.length >= 4) {
      const gradientString = `
      linear-gradient(90deg,
      ${colorList[0].color} 10%, 
      ${colorList[1].color} 35%,
      ${colorList[2].color} 65%,
      ${colorList[3].color} 90%
      )`;
      setGradient(gradientString);
    }
  }

  const getRandom = () => {
    // создаем массив если он пустой
    if (colorList.length === 0) {
      const list = [...new Array(4)].map(el => el = { ...new Color() });
      setColorList(list);
      return;
    }
    // задаем случайные цвета
    setColorList(setRandomColor(colorList));
  };

  // переключение isLocked для всех
  const toggleLockForAll = () => {
    setColorList(toggleLockState(colorList, allIsLocked));
  }

  // задаем изначальное состояние для allIsLocked
  const checkAllIsLocked = () => {
    const allIsLocked = colorList.find(el => el.isLocked === false);
    allIsLocked ? setAllIsLocked(true) : setAllIsLocked(false);
  }

  useEffect(() => {
    getRandom();
    checkAllIsLocked();
  }, [])

  useEffect(() => {
    if (colorList.length !== 0) {
      toggleLockForAll();
    }
  }, [allIsLocked])

  useEffect(() => {
    setRandomGradient();
  }, [colorList])

  const setLock = (id: string) => {
    const index = colorList.findIndex(el => el.id === id);
    setColorList(prev => {
      prev[index].isLocked = !prev[index].isLocked;
      return JSON.parse(JSON.stringify(prev));
    })
  }

  const copyHandler = (color: string) => {
    if (!toastIsActive) {
      setToastIsActive(true);
      setTimeout(() => setToastIsActive(false), 3000);
    }
    navigator.clipboard.writeText(color)
  };

  const changeColor = (id: string) => {
    const index = colorList.findIndex(el => el.id === id);
    setColorList(prev => {
      prev[index].color = tinycolor.random().toHexString();
      return JSON.parse(JSON.stringify(prev));
    })
  }

  const addColor = () => {
    setColorList([...colorList, { ...new Color() }]);
  }

  const deleteColor = (id: string) => {
    setColorList(prev => {
      const list = prev.filter(el => el.id !== id);
      return list;
    })
  };

  const onDragEndHandler = (result: DropResult, provided: ResponderProvided) => {
    if (!result.destination) {
      return;
    }
    const start = result.source.index;
    const finish = result.destination?.index;
    const newList = arrayMoveImmutable(colorList, start, finish);
    setColorList(newList);
  };

  return (
    <div className={styles.wrapper}>

      <div className={`${styles.toast} ${toastIsActive && styles._active}`}>
        <span>Copied!</span>
      </div>

      <div
        className={styles.header}
        style={{ background: gradient }}>
        <Container>
          <div className={styles.headerContainer}>
            <div className={styles.btnBox}>
              <button
                className={styles.headerBtn}
                onClick={getRandom}>
                <span>refresh all</span>
                <HiRefresh size={18} />
              </button>
              <button
                className={styles.headerBtn}
                onClick={() => setAllIsLocked(!allIsLocked)}>
                <span>{allIsLocked && 'un'}lock all</span>
                {
                  allIsLocked ? <AiOutlineUnlock size={18} /> : <AiOutlineLock size={18} />
                }
              </button>
            </div>
            <button
              className={`${styles.addBtn} ${styles.headerBtn}`}
              onClick={addColor}>
              <AiOutlinePlus size={18} />
            </button>
          </div>
        </Container>
      </div>

      <div className={styles.listWrapper}>
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId="colors" direction='horizontal'>
            {(provided) => (
              <ul
                className={styles.colorList} {...provided.droppableProps} ref={provided.innerRef}>
                {
                  colorList.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided) => {
                        const style = {
                          width: `${width / colorList.length}px`,
                          minWidth: '160px',
                          ...provided.draggableProps.style,
                        };
                        return (
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={styles.colorItem}
                            style={style}
                          >
                            <ColorItem
                              item={item}
                              setLock={setLock}
                              copyHandler={copyHandler}
                              changeColor={changeColor}
                              deleteHandler={deleteColor} />
                          </li>
                        )
                      }}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
};

export default MainScreen;
