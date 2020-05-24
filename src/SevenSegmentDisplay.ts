import {LedController} from './LedController';
import {Segment} from './Segment';

import {RgbColor} from './types/index';

export class SevenSegmentDisplay {
  private segments: Array<Segment> = [];

  constructor(ledController: LedController, startIndex: number, amountOfLedsPerSegment: number) {
    for (let index: number = 0; index < 7; index++) {
      this.segments.push(new Segment(ledController, startIndex + index * amountOfLedsPerSegment, amountOfLedsPerSegment));
    }
  }

  public showSegments(segmentIndexes: Array<number>, colors: Array<RgbColor> | RgbColor): void {
    for (const index of segmentIndexes) {
      this.segments[index].setColor(this.getColorByIndex(colors, index));
    }
  }

  public clear(): void {
    for (const segment of this.segments) {
      segment.clear();
    }
  }

  private getColorByIndex(colors: Array<RgbColor> | RgbColor, index: number): RgbColor {
    if (!Array.isArray(colors)) {
      return colors;
    }

    return colors[index % colors.length];
  }

}
