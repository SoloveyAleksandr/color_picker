import { v4 } from 'uuid';
import tinycolor from 'tinycolor2';

export class Color {
  id: string;
  color: string;
  isLocked: boolean;
  constructor() {
    this.id = v4().slice(0, 8);
    this.color = tinycolor.random().toHexString();
    this.isLocked = false;
  }
}
