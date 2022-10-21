import { FC, useEffect, useState } from "react";
import ColorItem from "../../Components/ColorItem/ColorItem";
import Container from "../../Components/Container/Container";
import { TileItem } from "../../services";
import { IColorItem } from "../../types";

import styles from './MainScreen.module.scss';

const MainScreen: FC = () => {
  const [itemList, setItemList] = useState<IColorItem[]>([
    {
      color: "rgb(252, 207, 199)",
      id: "dba2a136",
      isLocked: false,
    },
    {
      color: "rgb(160, 252, 80)",
      id: "dba2a136",
      isLocked: false,
    },
    {
      color: "rgb(239, 52, 192)",
      id: "dba2a136",
      isLocked: false,
    },
    {
      color: "rgb(226, 132, 18)",
      id: "dba2a136",
      isLocked: false,
    },
    {
      color: "rgb(255, 201, 238)",
      id: "dba2a136",
      isLocked: false,
    },
  ]);


  useEffect(() => {
    // const newArr = [...new Array(4)].map(el => el = { ...new TileItem() });
    // setItemList(newArr);
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Container>
          <button>
            <span>refresh all</span>
          </button>
        </Container>
      </div>

      <div className={styles.listWrapper}>
        <ul
          className={styles.colorList}>
          {
            itemList.map(item => (
              <li
                key={item.id}
                className={styles.colorItem}
                style={{ width: `calc(100% / ${itemList.length})` }}>
                <ColorItem
                  color={item.color}
                  isLocked={item.isLocked} />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
};

export default MainScreen;
