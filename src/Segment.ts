import {LedController} from './LedController';

import {RgbColor} from './types/index';

export class Segment {
  private ledController: LedController;

  private startIndex: number;
  private amountOfLeds: number;

  constructor(ledController: LedController, startIndex: number, amountOfLeds: number) {
    this.ledController = ledController;

    this.startIndex = startIndex;
    this.amountOfLeds = amountOfLeds;
  }

  public on(color: RgbColor): void {
    this.ledController.setLeds(this.startIndex, this.amountOfLeds, color);
  }

  public off(): void {
    this.ledController.clearLeds(this.startIndex, this.amountOfLeds);
  }

  public render(): Promise<void> {
    return this.ledController.render();
  }
}
