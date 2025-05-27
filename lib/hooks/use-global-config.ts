export function useGlobalConfig() {
  const minAmount = 10;
  const platformFee = 0.02;
  const referralBaseRate = 100;

  return {
    minAmount,
    platformFee,
    referralBaseRate,
  };
}
