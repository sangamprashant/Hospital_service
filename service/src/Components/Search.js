import React, { useEffect } from "react";
import Loading from "./Loading";

function Search({ isSearch, setIsSearch }) {
  useEffect(() => {
    setIsSearch(true);
  });
  return (
    <div className="search-container">
      <div className="search-header">
        <div className="row">
          <div className="col-md-6 my-1">
            <input className="search-inputs" placeholder="enter a location.." />
          </div>
          <div className="col-md-6 my-1">
            <input className="search-inputs" placeholder="enter a hospital.." />
          </div>
        </div>
        <div className="search-button">
          <button>Search</button>
        </div>
      </div>
      <div className="search-body">
      {/* uncomment for deploy */}
        {/* <div className="asking-search">
          <h5 className="all-caps"> please Search..</h5>
          <Loading />
        </div> */}
        <div className="result-search">
  <h5 className="all-caps">Searched Items</h5>
  <div className="row">
    <div className="col-md-4">
      <div className="card py-2">
        <div className="row">
          <div className="col-md-8">
            <img className="searched-image" src="https://miro.medium.com/max/3840/1*xMuIOwjliGUPjkzukeWKfw.jpeg" alt="Hospital Image" />
            <h5 className="searched-title all-caps">Hospital Name</h5>
            <p className="searched-location">Address: Vill-birdpur no.13 zeettpur naughar, siddharthnagar</p>
          </div>
          <div className="col-md-4">
            <p>Zip Code: XXXXXX</p>
            <p>Phone No: <a href="https://www.examplehospital.com">Visit Website</a></p>
            <p>Phone No: <a href="https://www.examplehospital.com">Visit Website</a></p>
            <p>Website: <a href="https://www.examplehospital.com">Visit Website</a></p>
            <p>Operating Hours: 24/7</p>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card py-2">
        <div className="row">
          <div className="col-md-8">
            <img className="searched-image" src="https://miro.medium.com/max/3840/1*xMuIOwjliGUPjkzukeWKfw.jpeg" alt="Hospital Image" />
            <h5 className="searched-title all-caps">Hospital Name</h5>
            <p className="searched-location">Address: Vill-birdpur no.13 zeettpur naughar, siddharthnagar</p>
          </div>
          <div className="col-md-4">
            <p>Zip Code: XXXXXX</p>
            <p>Phone No: <a href="https://www.examplehospital.com">Visit Website</a></p>
            <p>Phone No: <a href="https://www.examplehospital.com">Visit Website</a></p>
            <p>Website: <a href="https://www.examplehospital.com">Visit Website</a></p>
            <p>Operating Hours: 24/7</p>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="card py-2">
        <div className="row">
          <div className="col-md-8">
            <img className="searched-image" src="https://miro.medium.com/max/3840/1*xMuIOwjliGUPjkzukeWKfw.jpeg" alt="Hospital Image" />
            <h5 className="searched-title all-caps">Hospital Name</h5>
            <p className="searched-location">Address: Vill-birdpur no.13 zeettpur naughar, siddharthnagar</p>
          </div>
          <div className="col-md-4">
            <p>Zip Code: XXXXXX</p>
            <p>Phone No: <a href="https://www.examplehospital.com">Visit Website</a></p>
            <p>Phone No: <a href="https://www.examplehospital.com">Visit Website</a></p>
            <p>Website: <a href="https://www.examplehospital.com">Visit Website</a></p>
            <p>Operating Hours: 24/7</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading /> 
</div>

      </div>
    </div>
  );
}

export default Search;
