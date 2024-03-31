export class Indicator {
  _progress = 0;
  speed = 200;
  isStarted = false;
  domId = "_indicator";
  interval: NodeJS.Timeout | undefined;

  constructor() {
    this._progress = 0;
    this.isStarted = false;
  }

  start() {
    if (typeof document !== "undefined") {
      this.isStarted = true;
      this.render();
      console.log({ scope: "start/root" });

      this.interval = setInterval(() => {
        if (this._progress < 100) {
          this.increment();
          console.log({
            scope: "start/interval",
            intervalId: this.interval,
            progress: this._progress,
          });
        } else {
          this.stop();
        }
      }, 500);
    }
  }

  stop() {
    if (typeof document !== "undefined") {
      // set width of bar to 100%
      const _indicator = document.getElementById(this.domId);
      if (_indicator) _indicator.style.width = "100%";
      clearInterval(this.interval);
      // TODO: fix (use some sort of promise to wait for the with animation to complete)
      // only after that remove from DOM
      return this.remove();
    }
  }

  private update(val: number) {
    this._progress += val;
    const _indicator = document.getElementById(this.domId);

    if (_indicator) {
      _indicator.style.width = this.progressPercent();
      _indicator.innerHTML = this.progressPercent();
    }

    console.log({ update: this._progress });
  }

  private increment(val?: number) {
    if (this._progress >= 1) return this.stop();

    if (this._progress >= 0 && this._progress < 0.2) {
      val = 0.1;
    } else if (this._progress >= 0.2 && this._progress < 0.5) {
      val = 0.04;
    } else if (this._progress >= 0.5 && this._progress < 0.8) {
      val = 0.02;
    } else if (this._progress >= 0.8 && this._progress < 0.99) {
      val = 0.005;
    } else {
      val = 0;
    }
    return this.update(val);
  }

  private render() {
    if (typeof document !== "undefined" && !this.isRendered()) {
      const _indicator = document.createElement("div");
      _indicator.id = this.domId;
      _indicator.style.position = "fixed";
      _indicator.style.top = "0";
      _indicator.style.left = "0";
      _indicator.style.width = "0%";
      _indicator.style.height = "4px";
      _indicator.style.zIndex = "1031";
      _indicator.style.backgroundColor = "#29d";
      _indicator.style.transition = "width 0.5s ease";
      _indicator.innerHTML = this.progressPercent();
      document.body.appendChild(_indicator);
    }
  }

  private remove() {
    if (typeof document !== "undefined" && this.isRendered()) {
      return document.getElementById(this.domId)?.remove();
    }
  }

  private isRendered() {
    return document.getElementById(this.domId);
  }

  private progressPercent() {
    return `${Math.floor(Math.round(this._progress * 100))}%`;
  }
}
