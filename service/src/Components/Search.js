import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { toast } from "react-toastify";
import image from "./image/hs.jpg"
import { useNavigate } from "react-router-dom";

function Search({ isSearch, setIsSearch }) {
  const [inputLocation, setInputLocation] = useState("");
  const [inputName, setInputName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsSearch(true);
  }, [setIsSearch]);

  const handleSearch = async () => {
    if (inputLocation.trim() === "" && inputName.trim() === "") {
      toast.error("Please enter the name or location of the hospital.");
    } else {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/api/hospital/searched/public`,
          {
            method: "POST",
            body: JSON.stringify({ address: inputLocation, name: inputName }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setSearchedData(data.details);
        } else {
          toast.error("Failed to fetch hospitals.");
        }
      } catch (error) {
        console.error(`Error while searching: ${error}`);
        toast.error("An error occurred while searching.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <div className="row">
          <div className="col-md-6 my-1">
            <input
              className="search-inputs"
              placeholder="Enter a hospital.."
              onChange={(e) => {
                setInputName(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6 my-1">
            <input
              className="search-inputs"
              placeholder="Enter a location.."
              onChange={(e) => {
                setInputLocation(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-button">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="search-body">
        {loading && (
          <div className="asking-search">
            <Loading />
          </div>
        )}
        {!loading && searchedData.length === 0 && (
          <div className="asking-search">
            <h5 className="all-caps">Please Search...</h5>
          </div>
        )}
        {!loading && searchedData.length > 0 && (
          <div className="result-search">
            <h5 className="all-caps">Searched Items</h5>
            <div className="row">
              {searchedData.map((hospital, index) => (
                <div className="col-md-4 my-2" key={index}>
                  <div className="card py-2">
                    <div className="row">
                      <div className="col-md-8 " style={{cursor:"pointer"}} onClick={()=>navigate(`/${hospital._id}`)}>
                      <img className={`image-hospital `} src={hospital.image||image} alt={`Hospital ${hospital.name}`} />
                        <h5 className="searched-title all-caps">{hospital.name}</h5>
                        <p className="searched-location">
                          {hospital.address}
                        </p>
                      </div>
                      <div className="col-md-4">
                        {hospital.zip&&<p style={{marginBottom:"1rem"}}>Zip Code:<a>{hospital.zip}</a> </p>}
                        {hospital.phone&&<p style={{marginBottom:"1rem"}}>
                          Phone No: <a href={`tel:${hospital.phone}`}>{hospital.phone}</a>
                        </p>}
                        {hospital.altphone&&<p style={{marginBottom:"1rem"}}>
                          Alternate Phone No: <a href={`tel:${hospital.altphone}`}>{hospital.altphone}</a>
                        </p>}
                        {hospital.email&&<p style={{marginBottom:"1rem"}}>
                          Email: <a href={`mailto:${hospital.email}`}>{hospital.email}</a>
                        </p>}
                        {hospital.website&&<p style={{marginBottom:"1rem"}}>
                        Website: <a href={hospital.website} target="_blank">{hospital.website}</a>
                        </p>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
