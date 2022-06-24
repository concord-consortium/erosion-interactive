import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppComponent } from "./app";
import { Test } from "./firebase-test";

const renderTest = true;

if(renderTest) {
  ReactDOM.render(<Test />, document.getElementById("app"));
}
else {
  ReactDOM.render(<AppComponent />, document.getElementById("app"));
}


