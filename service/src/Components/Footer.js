import React from "react";

function Footer() {
  return (
    <div className="footer ssc-square" style={{color:"black"}}>
      <div className="footer-container">
        <div className="row">
            <div className="col-md-4">
                <h1 className='footer-title'>Welcome To <span>Hospital Service</span></h1>
                <p className='footer-description'>A Integrated Platform To Check hospital's Service</p>
            </div>
            <div className="col-md-4">Description</div>
            <div className="col-md-4">
                <div className="row">
                    <div  className="col-md-6">
                        <h3>Usefull Links!</h3>
                        <ul>
                            <li><a>hd</a></li>
                            <li><a>hd</a></li>
                        </ul>
                    </div>
                    <div  className="col-md-6">
                        <h3>Usefull Links!</h3>
                        <ul>
                            <li><a>hd</a></li>
                            <li><a>hd</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
