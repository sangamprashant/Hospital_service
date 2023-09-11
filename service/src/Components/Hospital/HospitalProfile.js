import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import image from "../image/hs.jpg"

const HospitalProfile = () => {
  const [hospital, setHospital] = useState();
  const { hospitalId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState("");
  const [newSpecializations, setNewSpecializations] = useState("");
  const [newAccreditations, setNewAccreditations] = useState("");
  const [newInsuranceAccepted, setNewInsuranceAccepted] = useState("");
  const [newOperatingHours, setNewOperatingHours] = useState({
    day: "",
    time: "",
  });
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
  });
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const savedToken = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, [hospitalId]);
const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/hospital/${hospitalId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setHospital(data.details);
        setHospital(data.details);
      } else {
        const data = await response.json();
        toast.error(data.error || "failed to fetch...");
      }
    } catch (error) {
      console.error("Error during featching data:", error);
      toast.error("An error occurred during featching data..");
    }
};
const handelEdit = () => {
  setIsEditing(true)
}
const handelSave = async () => {
  setIsEditing(false);
  await saveDataToServer();
  fetchData();
};
const saveDataToServer = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/hospital/${hospitalId}`, {
      method: "PUT", // Use PUT or POST depending on your API endpoint
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedToken}`,
      },
      body: JSON.stringify(hospital),
    });

    if (response.ok) {
      toast.success("Data saved successfully");
    } else {
      const data = await response.json();
      toast.error(data.error || "Failed to save data");
    }
  } catch (error) {
    console.error("Error while saving data:", error);
    toast.error("An error occurred while saving data");
  }
};
const handelChange = (e) => {
  const { name, value } = e.target;
  setHospital({
    ...hospital,
    [name]: value,
  });
};
const handleAddNewService = () => {
  if (newService.trim() !== "") {
    setHospital({
      ...hospital,
      services: [...hospital.services, newService],
    });
    setNewService("");
  }
};
const handleRemoveService = (indexToRemove) => {
  const updatedService = hospital.services.filter(
    (_, index) => index !== indexToRemove
  );
  setHospital({
    ...hospital,
    services: updatedService,
  });
};
const handleAddNewSpecializations = () => {
  if (newSpecializations.trim() !== "") {
    setHospital({
      ...hospital,
      specializations: [...hospital.specializations, newSpecializations],
    });
    setNewSpecializations("");
  }
};
const handleRemoveSpecializations = (indexToRemove) => {
  const updatedSpecializations = hospital.specializations.filter(
    (_, index) => index !== indexToRemove
  );
  setHospital({
    ...hospital,
    specializations: updatedSpecializations,
  });
};
const handleAddNewAccreditations = () => {
  if (newAccreditations.trim() !== "") {
    setHospital({
      ...hospital,
      accreditations: [...hospital.accreditations, newAccreditations],
    });
    setNewAccreditations("");
  }
};
const handleRemoveAccreditations = (indexToRemove) => {
  const updatedAccreditations = hospital.accreditations.filter(
    (_, index) => index !== indexToRemove
  );
  setHospital({
    ...hospital,
    accreditations: updatedAccreditations,
  });
};
const handleAddNewInsuranceAccepted = () => {
  if (newInsuranceAccepted.trim() !== "") {
    setHospital({
      ...hospital,
      insuranceAccepted: [...hospital.insuranceAccepted, newInsuranceAccepted],
    });
    setNewInsuranceAccepted("");
  }
};
const handleRemoveInsuranceAccepted = (indexToRemove) => {
  const updatedInsuranceAccepted = hospital.insuranceAccepted.filter(
    (_, index) => index !== indexToRemove
  );
  setHospital({
    ...hospital,
    insuranceAccepted: updatedInsuranceAccepted,
  });
};
const handleAddOperatingHour = () => {
  if (newOperatingHours.day.trim() !== "" && newOperatingHours.time.trim() !== "") {
    setHospital({
      ...hospital,
      operatingHours: [...hospital.operatingHours, newOperatingHours],
    });
    setNewOperatingHours({ day: "", time: "" }); // Clear input fields
  }
};
const handleRemoveOperatingHour = (indexToRemove) => {
  const updatedOperatingHours = hospital.operatingHours.filter(
    (_, index) => index !== indexToRemove
  );
  setHospital({
    ...hospital,
    operatingHours: updatedOperatingHours,
  });
};
const handleAddDoctor = () => {
  if (newDoctor.name.trim() !== "" && newDoctor.specialty.trim() !== "") {
    setHospital({
      ...hospital,
      doctors: [...hospital.doctors, newDoctor],
    });
    setNewDoctor({ name: "", specialty: "" }); // Clear input fields
  }
};
const handleRemoveDoctor = (indexToRemove) => {
  const updatedDoctors= hospital.doctors.filter(
    (_, index) => index !== indexToRemove
  );
  setHospital({
    ...hospital,
    doctors: updatedDoctors,
  });
};
  return (
    <div className="displaycard">
      <h5 style={{ fontSize: "50px", textTransform: "capitalize" }}>
        {hospital?.name||"Loading.."}
      </h5>
      {savedUser?._id===hospitalId&&<div>
          <div className="top-button px-5">
            {!isEditing?<button className="btn " onClick={()=>handelEdit()}>Edit</button>:
            <button className="btn " onClick={()=>handelSave()}>Save</button>}
          </div>
          <hr/>
      </div>}
      {hospital ? (
        <div className="py-5">
          <div className="profile-body">
              <div className="row">
                <div className="col-md-6 profile-left">
                  <img
                    className="profile-image"
                    src={hospital?.image||image}
                    alt="hospital image"
                  />
                  <div>
                  <p>{((savedUser?._id===hospitalId&&hospital.about||isEditing))&&"About:"}</p>
                  {!isEditing&& <p>{hospital.about}</p>}
                  {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.about} value={hospital.about} name="about" onChange={handelChange}/>}
                  </div>
                  
                </div>
                <div className="col-md-6">
                <div className="py-2">
                  <p>name:{savedUser?._id===hospitalId&& isEditing&&<sup>*</sup>}</p>
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.name} value={hospital.name} name="name" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                  <p>Email:{savedUser?._id===hospitalId&& isEditing&&<><sup>*</sup><sub className="">Editable after verification..</sub></>}</p>
                    {!isEditing&&<h4>{hospital.email}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.email} value={hospital.email} disabled name="email" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                  <p>Address:{savedUser?._id===hospitalId&& isEditing&&<sup>*</sup>}</p>
                    {!isEditing&&<h4>{hospital.address}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.address} value={hospital.address} name="address" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                  <p>Zip Code:{savedUser?._id===hospitalId&& isEditing&&<sup>*</sup>}</p>
                    {!isEditing&&<h4>{hospital.zip}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.zip} value={hospital.zip} name="zip" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                  <p>Phone number:{savedUser?._id===hospitalId&& isEditing&&<sup>*</sup>}</p>
                    {!isEditing&&<h4>{hospital.phone}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input  className="col-md-12 p-2" placeholder="Enter Phone Number" value={hospital.phone} name="phone" onChange={handelChange}/>}
                  </div>
                  {/* alternate number */}
                  <div className="py-2">
                  <p>{(((isEditing&&savedUser?._id===hospitalId)||hospital.altphone))?"Alternate Phone number:":""}</p>
                    {!isEditing&&<h4>{hospital.altphone}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input  className="col-md-12 p-2" placeholder="Enter Phone Number" value={hospital.altphone} name="altphone" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                    <p>{(((isEditing&&savedUser?._id===hospitalId)||hospital.website))?"Website:":""}</p>
                    {!isEditing&&<h4>{hospital.website}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.website?hospital.website:"https://example.com"} value={hospital.website} name="website" onChange={handelChange}/>}
                  </div>
                </div>
              </div>
          </div>
          <div className="profile-footer">
            <div className="row my-2">
              {(((isEditing&&savedUser?._id===hospitalId)||hospital.services.length !== 0)) && (
                <div className="col-md-6 my-2">
                <div className="card p-3">
                <h5>Services</h5>
                  <div className="row">
                    {hospital.services.map((content, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card">
                        {(savedUser?._id === hospitalId && isEditing) ? (
                        <div>
                          <input
                            className="input-profile"
                            type="text"
                            value={content}
                            onChange={(e) => {
                              const updatedServices = [...hospital.services];
                              updatedServices[index] = e.target.value;
                              setHospital({
                                ...hospital,
                                services: updatedServices,
                              });
                            }}
                          />
                          <button onClick={() => handleRemoveService(index)}>Remove</button>
                        </div>
                          ) : (
                            <h5>{content}</h5>
                          )}
                        </div>
                      </div>
                    ))}
                    {savedUser?._id === hospitalId && isEditing && (
                      <div className="col-md-12">
                        <div className="card">
                          <input
                          className="input-profile"
                            type="text"
                            placeholder="Add new service"
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                          />
                          <button onClick={handleAddNewService}>Add</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>  
                </div>
              )}
              {((isEditing&&savedUser?._id===hospitalId)||hospital.specializations.length !== 0) && (
                <div className="col-md-6 my-2">
                <div className="card p-3">
                <h5>Specializations</h5>
                  <div className="row">
                    {hospital.specializations.map((content, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card">
                        {(savedUser?._id === hospitalId && isEditing) ? (
                        <div>
                          <input
                            className="input-profile"
                            type="text"
                            value={content}
                            onChange={(e) => {
                              const updatedspecializations = [...hospital.specializations];
                              updatedspecializations[index] = e.target.value;
                              setHospital({
                                ...hospital,
                                specializations: updatedspecializations,
                              });
                            }}
                          />
                          <button onClick={() => handleRemoveSpecializations(index)}>Remove</button>
                        </div>
                          ) : (
                            <h5>{content}</h5>
                          )}
                        </div>
                      </div>
                    ))}
                    {savedUser?._id === hospitalId && isEditing && (
                      <div className="col-md-12">
                        <div className="card">
                          <input
                          className="input-profile"
                            type="text"
                            placeholder="Add new service"
                            value={newSpecializations}
                            onChange={(e) => setNewSpecializations(e.target.value)}
                          />
                          <button onClick={handleAddNewSpecializations}>Add</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                  
                </div>
              )}
              {((isEditing&&savedUser?._id===hospitalId)||hospital.accreditations.length !== 0) && (
                <div className="col-md-6 my-2">
                <div className="card p-3">
                <h5>Accreditations</h5>
                  <div className="row">
                    {hospital.accreditations.map((content, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card">
                        {(savedUser?._id === hospitalId && isEditing) ? (
                        <div>
                          <input
                            className="input-profile"
                            type="text"
                            value={content}
                            onChange={(e) => {
                              const updatedaccreditations = [...hospital.accreditations];
                              updatedaccreditations[index] = e.target.value;
                              setHospital({
                                ...hospital,
                                accreditations: updatedaccreditations,
                              });
                            }}
                          />
                          <button onClick={() => handleRemoveAccreditations(index)}>Remove</button>
                        </div>
                          ) : (
                            <h5>{content}</h5>
                          )}
                        </div>
                      </div>
                    ))}
                    {savedUser?._id === hospitalId && isEditing && (
                      <div className="col-md-12">
                        <div className="card">
                          <input
                          className="input-profile"
                            type="text"
                            placeholder="Add new service"
                            value={newAccreditations}
                            onChange={(e) => setNewAccreditations(e.target.value)}
                          />
                          <button onClick={handleAddNewAccreditations}>Add</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                  
                </div>
              )}
              {((isEditing&&savedUser?._id===hospitalId)||hospital.insuranceAccepted.length !== 0) && (
                <div className="col-md-6 my-2">
                <div className="card p-3">
                <h5>insuranceAccepted</h5>
                  <div className="row">
                    {hospital.insuranceAccepted.map((content, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card">
                        {(savedUser?._id === hospitalId && isEditing) ? (
                        <div>
                          <input
                            className="input-profile"
                            type="text"
                            value={content}
                            onChange={(e) => {
                              const updatedinsuranceAccepted = [...hospital.insuranceAccepted];
                              updatedinsuranceAccepted[index] = e.target.value;
                              setHospital({
                                ...hospital,
                                insuranceAccepted: updatedinsuranceAccepted,
                              });
                            }}
                          />
                          <button onClick={() => handleRemoveInsuranceAccepted(index)}>Remove</button>
                        </div>
                          ) : (
                            <h5>{content}</h5>
                          )}
                        </div>
                      </div>
                    ))}
                    {savedUser?._id === hospitalId && isEditing && (
                      <div className="col-md-12">
                        <div className="card">
                          <input
                          className="input-profile"
                            type="text"
                            placeholder="Add new service"
                            value={newInsuranceAccepted}
                            onChange={(e) => setNewInsuranceAccepted(e.target.value)}
                          />
                          <button onClick={handleAddNewInsuranceAccepted}>Add</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                  
                </div>
              )}
            </div>
            {((isEditing&&savedUser?._id===hospitalId)||hospital.operatingHours.length !== 0) && (<div className="row  p-3"><div className="card my-2 p-3">
              <h5 style={{fontSize:'2rem'}}>Operating Hours</h5>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Sr.No</th>
                        <th>Day</th>
                        <th>Time</th>
                        {(savedUser?._id===hospitalId&&isEditing)&&<th>Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {hospital.operatingHours.map((operatingHour, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{operatingHour.day}</td>
                          <td>{operatingHour.time}</td>
                          {(savedUser?._id === hospitalId && isEditing) && (
                            <td>
                              <i className="mx-3" onClick={() => handleRemoveOperatingHour(index)}>
                                delete
                              </i>
                              {/* <i>edit</i> */}
                            </td>
                          )}
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(savedUser?._id === hospitalId && isEditing) && (
            <div className="">
              <div>
                <label>Day:</label>
                <input
                  type="text"
                  placeholder="Enter Day"
                  value={newOperatingHours.day}
                  onChange={(e) => setNewOperatingHours({ ...newOperatingHours, day: e.target.value })}
                />
              </div>
              <div>
                <label>Time:</label>
                <input
                  type="text"
                  placeholder="Enter Time"
                  value={newOperatingHours.time}
                  onChange={(e) => setNewOperatingHours({ ...newOperatingHours, time: e.target.value })}
                />
              </div>
              <div>
                <button onClick={handleAddOperatingHour}>Add Operating Hour</button>
              </div>
            </div>
          )}
            </div>
            </div>)}
            {((isEditing&&savedUser?._id===hospitalId)||hospital.doctors.length !== 0) &&(<div className="doctors card p-3 m-2">
            <h5 style={{fontSize:'2rem'}}>Our Doctors</h5>
              <div className="row">
                {hospital.doctors.map((doctor,index)=>(<div className="col-md-3">
                  <div className="card">
                    <h5>{doctor.name}</h5>
                    <h5>{doctor.specialty}</h5>
                    {(savedUser?._id === hospitalId && isEditing) && (<>
                      {/* <i className="mx-3" onClick={() => handleRemoveDoctor(index)}>
                                Edit
                              </i> */}
                      <i className="mx-3" onClick={() => handleRemoveDoctor(index)}>
                                delete
                              </i>
                      </>
                          )}
                  </div>
                </div>))}
              </div>
              <div className="doctor-input">
              {(savedUser?._id === hospitalId && isEditing) && (
            <div className="">
              <div>
                <label>Doctor Name:</label>
                <input
                  type="text"
                  placeholder="Enter Day"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                />
              </div>
              <div>
                <label>Specialty:</label>
                <input
                  type="text"
                  placeholder="Enter Time"
                  value={newDoctor.specialty}
                  onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                />
              </div>
              <div>
                <button onClick={handleAddDoctor}>Add A Doctor</button>
              </div>
            </div>
          )}
              </div>
            </div>)}
          </div>
        </div>
      ):<Loading />}
    </div>
  );
};

export default HospitalProfile;
