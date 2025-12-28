interface PriceUpdateV1Payload {
  readonly id: string;
  readonly price: number;
}

interface PriceUpdateV1Message {
  readonly type: 'PRICE_UPDATE_V1';
  readonly payload: PriceUpdateV1Payload;
}

interface ParsedAction {
  readonly type: 'UPDATE_TOKEN_PRICE';
  readonly payload: {
    readonly tokenId: string;
    readonly newPrice: number;
  };
}

type UnknownMessage = {
  readonly type: string;
  readonly payload?: unknown;
};

function parsePriceUpdateV1(message: PriceUpdateV1Message): ParsedAction | null {
  if (message.type !== 'PRICE_UPDATE_V1') {
    return null;
  }

  const { id, price } = message.payload;

  if (typeof id !== 'string' || typeof price !== 'number' || price <= 0) {
    return null;
  }

  return {
    type: 'UPDATE_TOKEN_PRICE',
    payload: {
      tokenId: id,
      newPrice: price,
    },
  };
}

function parseWebSocketMessage(rawData: string | ArrayBuffer | Blob): ParsedAction | null {
  try {
    const text = typeof rawData === 'string' ? rawData : rawData.toString();
    const message: UnknownMessage = JSON.parse(text);

    if (!message || typeof message !== 'object' || !message.type) {
      return null;
    }

    if (message.type === 'PRICE_UPDATE_V1') {
      return parsePriceUpdateV1(message as PriceUpdateV1Message);
    }

    return null;
  } catch {
    return null;
  }
}

export { parseWebSocketMessage };
export type { ParsedAction, PriceUpdateV1Message };

