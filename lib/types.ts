export type SignalDirection = "LONG" | "SHORT";

export interface TradingSignal {
  pair: string;
  direction: SignalDirection;
  entry: number;
  confidence: number;
  stopLoss: number;
  target: number;
  generatedAt: string;
}