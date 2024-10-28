import NonLayout from "@layout/NonLayout";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter from next/router

// img
import authregister from "@assets/images/authentication/img-auth-register.png";
import logodark from "@assets/images/logo-dark.svg";
import { Card, Row, Col, Form } from "react-bootstrap";

const Register = () => {
    // State variables for form inputs
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>(''); // Explicitly typing error state
    const [successMessage, setSuccessMessage] = useState<string>(''); // Explicitly typing success message state

    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission

        // Prepare the data to be sent to the backend
        const userData = {
            nama,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const data = await response.json();

            // Handle success
            setSuccessMessage('Registration successful!');
            console.log(data); // You can handle the response data as needed

            // Redirect to the dashboard
            router.push('/dashboard'); // Redirect to the dashboard
        } catch (err) {
            // Handle error, asserting the type to get the message
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
            setError(errorMessage);
            console.error(err);
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
                                    <Image src={authregister} alt="images" className="img-fluid mb-3" />
                                    <h4 className="f-w-500 mb-1">Register with your email</h4>
                                    <p className="mb-3">Already have an Account?
                                        <Link href="../auth/login" className="link-primary">Log in</Link>
                                    </p>
                                </div>
                                <Form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Nama" 
                                            value={nama} 
                                            onChange={(e) => setNama(e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <Form.Control 
                                            type="email" 
                                            placeholder="Email Address" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Password" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>
                                    {error && <p className="text-danger">{error}</p>}
                                    {successMessage && <p className="text-success">{successMessage}</p>}
                                    <div className="d-grid mt-4">
                                        <button type="submit" className="btn btn-primary">Create Account</button>
                                    </div>
                                </Form>
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
                                    <li className="list-inline-item"><Link href="../index">Home</Link></li>
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
}

Register.getLayout = (page: ReactElement) => {
    return (
        <NonLayout>
            {page}
        </NonLayout>
    );
};

export default Register;
