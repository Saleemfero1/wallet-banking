import React, { useState, useEffect } from 'react'
import Trasaction from './Transaction'
import { Button } from '@mui/material'
import SendAmountForm from './SendAmountForm'
import { Link, json } from 'react-router-dom'
import "./style.css"

export default function Home() {
    const [account, setAccount] = useState({ "accountHolderName": "avc" })

    useEffect(() => {
        const id = JSON.parse(sessionStorage.getItem("account"))["accountNumber"]

        fetch(`http://localhost:8080/account/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the API response data here
                console.log(data);
                setAccount(data)
                sessionStorage.setItem("amount", data.balance)

            })
            .catch(error => {
                // Handle errors here
                console.error('Error fetching data:', error);
            });
    }, [1]);
    return (
        <div className='container mt-5'>
            <div className="text-center h4">{account.accountHolderName} WelCome To Wallet Banking</div>
            <div className='my-4'>
                <span className="welcomeNote">Welcome to Wallet Banking App!
                    At Wallet Banking, we are committed to transforming the way you manage and control your finances.
                    Our mission is to empower individuals and businesses with a secure, convenient, and user-friendly platform that simplifies their banking experience.</span>
            </div>
            <div className='my-5'>
                <a href="addAmount">
                    <Button variant="contained" className='mr-5'>Send Amount</Button>
                </a>
                <a href="deposite">
                    <Button variant="contained"  >Deposite</Button>
                </a>
            </div>
        </div>
    )
}
