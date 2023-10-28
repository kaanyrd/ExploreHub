import React from "react";
import {
  useNavigate,
  // useParams
} from "react-router-dom";
import pp from "../../assets/casualPhotos/icardi.jpg";
import banner from "../../assets/casualPhotos/banner.jpg";
import classes from "./EditProfile.module.css";
// import LocationCityIcon from "@mui/icons-material/LocationCity";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import GiteIcon from "@mui/icons-material/Gite";

function EditProfile() {
  // const params = useParams();

  const navigate = useNavigate();

  const cancelHandler = () => {
    navigate("/myprofile");
  };

  return (
    <div className={classes.main}>
      <form className={classes.mainContent}>
        <div className={classes.photoSide}>
          <img src={banner} className={classes.bannerPhoto} alt="banner" />
          <img src={pp} className={classes.pp} alt="banner" />
        </div>
        <div className={classes.infoSide}>
          <div className={classes.topInfo}>
            <div>
              <div>
                <label>Firstname - Lastname</label>
                <input defaultValue="Mauro Icardi" className={classes.input} />
              </div>
              <div>
                <label>Nickname</label>
                <input defaultValue="@mauroicardi" className={classes.input} />
              </div>
              <div>
                <label>Banner Photo as URL</label>
                <input className={classes.input} type="text" />
              </div>
              <div>
                <label>Profil Photo as URL</label>
                <input className={classes.input} type="text" />
              </div>
            </div>
            <div>
              <div>
                <label className={classes.iconSide}>
                  {/* <GiteIcon /> */}
                  Town is
                </label>
                <input className={classes.input} defaultValue="Argentina" />
              </div>
              <div>
                <label className={classes.iconSide}>
                  {/* <CalendarMonthIcon />  */}
                  Birth{" "}
                </label>
                <input
                  className={classes.input}
                  type="date"
                  defaultValue="1993-02-13"
                />
              </div>
              <div>
                <label className={classes.iconSide}>
                  {/* <LocationCityIcon /> */}
                  Living in
                </label>
                <input className={classes.input} defaultValue="Istanbul" />
              </div>
              <div>
                <label>Gender</label>
                <select className={classes.selectSide}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
          {/* <div className={classes.otherInfos}>
            <p>
              <GiteIcon />
              Town is <input defaultValue="Argentina" />
            </p>
            <p>
              <CalendarMonthIcon />
              Birth <input type="date" defaultValue="1993-02-13" />
            </p>
            <p>
              <LocationCityIcon />
              Living in <input defaultValue="Istanbul" />
            </p>
          </div> */}
          <div className={classes.saveButton}>
            <button type="submit">Save</button>
            <button onClick={cancelHandler}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
