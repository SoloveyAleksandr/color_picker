import randomColor from 'randomcolor';
import { v4 } from 'uuid';

export class TileItem {
  id: string;
  color: string;
  isLocked: boolean;
  constructor() {
    this.id = v4().slice(0, 8);
    this.color = randomColor({
      format: 'rgb',
    });
    this.isLocked = false;
  }
}
