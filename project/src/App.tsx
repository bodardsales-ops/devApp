import { useState, useEffect } from 'react';
import { CopierSolution, ActualUsage, ComparisonResult } from './types/calculator';
import { compareResults } from './utils/calculator';
import SolutionInput from './components/SolutionInput';
import UsageInput from './components/UsageInput';
import ResultsDisplay from './components/ResultsDisplay';
import { Calculator } from 'lucide-react';

function App() {
  const [currentSolution, setCurrentSolution] = useState<CopierSolution>({
    rent: 100,
    packageBW: 500,
    packageColor: 200,
    packageFixedCost: 50,
    costPerExtraBW: 0.01,
    costPerExtraColor: 0.05,
  });

  const [proposedSolution, setProposedSolution] = useState<CopierSolution>({
    rent: 80,
    packageBW: 600,
    packageColor: 300,
    packageFixedCost: 40,
    costPerExtraBW: 0.008,
    costPerExtraColor: 0.045,
  });

  const [usage, setUsage] = useState<ActualUsage>({
    bwCopies: 1000,
    colorCopies: 500,
  });

  const [results, setResults] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    const comparisonResult = compareResults(currentSolution, proposedSolution, usage);
    setResults(comparisonResult);
  }, [currentSolution, proposedSolution, usage]);

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
          <SolutionInput
            title="Solution Actuelle"
            solution={currentSolution}
            onChange={setCurrentSolution}
            variant="current"
          />
          <SolutionInput
            title="Solution Proposée"
            solution={proposedSolution}
            onChange={setProposedSolution}
            variant="proposed"
          />
        </div>

        <div className="mb-8">
          <UsageInput usage={usage} onChange={setUsage} />
        </div>

        <ResultsDisplay results={results} />

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
