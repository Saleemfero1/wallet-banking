import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./style.css"

export default function LogIn() {
    const navigate = useNavigate();
    const [logInCreditionals, SetLogInCreditionals] = useState({
        accountNumber: "",
        password: "",
    });
    const [account, setAccount] = useState({});

    const onChangeAccountNumber = (event) => {
        SetLogInCreditionals({ ...logInCreditionals, accountNumber: event.target.value });
    };
    const onChangePassword = (event) => {
        SetLogInCreditionals({ ...logInCreditionals, password: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Make the API call to your backend here
        fetch('http://localhost:8080/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(logInCreditionals),
        })
            .then((response) => {
                if (!response.ok) {
                    toast.error("UnAuthorised User")
                    throw new Error("Unauthorised User")
                }
                return response.json()
            })
            .then((data) => {
                setAccount(data)
                console.log(data);
                sessionStorage.setItem("isLoggedIn", true)
                sessionStorage.setItem("account", JSON.stringify(data))
                toast.success("LoggedIn Successfully", {
                    onClose: () => {
                        navigate("/home")
                    }
                })
            })
            .catch((error) => {
                // Handle errors, if any
                console.error('Error:', error);
            }).catch((err) => {
                toast.error("unAuthorised")
            });
    };

    return (
        <div className="container">
            <div className="row  gx-5">
                <div className=" col my-5">
                    {/* <!-- Pills navs --> */}
                    <ToastContainer></ToastContainer>
                    <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li class="nav-item" role="presentation">
                            <a
                                class="nav-link active"
                                id="tab-login"
                                data-mdb-toggle="pill"
                                href="#pills-login"
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
                            <form onSubmit={handleSubmit}>
                                <div className="my-5"></div>
                                {/* <!-- Email input --> */}
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="accountNumber">
                                        Account Number
                                    </label>
                                    <input
                                        type="text"
                                        id="accountNumber"
                                        class="form-control"
                                        placeholder="Enter Account Number"
                                        value={logInCreditionals.accountNumber}
                                        onChange={onChangeAccountNumber}
                                    />
                                </div>

                                {/* <!-- Password input --> */}
                                <div class="form-outline mb-4">
                                    <label class="form-label" for="loginPassword">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="loginPassword"
                                        class="form-control"
                                        placeholder="Enter Account Number"
                                        value={logInCreditionals.password}
                                        onChange={onChangePassword}
                                    />
                                </div>



                                {/* <!-- Submit button --> */}
                                <button type="submit" class="btn btn-primary btn-block mb-4">
                                    Sign in
                                </button>

                                {/* <!-- Register buttons --> */}
                                <div class="text-center">
                                    <p>
                                        Not a member? <a href="#!">Register</a>
                                    </p>
                                </div>
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
