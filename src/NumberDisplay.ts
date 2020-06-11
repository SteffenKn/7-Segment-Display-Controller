import LedController from './LedController';
import SevenSegmentDisplay from './SevenSegmentDisplay';

import {RgbColor} from './types/index';

export class NumberDisplay extends SevenSegmentDisplay {

  constructor(ledController: LedController, startIndex: number, amountOfLedsPerSegment: number) {
    super(ledController, startIndex, amountOfLedsPerSegment);
  }

  public displayNumber(numberToDisplay: number, color: Array<RgbColor> | RgbColor): void {
    this.off();

    switch (numberToDisplay) {
      case 0:
        this.showSegments([0, 1, 2, 4, 5, 6], color);
        break;
      case 1:
        this.showSegments([2, 6], color);
        break;
      case 2:
        this.showSegments([1, 2, 3, 4, 5], color);
        break;
      case 3:
        this.showSegments([1, 2, 3, 5, 6], color);
        break;
      case 4:
        this.showSegments([0, 2, 3, 6], color);
        break;
      case 5:
        this.showSegments([0, 1, 3, 5, 6], color);
        break;
      case 6:
        this.showSegments([0, 1, 3, 4, 5, 6], color);
        break;
      case 7:
        this.showSegments([1, 2, 6], color);
        break;
      case 8:
        this.showSegments([0, 1, 2, 3, 4, 5, 6], color);
        break;
      case 9:
        this.showSegments([0, 1, 2, 3, 5, 6], color);
        break;

      default:
        throw new Error(`Error: Only numbers between 0 and 9 can be displayed. ${numberToDisplay} is not between 0 and 9.`);
    }
  }
}
