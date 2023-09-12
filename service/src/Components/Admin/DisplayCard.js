import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DisplayCard({ title }) {
  // Define a state variable to hold the hospital data
  const [hospitalData, setHospitalData] = useState([]);
  const [message, setMessage] = useState("Loading...");
  // Retrieving data
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const savedToken = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!savedToken || !savedUser || savedUser.type !== "admin") {
      toast.error("Wrong authenitcation");
      navigate("/");
    }
  }, [savedUser]);

  useEffect(() => {
    handelFetch();
  }, [title]);

  const handelFetch = () =>{
    fetch(`/api/hospitals/${title}`)
    .then((response) => response.json())
    .then((data) => {
      setHospitalData(data.details);
      setMessage(`${title} is empty..`);
    })
    .catch((error) => console.error("Error fetching data: ", error));
  }

  const handelChangeStatus = async (hospitalId) =>{
    try {
      // Make an API request to authenticate the user
      const response = await fetch(
        `/api/hospital/approve/${hospitalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json()
        toast.success(data.message)
        handelFetch()
      } else {
        const data = await response.json();
        toast.error(data.error || "Changing status failed.");
      }
    } catch (error) {
      console.error("Error during status change:", error);
      toast.error("An error occurred during status change.");
    }
  }
  const handelDelete = async (hospitalId) =>{
    try {
      // Make an API request to authenticate the user
      const response = await fetch(
        `/api/hospitals/delete/${hospitalId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json()
        toast.success(data.message)
        handelFetch()
      } else {
        const data = await response.json();
        toast.error(data.error || "Changing status failed.");
      }
    } catch (error) {
      console.error("Error during status change:", error);
      toast.error("An error occurred during status change.");
    }
  }

  return (
    <div className="displaycard">
      <div className="">
        <h5 style={{ fontSize: "50px", textTransform: "capitalize" }}>
          {title}
        </h5>
        <div className="card">
          {hospitalData && (
            <table className="table">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Zip</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hospitalData.map((hospital, index) => (
                  <tr key={hospital._id}>
                    <td>{index + 1}</td>
                    <td>{hospital.name}</td>
                    <td>{hospital.email}</td>
                    <td>{hospital.phone}</td>
                    <td>{hospital.address}</td>
                    <td>{hospital.zip}</td>
                    <td className="">
                      <a className="approve-btn mx-1" onClick={()=>{handelChangeStatus(hospital._id)}}>👍</a>
                      <a className="approve-btn mx-1" onClick={()=>{handelDelete(hospital._id)}}>🚮</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {hospitalData.length === 0 && (
            <>
              <h5>{message}</h5>
              <Loading />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
