import {LedController} from './LedController';

import {RgbColor} from './types/index';

export class DotDisplay {

  private ledController: LedController;

  private startIndex: number;
  private amountOfLeds: number;

  private color: RgbColor;
  private blink: boolean;

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

  public startBlinking(): void {
    this.blink = true;

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

      await this.ledController.render();

      this.turnOff();
    });
  }

  private turnOff(): void {
    setTimeout(async(): Promise<void> => {
      if (!this.blink) {
        return;
      }

      this.clear();

      await this.ledController.render();

      this.turnOn();
    });
  }

}
