import React from 'react';

import { Container, Row, Col } from "react-bootstrap";

const NotFound = () => {
    return (
        <Container style={{ margin: '20vh' }}>

            <Row className="align-items-center">

                <Col size={12} sm={6}>
                    <h1>Sayfa Bulunamadı</h1>
                    <p>Üzgünüz, aradığınız sayfa bulunamadı.</p>
                    <p>Yetkili ile iletişime geçin.</p>
                </Col>
                <Col size={12} sm={6} className="text-center text-sm-end">
                    <img className="d-flex justify-content-center" src="../src/assets/dsi_logo.webp" width="400px" />
                </Col>


            </Row>
        </Container>
    );
}

export default NotFound;
