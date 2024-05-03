import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {

    const Navigate = useNavigate();
    const LogOut = () => {
        sessionStorage.removeItem("isLoggedIn")
        sessionStorage.removeItem("account")
        Navigate("/");

    }
    return (
        <div className='sticky-top'>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
                <Link class="navbar-brand" to="home">WalletBankig</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        {
                            sessionStorage.getItem("isLoggedIn") ?
                                (<li class="nav-item active">
                                    <Link class="nav-link" to="home">DashBoard <span class="sr-only">(current)</span>  </Link>
                                </li>) : (<li class="nav-item active">
                                    <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span>  </Link>
                                </li>)
                        }

                        {sessionStorage.getItem("isLoggedIn") &&
                            <li class="nav-item">
                                <Link class="nav-link" to="transaction">Transactions  </Link>
                            </li>
                        }

                    </ul>
                    <span class="navbar-text text-white me-5">
                        {sessionStorage.getItem("isLoggedIn") &&
                            <ul class="navbar-nav mr-auto">
                                <li class="nav-item">
                                    <h4> Balance:{sessionStorage.getItem("amount")} </h4>
                                </li>
                                <li className='ml-5'>
                                    <Button variant="contained" color="error" onClick={LogOut}> LogOut</Button>
                                </li>
                            </ul>
                        }
                    </span>
                </div>
            </nav>
        </div>
    )
}
