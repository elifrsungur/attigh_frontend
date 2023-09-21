import { useState, useEffect } from 'react';
import './ProjectForm.css';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import CardOfPlanning from '../CardOfPlanning/CardOfPlanning';
import CardOfEtude from '../CardOfEtude/CardOfEtude';
import CardOfTechnics from '../CardOfTechnics/CardOfTechnics';
import CardOfRegistry from '../CardOfRegistry/CardOfRegistry';

import SelectedProjectInfo from '../SelectedProjectInfo/SelectedProjectInfo';

import PropTypes from 'prop-types';


const baseUrl = "http://localhost:8080";



function ProjectForm() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    const [projects, setProjects] = useState([]);


    const [selectProjectMode, setSelectProjectMode] = useState(false); //Yeni proje mi varolan proje mi?

    const [selectedProject, setSelectedProject] = useState(); // Varolan projelerden seçildiğinde saklar


    const [projectList, setProjectList] = useState();
    const [showModal, setShowModal] = useState(false);

    const [projectName, setProjectName] = useState('');
    const [projectCode, setProjectCode] = useState('');
    const [projectType, setProjectType] = useState('');
    const [applicationType, setApplicationType] = useState('');
    const [stageType, setStageType] = useState('');
    const [savedProject, setSavedProject] = useState(null); //Sadece kaydedilen projeyi tutmak ve ekranda yazdırmak için kullanıldı

    const [savedPlan, setSavedPlan] = useState(null)
    const [showPlanlamaCard, setShowPlanlamaCard] = useState(false);

    const [savedEtude, setSavedEtude] = useState(null);
    const [showEtudeCart, setShowEtudeCart] = useState(false);

    const [savedTechnics, setSavedTechnics] = useState(null);
    const [showTechnicsCart, setShowTechnicsCart] = useState(false);

    const [savedRegistry, setSavedRegistry] = useState(null);
    const [showRegistryCart, setShowRegistryCart] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenPlanningCart = () => {
        setShowPlanlamaCard(true);
    };

    const handleClosePlanningCart = () => {
        setShowPlanlamaCard(false);
    };

    const handleOpenEtudeCart = () => {
        setShowEtudeCart(true);
    };

    const handleCloseEtudeCart = () => {
        setShowEtudeCart(false);
    };

    const handleOpenTechnicsCart = () => {
        setShowTechnicsCart(true);
    };

    const handleCloseTechnicsCart = () => {
        setShowTechnicsCart(false);
    };

    const handleOpenRegistryCart = () => {
        setShowRegistryCart(true);
    };

    const handleCloseRegistryCart = () => {
        setShowRegistryCart(false);
    };

    //Save project
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
            })
            .catch(error => {
                console.error('Proje kaydedilirken hata oluştu:', error);
            });

        setSavedProject(newProject); // Sadece kaydedilen proje
        setProjectList([...projectList, newProject]); // Diziye yeni projeyi eklemek için bu şekilde kullanın
        console.log(projectList);

        // Proje kaydedilir edilmez stageType' a göre açılması gereken cardlar
        if (stageType === 'PLANLAMA') {
            setShowPlanlamaCard(true);
        } else if (stageType === 'ETÜT_PROJE') {
            setShowEtudeCart(true);
        }

        setShowModal(false);
    };



    const handleSelectExistingProject = (project) => {
        setSelectedProject(project); // Seçilen projeyi sakla
        setSelectProjectMode(false); // Modal'ı kapat

    };

    const handleStageChange = (newStage) => {
        setSelectedProject(prevProject => ({
            ...prevProject,
            stagePlan: newStage
        }));
    };

    {/* Tüm projeleri getirir */ }
    useEffect(() => {
        axios.get(`${baseUrl}/project`)
        .then(res => {
            setProjects(res.data);
        })
        .catch(error => {
            console.log('Error! fetching projects:', error);
        })
        
    }, [])


    
    if (error) {
        return <div>
            HATA !
            {console.log(error)}
        </div>
  //  } else if (!isLoaded) {
  //      return <div>
   //         loading
    //    </div>
    } else {
        <li>
            {projects.projectName}
        </li>
    }

    return (
        <div className="project-page">
            <div className="transparent-overlay"></div>
            <h2>Proje İşlemleri </h2>

            {/* Yeni proje/varolan proje seçim card */}
            {!selectProjectMode &&  !selectedProject && ( 
                
                <div className="  d-flex justify-content-center" style={{ marginTop: '20vh' }}>
                    <Card className=" newCard w-80 m-20 p-5 ">
                        <Card.Body>
                           
                            <div className="d-flex justify-content-center">
                                <Button
                                    variant="primary"
                                    onClick={handleOpenModal}
                                    className="m-3"
                                >
                                    Yeni Proje Oluştur
                             </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => setSelectProjectMode(!selectProjectMode)}
                                    className="m-3"
                                >
                             
                                    Varolan Projelerden Seç
                            </Button>
                            </div>

                        </Card.Body>
                    </Card>
                </div>

            )}


            {/* Varolan projelerin card'ları */}
            {selectProjectMode && (
                <div className="project-list-container">

                    {projects.map((project) => (
                        <Card key={project.id} className="project-item-card">
                            <Card.Body>
                                <Card.Title>{project.projectName}</Card.Title>
                                <Card.Text>{project.stagePlan}</Card.Text>
                                <Button
                                    variant="secondary"
                                    onClick={() => handleSelectExistingProject(project)}
                                >
                                    Seç
                                     </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}


            {/* Seçilen proje bilgisini ekrana yazdır */}
            {selectedProject &&
                <SelectedProjectInfo
                    selectedProject={selectedProject}
                    onStageChange={handleStageChange}

                />
            }
            

            {/* Yeni proje giriş modalı */}
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
                                <option >Seçiniz</option>
                                <option value="AT">AT</option>
                                <option value="TIGH">TİGH</option>
                                <option value="AT_VE_TIGH">AT ve TİGH</option>
                                <option value="DRENAJ">Drenaj</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="applicationType">
                            <Form.Label>Uygulama Şekli</Form.Label>
                            <Form.Control as="select" value={applicationType} onChange={(e) => setApplicationType(e.target.value)}>
                                <option >Seçiniz</option>
                                <option value="BAGIMSIZ">Bağımsız</option>
                                <option value="TAMAMLAMA">Tamamlama</option>
                                <option value="SULAMA">Sulama</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="stageType">
                            <Form.Label>Aşama</Form.Label>
                            <Form.Control as="select" value={stageType} onChange={(e) => setStageType(e.target.value)}>
                                <option >Seçiniz</option>
                                <option value="PLANLAMA">Planlama</option>
                                <option value="ETUT_PROJE">Etüt Proje</option>
                                <option value=" UYGULAMA_INSAAT">Uygulama (İnşaat)</option>
                                <option value="TESCIL_ISLETME">Tescil(İşletme)</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={handleSaveProject}>
                        Kaydet
                    </Button>
                </Modal.Footer>

            </Modal>



            {/* Kaydedilen proje bilgilerini ekranda göster */}
            {savedProject && (
                <div>
                    <h6>Kaydedilen Yeni Proje:</h6>
                    <p>Proje Adı: {savedProject.projectName}</p>
                    <p>Proje Tipi: {savedProject.typeOfProjectEnum}</p>
                    <p>Uygulama Şekli: {savedProject.typeOfApplicationEnum}</p>
                    <p>Aşama: {savedProject.stagePlan}</p>
                </div>
            )}

            <br />

            {selectedProject && (

                <div className='card_container m-5'>


                    {(selectedProject.stagePlan === 'PLANLAMA' || selectedProject.stagePlan === 'ETUT_PROJE' || selectedProject.stagePlan === 'UYGULAMA_INSAAT' || selectedProject.stagePlan === 'TESCIL_ISLETME') && (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="primary" src="../src/assets/plan-card.png" />
                            <Card.Body>
                                <Card.Title>Ön Etüt-Planlama</Card.Title>
                                <Card.Text>
                                    İl, ilçe bilgileri giriş
                                </Card.Text>
                                <Button variant="primary" onClick={handleOpenPlanningCart}>Planlama </Button>

                            </Card.Body>
                        </Card>
                    )}

                    {(selectedProject.stagePlan === 'ETUT_PROJE' || selectedProject.stagePlan === 'UYGULAMA_INSAAT' || selectedProject.stagePlan === 'TESCIL_ISLETME') && (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="primary" src="../src/assets/etut-card.png" className="mt-4" />
                            <Card.Body>
                                <Card.Title>Etüt-Proje</Card.Title>
                                <Card.Text>
                                    Birim bilgileri giriş
                        </Card.Text>
                                <Button variant="primary" onClick={handleOpenEtudeCart}>Etüt/Proje</Button>

                            </Card.Body>
                        </Card>
                    )}

                    {(selectedProject.stagePlan === 'UYGULAMA_INSAAT' || selectedProject.stagePlan === 'TESCIL_ISLETME') && (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="primary" src="../src/assets/tescil-card.png" className="mt-5" />
                            <Card.Body>
                                <Card.Title className="mt-5">Uygulama (İnşaat)</Card.Title>
                                <Card.Text>
                                    Uygulama (İnşaat) bilgileri
                        </Card.Text>
                                <Button variant="primary" onClick={handleOpenTechnicsCart}>Uygulama (İnşaat)</Button>

                            </Card.Body>
                        </Card>
                    )}

                    {selectedProject.stagePlan === 'TESCIL_ISLETME' && (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="primary" src="../src/assets/uygulama-card.png" className="mt-5" />
                            <Card.Body>
                                <Card.Title className=" my-7">Tescil (İşletme)</Card.Title>
                                <Card.Text>
                                    Tescil (İşletme) bilgileri
                        </Card.Text>
                                <Button variant="primary" onClick={handleOpenRegistryCart}>Tescil (İşletme)</Button>

                            </Card.Body>
                        </Card>
                    )}

                </div>


            )}


            {selectedProject && (
                <CardOfPlanning

                    show={showPlanlamaCard}
                    handleClose={handleClosePlanningCart}
                    handleSave={setSavedPlan}
                    projectId={selectedProject.id}
                />
            )}

        
                   
            <CardOfEtude

                show={showEtudeCart}
                handleClose={handleCloseEtudeCart}
                handleSave={setSavedEtude}
            />

            {savedEtude && (
                <div>
                    <h6>Birimler</h6>
                    <p> Köy/Mahalle: {savedEtude.birim}</p>
                </div>
            )}

            <CardOfTechnics

                show={showTechnicsCart}
                handleClose={handleCloseTechnicsCart}
                handleSave={setSavedTechnics}
            />

            <CardOfRegistry

                show={showRegistryCart}
                handleClose={handleCloseRegistryCart}
                handleSave={setSavedRegistry}
            />
        </div>
    );
}

ProjectForm.propTypes = {
    selectedProject: PropTypes.object,
    onStageChange: PropTypes.func
};




export default ProjectForm;
