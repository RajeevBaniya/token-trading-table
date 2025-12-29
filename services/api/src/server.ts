import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { RawTokensData, ApiResponse } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

function loadMockData(): RawTokensData {
  const filePath = join(__dirname, 'data', 'mockCoins.json');
  const fileContent = readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent) as RawTokensData;
}

const mockData = loadMockData();

function generateLatency(): number {
  return 300 + Math.floor(Math.random() * 500);
}

app.get('/tokens', (_req, res) => {
  const latency = generateLatency();
  
  setTimeout(() => {
    const response: ApiResponse = {
      version: '1.0.0',
      timestamp: Date.now(),
      data: mockData,
    };
    
    res.json(response);
  }, latency);
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.listen(PORT, () => {
  console.log(`REST API server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Tokens endpoint: http://localhost:${PORT}/tokens`);
});

