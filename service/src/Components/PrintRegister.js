import React from "react";

const PrintRegister = ({ setFormData, formData, setIsPrint }) => {
  const handlePrint = () => {
    window.print(); // Trigger the browser's print dialog
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? The data will not be visible after printing.");

    if (confirmCancel) {
      setIsPrint(false);
      setFormData({ email: "", name: "", phone: "", address: "", zip: "", password: ""});
    }
  };

  return (
    <div>
      <h5 style={{ fontSize: "50px" }}>Print Form</h5>
      <p>
        Hospital Service recommends saving this form as it contains important login details that will be used in the future.
      </p>
      <hr />
      <label className="col-md-12 p-1">Name of the hospital</label>
      <h3 className="col-md-12 p-1">{formData.name}</h3>
      <label className="col-md-12 p-1">Email of the hospital</label>
      <h4 className="col-md-12 p-1">{formData.email}</h4>
      <label className="col-md-12 p-1">Password</label>
      <h4 className="col-md-12 p-1">{formData.password}</h4>
      <label className="col-md-12 p-1">Phone number of the hospital</label>
      <h4 className="col-md-12 p-1">{formData.phone}</h4>
      <label className="col-md-12 p-1">Address of the hospital</label>
      <h4 className="col-md-12 p-1">{formData.address}</h4>
      <label className="col-md-12 p-1">Zip code of the hospital</label>
      <h4 className="col-md-12 p-1">{formData.zip}</h4>
      <label className="col-md-12 p-1">Email of the hospital</label>
      <h4 className="col-md-12 p-1">{formData.email}</h4>
      <hr />
      <div className="print-container-btn">
        <button type="button" className="btn btn-cancel containerNotToPrint" onClick={handleCancel}>Cancel</button>
        <button type="button" className="btn btn-print containerNotToPrint" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default PrintRegister;
