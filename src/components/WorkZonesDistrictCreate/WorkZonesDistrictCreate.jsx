import React, { useState } from 'react';
import axios from 'axios';

const WorkZonesDistrictCreate = ({ selectedCityId }) => {
    const [districtName, setDistrictName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/district`, {
            districtName: districtName,
            city: {
                id: selectedCityId,
                cityName: null, 
                cityCode: null
            }
        })
            .then(response => {
                console.log('District added:', response.data);
                setDistrictName(''); // Formu sıfırla
            })
            .catch(error => {
                console.error('Error adding district:', error);
            });
    };

    return (
        <div>
            <h2>İlçe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="districtName">İlçe Adı:</label>
                    <input
                        type="text"
                        id="districtName"
                        name="districtName"
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">İlçe Kaydet</button>
            </form>
        </div>
    );
}

export default WorkZonesDistrictCreate;
