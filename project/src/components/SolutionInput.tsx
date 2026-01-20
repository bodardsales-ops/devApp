import { CopierSolution } from '../types/calculator';

interface SolutionInputProps {
  title: string;
  solution: CopierSolution;
  onChange: (solution: CopierSolution) => void;
  variant: 'current' | 'proposed';
}

export default function SolutionInput({ title, solution, onChange, variant }: SolutionInputProps) {
  const bgColor = variant === 'current' ? 'bg-red-50' : 'bg-green-50';
  const borderColor = variant === 'current' ? 'border-red-200' : 'border-green-200';
  const labelColor = variant === 'current' ? 'text-red-900' : 'text-green-900';

  const handleChange = (field: keyof CopierSolution, value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ ...solution, [field]: numValue });
  };

  return (
    <div className={`${bgColor} ${borderColor} border-2 rounded-xl p-6 space-y-4`}>
      <h2 className={`text-xl font-bold ${labelColor} mb-4`}>{title}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Loyer du copieur (€/mois)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={solution.rent || ''}
          onChange={(e) => handleChange('rent', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="100.00"
        />
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-900 mb-3">Forfait Copie</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Copies Noir & Blanc incluses
            </label>
            <input
              type="number"
              min="0"
              value={solution.packageBW || ''}
              onChange={(e) => handleChange('packageBW', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Copies Couleur incluses
            </label>
            <input
              type="number"
              min="0"
              value={solution.packageColor || ''}
              onChange={(e) => handleChange('packageColor', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valeur fixe supplémentaire (€)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={solution.packageFixedCost || ''}
              onChange={(e) => handleChange('packageFixedCost', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="50.00"
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-900 mb-3">Coûts Supplémentaires</h3>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coût/page N&B supplémentaire (€)
            </label>
            <input
              type="number"
              min="0"
              step="0.001"
              value={solution.costPerExtraBW || ''}
              onChange={(e) => handleChange('costPerExtraBW', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.010"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coût/page Couleur supplémentaire (€)
            </label>
            <input
              type="number"
              min="0"
              step="0.001"
              value={solution.costPerExtraColor || ''}
              onChange={(e) => handleChange('costPerExtraColor', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.050"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
