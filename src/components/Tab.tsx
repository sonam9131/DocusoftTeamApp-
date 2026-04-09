import { useContext, useEffect, useState } from "react";
// import { Welcome } from "./sample/Welcome";
import { Client } from "./sample/Client";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import * as microsoftTeams from '@microsoft/teams-js';
// import { setGlobalAccessToken } from "../redux/dev_teams_slice";
import { useDispatch } from "react-redux";
const showFunction = Boolean(config.apiName);
let agrno = localStorage.getItem("agrno");
let email = localStorage.getItem("email");
let password = localStorage.getItem("pass");
export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  const [showLogin, setShowLogin] = useState(false);
const dispatch = useDispatch<any>();

// 1. Move the instance creation outside the component to prevent re-renders
// const msalConfig = {
//   auth: {
//     clientId: "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
//     authority: "https://login.microsoftonline.com/common",
//   },
//   cache: {
//     cacheLocation: "sessionStorage", // Safe for Teams Tabs
//   }
// };

// const msalInstance = new PublicClientApplication(msalConfig);

// // Inside your component:
// useEffect(() => {
//   async function initializeTeamsAndGraph() {
//     try {
//       console.log("Initializing MSAL and Teams...");
      
//       // STEP 1: Await MSAL Initialization (This fixes your error)
//       await msalInstance.initialize();
      
//       // STEP 2: Initialize Teams SDK
//       await microsoftTeams.initialize();

//       // STEP 3: Start the SSO Flow
//       microsoftTeams.authentication.getAuthToken({
//         successCallback: async (ssoToken: string) => {
//           console.log("✅ Teams SSO token received");

//           const graphRequest = {
//             scopes: ["https://graph.microsoft.com/Team.ReadBasic.All", "https://graph.microsoft.com/User.Read"]
//           };

//           try {
//             // STEP 4: Get Graph Token
//             // Silent check first
//             const authResult = await msalInstance.acquireTokenSilent(graphRequest).catch(async () => {
//               // Popup if silent fails (requires "Single-page application" platform in Azure Portal)
//               return await msalInstance.acquireTokenPopup(graphRequest);
//             });

//             const graphToken = authResult.accessToken;
//               console.log("✅ Graph Teams SSO token received",graphToken);
//             // STEP 5: Call Graph
//             const response = await fetch("https://graph.microsoft.com/v1.0/me/joinedTeams", {
//               headers: { Authorization: `Bearer ${graphToken}` }
//             });
//             const data = await response.json();
//             console.log("📊 Joined Teams:", data);

//           } catch (graphErr) {
//             console.error("❌ MSAL/Graph Error:", graphErr);
//           }
//         },
//         failureCallback: (error) => {
//           console.error("❌ Teams SSO Failure:", error);
//         }
//       });
//     } catch (initErr) {
//       console.error("❌ Initialization Failure:", initErr);
//     }
//   }

//   initializeTeamsAndGraph();
// }, []);
// // 1. MSAL Configuration
// const msalConfig = {
//   auth: {
//     clientId: "9cc33c54-4615-47f4-94dc-7ccaa75e5378", // Your App ID
//     authority: "https://login.microsoftonline.com/common", // Or your specific Tenant ID
//   }
// };

// const msalInstance = new PublicClientApplication(msalConfig);

// useEffect(() => {
//   async function initializeTeamsAndGraph() {
//     await microsoftTeams.initialize();

//     // Step A: Get the Teams Identity Token (for your own backend/identity)
//     microsoftTeams.authentication.getAuthToken({
//       successCallback: async (ssoToken: string) => {
//         console.log("✅ Teams SSO Token (Audience is your App):", ssoToken);

//         // Step B: Get a GRAPH Token (Audience is https://graph.microsoft.com)
//         try {
//           const graphRequest = {
//             scopes: ["https://graph.microsoft.com/User.Read", "https://graph.microsoft.com/Team.ReadBasic.All"]
//           };

//           // Try to get token silently first
//           const authResult = await msalInstance.acquireTokenSilent(graphRequest).catch(async () => {
//             // If silent fails, open a popup (common for first-time consent)
//             return await msalInstance.acquireTokenPopup(graphRequest);
//           });

//           const graphToken = authResult.accessToken;
//           console.log("✅ Graph Token (Use this for /joinedTeams):", graphToken);

//           // Step C: Call Microsoft Graph
//           const response = await fetch("https://graph.microsoft.com/v1.0/me/joinedTeams", {
//             headers: { Authorization: `Bearer ${graphToken}` }
//           });
//           const data = await response.json();
//           console.log("📊 Joined Teams Data:", data);

//         } catch (err) {
//           console.error("❌ Graph Token Error:", err);
//         }
//       },
//       failureCallback: (error) => console.error("❌ SSO Error:", error)
//     });
//   }

//   initializeTeamsAndGraph();
// }, []);
  useEffect(() => {
     async function initializeTeams1() {
    console.log("Initializing Teams");

    await microsoftTeams.initialize();

    microsoftTeams.getContext(() => {
      console.log("Teams context ready");

      microsoftTeams.authentication.getAuthToken({
        successCallback: (token: string) => {
          console.log("✅ Teams SSO token:", token);
        },
        failureCallback: (error: any) => {
  console.error("❌ SSO error (raw):", error);
  console.error("❌ SSO error (stringified):", JSON.stringify(error));
}
      });
    });
  }

  // initializeTeams1();
    async function initializeTeams() {
        console.log("currentUsercurrentUser");
      try {
        await microsoftTeams.initialize();
//         microsoftTeams.authentication.getAuthToken({
//   successCallback: (token: string) => {
//     console.log("Auth token received:", token);
//     dispatch(setGlobalAccessToken(token));
//   },
//   failureCallback: (error: string) => {
//     console.error(error);
//   },
// });

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
//   function trySilentSSO() {
//   return new Promise((resolve, reject) => {
//     microsoftTeams.authentication.getAuthToken({
//       successCallback: (token) => resolve(token),
//       failureCallback: (error) => reject(error)
//     });
//   });
// }

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
    //      const token = await trySilentSSO();
    // console.log("SSO Token:", token);
        console.log("Button click handler registered successfully");
      } catch (error) {
        console.error("Error registering button click handler:", error);
        // Handle registration error
      }
    }
  
    initializeTeams();
    
  
    // // Cleanup function
    // return () => {
    //   // Unregister event handlers or perform cleanup if needed
    // };
    //  initializeTeams();
  }, []);
  useEffect(() => {
    // Check if agrno, email, and password are present
    if (agrno && email && password) {
      setShowLogin(false); // Hide the login component if conditions are met
      
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
