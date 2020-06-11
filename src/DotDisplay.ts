import Display from './Display';
import LedController from './LedController';

export default class DotDisplay extends Display {

  constructor(ledController: LedController, startIndex: number, amountOfLeds: number) {
    super(ledController, startIndex, amountOfLeds);
  }

  protected turnBackOn(): void {
    this.on(this.lastColor);
  }
}
