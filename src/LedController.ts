import LedstripController from 'ws2801-pi';

import {RgbColor} from './types/index';

export class LedController {

  private controller: LedstripController;

  constructor(amountOfLeds: number) {
    this.controller = new LedstripController(amountOfLeds);
  }

  public setLeds(startIndex: number, amountOfLeds: number, color: RgbColor): void {
    for (let index: number = 0; index < amountOfLeds; index++) {
      const ledIndex: number = startIndex + index;
      this.controller.setLed(ledIndex, color);
    }
  }

  public clearLeds(startIndex: number, amountOfLeds: number): void {
    for (let index: number = 0; index < amountOfLeds; index++) {
      const ledIndex: number = startIndex + index;

      const black: RgbColor = {
        red: 0,
        green: 0,
        blue: 0,
      };
      this.controller.setLed(ledIndex, black);
    }
  }

  public render(): Promise<void> {
    return this.controller.show();
  }
}
