import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("0001", 159, 610.0, "Debited", 4.0),
    createData("0002", 237, 900.0, "Credited", 4.3),
    createData("0003", 262, 1600.0, "Credited", 6.0),
    createData("0004", 305, 300.70, "Debited", 4.3),
    createData("0005", 356, 1699.0, "Debited", 3.9),
];

export default function Transaction() {
    const [transaction, setTransaction] = useState([]);
    const [account, setAccount] = useState(JSON.parse(sessionStorage.getItem("account")))

    useEffect(() => {

        // Make the API call to your backend here
        fetch('http://localhost:8080/transaction/' + account.accountNumber, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then((response) => response.json())
            .then((data) => {
                setTransaction(data)

            })
            .catch((error) => {
                // Handle errors, if any
                console.error('Error:', error);
            }).catch((err) => {
                toast.error("unAuthorised")
            });

    }, [])
    console.log(transaction[0]);
    return (
        <TableContainer component={Paper} className='container my-5'>
            <h2 className="h2">Transaction List</h2>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {/* <TableCell>Transaction Id</TableCell> */}
                        <TableCell align="right">Sender Account Number</TableCell>
                        <TableCell align="right">Receiver Account Number</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Transaction Type</TableCell>
                        <TableCell align="right">Date & Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transaction.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell> */}
                            <TableCell align="right">{row.senderAccountNumber}</TableCell>
                            <TableCell align="right">{row.receiverAccountNumber}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right">{row.transactionType}</TableCell>
                            <TableCell align="right">{row.date}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}