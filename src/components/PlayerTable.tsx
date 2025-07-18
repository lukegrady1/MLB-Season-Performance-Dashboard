// File: src/components/PlayerTable.tsx

import React, { useMemo } from 'react'
import {
  useTable,
  useSortBy,
  Column,
  ColumnInstance,
  HeaderGroup,
  TableInstance,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByInstanceProps
} from 'react-table'
import { PlayerData } from '../hooks/usePlayerStats'
import Sparkline from './Sparkline'

// Extend Column type to include disableSortBy
type TableColumn = Column<PlayerData> & UseSortByColumnOptions<PlayerData>

interface Props {
  data: PlayerData[]
  onSelectPlayer: (id: number) => void
}

export default function PlayerTable({ data, onSelectPlayer }: Props) {
  // 1) Memoize columns so they don’t get recreated each render
  const columns = useMemo<TableColumn[]>(
    () => [
      {
        Header: 'Player',
        accessor: row => row.player.name,
      },
      {
        Header: 'BA',
        accessor: row => row.stats[row.stats.length - 1].ba,
      },
      {
        id: 'baTrend',
        Header: 'BA Trend',
        accessor: 'stats',
        Cell: ({ value }) => <Sparkline data={value} dataKey="ba" />,
        disableSortBy: true,
      },
      {
        Header: 'OBP',
        accessor: row => row.stats[row.stats.length - 1].obp,
      },
      {
        id: 'obpTrend',
        Header: 'OBP Trend',
        accessor: 'stats',
        Cell: ({ value }) => <Sparkline data={value} dataKey="obp" />,
        disableSortBy: true,
      },
      {
        Header: 'SLG',
        accessor: row => row.stats[row.stats.length - 1].slg,
      },
      {
        id: 'slgTrend',
        Header: 'SLG Trend',
        accessor: 'stats',
        Cell: ({ value }) => <Sparkline data={value} dataKey="slg" />,
        disableSortBy: true,
      },
      {
        Header: 'OPS',
        accessor: row => row.stats[row.stats.length - 1].ops,
      },
      {
        id: 'opsTrend',
        Header: 'OPS Trend',
        accessor: 'stats',
        Cell: ({ value }) => <Sparkline data={value} dataKey="ops" />,
        disableSortBy: true,
      },
    ],
    [] // no deps: columns never change
  )

  // 2) Memoize data so table sees it as stable unless `data` really changes
  const memoData = useMemo(() => data, [data])

  // 3) Build table with the sort plugin
  const table = useTable<PlayerData>(
    { columns, data: memoData },
    useSortBy
  ) as unknown as TableInstance<PlayerData> & UseSortByInstanceProps<PlayerData>

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = table

  return (
    <table {...getTableProps()} className="min-w-full mb-6 border">
      <thead>
        {headerGroups.map((headerGroup: HeaderGroup<PlayerData>) => {
          const { key: hgKey, ...hgProps } = headerGroup.getHeaderGroupProps()
          return (
            <tr key={hgKey} {...hgProps}>
              {headerGroup.headers.map(columnDef => {
                // cast so TS knows about sort-by props
                const column = (columnDef as unknown) as ColumnInstance<PlayerData> &
                  UseSortByColumnProps<PlayerData>
                const { key: thKey, ...thProps } = column.getHeaderProps(
                  column.getSortByToggleProps()
                )
                return (
                  <th
                    key={thKey}
                    {...thProps}
                    className="px-4 py-2 text-left bg-gray-100"
                  >
                    {column.render('Header')}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </th>
                )
              })}
            </tr>
          )
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          const { key: rowKey, ...rowProps } = row.getRowProps()
          return (
            <tr
              key={rowKey}
              {...rowProps}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onSelectPlayer(row.original.player.id)}
            >
              {row.cells.map(cell => {
                const { key: tdKey, ...tdProps } = cell.getCellProps()
                return (
                  <td key={tdKey} {...tdProps} className="px-4 py-2">
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
