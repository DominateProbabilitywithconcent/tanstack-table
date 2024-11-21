import {useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, SortingState, getSortedRowModel, getFilteredRowModel} from '@tanstack/react-table'
import mData from '../MOCK_DATA.json'
import { useMemo, useState } from 'react'
import {FaSort, FaSortDown, FaSortUp} from 'react-icons/fa'
import { FilterSidebar } from './FilterSideBar'

export default function BasicTable(){
    /**
     {
    "id": 1,
    "first_name": "Isador",
    "last_name": "Kruger",
    "email": "ikruger0@huffingtonpost.com",
    "gender": "Male",
    "dob": "2023-04-28T11:19:35Z"
    }
     */
    const data = useMemo(() => mData, [])
    /*@type import('@tanstack/react-table').ColumnDef<typeof mData[0]>[]*/
    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'ID',
        },
        {
            header: 'Name',
            columns: [
                {
                    header: 'First Name',
                    accessorKey: 'first_name',
                    footer: 'First Name',
                },
                {
                    header: 'Last Name',
                    accessorKey: 'last_name',
                    footer: 'Last Name',
               
                },
            ],
        },
        // {header: "Name",
        //  accessorFn: row => `${row.first_name} ${row.last_name}`
        // },
        // {
        //     header: 'First Name',
        //     accessorKey: 'first_name',
        //     footer: 'First Name',
        // },
        // {
        //     header: 'Last Name',
        //     accessorKey: 'last_name',
        //     footer: 'Last Name',
        // },
        {
            header: 'Email',
            accessorKey: 'email',
            footer: 'Email',
        },
        {
            header: 'Gender',
            accessorKey: 'gender',
            footer: 'Gender',
        },
        {
            header: 'Date of birth',
            accessorKey: 'dob',
            footer: 'Date of birth',
        }
    ]

    const [sorting, setSorting] = useState<SortingState>([])
    const [filtering, setFiltering] = useState("")
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 10})

    const table = useReactTable(
        {data,
         columns,
         getCoreRowModel: getCoreRowModel(),
         getPaginationRowModel: getPaginationRowModel(),
         getSortedRowModel: getSortedRowModel(),
         getFilteredRowModel: getFilteredRowModel(),
         state: {
            pagination: pagination,
            sorting: sorting,
            globalFilter: filtering
         },
         onPaginationChange: setPagination,
         onSortingChange: setSorting,
         onGlobalFilterChange: setFiltering,
        })

    return (
    <div className="relative">
    <FilterSidebar table={table} />
    <div className='w3-container'>
        <input type="text" value={filtering} onChange={e => setFiltering(e.target.value)} placeholder="Search all columns..." className='w3-input w3-border' />        <table className = 'w3-table-all'>
            <thead>
            {table.getHeaderGroups().map(headerGroup =>(
                <tr key = {headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key = {header.id} onClick ={header.column.getToggleSortingHandler()}>
                            {header.isPlaceholder ? null :(<div> {flexRender(header.column.columnDef.header, header.getContext())}
                            {
                        <span className="inline-block w-4">
                        {header.column.getCanSort() ? (
                          {
                            asc: <FaSortUp className="text-gray-700" />,
                            desc: <FaSortDown className="text-gray-700" />,
                            false: <FaSort className="text-gray-400" /> // Default state
                          }[header.column.getIsSorted() as string ?? 'false']
                        ) : null}
                      </span>
                        }
                        </div>)}
                        </th>
                    ))}


                </tr>
            ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())
                                }</td>
                        ))}

                    </tr>
                ))}
            </tbody>
            {/* <tfoot>
            {table.getFooterGroups().map(footerGroup =>(
                <tr key = {footerGroup.id}>
                    {footerGroup.headers.map(header => (
                        <th key = {header.id}>
                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}


                </tr>
            ))}
            </tfoot> */}
        </table>
        <div className="flex items-center gap-2 justify-center mt-4">
      <button
        className="border rounded p-1"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {'<<'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {'<'}
      </button>
      {Array.from({ length: table.getPageCount() }, (_, index) => (
        <button
          key={index}
          className={`border rounded p-1 ${
            index === table.getState().pagination.pageIndex
              ? 'bg-blue-500 text-white'
              : ''
          }`}
          onClick={() => table.setPageIndex(index)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="border rounded p-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
         {'>'}
      </button>
      <button
        className="border rounded p-1"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {'>>'}
      </button> 
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </strong>
      </span>
    </div>
    </div>
    </div>
    )}
