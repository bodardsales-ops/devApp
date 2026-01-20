import { ComparisonResult } from '../types/calculator';
import { formatCurrency } from '../utils/calculator';
import { TrendingDown, TrendingUp, Calculator } from 'lucide-react';

interface ResultsDisplayProps {
  results: ComparisonResult | null;
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  if (!results) {
    return (
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-12 text-center">
        <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">
          Remplissez les champs ci-dessus pour voir les résultats
        </p>
      </div>
    );
  }

  const isSaving = results.monthlySavings > 0;

  return (
    <div className="space-y-6">
      <div className={`${isSaving ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'} border-2 rounded-xl p-8`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Analyse ROI</h2>
          {isSaving ? (
            <TrendingDown className="w-8 h-8 text-green-600" />
          ) : (
            <TrendingUp className="w-8 h-8 text-red-600" />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Économies Mensuelles</p>
            <p className={`text-3xl font-bold ${isSaving ? 'text-green-600' : 'text-red-600'}`}>
              {isSaving ? '+' : ''}{formatCurrency(results.monthlySavings)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {isSaving ? 'Économie de' : 'Surcoût de'} {Math.abs(results.savingsPercentage).toFixed(1)}%
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Économies Annuelles</p>
            <p className={`text-3xl font-bold ${isSaving ? 'text-green-600' : 'text-red-600'}`}>
              {isSaving ? '+' : ''}{formatCurrency(results.annualSavings)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Sur 12 mois
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-2 border-red-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-red-900 mb-4">Solution Actuelle</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Loyer copieur</span>
              <span className="font-semibold">{formatCurrency(results.current.rentCost)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Forfait de base</span>
              <span className="font-semibold">{formatCurrency(results.current.basePackageCost)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Copies N&B supp.</span>
              <span className="font-semibold">{formatCurrency(results.current.extraBWCost)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Copies Couleur supp.</span>
              <span className="font-semibold">{formatCurrency(results.current.extraColorCost)}</span>
            </div>
            <div className="flex justify-between py-3 bg-red-50 -mx-6 px-6 mt-3">
              <span className="font-bold text-gray-900">Total Mensuel</span>
              <span className="font-bold text-red-600 text-lg">{formatCurrency(results.current.monthlyTotal)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Total Annuel</span>
              <span className="font-semibold">{formatCurrency(results.current.annualTotal)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-green-900 mb-4">Solution Proposée</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Loyer copieur</span>
              <span className="font-semibold">{formatCurrency(results.proposed.rentCost)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Forfait de base</span>
              <span className="font-semibold">{formatCurrency(results.proposed.basePackageCost)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Copies N&B supp.</span>
              <span className="font-semibold">{formatCurrency(results.proposed.extraBWCost)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Copies Couleur supp.</span>
              <span className="font-semibold">{formatCurrency(results.proposed.extraColorCost)}</span>
            </div>
            <div className="flex justify-between py-3 bg-green-50 -mx-6 px-6 mt-3">
              <span className="font-bold text-gray-900">Total Mensuel</span>
              <span className="font-bold text-green-600 text-lg">{formatCurrency(results.proposed.monthlyTotal)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Total Annuel</span>
              <span className="font-semibold">{formatCurrency(results.proposed.annualTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
