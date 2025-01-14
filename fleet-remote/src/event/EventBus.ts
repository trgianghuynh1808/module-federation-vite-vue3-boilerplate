type TEventCallback = (data: any) => void;
type TEventData<T = any> = T;

export default class EventBus {
  private listeners: Map<TEventCallback, TEventCallback>;
  private emitter: string;

  constructor() {
    this.listeners = new Map();
    this.emitter = "core-remote";
  }

  private _generateEventName(eventName: string): string {
    return `${this.emitter}:${eventName}`;
  }

  public emit(eventName: string, data?: TEventData): void {
    window.dispatchEvent(
      new CustomEvent(this._generateEventName(eventName), { detail: data })
    );
  }

  public on(eventName: string, callback: TEventCallback): void {
    const listener = (event: any) => callback(event.detail);

    window.addEventListener(this._generateEventName(eventName), listener);

    this.listeners.set(callback, listener);
  }

  public off(eventName: string, callback: TEventCallback): void {
    const listener = this.listeners.get(callback);

    if (listener) {
      window.removeEventListener(this._generateEventName(eventName), listener);

      this.listeners.delete(callback);
    }
  }
}
