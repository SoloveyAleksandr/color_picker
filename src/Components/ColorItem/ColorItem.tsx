import React, { FC } from "react";
import { HiRefresh } from 'react-icons/hi';
import { BiCopy } from 'react-icons/bi';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { motion } from 'framer-motion';

import styles from './ColorItem.module.scss';

interface IColorItem {
  color: string,
  isLocked: boolean,
}

const ColorItem: FC<IColorItem> = ({
  color,
  isLocked,
}) => {
  return (
    <motion.div
      drag={'x'}
      className={styles.wrapper}
      style={{ backgroundColor: color }}>
      <div className={styles.topContainer}>
        <div className={styles.btnContainer}>
          <button className={styles.smallBtn}>
            <HiRefresh />
          </button>
          <button className={styles.smallBtn}>
            <BiCopy />
          </button>
        </div>
        <div className={styles.colorContainer}>
          <span className={styles.color}>
            {color}
          </span>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <button className={styles.lockBtn}>
          {
            isLocked ?
              <AiOutlineLock size={28} />
              :
              <AiOutlineUnlock size={28} />
          }
        </button>
      </div>
    </motion.div>
  )
};

export default ColorItem;
