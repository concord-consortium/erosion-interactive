import * as React from "react";

export const JWTLink = (params: {appName: string, host: string}) => {
  const {appName, host} = params;
  const url = `${host}/api/v1/jwt/firebase?firebase_app=${appName}`;
  return (
    <span>
      <a href={url} rel="noreferrer" target="_blank">
        Find your JWT
      </a>
    </span>
  );
}
