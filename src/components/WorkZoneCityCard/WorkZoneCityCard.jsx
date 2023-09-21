import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import WorkZonesNeighborhoodCreate from '../WorkZonesNeighborhoodCreate/WorkZonesNeighborhoodCreate'; 

const WorkZoneCityCard = ({ city, onAddDistrictClick }) => {

    const [districts, setDistricts] = useState([]);

    const [selectedDistrict, setSelectedDistrict] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/district/city?cityId=${city.id}`)
            .then(response => {
                setDistricts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error(`Error fetching districts for city ${city.id}:`, error);
            });
    }, []); //buraya district verdiğim zaman sonsuza gidiyor backendde?

   

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <h3>{city.cityName}</h3>
            <button onClick={() => onAddDistrictClick(city.id)}>Yeni İlçe ekle</button>
            <div>
                <br />
                <h6>İlçeler:</h6>

                <ul>
                    {districts && districts.map((district, index) => (
                        <li key={district.id}>
                            {district.districtName}
                        </li>
                    ))}
                </ul>
            </div>

            
        </div>
    );
}

export default WorkZoneCityCard;
