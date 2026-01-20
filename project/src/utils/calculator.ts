import {
  CopierSolution,
  ActualUsage,
  CalculationResult,
  ComparisonResult,
  CopierCalculationResult,
  MultiCopierComparisonResult
} from '../types/calculator';

export function calculateCosts(
  solution: CopierSolution,
  usage: ActualUsage
): CalculationResult {
  const extraBW = Math.max(0, usage.bwCopies - solution.packageBW);
  const extraColor = Math.max(0, usage.colorCopies - solution.packageColor);

  const extraBWCost = extraBW * solution.costPerExtraBW;
  const extraColorCost = extraColor * solution.costPerExtraColor;
  const basePackageCost = solution.packageFixedCost;
  const rentCost = solution.rent;

  const monthlyTotal = rentCost + basePackageCost + extraBWCost + extraColorCost;
  const annualTotal = monthlyTotal * 12;

  return {
    monthlyTotal,
    annualTotal,
    basePackageCost,
    extraBWCost,
    extraColorCost,
    rentCost,
  };
}

export function calculateCopierCosts(
  copier: CopierSolution,
  usage: ActualUsage
): CopierCalculationResult {
  const result = calculateCosts(copier, usage);
  return {
    ...result,
    copierId: copier.id,
    copierName: copier.name,
  };
}

export function compareResults(
  currentSolution: CopierSolution,
  proposedSolution: CopierSolution,
  usage: ActualUsage
): ComparisonResult {
  const current = calculateCosts(currentSolution, usage);
  const proposed = calculateCosts(proposedSolution, usage);

  const monthlySavings = current.monthlyTotal - proposed.monthlyTotal;
  const annualSavings = current.annualTotal - proposed.annualTotal;
  const savingsPercentage = current.monthlyTotal > 0
    ? (monthlySavings / current.monthlyTotal) * 100
    : 0;

  return {
    current,
    proposed,
    monthlySavings,
    annualSavings,
    savingsPercentage,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('fr-FR').format(value);
}

export function compareMultipleCopiers(
  currentCopiers: CopierSolution[],
  proposedCopiers: CopierSolution[],
  usage: ActualUsage
): MultiCopierComparisonResult {
  const currentResults = currentCopiers.map(copier => calculateCopierCosts(copier, usage));
  const proposedResults = proposedCopiers.map(copier => calculateCopierCosts(copier, usage));

  const currentTotalMonthly = currentResults.reduce((sum, result) => sum + result.monthlyTotal, 0);
  const proposedTotalMonthly = proposedResults.reduce((sum, result) => sum + result.monthlyTotal, 0);

  const currentTotal: CalculationResult = {
    monthlyTotal: currentTotalMonthly,
    annualTotal: currentTotalMonthly * 12,
    basePackageCost: currentResults.reduce((sum, r) => sum + r.basePackageCost, 0),
    extraBWCost: currentResults.reduce((sum, r) => sum + r.extraBWCost, 0),
    extraColorCost: currentResults.reduce((sum, r) => sum + r.extraColorCost, 0),
    rentCost: currentResults.reduce((sum, r) => sum + r.rentCost, 0),
  };

  const proposedTotal: CalculationResult = {
    monthlyTotal: proposedTotalMonthly,
    annualTotal: proposedTotalMonthly * 12,
    basePackageCost: proposedResults.reduce((sum, r) => sum + r.basePackageCost, 0),
    extraBWCost: proposedResults.reduce((sum, r) => sum + r.extraBWCost, 0),
    extraColorCost: proposedResults.reduce((sum, r) => sum + r.extraColorCost, 0),
    rentCost: proposedResults.reduce((sum, r) => sum + r.rentCost, 0),
  };

  const monthlySavings = currentTotal.monthlyTotal - proposedTotal.monthlyTotal;
  const annualSavings = currentTotal.annualTotal - proposedTotal.annualTotal;
  const savingsPercentage = currentTotal.monthlyTotal > 0
    ? (monthlySavings / currentTotal.monthlyTotal) * 100
    : 0;

  return {
    currentCopiers: currentResults,
    proposedCopiers: proposedResults,
    currentTotal,
    proposedTotal,
    monthlySavings,
    annualSavings,
    savingsPercentage,
  };
}
