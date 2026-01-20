import { CopierSolution } from '../types/calculator';
import SolutionInput from './SolutionInput';
import { Plus, Trash2 } from 'lucide-react';

interface CopierListProps {
  title: string;
  copiers: CopierSolution[];
  onChange: (copiers: CopierSolution[]) => void;
  variant: 'current' | 'proposed';
}

export default function CopierList({ title, copiers, onChange, variant }: CopierListProps) {
  const addCopier = () => {
    const newCopier: CopierSolution = {
      id: `copier-${Date.now()}`,
      name: `Copieur ${copiers.length + 1}`,
      rent: 0,
      packageBW: 0,
      packageColor: 0,
      packageFixedCost: 0,
      costPerExtraBW: 0,
      costPerExtraColor: 0,
    };
    onChange([...copiers, newCopier]);
  };

  const removeCopier = (id: string) => {
    if (copiers.length > 1) {
      onChange(copiers.filter(c => c.id !== id));
    }
  };

  const updateCopier = (id: string, updatedCopier: CopierSolution) => {
    onChange(copiers.map(c => c.id === id ? updatedCopier : c));
  };

  const bgColor = variant === 'current' ? 'bg-red-50' : 'bg-green-50';
  const borderColor = variant === 'current' ? 'border-red-300' : 'border-green-300';
  const buttonColor = variant === 'current' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700';

  return (
    <div className={`${bgColor} ${borderColor} border-2 rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={addCopier}
          className={`${buttonColor} text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
        >
          <Plus className="w-4 h-4" />
          Ajouter un copieur
        </button>
      </div>

      <div className="space-y-4">
        {copiers.map((copier, index) => (
          <div key={copier.id} className="relative bg-white rounded-lg p-4 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={copier.name}
                onChange={(e) => updateCopier(copier.id, { ...copier, name: e.target.value })}
                className="text-lg font-bold text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none px-2"
                placeholder="Nom du copieur"
              />
              {copiers.length > 1 && (
                <button
                  onClick={() => removeCopier(copier.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Supprimer ce copieur"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
            <SolutionInput
              solution={copier}
              onChange={(updated) => updateCopier(copier.id, updated)}
              variant={variant}
              hideTitle
            />
          </div>
        ))}
      </div>
    </div>
  );
}
