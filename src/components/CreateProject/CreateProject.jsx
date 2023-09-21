import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

function CreateProject({ showModal, handleCloseModal, handleSaveProject }) {
    const [projectName, setProjectName] = useState('');
    const [projectCode, setProjectCode] = useState('');
    const [projectType, setProjectType] = useState('');
    const [applicationType, setApplicationType] = useState('');
    const [stageType, setStageType] = useState('');

    const handleSaveProject = () => {
        if (!stageType) {
            alert('Lütfen bir aşama seçin.');
            return;
        }

        const newProject = {
            projectName: projectName,
            projectCode: projectCode,
            typeOfProjectEnum: projectType,
            typeOfApplicationEnum: applicationType,
            typeOfStageEnum: stageType,
        };

        axios.post('http://localhost:8080/projects', newProject, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                console.log('Yeni proje başarıyla kaydedildi:', response.data);
                // Burada gerekli state veya işlemleri yapabilirsiniz
            })
            .catch(error => {
                console.error('Hata:', error);
            });

        setSavedProject(newProject);
        setProjectList([...projectList, newProject]); // Diziye yeni projeyi eklemek için bu şekilde kullanın
        console.log(projectList);

        if (stageType === 'PLANLAMA') {
            setShowPlanlamaCard(true);
        } else if (stageType === 'ETÜT_PROJE') {
            setShowEtudeCart(true);
        }

        setShowModal(false);
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Proje Bilgilerini Gir</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="projectName">
                        <Form.Label>Proje Adı</Form.Label>
                        <Form.Control type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="projectCode">
                        <Form.Label>Proje Kodu</Form.Label>
                        <Form.Control type="text" value={projectCode} onChange={(e) => setProjectCode(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="projectType">
                        <Form.Label>Proje Tipi</Form.Label>
                        <Form.Control as="select" value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                            <option>Seçiniz</option>
                            <option value="AT">AT</option>
                            <option value="TIGH">TİGH</option>
                            <option value="AT_VE_TIGH">AT ve TİGH</option>
                            <option value="DRENAJ">Drenaj</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="applicationType">
                        <Form.Label>Uygulama Şekli</Form.Label>
                        <Form.Control as="select" value={applicationType} onChange={(e) => setApplicationType(e.target.value)}>
                            <option>Seçiniz</option>
                            <option value="BAGIMSIZ">Bağımsız</option>
                            <option value="TAMAMLAMA">Tamamlama</option>
                            <option value="SULAMA">Sulama</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="stageType">
                        <Form.Label>Aşama</Form.Label>
                        <Form.Control as="select" value={stageType} onChange={(e) => setStageType(e.target.value)}>
                            <option>Seçiniz</option>
                            <option value="PLANLAMA">Planlama</option>
                            <option value="ETUT_PROJE">Etüt Proje</option>
                            <option value="UYGULAMA_INSAAT">Uygulama (İnşaat)</option>
                            <option value="TESCIL_ISLETME">Tescil(İşletme)</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Kapat
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

CreateProject.propTypes = {
    showModal: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleSaveProject: PropTypes.func.isRequired,
};

export default CreateProject;
