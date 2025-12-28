import { WebSocketServer, WebSocket } from 'ws';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { RawTokensData, PriceMap, PriceUpdateMessage } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = Number(process.env.PORT) || 4001;
const UPDATE_INTERVAL_MS = 2000;

function loadMockData(): RawTokensData {
  const filePath = join(__dirname, '..', '..', 'api', 'src', 'data', 'mockCoins.json');
  const fileContent = readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as RawTokensData;
}

function initializePriceMap(data: RawTokensData): PriceMap {
  const priceMap: Record<string, number> = {};
  
  const allTokens = [
    ...data.new,
    ...data.final,
    ...data.migrated,
  ];
  
  for (const token of allTokens) {
    priceMap[token.id] = token.price;
  }
  
  return priceMap as PriceMap;
}

function generatePriceDelta(): number {
  const sign = Math.random() < 0.5 ? -1 : 1;
  const magnitude = 0.5 + Math.random() * 2.5;
  return sign * magnitude;
}

function calculateNewPrice(currentPrice: number, deltaPercent: number): number {
  const multiplier = 1 + deltaPercent / 100;
  return Math.max(0.000000001, currentPrice * multiplier);
}

function selectRandomTokenIds(priceMap: PriceMap, count: number): readonly string[] {
  const tokenIds = Object.keys(priceMap);
  if (tokenIds.length === 0) {
    return [];
  }
  
  const shuffled = [...tokenIds].sort(() => Math.random() - 0.5);
  const selectCount = Math.min(count, shuffled.length);
  return shuffled.slice(0, selectCount);
}

const mockData = loadMockData();
let priceMap: PriceMap = initializePriceMap(mockData);

const wss = new WebSocketServer({ port: PORT });

function broadcast(message: PriceUpdateMessage): void {
  const messageStr = JSON.stringify(message);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageStr);
    }
  });
}

function simulateMarketUpdate(): void {
  const tokenCount = Object.keys(priceMap).length;
  
  if (tokenCount === 0) {
    return;
  }
  
  const updateCount = 2 + Math.floor(Math.random() * 2);
  const selectedIds = selectRandomTokenIds(priceMap, updateCount);
  
  for (const tokenId of selectedIds) {
    const currentPrice = priceMap[tokenId];
    if (currentPrice === undefined) {
      continue;
    }
    
    const deltaPercent = generatePriceDelta();
    const newPrice = calculateNewPrice(currentPrice, deltaPercent);
    
    priceMap = {
      ...priceMap,
      [tokenId]: newPrice,
    };
    
    const message: PriceUpdateMessage = {
      type: 'PRICE_UPDATE_V1',
      payload: {
        id: tokenId,
        price: newPrice,
      },
    };
    
    broadcast(message);
    
    console.log(
      `[PRICE_UPDATE] ${tokenId}: $${currentPrice.toFixed(8)} → $${newPrice.toFixed(8)} (${deltaPercent > 0 ? '+' : ''}${deltaPercent.toFixed(2)}%)`
    );
  }
}

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

const intervalId = setInterval(() => {
  simulateMarketUpdate();
}, UPDATE_INTERVAL_MS);

console.log(`WebSocket server running on ws://localhost:${PORT}`);
console.log(`Update interval: ${UPDATE_INTERVAL_MS}ms`);
console.log(`Initialized ${Object.keys(priceMap).length} tokens`);

process.on('SIGINT', () => {
  console.log('\nShutting down WebSocket server...');
  clearInterval(intervalId);
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\nShutting down WebSocket server...');
  clearInterval(intervalId);
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});

