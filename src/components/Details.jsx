import React from 'react';
import Navbar from './Navbar';
import { useTable } from 'react-table';

const Details = () => {
    const data = JSON.parse(localStorage.getItem('feedbackData')) || [];

    const columns = React.useMemo(
        () => [
            {
                Header: 'Customer Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                Header: 'Service Quality',
                accessor: 'service quality',
            },
            {
                Header: 'Beverage Quality',
                accessor: 'beverage quality',
            },
            {
                Header: 'Restaurant Cleanliness',
                accessor: 'restaurant cleanliness',
            },
            {
                Header: 'Overall Dining Experience',
                accessor: 'overall dining experience',
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '80px' }}>
                <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        style={{
                                            borderBottom: '1px solid black',
                                            background: "#87CEEB",
                                            color: 'white',
                                            fontWeight: 'bold',
                                            padding: '8px',
                                            textAlign: 'left',
                                        }}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                style={{
                                                    padding: '8px',
                                                    borderBottom: '1px solid black',
                                                }}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Details;
