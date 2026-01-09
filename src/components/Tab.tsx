import { useContext, useEffect, useState } from "react";
// import { Welcome } from "./sample/Welcome";
import { Client } from "./sample/Client";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { PanelFooterExample } from "./login";
import * as microsoftTeams from '@microsoft/teams-js';
import { Login } from "./Logintest";
import App1 from "./App1";

const showFunction = Boolean(config.apiName);
let agrno = localStorage.getItem("agrno");
let email = localStorage.getItem("email");
let password = localStorage.getItem("pass");
export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    async function initializeTeams() {
      try {
        await microsoftTeams.initialize();
        microsoftTeams.getContext(function(context) {  var currentUser:any = {
          userId: context.userObjectId,    userName: context.userPrincipalName,
          userEmail: context.userPrincipalName, // or context.userEmail    userTenantId: context.tid // tenant id
        
        };
        console.log(currentUser,"currentUsercurrentUser");
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        let datacurrent = localStorage.getItem("currentUser");
        console.log(datacurrent,"datacurrent");
        // Now you can use currentUser object as needed  console.log(currentUser);
      });
        console.log("Microsoft Teams initialized successfully");
        try {
          registerButtonClickHandler();
        } catch (error) {
          console.log("Error registering button click handler:", error);
        }
  
      } catch (error) {
        console.error("Error initializing Microsoft Teams:", error);
        // Handle initialization error
      }
    }
  
    async function registerButtonClickHandler() {
      try {
        await microsoftTeams.registerAppButtonClickHandler(() => {
          console.log("Button clicked");
          // console.log(agrno, email, password,"user login succesfully registered");
          const agrno = localStorage.getItem("agrno");
          const email = localStorage.getItem("email");
          const password = localStorage.getItem("pass");
          console.log(agrno, email, password, "user login successfully registered");
          // Handle button click event
          if (agrno && email && password) {
            setShowLogin(false); // Hide the login component if conditions are met
          } else {
            setShowLogin(true); // Show the login component if conditions are not met
          }
        });
        console.log("Button click handler registered successfully");
      } catch (error) {
        console.error("Error registering button click handler:", error);
        // Handle registration error
      }
    }
  
    initializeTeams();
    
  
    // Cleanup function
    return () => {
      // Unregister event handlers or perform cleanup if needed
    };
  }, []);
  useEffect(() => {
    // Check if agrno, email, and password are present
    if (agrno && email && password) {
      setShowLogin(false); // Hide the login component if conditions are met
    } else {
      setShowLogin(true); // Show the login component if conditions are not met
    }
  }, [agrno, email, password]);
  
  return (
    <div
      className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}
    >
       <Client/>
      {/* <Welcome showFunction={showFunction} /> */}
      {/* {showLogin ?  <Login /> : <Client/>} */}
      
      {/* <Client showFunction={showFunction} />
      <PanelFooterExample base64Data={""}/> */}
    </div>
  );
}
