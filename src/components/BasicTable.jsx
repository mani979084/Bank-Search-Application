import React, { Fragment, useEffect, useMemo } from 'react'
import { useTable, useSortBy, usePagination, useRowSelect, useGlobalFilter } from 'react-table'
import { Checkbox } from './Checkbox'
import { COLUMNS } from './columns'
import { Filter } from './Filter'

const BasicTable = ({ mock_data, getFav }) => {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => mock_data, [mock_data])

    const tableInstance = useTable({
        columns,
        data
    }, useGlobalFilter, useSortBy, usePagination, useRowSelect, (hooks) => {
        hooks.visibleColumns.push((columns) => {
            return [
                {
                    id: 'selection',
                    Header: 'Add Favourites',
                    Cell: ({ row }) => (
                        <Checkbox {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...columns
            ]
        })
    })

    const {
        getTableBodyProps,
        getTableProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        gotoPage,
        pageCount,
        selectedFlatRows,
        setGlobalFilter,
        prepareRow
    } = tableInstance

    useEffect(() => {
        const data = selectedFlatRows.map((row) => row.original);
        getFav(data)
    }, [selectedFlatRows, getFav])


    return (
        <Fragment>
            <Filter filter={globalFilter} setFilter={setGlobalFilter} />
            <table {...getTableProps()} className='table table-light table-bordered table-striped table-hover' >
                <thead className='table-primary'>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                    {column.render('Header')}
                                    <span> {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                                    </span>
                                </th>
                            ))}

                        </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps()} >
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} >
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} >
                                        {cell.render('Cell')}
                                    </td>
                                ))}

                            </tr>
                        )
                    })}

                </tbody>
            </table>

            <div className='mt-3 d-md-flex justify-content-center' >
                <div className='me-md-2 mb-3 mb-md-0'>
                    <span>
                        Page{' '}
                        <strong className='text-primary'>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input type="number" className='form-control d-inline text-primary' defaultValue={pageIndex + 1} onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} style={{ width: 'auto' }} min='1' max={pageOptions.length} />
                    </span>
                </div>

                <button className='btn btn-outline-secondary me-1' onClick={() => gotoPage(0)} disabled={!canPreviousPage} >{'<<'}</button>
                <button className='btn btn-outline-primary me-1' onClick={previousPage} disabled={!canPreviousPage} >Previous</button>
                <button className='btn btn-outline-primary me-1' onClick={nextPage} disabled={!canNextPage} >Next</button>
                <button className='btn btn-outline-secondary me-2' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} >{'>>'}</button>

                <select className='form-select me-2 w-auto float-start' id='select' value={pageSize} onChange={e => setPageSize(Number(e.target.value))} >
                    {
                        [10, 25, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>Show {pageSize}</option>
                        ))
                    }
                </select>
            </div>
        </Fragment>
    )
}

export default BasicTable
