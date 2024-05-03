import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

const localSystemTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000`;

console.log(localSystemTime);
export default function SendAmountForm() {
    const navigate = useNavigate();
    const sender = JSON.parse(sessionStorage.getItem("account")).accountNumber;

    const [Transaction, setTransaction] = useState({
        id: "",
        senderAccountNumber: sender,
        receiverAccountNumber: "",
        transactionType: "",
        amount: "",
        localDateTime: localSystemTime,
    });

    const onChangereceiverAccountNumber = (event) => {
        setTransaction({
            ...Transaction,
            receiverAccountNumber: event.target.value,
        });
    };


    const onChangeAmount = (event) => {
        setTransaction({ ...Transaction, amount: event.target.value });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // Make the API call to your backend here
        fetch("http://localhost:8080/transaction/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Transaction),
        })
            .then((response) => {
                if (!response.ok) {
                    toast.error("Account not exist")
                    throw new Error("Account not exist")
                }
            })
            .then((data) => {

                toast.success("Trsansaction Successfully", {
                    onClose: () => {
                        navigate("/home");
                    },
                });

            })
            .catch((error) => {
                // Handle errors, if any
                console.error("Error:", error);
            }).catch((err) => {
                toast.error("account not exist")
            });
    };

    return (
        <div className="container my-5">
            <ToastContainer></ToastContainer>
            <div className="text-center">
                <h1 className="h2">Make secure Payment</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="AcNumber">Account Number</label>
                    <input
                        type="email"
                        class="form-control"
                        id="AcNumber"
                        aria-describedby="emailHelp"
                        placeholder="Enter Account Number"
                        value={Transaction.receiverAccountNumber}
                        onChange={onChangereceiverAccountNumber}
                    />
                </div>

                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input
                        type="text"
                        class="form-control"
                        id="amount"
                        placeholder="Enter Amount"
                        value={Transaction.amount}
                        onChange={onChangeAmount}

                    />
                </div>


                <Button variant="contained" color="success" className="mr-5" onClick={handleSubmit}>
                    Send Amount
                </Button>
                <Button variant="contained" color="error">
                    <Link to="/" className="text-decoration-none text-black">
                        Cancel
                    </Link>
                </Button>
            </form>
        </div>
    );
}
