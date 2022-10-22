import tinycolor from "tinycolor2";
import { IColorItem } from "../types";

export const setRandomColor = (list: IColorItem[]) => {
  const newList = list.map(el => {
    if (!el.isLocked) el.color = tinycolor.random().toHexString();
    return el;
  })
  return newList;
}