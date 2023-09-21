import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const labelMappings = {
    tescilNo: 'Tescil No',
    yevmiyeNo: 'Yevmiye No',
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
    tescilTarihi: 'Tescil Tarihi',
    tapuMudurlugu: 'İlgili Tapu Müdürlüğü',
    yillikFiyatlariylaMaaliyet: 'Yıllık Fiyatlarıyla Maaliyet'
};

function CardOfRegistry({ show, handleClose, handleSave }) {
    const [selectedBirimIndex, setSelectedBirimIndex] = useState(null);
    const [birimler, setBirimler] = useState([]);
    const [birim, setBirim] = useState('');

    const [registryData, setRegistryData] = useState({
        tescilNo: '',
        yevmiyeNo: '',
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
        tescilTarihi: '',
        tapuMudurlugu: '',
        yillikFiyatlariylaMaaliyet: ''

    });

    const handleAddBirim = () => {
        if (birim.trim() !== '') {
            setBirimler([...birimler, { birimAdi: birim, registryData: { ...registryData } }]);
            setBirim('');
            setTechnicsData({

                tescilNo: '',
                yevmiyeNo: '',
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
                tescilTarihi: '',
                tapuMudurlugu: '',
                yillikFiyatlariylaMaaliyet: ''

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

    const handleRegistryDataChange = (index, field, value) => {
        const updatedBirimler = [...birimler];
        updatedBirimler[index].registryData[field] = value;
        setBirimler(updatedBirimler);
    };

    const handleSaveRegistryData = () => {
        const newRegistry = {
            birimler: birimler,
        };

        handleSave(newRegistry);
        handleClose();
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tescil (İşletme)</Modal.Title>
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

                    <div>
                        {birimler.map((birim,index) => (
                            <Card key={index} className={`birim-card ${selectedBirimIndex === index ? 'selected' : ''}`}>

                                <Card.Body>
                                    <Card.Title>{birim.birimAdi}</Card.Title>
                                    <Button onClick={() => handleSelectBirim(index)}>
                                        Detaylar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveBirim(index)}
                                    >
                                        Sil
                                    </Button>

                                    {selectedBirimIndex === index && (
                                        <> 
                                        {Object.entries(registryData).map(([field]) => (
                                            <Form.Group controlId={`${field}_${index}`} key={field}>
                                                <Form.Label>{labelMappings[field]}</Form.Label>
                                                {field === 'tescilTarihi' ? (
                                                    <Form.Control
                                                        type="date"
                                                        value={birim.registryData[field]}
                                                        onChange={(e) => handleRegistryDataChange(index, field, e.target.value)}
                                                    />
                                                ) : (
                                                    <Form.Control
                                                        type={field === 'tapuMudurlugu' ? 'text' : 'number'} // Yol alanı için text, diğerleri için number
                                                        value={birim.registryData[field]}
                                                        onChange={(e) => handleRegistryDataChange(index, field, e.target.value)}
                                                        step={field === 'tapuMudurlugu' ? 'any' : '0.01'} // Ondalıklı adım miktarı
                                                    />
                                                )}
                                            </Form.Group>
                                        ))}
                                        </>
                                    )}
                                    
                                </Card.Body>
                            </Card>
                        ))}

                    </div>
                    
                </Form.Group>
            </Modal.Body>
        </Modal>
    );
}

export default CardOfRegistry;
