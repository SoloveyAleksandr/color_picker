import { IColorItem } from "../types";

export const toggleLockState = (list: IColorItem[], newState: boolean) => {
  const newList = list.map(el => {
    el.isLocked = newState;
    return el;
  })
  return newList;
}