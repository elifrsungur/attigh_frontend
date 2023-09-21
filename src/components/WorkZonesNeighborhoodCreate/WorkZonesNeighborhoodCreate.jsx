// WorkZonesNeighborhoodCreate.jsx

import React, { useState } from 'react';
import axios from 'axios';

const WorkZonesNeighborhoodCreate = ({ districtId }) => {
    const [neighborhoodName, setNeighborhoodName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/neighbourhood`, {
            neighborhoodName: neighborhoodName,
            district: {
                id: districtId,
                districtName: null, // districtName'i buradan almaya gerek yok -null 
            }
        })
            .then(response => {
                console.log('Neighborhood added:', response.data);
                setNeighborhoodName('');
            })
            .catch(error => {
                console.error('Error adding neighborhood:', error);
            });
    };

    return (
        <div>
            <h2>Birimler Ekle (Köy/Mahalle)</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="neighborhoodName">Mahalle Adı:</label>
                    <input
                        type="text"
                        id="neighborhoodName"
                        name="neighborhoodName"
                        value={neighborhoodName}
                        onChange={(e) => setNeighborhoodName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Kaydet</button>
            </form>
        </div>
    );
}

export default WorkZonesNeighborhoodCreate;
