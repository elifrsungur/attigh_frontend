import { useState } from 'react';
import './SelectedProjectInfo.css';
import axios from 'axios';

import PropTypes from 'prop-types'; 


const baseUrl = "http://localhost:8080";

function SelectedProjectInfo({ selectedProject, onStageChange }) {
    const [editingStage, setEditingStage] = useState(false);
    const [newStage, setNewStage] = useState(selectedProject.stagePlan);

    const handleEditClick = () => {
        setEditingStage(true);
    };

    const handleCancelEdit = () => {
        setEditingStage(false);
        setNewStage(selectedProject.stagePlan);
    };

   
    const handleSaveEdit = () => {
        onStageChange(newStage);
        const updatedProject = {
            ...selectedProject,
            stagePlan: newStage
        };

        axios.put(`${baseUrl}/project/${selectedProject.id}`, updatedProject)
            .then(response => {
               
                console.log('Proje başarıyla güncellendi:', response.data);
                onStageChange(updatedProject.stagePlan);
                setEditingStage(false);
            })
            .catch(error => {
                console.error('Hata:', error);
            });
    };

    return (
        <div className="selected-project-container">
            <div className="selected-project-info">
                <h4>Seçilen Proje</h4>
                <p>Proje Adı: {selectedProject.projectName}</p>
                <p>Tipi: {selectedProject.type.projectType}</p>
                <p>Uygulama Şekli: {selectedProject.implementationType.implementationType}</p>

                {editingStage ? (
                    <div className="stage-edit">
                        <select value={newStage} onChange={(e) => setNewStage(e.target.value)}>
                            <option value="PLANLAMA">Planlama</option>
                            <option value="ETUT_PROJE">Etüt/Proje</option>
                            <option value="UYGULAMA_INSAAT">Uygulama (İnşaat)</option>
                            <option value="TESCIL_ISLETME">Tescil(İşletme)</option>
                        </select>
                        <button className="edit-button" onClick={handleSaveEdit}>Kaydet</button>
                        <button className="edit-button" onClick={handleCancelEdit}>İptal</button>
                    </div>
                ) : (
                    <div className="stage-display">
                            <p>Aşama: {selectedProject.stagePlan}</p>
                        <button className="edit-button" onClick={handleEditClick}>Düzenle</button>
                    </div>
                )}
            </div>
        </div>
    );
}

SelectedProjectInfo.propTypes = {
    selectedProject: PropTypes.object,
    onStageChange: PropTypes.func
};


export default SelectedProjectInfo;
