import dotenv from 'dotenv';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const envPath = resolve(process.cwd(), '.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
  throw new Error(`Failed to load .env file from ${envPath}: ${result.error.message}`);
}

if (!result.parsed || Object.keys(result.parsed).length === 0) {
  throw new Error(`.env file at ${envPath} contains no variables. Make sure PORT is set.`);
}

import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import type { RawTokensData, ApiResponse } from './types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getPort(): number {
  const port = process.env.PORT;
  if (!port) {
    throw new Error('PORT environment variable is not set');
  }
  const portNumber = Number(port);
  if (isNaN(portNumber) || portNumber <= 0) {
    throw new Error(`Invalid PORT value: ${port}`);
  }
  return portNumber;
}

const app = express();
const PORT = getPort();

app.use(cors());

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
  // Server started successfully
});

