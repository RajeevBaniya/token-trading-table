import type { ParsedAction } from './messageParser';
import { parseWebSocketMessage } from './messageParser';

function getWebSocketUrl(): string {
  const url = process.env.NEXT_PUBLIC_WS_URL;
  if (!url) {
    throw new Error('NEXT_PUBLIC_WS_URL environment variable is not set');
  }
  return url;
}

const WS_URL = getWebSocketUrl();

const RECONNECT_DELAY_MS = 3000;
const MAX_RECONNECT_ATTEMPTS = 10;

interface WebSocketClientCallbacks {
  onMessage: (action: ParsedAction) => void;
  onError?: (error: Event) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private shouldReconnect = true;
  private callbacks: WebSocketClientCallbacks;

  constructor(callbacks: WebSocketClientCallbacks) {
    this.callbacks = callbacks;
  }

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      this.ws = new WebSocket(WS_URL);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        this.callbacks.onConnect?.();
      };

      this.ws.onmessage = (event) => {
        const action = parseWebSocketMessage(event.data);
        if (action) {
          this.callbacks.onMessage(action);
        }
      };

      this.ws.onerror = (error) => {
        this.callbacks.onError?.(error);
      };

      this.ws.onclose = () => {
        this.callbacks.onDisconnect?.();
        if (this.shouldReconnect && this.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          this.reconnectAttempts += 1;
          setTimeout(() => {
            this.connect();
          }, RECONNECT_DELAY_MS);
        }
      };
    } catch (error) {
      this.callbacks.onError?.(error as Event);
    }
  }

  disconnect(): void {
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export { WebSocketClient };
export type { WebSocketClientCallbacks };

