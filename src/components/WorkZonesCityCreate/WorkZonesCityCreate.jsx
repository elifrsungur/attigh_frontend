import React, { useState } from 'react'


import axios from 'axios';
/*
 * Bu kısım ekranda 'Çalışma Alanları' labelinin yanındaki icona basıldığı zaman çalışmaktadır.
 */

const WorkZonesCity = () => {

    const [cityName, setCityName] = useState('');
    const [cityCode, setCityCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/city', {
            cityName: cityName,
            cityCode: cityCode
        })
            .then((response) => {
                console.log('Success! City was created : ', response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


  return (
      <div>
          <h2>Yeni Proje Alanı</h2>
          <h3>Şehir Ekle</h3>
          <form onSubmit={handleSubmit}>
              <label>
                  Şehir Adı:
                <input
                      type="text"
                      value={cityName}
                      onChange={(e) => setCityName(e.target.value)}
                  />
              </label>
              <label>
                  Şehir Kodu:
                <input
                      type="number"
                      value={cityCode}
                      onChange={(e) => setCityCode(e.target.value)}
                  />
              </label>
              <button type="submit">Ekle</button>
          </form>
      </div>
  )
}

export default WorkZonesCity
