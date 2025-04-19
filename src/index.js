import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { deviceType, osName } from "react-device-detect";
import getUserId from "./util/getUserId";

const CLIENTKEY = "68020b4d2db02008d4eb4b6e";
let id = process.env.NODE_ENV === "development" ? "000" : getUserId();

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: CLIENTKEY,
    user: {
      key: id,
      //dynamically set these custom attributes using the deviceType and osName selectors from the npm package
      custom: {
        device: deviceType,
        operatingSystem: osName,
      },
    },
  });

  ReactDOM.render(
    <LDProvider>
      <App />
    </LDProvider>,
    document.getElementById("root")
  );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
