export type RiskInput = {
  equity: number;
  riskPercent: number;
  entry: number;
  stop: number;
  leverage: number;
};

export type RiskSnapshot = {
  riskAmount: number;
  unitRisk: number;
  positionSize: number;
  notional: number;
  marginEstimate: number;
};

export function calculateRisk(input: RiskInput): RiskSnapshot {
  const riskAmount = input.equity * (input.riskPercent / 100);
  const unitRisk = Math.abs(input.entry - input.stop);
  const positionSize = unitRisk > 0 ? riskAmount / unitRisk : 0;
  const notional = positionSize * input.entry;
  const marginEstimate = input.leverage > 0 ? notional / input.leverage : notional;
  return { riskAmount, unitRisk, positionSize, notional, marginEstimate };
}
