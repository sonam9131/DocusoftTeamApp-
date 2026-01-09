// // https://fluentsite.z22.web.core.windows.net/quick-start
// import {
//   FluentProvider,
//   teamsLightTheme,
//   teamsDarkTheme,
//   teamsHighContrastTheme,
//   Spinner,
//   tokens,
// } from "@fluentui/react-components";
// import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
// import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
// import Privacy from "./Privacy";
// import TermsOfUse from "./TermsOfUse";
// import Tab from "./Tab";
// import { TeamsFxContext } from "./Context";
// import config from "./sample/lib/config";
// import App1 from "./App1";
// import Admin from "./Admin";
// import Enguagements from "./Enguagements";
// import Analytics from "./Analytics";
// import Templatelist from "./Templatelist";


// /**
//  * The main app which handles the initialization and routing
//  * of the app.
//  */
// export default function App() {
//   const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
//     initiateLoginEndpoint: config.initiateLoginEndpoint!,
//     clientId: config.clientId!,
//   });
//   console.log(config,"configconfig");
//   return (
    
//     <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential }}>
//       <FluentProvider
//         theme={
//           themeString === "dark"
//             ? teamsDarkTheme
//             : themeString === "contrast"
//             ? teamsHighContrastTheme
//             : {
//                 ...teamsLightTheme,
//                 colorNeutralBackground3: "#eeeeee",
//               }
//         }
//         style={{ background: tokens.colorNeutralBackground3 }}
//       >
//         <Router>
//           {loading ? (
//             <Spinner style={{ margin: 100 }} />
//           ) : (
//             <Routes>
//               <Route path="/privacy" element={<Privacy />} />
//               <Route path="/termsofuse" element={<TermsOfUse />} />
//               <Route path="/tab" element={<Tab />} />
//               <Route path="*" element={<Navigate to={"/tab"} />}></Route>
//               <Route path="/admin" element={<Admin />} />
//               <Route path="/enguagement" element={<Enguagements />} />
//               <Route path="/analytics" element={<Analytics />} />
             
//             </Routes>
//           )}
//         </Router>
//       </FluentProvider>
//     </TeamsFxContext.Provider>
//   );
// }


import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  Spinner,
  tokens,
} from "@fluentui/react-components";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import Admin from "./Admin";
import Enguagements from "./Enguagements";
import Analytics from "./Analytics";
import { Login } from "./Logintest";
import RequireAuth from "./RequireAuth";

export default function App() {
  const { loading, theme, themeString, teamsUserCredential } = useTeamsUserCredential({
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
    clientId: config.clientId!,
  });

  return (
    <TeamsFxContext.Provider value={{ theme, themeString, teamsUserCredential }}>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {loading ? (
            <Spinner style={{ margin: 100 }} />
          ) : (
            <Routes>
              {/* Public Routes */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/tab"
                element={
                  <RequireAuth>
                    <Tab />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequireAuth>
                    <Admin />
                  </RequireAuth>
                }
              />
              <Route
                path="/enguagement"
                element={
                  <RequireAuth>
                    <Enguagements />
                  </RequireAuth>
                }
              />
              <Route
                path="/analytics"
                element={
                  <RequireAuth>
                    <Analytics />
                  </RequireAuth>
                }
              />

              {/* Default Redirect */}
              <Route path="*" element={<Navigate to="/tab" />} />
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
