import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import BreadcrumbItem from "@common/BreadcrumbItem";
import Layout from "@layout/index";
import { Card, Col, Row } from "react-bootstrap";
import FixedHeader from "@views/Table/DataTable/FixHeader";

interface User {
    id: number;
    name: string;
    email: string;
    role: {
        nama:string;
    }
}

const Pengguna = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);  // State untuk menyimpan data pengguna
    const [loading, setLoading] = useState<boolean>(true); // State untuk loading
    const [error, setError] = useState<string | null>(null); // State untuk menangani error

    useEffect(() => {
        const isAuthenticated = document.cookie.includes('token'); // Cek token di cookie
        console.log("cookies:", isAuthenticated);
  
        if (!isAuthenticated) {
            // Jika tidak ada token, redirect ke halaman login
            router.push('/auth/login');
        } else {
            // Ambil data pengguna
            fetchUsers();
        }
    }, [router]);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users", {
                method: "GET",
                credentials: "include", // Sertakan cookie untuk autentikasi
            });

            if (!response.ok) {
                throw new Error("Anda tidak memiliki akses");
            }

            const data = await response.json();
            setUsers(data);  // Set data pengguna ke dalam state
            setLoading(false);  // Hentikan loading
        } catch (err) {
            setError((err as Error).message);  // Tampilkan error
            setLoading(false);  // Hentikan loading
        }
    };

    return (
        <>
            <BreadcrumbItem mainTitle="Kelola" subTitle="Pengguna" />
            <Row>
                <Col sm={12}>
                    <Card>
                        <div className="card-header">
                        <h5>Kelola Pengguna</h5>
                        </div>
                        <Card.Body>
                        <div className="dt-responsive">
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p style={{ color: 'red' }}>Error: {error}</p>
                            ) : (
                                <FixedHeader data={users} />
                            )}
                        </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

Pengguna.getLayout = (page: ReactElement) => {
    return (
        <Layout>
            {page}
        </Layout>
    )
};

export default Pengguna;
