import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MultiCopierComparisonResult } from '../types/calculator';
import { formatCurrency } from './calculator';

export function exportToPDF(results: MultiCopierComparisonResult) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(20);
  doc.text('Analyse ROI - Copieurs', pageWidth / 2, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, 30, { align: 'center' });

  const isSaving = results.monthlySavings > 0;
  const savingsColor: [number, number, number] = isSaving ? [34, 197, 94] : [239, 68, 68];

  doc.setFontSize(16);
  doc.setTextColor(...savingsColor);
  doc.text(`Économies: ${formatCurrency(results.monthlySavings)} /mois`, pageWidth / 2, 45, { align: 'center' });
  doc.text(`(${Math.abs(results.savingsPercentage).toFixed(1)}%)`, pageWidth / 2, 53, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('Solutions Actuelles', 14, 70);

  const currentRows = results.currentCopiers.map(copier => [
    copier.copierName,
    formatCurrency(copier.rentCost),
    formatCurrency(copier.basePackageCost),
    formatCurrency(copier.extraBWCost),
    formatCurrency(copier.extraColorCost),
    formatCurrency(copier.monthlyTotal),
  ]);

  currentRows.push([
    'TOTAL',
    formatCurrency(results.currentTotal.rentCost),
    formatCurrency(results.currentTotal.basePackageCost),
    formatCurrency(results.currentTotal.extraBWCost),
    formatCurrency(results.currentTotal.extraColorCost),
    formatCurrency(results.currentTotal.monthlyTotal),
  ]);

  autoTable(doc, {
    startY: 75,
    head: [['Copieur', 'Loyer', 'Forfait', 'N&B supp.', 'Couleur supp.', 'Total']],
    body: currentRows,
    theme: 'grid',
    headStyles: { fillColor: [239, 68, 68] },
    footStyles: { fillColor: [254, 226, 226], textColor: [0, 0, 0], fontStyle: 'bold' },
  });

  const finalY1 = (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(14);
  doc.text('Solutions Proposées', 14, finalY1);

  const proposedRows = results.proposedCopiers.map(copier => [
    copier.copierName,
    formatCurrency(copier.rentCost),
    formatCurrency(copier.basePackageCost),
    formatCurrency(copier.extraBWCost),
    formatCurrency(copier.extraColorCost),
    formatCurrency(copier.monthlyTotal),
  ]);

  proposedRows.push([
    'TOTAL',
    formatCurrency(results.proposedTotal.rentCost),
    formatCurrency(results.proposedTotal.basePackageCost),
    formatCurrency(results.proposedTotal.extraBWCost),
    formatCurrency(results.proposedTotal.extraColorCost),
    formatCurrency(results.proposedTotal.monthlyTotal),
  ]);

  autoTable(doc, {
    startY: finalY1 + 5,
    head: [['Copieur', 'Loyer', 'Forfait', 'N&B supp.', 'Couleur supp.', 'Total']],
    body: proposedRows,
    theme: 'grid',
    headStyles: { fillColor: [34, 197, 94] },
    footStyles: { fillColor: [220, 252, 231], textColor: [0, 0, 0], fontStyle: 'bold' },
  });

  const finalY2 = (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(14);
  doc.text('Synthèse Annuelle', 14, finalY2);

  const summaryData = [
    ['Coût actuel mensuel', formatCurrency(results.currentTotal.monthlyTotal)],
    ['Coût proposé mensuel', formatCurrency(results.proposedTotal.monthlyTotal)],
    ['Économies mensuelles', formatCurrency(results.monthlySavings)],
    ['', ''],
    ['Coût actuel annuel', formatCurrency(results.currentTotal.annualTotal)],
    ['Coût proposé annuel', formatCurrency(results.proposedTotal.annualTotal)],
    ['Économies annuelles', formatCurrency(results.annualSavings)],
  ];

  autoTable(doc, {
    startY: finalY2 + 5,
    body: summaryData,
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 80 },
      1: { halign: 'right', cellWidth: 60 },
    },
  });

  doc.save(`analyse-roi-copieurs-${new Date().toISOString().split('T')[0]}.pdf`);
}
