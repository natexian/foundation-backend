import { Injectable } from "@nestjs/common";

@Injectable()
export class GameTimerService {
  public elapsedTime: number = 0;
  private ticking: boolean = false;
  private interval: number = null;
  private isGameRunning: boolean;
  
  constructor() {
    this.onTick = this.onTick.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.start();
    this.isGameRunning = true;
  }

  start() {
    this.interval = Number(setInterval(this.onTick, 1000));
    this.ticking = true;
  }

  stop() {
    clearInterval(this.interval);
    this.ticking = false;
  }

  onTick() {
    this.elapsedTime += 1000;
  }

  togglePause() {
    if (this.ticking) {
      this.stop();
    } else {
      this.start();
    }
  }

  get currentTime() {
    return this.elapsedTime;
  }
}