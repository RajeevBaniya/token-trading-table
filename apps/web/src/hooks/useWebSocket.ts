import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { updateTokenPriceAction } from '@/store/tokenSlice';
import { WebSocketClient } from '@/services/websocket/wsClient';
import type { ParsedAction } from '@/services/websocket/messageParser';

function useWebSocket(): void {
  const dispatch = useDispatch<AppDispatch>();
  const clientRef = useRef<WebSocketClient | null>(null);

  useEffect(() => {
    const client = new WebSocketClient({
      onMessage: (action: ParsedAction) => {
        if (action.type === 'UPDATE_TOKEN_PRICE') {
          dispatch(
            updateTokenPriceAction({
              tokenId: action.payload.tokenId,
              newPrice: action.payload.newPrice,
            })
          );
        }
      },
      onConnect: () => {
        console.log('[WebSocket] Connected to price update server');
      },
      onDisconnect: () => {
        console.log('[WebSocket] Disconnected from price update server');
      },
      onError: (error) => {
        console.error('[WebSocket] Error:', error);
      },
    });

    clientRef.current = client;
    client.connect();

    return () => {
      client.disconnect();
    };
  }, [dispatch]);
}

export { useWebSocket };

