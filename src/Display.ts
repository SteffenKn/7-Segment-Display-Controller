import {LedController} from './LedController';

import {RgbColor} from './types/RgbColor';

export abstract class Display {
  protected ledController: LedController;

  protected startIndex: number;
  protected amountOfLeds: number;

  protected color: RgbColor;
  protected lastColor: RgbColor;

  protected isOn: boolean = false;

  private isBlinking: boolean = false;
  private blinkDuration: number = 500;
  private blinkCallback: Function;

  constructor(ledController: LedController, startIndex: number, amountOfLeds: number) {
    this.ledController = ledController;

    this.startIndex = startIndex;
    this.amountOfLeds = amountOfLeds;
  }

  public on(color?: RgbColor): void {
    this.isOn = true;

    const colorToUse: RgbColor = color ? color : this.color;
    this.lastColor = colorToUse;

    this.ledController.setLeds(this.startIndex, this.amountOfLeds, colorToUse);
  }

  public off(): void {
    this.isOn = false;

    this.ledController.clearLeds(this.startIndex, this.amountOfLeds);
  }

  public setColor(color: RgbColor): void {
    this.color = color;
    this.lastColor = color;

    if (this.isOn) {
      this.turnBackOn();
    }
  }

  public startBlinking(ms?: number, blinkCallback?: Function): void {
    this.isBlinking = true;
    this.blinkDuration = ms;
    this.blinkCallback = blinkCallback;

    this.blinkOn();
  }

  public stopBlinking(): void {
    this.isBlinking = false;
  }

  public render(): Promise<void> {
    return this.ledController.render();
  }

  protected abstract turnBackOn(): void;

  private blinkOn(): void {
    setTimeout(async(): Promise<void> => {
      if (!this.isBlinking) {
        return;
      }

      if (this.blinkCallback) {
        this.blinkCallback();
      }

      this.turnBackOn();

      this.blinkOff();
    }, this.blinkDuration);
  }

  private blinkOff(): void {
    setTimeout(async(): Promise<void> => {
      if (!this.isBlinking) {
        return;
      }

      if (this.blinkCallback) {
        this.blinkCallback();
      }

      this.off();

      this.blinkOn();
    }, this.blinkDuration);
  }
}
