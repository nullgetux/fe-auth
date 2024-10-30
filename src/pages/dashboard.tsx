import React, { ReactElement, useEffect } from "react";
import { useRouter } from 'next/router';
import { Row } from "react-bootstrap";

//import Components
import Layout from "@layout/index";
import BreadcrumbItem from "@common/BreadcrumbItem";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {

    const isAuthenticated = document.cookie.includes('token'); // Sesuaikan dengan nama cookie JWT kamu
    console.log("cookies:", isAuthenticated)

    if (!isAuthenticated) {
        // Jika tidak ada token, redirect ke halaman login
        router.push('/auth/login');
    }
}, [router]);

    return (
        <>
        <BreadcrumbItem mainTitle="Dashboard" subTitle="Home"  />
          
        </>
    )
}

Dashboard.getLayout = (page: ReactElement) => {
    return (
      <Layout>
        {page}
      </Layout>
    )
};


export default Dashboard;