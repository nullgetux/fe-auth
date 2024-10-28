import NonLayout from "@layout/NonLayout";
import Image from "next/image";
import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";

// img
import authlogin from "@assets/images/authentication/img-auth-login.png";
import logodark from "@assets/images/logo-dark.svg";
import Link from "next/link";
import { Card, Row } from "react-bootstrap";

const Login = () => {
    // State for email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages
    const router = useRouter();

    // Handle form submission
    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set the content type
                },
                body: JSON.stringify({ email, password }),
                credentials: "include", // Send cookies with the request
            });
    
            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                throw new Error(errorData.error || "Login failed");
            }
    
            const data = await response.json(); // Parse the success response
            console.log("Login successful", data);
            // Redirect user or do something on successful login
            router.push('/dashboard'); // Redirect to the dashboard
        } catch (err) {
            console.error("Login error:", err);
        }
    };
    

    return (
        <React.Fragment>
            <div className="auth-main v1">
                <div className="auth-wrapper">
                    <div className="auth-form">
                        <Card className="my-5">
                            <Card.Body>
                                <div className="text-center">
                                    <Image src={authlogin} alt="images" className="img-fluid mb-3" />
                                    <h4 className="f-w-500 mb-1">Login with your email</h4>
                                    <p className="mb-3">Don&apos;t have an Account? <a href="/pages/register-v1" className="link-primary ms-1">Create Account</a></p>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                                <div className="form-group mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} // Update email state
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingInput1"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} // Update password state
                                    />
                                </div>
                                <div className="d-grid mt-4">
                                    <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="auth-sidefooter">
                        <Image src={logodark} className="img-brand img-fluid" alt="images" />
                        <hr className="mb-3 mt-4" />
                        <Row>
                            <div className="col my-1">
                                <p className="m-0">Light Able ♥ crafted by Team <a href="https://themeforest.net/user/phoenixcoded" target="_blank"> Phoenixcoded</a></p>
                            </div>
                            <div className="col-auto my-1">
                                <ul className="list-inline footer-link mb-0">
                                    <li className="list-inline-item"><Link href="/">Home</Link></li>
                                    <li className="list-inline-item"><Link href="https://pcoded.gitbook.io/light-able/" target="_blank">Documentation</Link></li>
                                    <li className="list-inline-item"><Link href="https://phoenixcoded.support-hub.io/" target="_blank">Support</Link></li>
                                </ul>
                            </div>
                        </Row>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

Login.getLayout = (page: ReactElement) => {
    return (
        <NonLayout>
            {page}
        </NonLayout>
    );
};

export default Login;
