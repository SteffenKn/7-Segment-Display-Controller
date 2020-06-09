import {LedController} from './LedController';

import {RgbColor} from './types/index';

export class DotDisplay {

  private ledController: LedController;

  private startIndex: number;
  private amountOfLeds: number;

  private color: RgbColor;
  private blink: boolean;

  private blinkDuration: number = 500;

  constructor(ledController: LedController, startIndex: number, amountOfLeds: number) {
    this.ledController = ledController;

    this.startIndex = startIndex;
    this.amountOfLeds = amountOfLeds;
  }

  public setColor(color: RgbColor): void {
    this.color = color;

    this.ledController.setLeds(this.startIndex, this.amountOfLeds, color);
  }

  public clear(): void {
    this.ledController.clearLeds(this.startIndex, this.amountOfLeds);
  }

  public startBlinking(ms?: number): void {
    this.blink = true;
    this.blinkDuration = ms;

    this.turnOn();
  }

  public stopBlinking(): void {
    this.blink = false;
  }

  public render(): Promise<void> {
    return this.ledController.render();
  }

  private turnOn(): void {
    setTimeout(async(): Promise<void> => {
      if (!this.blink) {
        return;
      }

      this.ledController.setLeds(this.startIndex, this.amountOfLeds, this.color);

      this.turnOff();
    }, this.blinkDuration);
  }

  private turnOff(): void {
    setTimeout(async(): Promise<void> => {
      if (!this.blink) {
        return;
      }

      this.clear();

      this.turnOn();
    }, this.blinkDuration);
  }

}
