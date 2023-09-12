import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import image from "../image/hs.jpg"

function Ourhospitals() {
  // Define a state variable to hold the hospital data
  const [hospitalData, setHospitalData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/hospitals/approved')
      .then(response => response.json())
      .then(data => setHospitalData(data.details))
      .catch(error => console.error('Error fetching data: ', error));

  }, []);

  return (
    <div className='hospitals'>
      <div className='list-hospital'>
        <h1 className='heading'>List of <span>Hospitals</span></h1>
        {hospitalData?.length!==0?<div className='row'>
          {hospitalData && hospitalData.map((hospital) => (
            <div className='col-md-3 my-2' key={hospital._id}>
              <div className='card preview-hospital' onClick={()=>{navigate(`${hospital._id}`)}}>
                <img className={`image-hospital `} src={hospital.image||image} alt={`Hospital ${hospital.name}`} />
                <h2 className='title-hospital'>{hospital.name}</h2>
                <h5 className='description-hospital'>{hospital.address}</h5>
              </div>
            </div>
          ))}
        </div>:<Loading/>}
      </div>
    </div>
  );
}

export default Ourhospitals;
