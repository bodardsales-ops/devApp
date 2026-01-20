import { useState, useEffect } from 'react';
import { CopierSolution, ActualUsage, MultiCopierComparisonResult } from './types/calculator';
import { compareMultipleCopiers } from './utils/calculator';
import CopierList from './components/CopierList';
import UsageInput from './components/UsageInput';
import MultiCopierResultsDisplay from './components/MultiCopierResultsDisplay';
import ExportButton from './components/ExportButton';
import { Calculator } from 'lucide-react';

function App() {
  const [currentCopiers, setCurrentCopiers] = useState<CopierSolution[]>([
    {
      id: 'current-1',
      name: 'Copieur Actuel 1',
      rent: 100,
      packageBW: 500,
      packageColor: 200,
      packageFixedCost: 50,
      costPerExtraBW: 0.01,
      costPerExtraColor: 0.05,
    },
  ]);

  const [proposedCopiers, setProposedCopiers] = useState<CopierSolution[]>([
    {
      id: 'proposed-1',
      name: 'Copieur Proposé 1',
      rent: 80,
      packageBW: 600,
      packageColor: 300,
      packageFixedCost: 40,
      costPerExtraBW: 0.008,
      costPerExtraColor: 0.045,
    },
  ]);

  const [usage, setUsage] = useState<ActualUsage>({
    bwCopies: 1000,
    colorCopies: 500,
  });

  const [results, setResults] = useState<MultiCopierComparisonResult | null>(null);

  useEffect(() => {
    if (currentCopiers.length > 0 && proposedCopiers.length > 0) {
      const comparisonResult = compareMultipleCopiers(currentCopiers, proposedCopiers, usage);
      setResults(comparisonResult);
    } else {
      setResults(null);
    }
  }, [currentCopiers, proposedCopiers, usage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Calculateur ROI Copieurs
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Comparez vos solutions et découvrez vos économies potentielles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CopierList
            title="Solutions Actuelles"
            copiers={currentCopiers}
            onChange={setCurrentCopiers}
            variant="current"
          />
          <CopierList
            title="Solutions Proposées"
            copiers={proposedCopiers}
            onChange={setProposedCopiers}
            variant="proposed"
          />
        </div>

        <div className="mb-8">
          <UsageInput usage={usage} onChange={setUsage} />
        </div>

        <div className="mb-8 flex justify-center">
          <ExportButton results={results} />
        </div>

        <MultiCopierResultsDisplay results={results} />

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Tous les montants sont calculés en euros (€). Les économies sont basées sur
            l'utilisation mensuelle réelle comparée aux forfaits disponibles.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
