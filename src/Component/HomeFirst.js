import React from "react";
import "./style.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function HomeFirst() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <div className="content">
                        <span className="content-text">
                            Empower your finances with our innovative wallet banking app.
                            Discover a world of seamless transactions, swift payments, and
                            unparalleled convenience. Welcome to the future of banking, right
                            at your fingertips.
                        </span>
                    </div>
                    <div className="mt-5">
                        <Link to="/register">
                            <Button variant="contained">Start Here</Button>
                        </Link>
                    </div>
                </div>
                <div className="col-6 pic-Col-6"></div>
            </div>
        </div>
    );
}
