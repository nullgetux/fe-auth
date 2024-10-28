import React, { ReactElement } from "react";
import BreadcrumbItem from "@common/BreadcrumbItem";
import Layout from "@layout/index";
import { Card, Col, Row } from "react-bootstrap";

const editPengguna = () => {
    return (
        <>
            <BreadcrumbItem mainTitle="Kelola" subTitle="Pengguna" />
            <Row>
                <Col sm={12}>
                    <Card>
                        <div className="card-header">
                        <h5>Edit Pengguna</h5>
                        </div>
                        <Card.Body>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

editPengguna.getLayout = (page: ReactElement) => {
    return (
        <Layout>
            {page}
        </Layout>
    )
};

export default editPengguna;