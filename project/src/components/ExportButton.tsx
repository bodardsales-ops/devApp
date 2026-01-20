import { Download } from 'lucide-react';
import { MultiCopierComparisonResult } from '../types/calculator';
import { exportToPDF } from '../utils/pdfExport';

interface ExportButtonProps {
  results: MultiCopierComparisonResult | null;
}

export default function ExportButton({ results }: ExportButtonProps) {
  const handleExport = () => {
    if (!results) return;
    exportToPDF(results);
  };

  return (
    <button
      onClick={handleExport}
      disabled={!results}
      className={`${
        results
          ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
          : 'bg-gray-400 cursor-not-allowed'
      } text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-semibold shadow-lg`}
    >
      <Download className="w-5 h-5" />
      Exporter en PDF
    </button>
  );
}
