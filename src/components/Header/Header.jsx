
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Monetary from '../Monetary/Monetary';
import Physical from '../Physical/Physical';
import ProjectForm from '../ProjectForm/ProjectForm';
import NotFound from '../NotFound/NotFound';
import MonetaryTransactions from '../MonetaryTransactions/MonetaryTransactions';
import WorkZones from '../WorkZones/WorkZones';

const Header = () => {
    return (
        <Router>
            <div>
                <Navbar className="custom-navbar" expand="sm">
                    <Container>
                        <Navbar.Brand as={Link} to="/home"> <img src="../src/assets/dsi_logo.webp" alt="" width="50px" /> </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/home">Anasayfa</Nav.Link>
                                <Nav.Link as={Link} to="/fizikiDurum">Fiziki Durum</Nav.Link>
                                <Nav.Link as={Link} to="/parasalIstatistik">Parasal İstatistik</Nav.Link>
                                <NavDropdown title="İşlemler" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/projeIslemleri">Proje İşlemleri</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/parasalIslemler">Parasal İşlemler</NavDropdown.Item>
                                    
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/calismaBolgeleri">Çalışma Bölgeleri</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/fizikiDurum" element={<Physical />} />
                    <Route path="/parasalIstatistik" element={<Monetary />} />
                    <Route path="/projeIslemleri" element={<ProjectForm />} />
                    <Route path="/parasalIslemler" element={<MonetaryTransactions />} />
                    <Route path="/calismaBolgeleri" element={<WorkZones />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Header;
