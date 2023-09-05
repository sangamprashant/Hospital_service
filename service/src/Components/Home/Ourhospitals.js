import React, { useState, useEffect } from 'react';
import Loading from '../Loading';

function Ourhospitals() {
  // Define a state variable to hold the hospital data
  const [hospitalData, setHospitalData] = useState([]);

  // Simulate fetching hospital data (replace with actual API/database call)
  useEffect(() => {
    // Replace this with your data fetching logic
    // Example: Fetch data from an API
    // fetch('https://api.example.com/hospitals')
    //   .then(response => response.json())
    //   .then(data => setHospitalData(data))
    //   .catch(error => console.error('Error fetching data: ', error));

    // Simulated data (replace with actual data)
    const simulatedData = [
      {
        id: 1,
        title: 'Hospital 1',
        location: 'Location 1',
        imageUrl: 'https://th.bing.com/th?id=ORMS.aad51650999968dd226369d702032f80&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1&p=0',
      },
      {
        id: 2,
        title: 'Hospital 2',
        location: 'Location 2',
        imageUrl: 'https://th.bing.com/th?id=ORMS.aad51650999968dd226369d702032f80&pid=Wdp&w=612&h=304&qlt=90&c=1&rs=1&dpr=1&p=0',
      },
      // Add more hospital objects as needed
    ];

    setHospitalData(simulatedData);
  }, []);

  return (
    <div className='hospitals'>
      <div className='list-hospital'>
        <h1 className='heading'>List of <span>Hospitals</span></h1>
        {/* <Loading/> */}
        <div className='row'>
          {hospitalData.map((hospital) => (
            <div className='col-md-3' key={hospital.id}>
              <div className='card preview-hospital'>
                <img className='image-hospital' src={hospital.imageUrl} alt={`Hospital ${hospital.title}`} />
                <h2 className='title-hospital'>{hospital.title}</h2>
                <h5 className='description-hospital'>{hospital.location}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ourhospitals;
