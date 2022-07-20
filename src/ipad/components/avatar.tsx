import React, { useEffect, useState } from "react";

import "./avatar.scss";

interface IAvatarProps {
  avatar: string;
}

export const Avatar = (props: IAvatarProps) => {
  const {avatar} = props;

  return (
    <div className={`avatar ${avatar}`}/>
  )
}