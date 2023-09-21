import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';


const baseUrl = "http://localhost:8080";

function CardOfPlanning({ show, handleClose, handleSave, projectId }) {
    const [selectedProjectId, setSelectedProjectId] = useState(projectId);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [districtFields, setDistrictFields] = useState({});
    const [cities, setCities] = useState([]);
    const [isLoadingCities, setIsLoadingCities] = useState(true);
    const [editing, setEditing] = useState(false);

    const [districtAreaId, setDistrictAreaId] = useState(null); // Güncellenecek bölge alanı ID'si


    
    const fetchCities = async () => {
        try {
            const response = await axios.get(`${baseUrl}/city`);
            setCities(response.data);
            setIsLoadingCities(false);
        } catch (error) {
            console.error('Şehirler yüklenirken hata oluştu:', error);
        }
    };

    useEffect(() => {
        fetchCities();
    }, []);

    //Seçilen şehire göre ilçelere get
    const fetchDistricts = async (cityId) => {
        try {
            const response = await axios.get(`${baseUrl}/districts/${cityId}`);
            setFilteredDistricts(response.data);
        } catch (error) {
            console.error('İlçeler yüklenirken hata oluştu:', error);
        }
    };

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        if (selectedCity) {
            fetchDistricts(selectedCity);
        }
    };

    const handleSavePlanlamaData = () => {
        const newPlan = {
            projectId: selectedProjectId,
            cityId: selectedCity,
            districts: selectedDistricts.map(districtId => {
                const districtInfo = filteredDistricts.find(district => district.id === +districtId);
                const alan = districtFields[districtId] || '';
                return {
                    districtId: districtInfo.id,
                    area: alan,
                };
            }),
        };

        

        //update kısmı çalışmıyor, tekrar yeni kayıtlar ekliyor
        if (districtAreaId) {
            axios.put(`${baseUrl}/districtAreas/${districtAreaId}`, newPlan, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    console.log('Planlama bilgileri başarıyla güncellendi:', response.data);
                    handleClose();
                })
                .catch(error => {
                    console.error('Hata', error);
                });
        } else {
            axios.post(`${baseUrl}/districtAreas`, newPlan, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    console.log('Planlama bilgileri başarıyla kaydedildi:', response.data);
                    handleSave(newPlan);
                    handleClose();
                })
                .catch(error => {
                    console.error('Hata', error);
                });
        }
    };



    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value;
        console.log(event.target.value)
        if (selectedDistricts.includes(selectedDistrict)) {
            setSelectedDistricts(prevDistricts => prevDistricts.filter(district => district !== selectedDistrict));
        } else {
            setSelectedDistricts(prevDistricts => [...prevDistricts, selectedDistrict]);
        }
    };

    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setDistrictFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const boldStyle = {
        fontWeight: 'bold'
    };

    return (


        <>
            <Modal show={show} onHide={handleClose} size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>Planlama Verilerini Gir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="city">
                        <Form.Label>İl</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedCity}
                            onChange={handleCityChange}
                        >
                            <option value="">Seçiniz</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.cityName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {selectedCity && (
                        <div className="row">
                            <div className="col-12">
                                <Form.Group controlId="districts">
                                    <Form.Label>İlçeler</Form.Label>
                                    <div className="row">
                                        {filteredDistricts.map((district) => (
                                            <div key={district.id} className="col-2">
                                                <Form.Check
                                                    type="checkbox"
                                                    label={district.districtName}
                                                    value={district.id}
                                                    checked={selectedDistricts.includes(district.id.toString())}
                                                    onChange={handleDistrictChange}
                                                    required
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>

                                <Form.Group controlId="disabledDistricts">
                                    <Form.Label>Seçilen İlçe Sayısı</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={selectedDistricts.length}
                                        disabled
                                    />
                                </Form.Group>
                                <br />
                                <Form.Group controlId="fields">
                                    <Form.Label style={boldStyle}>ALAN BİLGİLERİ GİR</Form.Label>
                                    <div className="row">
                                        {selectedDistricts.map((districtId) => {
                                            const selectedDistrict = filteredDistricts.find(district => district.id === parseInt(districtId));
                                            return (
                                                <div key={districtId} className="col-2">
                                                    <Form.Group controlId={`field_${districtId}`}>
                                                        <Form.Label>{selectedDistrict ? selectedDistrict.districtName : ''}</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name={districtId}
                                                            value={districtFields[districtId] || ''}
                                                            onChange={handleFieldChange}
                                                        />
                                                    </Form.Group>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </Form.Group>
                            </div>
                        </div>
                    )}


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={handleSavePlanlamaData}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
  
  
  );
}

CardOfPlanning.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    projectId: PropTypes.number
};

export default CardOfPlanning;
