import React from "react";

interface INavProps {
  handleExit: () => void;
}

export const NavigationBar = (props: INavProps) => {
  return (
    <div className="navbar">
      {
      // concord logo
      // name of activity
      <button onClick={props.handleExit}>Back to activity</button>
      }
    </div>
  )
}