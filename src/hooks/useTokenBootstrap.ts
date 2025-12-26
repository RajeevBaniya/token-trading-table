import { useTokenData } from './useTokenData';
import { useMockWebSocket } from './useMockWebSocket';

function useTokenBootstrap(): void {
  useTokenData();
  useMockWebSocket();
}

export { useTokenBootstrap };
