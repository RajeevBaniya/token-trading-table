import { useTokenData } from './useTokenData';
import { useWebSocket } from './useWebSocket';

function useTokenBootstrap(): void {
  useTokenData();
  useWebSocket();
}

export { useTokenBootstrap };
