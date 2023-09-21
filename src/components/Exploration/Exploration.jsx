import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const MonetaryTransactions = () => {
    const [keşifModalVisible, setKeşifModalVisible] = useState(false);
    const [aGrubuFiyat, setAGrubuFiyat] = useState('');
    const [bGrubuFiyat, setBGrubuFiyat] = useState('');
    const [sozlesmeBedeli, setsozlesmeBedeli] = useState('');

    const openKeşifModal = () => {
        setKeşifModalVisible(true);
    };

    const closeKeşifModal = () => {
        setKeşifModalVisible(false);
    };

    const handleAGrubuChange = (e) => {
        const value = e.target.value;
        setAGrubuFiyat(value);
        calculateToplam(value, bGrubuFiyat);
    };

    const handleBGrubuChange = (e) => {
        const value = e.target.value;
        setBGrubuFiyat(value);
        calculateToplam(aGrubuFiyat, value);
    };

    const calculateToplam = (aFiyat, bFiyat) => {
        const toplam = parseFloat(aFiyat || 0) + parseFloat(bFiyat || 0);
        setsozlesmeBedeli(toplam.toFixed(2));
    };

    return (
        <div>
            <Button variant="primary" onClick={openKeşifModal}>
                Keşif Gir
            </Button>

            <Modal show={keşifModalVisible} onHide={closeKeşifModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Keşif Bilgileri Girişi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="aGrubu">
                        <Form.Label>A Grubu Fiyatı</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={aGrubuFiyat}
                            onChange={handleAGrubuChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="bGrubu">
                        <Form.Label>B Grubu Fiyatı</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={bGrubuFiyat}
                            onChange={handleBGrubuChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="sozlesmeBedeli">
                        <Form.Label>Toplam Gruplar</Form.Label>
                        <Form.Control
                            type="number"
                            value={sozlesmeBedeli}
                            disabled
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeKeşifModal}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={closeKeşifModal}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MonetaryTransactions;
