import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



const labelMappings = {
    tescilEdilenAlan: 'Tescil Edilen Alan',
    yol: 'Yol',
    stablize: 'Stablize',
    drenaj: 'Drenaj',
    tasNakli: 'Taş Nakli',
    tesviye: 'Tesviye',
    yeniParselSayisi: 'Yeni Parsel Sayısı',
    toplulastirmaOrani: 'Toplulaştırma Oranı',
    isletmeParselSayisiYeni: 'İşletme Parsel Sayısı Yeni',
    isletmeParselSayisiEski: 'İşletme Parsel Sayısı Eski',
    parselOrtalamaAlanEski: 'Parsel Ortalama Alan Eski',
    parselOrtalamaAlanYeni: 'Parsel Ortalama Alan Yeni',
    otkpOrani: 'OTKP Oranı',
    maaliyet: 'Maaliyet',
    tescilTarihi: 'Tescil Tarihi'
};


function CardOfTechnics({ show, handleClose, handleSave }) {
    const [selectedBirimIndex, setSelectedBirimIndex] = useState(null);
    const [birimler, setBirimler] = useState([]);
    const [birim, setBirim] = useState('');
    const [technicsData, setTechnicsData] = useState({

        tescilEdilenAlan: '',
        yol: '',
        stablize: '',
        drenaj: '',
        tasNakli: '',
        tesviye: '',
        yeniParselSayisi: '',
        toplulastirmaOrani: '',
        isletmeParselSayisiYeni: '',
        isletmeParselSayisiEski: '',
        parselOrtalamaAlanEski: '',
        parselOrtalamaAlanYeni: '',
        otkpOrani: '',
        maaliyet: '',
        tescilTarihi: ''

    });

    const handleAddBirim = () => {
        if (birim.trim() !== '') {
            setBirimler([...birimler, { birimAdi: birim, technicsData: { ...technicsData } }]);
            setBirim('');
            setTechnicsData({

                tescilEdilenAlan: '',
                yol: '',
                stablize: '',
                drenaj: '',
                tasNakli: '',
                tesviye: '',
                yeniParselSayisi: '',
                toplulastirmaOrani: '',
                isletmeParselSayisiYeni: '',
                isletmeParselSayisiEski: '',
                parselOrtalamaAlanEski: '',
                parselOrtalamaAlanYeni: '',
                otkpOrani: '',
                maaliyet: '',
                tescilTarihi: ''

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

    const handleSelectBirim = (index) => {
        setSelectedBirimIndex(index);
    };

    const handleTechnicsDataChange = (index, field, value) => {
        const updatedBirimler = [...birimler];
        updatedBirimler[index].technicsData[field] = value;
        setBirimler(updatedBirimler);
    };

    const handleSaveTechnicsData = () => {
        const newTechnics = {
            birimler: birimler,
        };

        handleSave(newTechnics);
        handleClose();
    };

    const handleToggleBirim = (index) => {
        if (selectedBirimIndex === index) {
            setSelectedBirimIndex(null);
        } else {
            setSelectedBirimIndex(index);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Uygulama (İnşaat)</Modal.Title>
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
                            <Card key={index} className={`birim-card ${selectedBirimIndex === index ? 'selected' : ''}`}>
                                <Card.Body>
                                    <Card.Title>{birim.birimAdi}</Card.Title>
                                    {selectedBirimIndex === index ? (
                                        <>
                                            <Button variant="info" onClick={() => handleToggleBirim(index)}>
                                                Kapat
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleRemoveBirim(index)}
                                            >
                                                Sil
                                            </Button>
                                            {Object.entries(technicsData).map(([field]) => (
                                                <Form.Group controlId={`${field}_${index}`} key={field}>
                                                    <Form.Label>{labelMappings[field]}</Form.Label>
                                                    {field === 'tescilTarihi' ? (
                                                        <Form.Control
                                                            type="date"
                                                            value={birim.technicsData[field]}
                                                            onChange={(e) => handleTechnicsDataChange(index, field, e.target.value)}
                                                        />
                                                    ) : (
                                                        <Form.Control
                                                            type={field === 'yol' ? 'text' : 'number'}
                                                            value={birim.technicsData[field]}
                                                            onChange={(e) => handleTechnicsDataChange(index, field, e.target.value)}
                                                            step={field === 'yol' ? 'any' : '0.01'}
                                                        />
                                                    )}
                                                </Form.Group>
                                            ))}
                                        </>
                                    ) : (
                                        <Button variant="info" onClick={() => handleToggleBirim(index)}>
                                            Detaylar
                                        </Button>
                                    )}
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
                <Button variant="primary" onClick={handleSaveTechnicsData}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardOfTechnics;
