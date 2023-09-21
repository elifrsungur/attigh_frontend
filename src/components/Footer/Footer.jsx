import { Container, Row, Col } from "react-bootstrap";

import './Footer.css';


export const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row className="align-items-center">
                    
                    <Col size={12} sm={6}>
                        <p>DSİ 19. Bölge Müdürlüğü</p>
                    </Col>
                    <Col size={12} sm={6} className="text-center text-sm-end">
                        <div className="social-icon">
                          
                        </div>
                        <p>Copyright 2023. All Rights Reserved</p>
                        
                    </Col>

                    
                </Row>
            </Container>
        </footer>
    )
}