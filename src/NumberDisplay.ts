import {LedController} from './LedController';
import {SevenSegmentDisplay} from './SevenSegmentDisplay';

import {RgbColor} from './types/index';

export class NumberDisplay {
  private sevenSegmentDisplay: SevenSegmentDisplay;

  constructor(ledController: LedController, startIndex: number, amountOfLedsPerSegment: number) {
    this.sevenSegmentDisplay = new SevenSegmentDisplay(ledController, startIndex, amountOfLedsPerSegment);
  }

  public displayNumber(numberToDisplay: number, color: Array<RgbColor> | RgbColor): void {
    this.clear();

    switch (numberToDisplay) {
      case 0:
        this.sevenSegmentDisplay.showSegments([0, 1, 2, 4, 5, 6], color);
      case 1:
        this.sevenSegmentDisplay.showSegments([3, 6], color);
      case 2:
        this.sevenSegmentDisplay.showSegments([1, 2, 3, 4, 5], color);
      case 3:
        this.sevenSegmentDisplay.showSegments([1, 2, 3, 5, 6], color);
      case 4:
        this.sevenSegmentDisplay.showSegments([0, 2, 3, 6], color);
      case 5:
        this.sevenSegmentDisplay.showSegments([0, 1, 3, 5, 6], color);
      case 6:
        this.sevenSegmentDisplay.showSegments([0, 1, 3, 4, 5, 6], color);
      case 7:
        this.sevenSegmentDisplay.showSegments([1, 2, 6], color);
      case 8:
        this.sevenSegmentDisplay.showSegments([0, 1, 2, 3, 4, 5, 6], color);
      case 9:
        this.sevenSegmentDisplay.showSegments([0, 1, 3, 4, 6], color);

      default:
        throw new Error(`Error: Only numbers between 0 and 9 can be displayed. ${numberToDisplay} is not between 0 and 9.`);
    }
  }

  public clear(): void {
    this.sevenSegmentDisplay.clear();
  }

  public render(): Promise<void> {
    return this.sevenSegmentDisplay.render();
  }

}
