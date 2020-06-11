import LedstripController from 'ws2801-pi';

import {RgbColor} from './types/index';

export default class LedController {

  private controller: LedstripController;

  constructor(amountOfLeds: number) {
    this.controller = new LedstripController(amountOfLeds);
  }

  public setLeds(startIndex: number, amountOfLeds: number, color: RgbColor): void {
    for (let index: number = 0; index < amountOfLeds; index++) {
      const ledIndex: number = startIndex + index;
      this.controller.setLed(ledIndex, color.red, color.green, color.blue);
    }
  }

  public clearLeds(startIndex: number, amountOfLeds: number): void {
    for (let index: number = 0; index < amountOfLeds; index++) {
      const ledIndex: number = startIndex + index;
      this.controller.setLed(ledIndex, 0, 0, 0);
    }
  }

  public render(): Promise<void> {
    return this.controller.show();
  }
}
