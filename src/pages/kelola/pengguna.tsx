import React, { ReactElement } from "react";
import BreadcrumbItem from "@common/BreadcrumbItem";
import Layout from "@layout/index";
import { Card, Col, Row } from "react-bootstrap";

const Pengguna = () => {
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