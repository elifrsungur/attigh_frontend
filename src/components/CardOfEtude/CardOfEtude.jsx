import  { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardOfEtude({ show, handleClose, handleSave }) {
    const [birimler, setBirimler] = useState([]);
    const [birim, setBirim] = useState('');
    const [etudeData, setEtudeData] = useState({
        duzenlemeAlani: '',
        kadastroParselSayisi: '',
        isletmeSayisi: '',
        blokSayisi: '',
        yol: '',
    });

    const handleAddBirim = () => {
        if (birim.trim() !== '') {
            setBirimler([...birimler, { birimAdi: birim, etudeData: { ...etudeData } }]);
            setBirim('');
            setEtudeData({
                duzenlemeAlani: '',
                kadastroParselSayisi: '',
                isletmeSayisi: '',
                blokSayisi: '',
                yol: '',
            });
        }
    };

    const handleRemoveBirim = (index) => {
        const updatedBirimler = birimler.filter((_, i) => i !== index);
        setBirimler(updatedBirimler);
        if (selectedBirimIndex === index) {
            setSelectedBirimIndex(null);
        }
    };

    const handleSaveEtudeData = () => {
        const newEtude = {
            birimler: birimler,
        };

        handleSave(newEtude);
        handleClose();
    };


    const handleEtudeDataChange = (index, field, value) => {
        const updatedBirimler = [...birimler];
        updatedBirimler[index].etudeData[field] = value;
        setBirimler(updatedBirimler);
    };

    
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Etüt/Proje</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="birimler">
                    <Form.Label>Birimler</Form.Label>
                    <div className="d-flex align-items-center">
                        <Form.Control
                            type="text"
                            value={birim}
                            onChange={(e) => setBirim(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleAddBirim}>
                            Ekle
                        </Button>
                    </div>

                    <div className="birimler-container">
                        {birimler.map((birim, index) => (
                            <Card key={index} className="birim-card">
                                <Card.Body>
                                    <Card.Title>{birim.birimAdi}</Card.Title>
                                    <Form.Group controlId={`duzenlemeAlani_${index}`}>
                                        <Form.Label> Düzenleme Alanı</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={birim.etudeData.alan}
                                            onChange={(e) => {
                                                const updatedBirimler = [...birimler];
                                                updatedBirimler[index].etudeData.alan = e.target.value;
                                                setBirimler(updatedBirimler);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId={`blokSayisi_${index}`}>
                                        <Form.Label>Blok Sayısı</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={birim.etudeData.blokSayisi}
                                            onChange={(e) => {
                                                const updatedBirimler = [...birimler];
                                                updatedBirimler[index].etudeData.blokSayisi = e.target.value;
                                                setBirimler(updatedBirimler);
                                            }}
                                        />
                                    </Form.Group>

                                     <Form.Group controlId={`isletmeSayisi_${index}`}>
                                        <Form.Label>İşletme Sayısı</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={birim.etudeData.isletmeSayisi}
                                            onChange={(e) => {
                                                const updatedBirimler = [...birimler];
                                                updatedBirimler[index].etudeData.isletmeSayisi = e.target.value;
                                                setBirimler(updatedBirimler);
                                            }}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId={`kadastroParsel_${index}`}>
                                        <Form.Label>Kadastro Parsel Sayısı</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={birim.etudeData.kadastroParselSayisi}
                                            onChange={(e) => {
                                                const updatedBirimler = [...birimler];
                                                updatedBirimler[index].etudeData.kadastroParselSayisi = e.target.value;
                                                setBirimler(updatedBirimler);
                                            }}
                                        />
                                    </Form.Group>
                                   
                                   
                                    <Form.Group controlId={`yol_${index}`}>
                                        <Form.Label>Yol</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={birim.etudeData.yol}
                                            onChange={(e) => {
                                                const updatedBirimler = [...birimler];
                                                updatedBirimler[index].etudeData.yol = e.target.value;
                                                setBirimler(updatedBirimler);
                                            }}
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveBirim(index)}
                                    >
                                        Sil
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Kapat
                </Button>
                <Button variant="primary" onClick={handleSaveEtudeData}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardOfEtude;
