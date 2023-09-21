import React, { useState } from 'react';

function LocationSelector({ cities, districts, villages }) {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
    };

    const handleVillageChange = (e) => {
        setSelectedVillage(e.target.value);
    };

    return (
        <div>
            <h4>İl, İlçe ve Köy Seçimi</h4>
            <select value={selectedCity} onChange={handleCityChange}>
                <option value="">İl Seçiniz</option>
                {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                        {city.title}
                    </option>
                ))}
            </select>
            {selectedCity && (
                <select value={selectedDistrict} onChange={handleDistrictChange}>
                    <option value="">İlçe Seçiniz</option>
                    {districts
                        .filter((district) => district.il_id === selectedCity)
                        .map((district) => (
                            <option key={district.value} value={district.value}>
                                {district.title}
                            </option>
                        ))}
                </select>
            )}
            {selectedDistrict && (
                <select value={selectedVillage} onChange={handleVillageChange}>
                    <option value="">Köy Seçiniz</option>
                    {villages
                        .filter((village) => village.il_id === selectedCity)
                        .map((village) => (
                            <option key={village.value} value={village.value}>
                                {village.title}
                            </option>
                        ))}
                </select>
            )}
            {selectedVillage && (
                <div>
                    Seçilen İl: {selectedCity}
                    <br />
          Seçilen İlçe: {selectedDistrict}
                    <br />
          Seçilen Köy: {selectedVillage}
                </div>
            )}
        </div>
    );
}

export default LocationSelector;
