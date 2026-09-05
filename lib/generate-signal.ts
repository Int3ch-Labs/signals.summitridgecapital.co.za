import { TradingSignal, SignalDirection } from "./types";

// Reference base prices used only to make mock signals look realistic.
// Replace this whole function with a call to your real model/API.
const BASE_PRICES: Record<string, number> = {
  XAUUSD: 2412.3,
  EURUSD: 1.085,
  GBPUSD: 1.27,
  USDJPY: 149.5,
  USDCHF: 0.88,
  AUDUSD: 0.655,
  USDCAD: 1.36,
  NZDUSD: 0.61,
  BTCUSD: 63500,
  ETHUSD: 3400,
};

export function generateMockSignal(pair: string): TradingSignal {
  const base = BASE_PRICES[pair] ?? 100;
  const direction: SignalDirection = Math.random() > 0.5 ? "LONG" : "SHORT";
  const volatility = base * 0.006;

  const entry = round(base + (Math.random() - 0.5) * volatility, base);
  const confidence = Math.floor(60 + Math.random() * 35);

  const slDistance = volatility * (0.8 + Math.random() * 0.6);
  const tpDistance = slDistance * (1.5 + Math.random());

  const stopLoss = round(
    direction === "LONG" ? entry - slDistance : entry + slDistance,
    base
  );
  const target = round(
    direction === "LONG" ? entry + tpDistance : entry - tpDistance,
    base
  );

  return {
    pair,
    direction,
    entry,
    confidence,
    stopLoss,
    target,
    generatedAt: new Date().toISOString(),
  };
}

function round(value: number, base: number) {
  const decimals = base >= 100 ? 2 : 4;
  return +value.toFixed(decimals);
}