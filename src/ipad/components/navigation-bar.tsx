import React from "react";
import concordLogo from "../assets/cclogo.png";
import exitFullScreen from "../assets/exit-fullscreen.png";

import "./navigation-bar.scss";

interface INavProps {
  handleExit: () => void;
}

export const NavigationBar = (props: INavProps) => {
  const {handleExit} = props;

  const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;

  const [status, setStatus] = React.useState(getOnLineStatus());
  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  React.useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);


  return (
    <div className="navbar">
      <img className="concord-logo" src={concordLogo} alt="Concord Consortium logo"/>
      <div className={`status ${status ? `online` : `offline`}`}>{status ? "online" : "offline"}</div>
      <button className="exit-button" onClick={handleExit}>
        <img className="exit-icon" src={exitFullScreen} alt="Exit full screen"/>
        Return to Lesson
      </button>
    </div>
  )
}