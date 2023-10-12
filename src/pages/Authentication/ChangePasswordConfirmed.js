import React from "react";
import classes from "./ChangePasswordConfirmed.module.css";
import pp from "../../assets/casualPhotos/icardi.jpg";
import logo from "../../assets/icons/logo2.png";
import { Link, useNavigate } from "react-router-dom";

function ChangePasswordConfirmed() {
  const navigate = useNavigate();

  const goHomeHandler = () => {
    navigate("/login");
  };

  return (
    <div className={classes.content}>
      <div className={classes.mainContent}>
        <div className={classes.contentLeft}>
          <div className={classes.infoSide}>
            <img className={classes.logo} src={logo} alt="logo" />
            <h2>Almost Done!</h2>
            <h3>Step 2/2</h3>
            <p className={classes.infoText}>
              You can now reset your password...
            </p>
          </div>
        </div>
        <div className={classes.formSide}>
          <div className={classes.yourProfile}>
            <img className={classes.pp} alt="pp" src={pp} />
            <div className={classes.profileInfo}>
              <div className={classes.profileControl}>
                <h4>Mauro Icardi (30)</h4>
              </div>
              <div className={classes.profileControl}>
                <p>mauroicardi@outlook.com</p>
              </div>
            </div>
          </div>
          <form>
            <div className={classes.formController}>
              <input placeholder="New password" type="password" />
            </div>
            <div className={classes.formController}>
              <input placeholder="Confirm your password" type="password" />
            </div>
            <div className={classes.submitBtn}>
              <Link className={classes.resetBtn}>Reset Password</Link>
              <button className={classes.cancelBtn} onClick={goHomeHandler}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordConfirmed;
