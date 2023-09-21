import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import './MonetaryTransactions.css';

import data from '../../data/Projects.json';

const labelMappings = {
    aGrubuFiyat: ' A Grubu',
    bGrubuFiyat: 'B Grubu',
    tarih: 'Tarih',
    sfYapilanHarcama: 'SF Yapılan Harcama',
    ff: 'FF',
    kdv: 'KDV',
    toplamOdeme: 'Toplam Ödeme',
    sfKalan: 'Sözleşme Fiyatlarıyla Kalan ',
    nakdiGerceklesme: 'Nakdi Gerçekleşme',
    sozlesme: 'Sözleşme'
};

const MonetaryTransactions = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const [projects, setProjects] = useState([]);

    const [keşifModalVisible, setKeşifModalVisible] = useState(false);
    const [hakedişModalVisible, setHakedişModalVisible] = useState(false);

    const [hakedis, setHakedis] = useState('');
    const [hakedisler, setHakedisler] = useState([]);
    const [selectedHakedisIndex, setSelectedHakedisIndex] = useState(null);

    const [hakedisData, setHakedisData] = useState({

        tarih: '',
        sfYapilanHarcama: '',
        ff: '',
        kdv: '',
        toplamOdeme: '',
        sfKalan: '',
        nakdiGerceklesme: '',
        sozlesme: ''

    });

    const [kesifData, setKesifData] = useState({
        aGrubuFiyat: '',
        bGrubuFiyat: ''

    });

    useEffect(() => {
        axios.get('http://localhost:8080/projects')
            .then(function (response) {
                console.log(response.data);
                setProjects(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);


   

    const setAGrubuFiyat = (value) => {
        setKesifData({ ...kesifData, aGrubuFiyat: value });
    };


    const setBGrubuFiyat = (value) => {
        setKesifData({ ...kesifData, bGrubuFiyat: value });
    };

    const handleAddHakedis = () => {
        if (hakedis.trim() !== '') {
            setHakedisler([...hakedisler, { hakedisNo: hakedis, hakedisData: { ...hakedisData } }]);
            setHakedis('');
            setHakedisData({
                tarih: '',
                sfYapilanHarcama: '',
                ff: '',
                kdv: '',
                toplamOdeme: '',
                sfKalan: '',
                nakdiGerceklesme: '',
                sozlesme: ''
            });
        }
    };


    const handleProjectSelect = (project) => {
        setSelectedProject(project);
    };

    const handleOpenKeşifModal = () => {
        setKeşifModalVisible(true);
    };

    const handleCloseKesifModal = () => {
        setKeşifModalVisible(false);
    };

    const handleOpenHakedişModal = () => {
        setHakedisData({
            ...hakedisData,
            sozlesme: kesifData.sozlesme 
        });
        setHakedişModalVisible(true);
    };


    const handleCloseHakedisModal = () => {
        setHakedişModalVisible(false);
    };


    const handleSaveHakedis = () => {
        handleCloseHakedisModal();
    };

    const handleSaveKesifData = () => {
        const aGrubu = parseFloat(kesifData.aGrubuFiyat) || 0;
        const bGrubu = parseFloat(kesifData.bGrubuFiyat) || 0;

        
        const sozlesmeBedeli = (aGrubu + bGrubu).toFixed(2);
        setKesifData({ ...kesifData, sozlesme: sozlesmeBedeli });

        
        setHakedisData({ ...hakedisData, sozlesme: sozlesmeBedeli });

        handleCloseKesifModal();
    };


    const handleSelectHakedis = (index) => {
        setSelectedHakedisIndex(index);
    }

    const handlehakedisDataChange = (index, field, value) => {
        const updatedHakedisData = { ...hakedisData };

        updatedHakedisData[field] = value;

        if (field === 'sfYapilanHarcama' || field === 'ff' || field === 'kdv') {
            const sfYapilanHarcama = parseFloat(updatedHakedisData.sfYapilanHarcama) || 0;
            const ff = parseFloat(updatedHakedisData.ff) || 0;
            const kdv = parseFloat(updatedHakedisData.kdv) || 0;

            updatedHakedisData.toplamOdeme = (sfYapilanHarcama + ff + kdv).toFixed(2);

            const sozlesmeBedeli = parseFloat(updatedHakedisData.sozlesme) || 0;
            if (sozlesmeBedeli > 0) {
                updatedHakedisData.nakdiGerceklesme = ((sfYapilanHarcama / sozlesmeBedeli) * 100).toFixed(2);
            } 
        }

        setHakedisData(updatedHakedisData);
    };


    const handleRemoveHakedis = (index) => {
        const updatedHakedisler = hakedisler.filter((_, i) => i !== index);
        setHakedisler(updatedHakedisler);
        if (selectedHakedisIndex === index) {
            setSelectedHakedisIndex(index);
        }


    };

    return (
        <div className="project-cards">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className={`project-card ${selectedProject === project ? 'selected' : ''}`}
                    onClick={() => handleProjectSelect(project)}
                >
                    <h3>{project.projectName}</h3>
                    <p>{project.description}</p>
                </div>
            ))}


            {selectedProject && (
                <div className="selected-project">
                    <h3>Seçilen Proje: {selectedProject.projectName}</h3>
                    <p>{selectedProject.description}</p>
                    <button className="entry-button" onClick={handleOpenKeşifModal}>
                        Keşif/Sözleşme Bilgileri
                    </button>
                    <button className="entry-button" onClick={handleOpenHakedişModal}>
                        Hakediş Bilgileri 
                    </button>
                </div>
            )}

            {/* Keşif Bilgileri Girişi Modal */}
            <Modal show={keşifModalVisible} onHide={handleCloseKesifModal}>
               
                <Modal.Header closeButton>
                    <Modal.Title>Keşif/Sözleşme Bilgileri</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="aGrubu">
                        <Form.Label>A Grubu</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={kesifData.aGrubuFiyat}
                            onChange={(e) => setAGrubuFiyat(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="bGrubu">
                        <Form.Label>B Grubu</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={kesifData.bGrubuFiyat}
                            onChange={(e) => setBGrubuFiyat(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="sozlesmeBedeli">
                        <Form.Label>Sözleşme Bedeli</Form.Label>
                        <Form.Control
                            type="number"
                            value={(parseFloat(kesifData.aGrubuFiyat) + parseFloat(kesifData.bGrubuFiyat)).toFixed(2)}
                            onChange={(e) => {
                                
                                setKesifData({
                                    ...kesifData,
                                    sozlesme: e.target.value 
                                });
                            }}
                            disabled
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn" variant="secondary" onClick={handleCloseKesifModal}>
                        Kapat
                     </Button>
                    <Button className="btn" variant="primary" onClick={handleSaveKesifData}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* Hakediş Bilgileri Girişi Modal */}
            <Modal show={hakedişModalVisible} onHide={handleCloseHakedisModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Hakediş Bilgileri Girişi</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="hakedisler">
                        <Form.Label>Hakediş No</Form.Label>
                        <div className="d-flex align-items-center">
                            <Form.Control
                                type="text"
                                value={hakedis}
                                onChange={(e) => setHakedis(e.target.value)}
                            />
                            <Button variant="primary" onClick={handleAddHakedis}>
                                Ekle
                        </Button>
                        </div>

                        <div>
                            {hakedisler.map((hakedis, index) => (
                                <Card key={index} className={`hakedis-card ${selectedHakedisIndex === index ? 'selected' : ''}`}>
                                    <Card.Body>
                                        <Card.Title>{hakedis.hakedisNo}</Card.Title>
                                        <Button onClick={() => handleSelectHakedis(index)}>
                                            Detaylar
                                        </Button>

                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemoveHakedis(index)}
                                        >
                                            Sil
                                        </Button>
                                        
                                        

                                        {Object.entries(hakedisData).map(([field]) => (
                                            <Form.Group controlId={`${field}_${index}`} key={field}>
                                                <Form.Label>{field === 'toplamOdeme' ? 'Toplam Ödeme' : labelMappings[field]}</Form.Label>
                                                {field === 'tarih' || field === 'sozlesme' ? (
                                                    <Form.Control
                                                        type={field === 'tarih' ? 'date' : 'number'}
                                                        value={hakedisData[field]}
                                                        onChange={(e) => handlehakedisDataChange(index, field, e.target.value)}
                                                        step={field === 'toplamOdeme' ? '0.01' : 'any'}
                                                        disabled={field === 'sozlesme'}
                                                    />
                                                    
                                                ) : (
                                                    <Form.Control
                                                        type="number"
                                                        value={field === 'toplamOdeme' ? parseFloat(hakedisData[field]).toFixed(2) : hakedisData[field]}
                                                        onChange={(e) => handlehakedisDataChange(index, field, e.target.value)}
                                                        step={field === 'toplamOdeme' ? '0.01' : 'any'}
                                                        disabled={field === 'toplamOdeme'}
                                                    />
                                                )}
                                                
                                            </Form.Group>
                                            
                                        ))}
                                        


                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="btn" variant="secondary" onClick={handleCloseHakedisModal}>
                        Kapat
                     </Button>
                    <Button className="btn" variant="primary" onClick={handleSaveHakedis}>
                        Kaydet
                     </Button>
                </Modal.Footer>

            </Modal>
        </div>
    );
}

export default MonetaryTransactions;
