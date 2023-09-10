import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const HospitalProfile = () => {
  const [hospital, setHospital] = useState();
  const { hospitalId } = useParams();
  const [dataToUpdate, setDataToUpdate] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState("");
  const [newSpecializations, setNewSpecializations] = useState("");
  const [newAccreditations, setNewAccreditations] = useState("");
  const [newInsuranceAccepted, setNewInsuranceAccepted] = useState("");
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
        setDataToUpdate(data.details);
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
      body: JSON.stringify(dataToUpdate),
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
  setDataToUpdate({
    ...dataToUpdate,
    [name]: value,
  });
};
const handleAddNewService = () => {
  if (newService.trim() !== "") {
    setDataToUpdate({
      ...dataToUpdate,
      services: [...dataToUpdate.services, newService],
    });
    setNewService("");
  }
};
const handleAddNewSpecializations = () => {
  if (newSpecializations.trim() !== "") {
    setDataToUpdate({
      ...dataToUpdate,
      specializations: [...dataToUpdate.specializations, newSpecializations],
    });
    setNewService("");
  }
};
const handleAddNewAccreditations = () => {
  if (newAccreditations.trim() !== "") {
    setDataToUpdate({
      ...dataToUpdate,
      accreditations: [...dataToUpdate.accreditations, newAccreditations],
    });
    setNewAccreditations("");
  }
};
const handleAddNewInsuranceAccepted = () => {
  if (newInsuranceAccepted.trim() !== "") {
    setDataToUpdate({
      ...dataToUpdate,
      insuranceAccepted: [...dataToUpdate.insuranceAccepted, newInsuranceAccepted],
    });
    setNewInsuranceAccepted("");
  }
};
  return (
    <div className="displaycard">
      <h5 style={{ fontSize: "50px", textTransform: "capitalize" }}>
        Hospital Profile
      </h5>
      {savedUser?._id===hospitalId&&<div className="top-button p-5">
        {!isEditing?<button className="btn " onClick={()=>handelEdit()}>Edit</button>:
        <button className="btn " onClick={()=>handelSave()}>Save</button>}
      </div>}
      {hospital && (
        <div className="py-5">
          <div className="profile-body">
              <div className="row">
                <div className="col-md-6 profile-left">
                  <img
                    className="profile-image"
                    src="https://imgs.search.brave.com/ZGsCLKZOvJjnK5sXmt6dnK6SOi27SFULk_eUdmqpfUY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE2/ODI2ODY1ODAwMzYt/YjVlMjU5MzJjZTlh/P2l4bGliPXJiLTQu/MC4zJml4aWQ9TTN3/eE1qQTNmREY4TUh4/bFpHbDBiM0pwWVd3/dFptVmxaSHd4TVh4/OGZHVnVmREI4Zkh4/OGZBPT0mdz0xMDAw/JnE9ODA"
                    alt="hospital image"
                  />
                  <div>
                  <p>{((savedUser?._id===hospitalId&&hospital.website||isEditing))?"About:":""}</p>
                  {!isEditing&& <p>{hospital.about}</p>}
                  {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.about} name="about" onChange={handelChange}/>}
                  </div>
                  
                </div>
                <div className="col-md-6">
                <div className="py-2">
                  <p>name:</p>
                    {!isEditing&&<h2>{hospital.name}</h2>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.name} name="name" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                  <p>{savedUser?._id===hospitalId||hospital.email?"Email:":""}</p>
                    {!isEditing&&<h4>{hospital.email}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.email} name="email" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                  <p>{savedUser?._id===hospitalId||hospital.address?"Address:":""}</p>
                    {!isEditing&&<h4>{hospital.address}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.address} name="address" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                  <p>{savedUser?._id===hospitalId||hospital.zip?"Zip Code:":""}</p>
                    {!isEditing&&<h4>{hospital.zip}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.zip} name="zip" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                  <p>{savedUser?._id===hospitalId||hospital.phone?"Phone number:":""}</p>
                    {!isEditing&&<h4>{hospital.phone}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input  className="col-md-12 p-2" placeholder={hospital.phone} name="phone" onChange={handelChange}/>}
                  </div>
                  <div className="py-2">
                    <p>{(((isEditing&&savedUser?._id===hospitalId)||hospital.website))?"Website:":""}</p>
                    {!isEditing&&<h4>{hospital.website}</h4>}
                    {(savedUser?._id===hospitalId&&isEditing)&&<input className="col-md-12 p-2" placeholder={hospital.website?hospital.website:"https://example.com"} name="website" onChange={handelChange}/>}
                  </div>
                </div>
              </div>
          </div>
          <div className="profile-footer">
            <div className="row">
            {(((isEditing&&savedUser?._id===hospitalId)||hospital.services.length !== 0)) && (
                <div className="col-md-6">
                  <h5>Services</h5>
                  <div className="row">
                    {hospital.services.map((content, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card">
                          <h5>{content}</h5>
                          {(savedUser?._id === hospitalId && isEditing) && (
                            <div>Edit Delete</div>
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
              )}
              {((isEditing&&savedUser?._id===hospitalId)||hospital.specializations.length !== 0) && (
                <div className="col-md-6">
                  <h5>Specializations</h5>
                  <div className="row">
                    {hospital.specializations.map((content, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card">
                          <h5>{content}</h5>
                          {(savedUser?._id === hospitalId && isEditing) && (
                            <div>Edit Delete</div>
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
              )}
              {((isEditing&&savedUser?._id===hospitalId)||hospital.accreditations.length !== 0) && (
                <div className="col-md-6">
                  <h5>Accreditations</h5>
                  <div className="row">
                    {hospital.accreditations.map((content, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card">
                          <h5>{content}</h5>
                          {(savedUser?._id === hospitalId && isEditing) && (
                            <div>Edit Delete</div>
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
              )}
              {((isEditing&&savedUser?._id===hospitalId)||hospital.insuranceAccepted.length !== 0) && (
                <div className="col-md-6">
                  <h5>insuranceAccepted</h5>
                  <div className="row">
                    {hospital.insuranceAccepted.map((content, index) => (
                      <div className="col-md-3" key={index}>
                        <div className="card">
                          <h5>{content}</h5>
                          {(savedUser?._id === hospitalId && isEditing) && (
                            <div>Edit Delete</div>
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
              )}




            </div>
            <div>
              <h5>operatingHours</h5>
              <div className="row">
                <div className="card">
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
                      <tr className="table-success">
                        <td>1</td>
                        <td>Monday</td>
                        <td>8 AM - 9 PM</td>
                        {(savedUser?._id===hospitalId&&isEditing)&&<td>
                          <i className="mx-3">delete</i>
                          <i>edit</i>
                        </td>}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Loading />
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalProfile;
