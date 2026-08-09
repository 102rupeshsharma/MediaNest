import { Listener } from './types';

export class EventEmitter {
  private listeners: Map<string, Set<Listener>> = new Map();

  on(event: string, listener: Listener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener);
  }

  off(event: string, listener: Listener): void {
    const list = this.listeners.get(event);
    if (list) {
      list.delete(listener);
      if (list.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  emit(event: string, payload: unknown): void {
    const list = this.listeners.get(event);
    if (list) {
      list.forEach((listener) => {
        try {
          listener(payload);
        } catch (e) {
          console.error(`[MediaCore] Error executing listener for event "${event}":`, e);
        }
      });
    }
  }
}
