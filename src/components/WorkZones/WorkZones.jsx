import React, { useState, useEffect } from 'react';
import WorkZonesCityCreate from '../WorkZonesCityCreate/WorkZonesCityCreate'
import WorkZonesDistrictCreate from '../WorkZonesDistrictCreate/WorkZonesDistrictCreate'

import WorkZoneCityCard from '../WorkZoneCityCard/WorkZoneCityCard'

import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';


import './WorkZones.css';

const WorkZones = () => {

    const [cities, setCities] = useState([]);

    const [selectWorkZoneMode, setSelectWorkZoneMode] = useState(false);

    const [selectedCityId, setSelectedCityId] = useState(null); 


    useEffect(() => {
        axios.get('http://localhost:8080/city')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
            });
    }, []);


    const handleAddDistrictClick = (cityId) => {
        setSelectedCityId(cityId);
        setSelectWorkZoneMode(false);

    };

    const handleAddCityClick = () => {
        setSelectWorkZoneMode(prev => !prev); //Bir önceki değerin tersini alır

    };



  return (
      <div>
          <h2>Çalışma Alanları 
               <i
                  className="fa fa-plus add-icon"
                  onClick={handleAddCityClick}
                  
              />
          </h2>

          {selectWorkZoneMode && <WorkZonesCityCreate />}

          {/*{selectedCityId && <WorkZonesDistrictCreate selectedCityId={selectedCityId} />} */}

          {cities.map(city => (
              <WorkZoneCityCard
                  key={city.id}
                  city={city}
                  onAddDistrictClick={handleAddDistrictClick}
              />
          ))}

          
      </div>
  )
}

export default WorkZones
