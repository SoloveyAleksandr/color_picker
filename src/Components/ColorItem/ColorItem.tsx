import React, { FC, useState, useRef } from "react";
import { HiRefresh } from 'react-icons/hi';
import { BiCopy, BiTrash } from 'react-icons/bi';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { motion } from 'framer-motion';
import tinycolor from "tinycolor2";

import styles from './ColorItem.module.scss';
import { IColorItem } from "../../types";

interface IColorItemProp {
  item: IColorItem,
  index: number,
  setLock: (id: string) => void,
  copyHandler: (color: string) => void,
  changeColor: (id: string) => void,
  deleteHandler: (id: string) => void,
  constraintsRef: React.RefObject<Element>,
}

const ColorItem: FC<IColorItemProp> = ({
  item,
  index,
  setLock,
  copyHandler,
  changeColor,
  deleteHandler,
  constraintsRef,
}) => {
  const [isdragged, setIsDragged] = useState(false);

  const isDark = tinycolor(item.color).isDark();

  const itemRef: React.Ref<HTMLDivElement> = useRef(null);

  const log = (e: any) => console.log(e);

  return (
    <motion.div
      dragConstraints={constraintsRef}
      dragSnapToOrigin
      drag={'x'}
      onDragStart={() => setIsDragged(true)}
      onDragEnd={() => setIsDragged(false)}
      ref={itemRef}
      //
      //  если оффлет положительный прибавлять / отнимать
      //
      //
      onDrag={(e, i) => log((itemRef.current?.offsetLeft || 0) - Math.abs(i.offset.x))}
      style={{
        backgroundColor: item.color,
        zIndex: isdragged ? 2 : 1,
      }}
      className={styles.wrapper}>
      <div className={`${styles.innerContainer} ${styles.topContainer}`}>
        <button
          onClick={() => deleteHandler(item.id)}
          className={`${styles.smallBtn} ${isDark ? styles._dark : styles._light}`}>
          <BiTrash size={18} />
        </button>
        <div className={`${styles.colorContainer} ${isDark ? styles._dark : styles._light}`}>
          <button
            onClick={() => changeColor(item.id)}
            className={`${styles.colorBtn} ${isDark ? styles._dark : styles._light}`}>
            <HiRefresh size={18} />
          </button>
          <span className={styles.color}>
            {item.color}
          </span>
          <button
            onClick={() => copyHandler(item.color)}
            className={`${styles.colorBtn} ${isDark ? styles._dark : styles._light}`}>
            <BiCopy size={18} />
          </button>
        </div>
      </div>
      <div className={styles.innerContainer}>
        <button
          className={`${styles.lockBtn} ${isDark ? styles._dark : styles._light}`}
          onClick={() => setLock(item.id)}>
          {
            item.isLocked ?
              <AiOutlineLock size={24} />
              :
              <AiOutlineUnlock size={24} />
          }
        </button>
      </div>
    </motion.div>
  )
};

export default ColorItem;
