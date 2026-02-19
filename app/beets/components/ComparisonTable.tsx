'use client';

import { comparisonRows as defaultRows } from '../data/comparison';
import MotionReveal from './MotionReveal';

export interface ComparisonColumn {
  key: string;
  label: string;
  highlight?: boolean;
}

export interface ComparisonRowData {
  feature: string;
  [key: string]: string;
}

interface ComparisonTableProps {
  columns?: ComparisonColumn[];
  rows?: ComparisonRowData[];
}

const defaultColumns: ComparisonColumn[] = [
  { key: 'feature', label: 'Feature' },
  { key: 'reclamms', label: 'reCLAMMs', highlight: true },
  { key: 'uniV3', label: 'Uniswap V3 CL' },
  { key: 'fullRange', label: 'Full-Range AMM' },
];

export default function ComparisonTable({
  columns = defaultColumns,
  rows = defaultRows,
}: ComparisonTableProps) {
  return (
    <MotionReveal>
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={col.highlight ? 'highlight-col' : ''}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={col.highlight && col.key !== 'feature' ? 'highlight-col' : ''}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MotionReveal>
  );
}
