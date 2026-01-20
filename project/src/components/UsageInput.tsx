import { ActualUsage } from '../types/calculator';
import { Printer } from 'lucide-react';

interface UsageInputProps {
  usage: ActualUsage;
  onChange: (usage: ActualUsage) => void;
}

export default function UsageInput({ usage, onChange }: UsageInputProps) {
  const handleChange = (field: keyof ActualUsage, value: string) => {
    const numValue = parseFloat(value) || 0;
    onChange({ ...usage, [field]: numValue });
  };

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Printer className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold text-blue-900">Utilisation Mensuelle Réelle</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de copies Noir & Blanc par mois
        </label>
        <input
          type="number"
          min="0"
          value={usage.bwCopies || ''}
          onChange={(e) => handleChange('bwCopies', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="1000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre de copies Couleur par mois
        </label>
        <input
          type="number"
          min="0"
          value={usage.colorCopies || ''}
          onChange={(e) => handleChange('colorCopies', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="500"
        />
      </div>
    </div>
  );
}
