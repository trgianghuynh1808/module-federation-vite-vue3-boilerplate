/* eslint-disable @typescript-eslint/no-explicit-any */
type TEventCallback = (data: any) => void;

export default class EventListener {
  private listener: string;

  constructor(listener: string) {
    this.listener = listener;
  }

  private _generateEventName(eventName: string): string {
    return `${this.listener}:${eventName}`;
  }

  public on(eventName: string, callback: TEventCallback): void {
    const listener = (event: any) => callback(event.detail);

    window.addEventListener(this._generateEventName(eventName), listener);
  }

  public off(eventName: string, callback: TEventCallback): void {
    const listener = (event: any) => callback(event.detail);

    window.removeEventListener(this._generateEventName(eventName), listener);
  }
}
