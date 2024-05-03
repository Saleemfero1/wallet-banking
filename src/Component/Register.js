import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./style.css"

export default function Register() {
    const navigate = useNavigate();
    const [account, setAccount] = useState({
        accountNumber: "",
        accountHolderName: "",
        email: "",
        balance: 0,
        mobileNumber: "",
        address: "",
        password: "",
        transactionList: [],
    });

    //OnChnage Handlers
    const onChangeAccountNumber = (event) => {
        setAccount({ ...account, accountNumber: event.target.value });
    };
    const onChangeAccountHolderName = (event) => {
        setAccount({ ...account, accountHolderName: event.target.value });
    };
    const onChangeEmail = (event) => {
        setAccount({ ...account, email: event.target.value });
    };
    const onChangeMobileNumber = (event) => {
        setAccount({ ...account, mobileNumber: event.target.value });
    };
    const onChangeAddress = (event) => {
        setAccount({ ...account, address: event.target.value });
    };
    const onChangePassword = (event) => {
        setAccount({ ...account, password: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Make the API call to your backend here
        fetch('http://localhost:8080/account/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success("Registered Successfully", {
                    onClose: () => {
                        navigate("/login")
                    }
                })
                // Handle the response data, if needed
                console.log('Response from server:', data);
            })
            .catch((error) => {
                // Handle errors, if any
                console.error('Error:', error);
            });
    };

    return (
        <div className="container">
            <div className="row">

                <div className="col my-5">
                    {/* <!-- Pills navs --> */}
                    <ToastContainer position="bottom-left" />
                    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a
                                class="nav-link active"
                                id="tab-login"
                                data-mdb-toggle="pill"
                                href="login"
                                role="tab"
                                aria-controls="pills-login"
                                aria-selected="true"
                            >
                                Login
                            </a>
                        </li>
                        <li class="nav-item" role="presentation">
                            <a
                                class="nav-link"
                                id="tab-register"
                                data-mdb-toggle="pill"
                                href="register"
                                role="tab"
                                aria-controls="pills-register"
                                aria-selected="false"
                            >
                                Register
                            </a>
                        </li>
                    </ul>
                    {/* <!-- Pills navs --> */}

                    {/* <!-- Pills content --> */}
                    <div class="tab-content">
                        <div
                            class="tab-pane fade show active"
                            id="pills-login"
                            role="tabpanel"
                            aria-labelledby="tab-login"
                        >
                            <form onSubmit={handleSubmit} className="my-5">
                                {/* <!-- Name input --> */}
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="accountNumber">
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        id="accountNumber"
                                        class="form-control"
                                        placeholder="Enter Account Number"
                                        value={account.accountNumber}
                                        onChange={onChangeAccountNumber}
                                    />
                                </div>

                                <div class="form-outline mb-4">
                                    <label class="form-label" for="AccountHolderName">
                                        Account Holder Name
                                    </label>
                                    <input
                                        type="text"
                                        id="AccountHolderName"
                                        class="form-control"
                                        placeholder="Enter Account Holder Name"
                                        value={account.accountHolderName}
                                        onChange={onChangeAccountHolderName}
                                    />
                                </div>

                                {/* <!-- Username input --> */}
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="mobileNumber">
                                        Mobile Number
                                    </label>
                                    <input
                                        type="text"
                                        id="mobileNumber"
                                        class="form-control"
                                        placeholder="Enter Mobile Number"
                                        value={account.mobileNumber}
                                        onChange={onChangeMobileNumber}
                                    />
                                </div>

                                {/* <!-- Email input --> */}
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="registerEmail">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="registerEmail"
                                        class="form-control"
                                        placeholder="Enter Email"
                                        value={account.email}
                                        onChange={onChangeEmail}
                                    />
                                </div>

                                {/* <!-- Address input --> */}
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="address">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        class="form-control"
                                        placeholder="Enter Address"
                                        value={account.address}
                                        onChange={onChangeAddress}
                                    />
                                </div>

                                {/* <!-- Password input --> */}
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="registerPassword">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="registerPassword"
                                        class="form-control"
                                        value={account.password}
                                        onChange={onChangePassword}
                                    />
                                </div>

                                {/* <!-- Repeat Password input --> */}
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="registerRepeatPassword">
                                        Repeat password
                                    </label>
                                    <input
                                        type="password"
                                        id="registerRepeatPassword"
                                        class="form-control"
                                    />
                                </div>

                                {/* <!-- Submit button --> */}
                                <button type="submit" class="btn btn-primary btn-block mb-3">
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* <!-- Pills content --> */}
                </div>
                <div className="col pic-Col-6"></div>

            </div>
        </div>
    );
}
