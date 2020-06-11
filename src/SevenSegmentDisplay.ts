import {Display} from './Display';
import {LedController} from './LedController';
import {Segment} from './Segment';

import {RgbColor} from './types/index';

const numberOfSegments: number = 7;

export class SevenSegmentDisplay extends Display {
  private segments: Array<Segment> = [];

  private lastColors: Array<RgbColor> = [];
  private colors: Array<RgbColor> = [];

  protected lastSegmentIndexes: Array<number> = [];

  constructor(ledController: LedController, startIndex: number, amountOfLedsPerSegment: number) {
    super(ledController, startIndex, amountOfLedsPerSegment * numberOfSegments);

    for (let index: number = 0; index < numberOfSegments; index++) {
      this.segments.push(new Segment(ledController, startIndex + index * amountOfLedsPerSegment, amountOfLedsPerSegment));
    }
  }

  public setMultipleColors(colors: Array<RgbColor>): void {
    this.colors = colors;

    if (this.isOn) {
      this.turnBackOn();
    }
  }

  public off(): void {
    for (const segment of this.segments) {
      segment.off();
    }
  }

  protected showSegments(segmentIndexes: Array<number>, colors?: Array<RgbColor> | RgbColor): void {
    this.lastSegmentIndexes = segmentIndexes;

    for (let index: number = 0; index < segmentIndexes.length; index++) {
      const segmentIndex: number = segmentIndexes[index];
      const color: RgbColor = this.getColorByIndex(colors, index);

      this.segments[segmentIndex].on(color);

      this.lastColor = color;
    }

    this.lastColors = Array.isArray(colors) ? colors : [];
  }

  protected turnBackOn(): void {
    const colors: Array<RgbColor> | RgbColor = this.lastColors.length > 0 ? this.lastColors : this.lastColor;

    this.showSegments(this.lastSegmentIndexes, colors);
  }

  private getColorByIndex(colors: Array<RgbColor> | RgbColor, index: number): RgbColor {
    if (!colors) {
      if (this.colors) {
        return this.getColorByIndex(this.colors, index);
      }

      return this.color;
    }

    if (!Array.isArray(colors)) {
      return colors;
    }

    return colors[index % colors.length];
  }
}
