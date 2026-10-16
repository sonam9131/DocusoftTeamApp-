
// import React, { useEffect, useState } from "react";
// import "./Logintest.css";
// import { Image, makeStyles } from "@fluentui/react-components";
// import CallApi from "./sample/Services/Apicall";
// import * as microsoftTeams from '@microsoft/teams-js';
// import {
//   Json_GetAgreementList
// } from "./sample/Services/Controller";
// import { Client } from "./sample/Client";
// import TextField from "@mui/material/TextField";
// import { Alert,Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Theme, Typography } from "@mui/material";
// // import { useMemo } from 'react';
// const useStyles:any = makeStyles((theme:Theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center"
//   },
//   customContainer: {
//     padding: '24px',
//     paddingRight: '24px',
//     marginTop: '64px',
//     alignItems: 'center',
//     flexDirection: 'column',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: "white"
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   }
// }));
// const customStyles: React.CSSProperties = {
//   padding: '24px',
//   paddingRight: '24px',
//   display: 'block',
//   marginTop: '64px',
//   alignItems: 'center',
//   flexDirection: 'column',
// };
// export function Login(props: { docsUrl?: string }) {
//    const classes:any = useStyles();
//   const [agrno_MENT, setAgrno_MENT] = useState("");
//   const [email_MENT, setEmail_MENT] = useState("");
//   const [showH1, setShowH1] = useState(false); // State to control visibility
//   const [alertContent, setAlertContent] = useState('');

//   const [alert, setAlert] = useState(false);
//   useEffect(() => {
//   if(localStorage.getItem('agrno') && localStorage.getItem('email') && localStorage.getItem('pass')){
//     setShowH1(true);
//   }
//   else{
//     setShowH1(false)
//   }
// }, []);
//   const Json_GetAccessToken = (agrno: any) => {
//     // Define the URL of the API

//     // Create the request body
//     let requestBody = {
//       agrno: agrno, //"0003",
//       Email: agrno_MENT, //"Sonam.Choudhari@docusoft.net",
//       password: btoa(email_MENT), //"OFlxNDZBQ0Z5OA=="
//     };
//     console.log(requestBody, "responsdddddddddddddddddddddddddddddde11");

//     CallApi(requestBody, "Json_GetAccessToken", function (res: any) {
//       if (res) {
//         getLoggedInUser();
//         localStorage.setItem("agrno", agrno);
//         // localStorage.setItem("pass", btoa(email_MENT));
//         // localStorage.setItem("email", agrno_MENT);
//         localStorage.setItem("pass", requestBody.password);
//         localStorage.setItem("email", requestBody.Email);
//         let str = JSON.parse(JSON.stringify(res));
//         let json = str.d;
//         localStorage.setItem("projectid", json);
//         console.log(res, "response11");
//         // commanData();
//         setShowH1(true);//for now only show
//       } else {
//         localStorage.clear();
//       }
//     });
//   };
//   const getLoggedInUser = async () => {
//   await microsoftTeams.app.initialize();

//   const context = await microsoftTeams.app.getContext();

//   console.log(context.user,"Teams Context:", context);

//   // return {
//   //   name: context.user?.displayName,
//   //   email: context.user?.email,
//   //   aadObjectId: context.user?.id
//   // };
// };
//   const handleSubmit = (event:any) => {
//     event.preventDefault();
//     // eslint-disable-next-line @typescript-eslint/typedef
//     let requestBody = {
//       Email: agrno_MENT, //"Sonam.Choudhari@docusoft.net",
//       password: btoa(email_MENT), //"OFlxNDZBQ0Z5OA==",
//     };

//     console.log(requestBody, "requestbody_data");

//     const gettableJson = (tablename: any, data: any) => {
//       var n = data;
//       // //alert(data);
//       var c = n.indexOf(tablename);
//       var q = n.substring(c);
//       // //alert(q);
//       var m = q.indexOf("[");
//       var o = q.indexOf("]");
//       // //alert(m & ' ' & o);
//       o = o + 1;
//       var p = q.substring(m, o);
//       return p;
//     };
//     Json_GetAgreementList(requestBody, function (folderlist: any) {
    
//       let str = JSON.parse(JSON.stringify(folderlist));
//       console.log("folderlist", str);

//       if (str.d != null) {
//         if (str.d != "Invalid" && str.d != "") {
//           let jsonData = gettableJson("Table", str.d);
//           var json = JSON.parse(jsonData);
//           if (json.length === 1) {
//             console.log(json[0], "get AgreementList");
//             localStorage.setItem("intUserId", json[0].intUserId);
//             Json_GetAccessToken(json[0].vAgreementNo);
//           }
//         } else {
//           setAlertContent("Invalid Credentials!")
//           // <Alert variant="filled" severity="error">
//           // alert("Invalid credentials!")
//           setAlert(true);
//           setTimeout(() => {
//             setAlert(false);
//           }, 3000); // Hide after 5 seconds
//         }
//       } else {
//         console.log("error_data: returnValue is null or undefined");
//        setAlertContent("Invalid Credentials!")
//     // <Alert variant="filled" severity="error">
//     // alert("Invalid credentials!")
//     setAlert(true);
//     setTimeout(() => {
//       setAlert(false);
//     }, 3000); // Hide after 5 seconds
//       }
//     });
//   };
//   return (
//     <div>
//         {showH1 ? (
//         <Client />
//         ) : ( 
//           <Container component="main" maxWidth="xs" style={customStyles}>
             
//           <CssBaseline />
//           <div className={classes.paper}>
//               <Image
//                   src="https://mydocusoft.com/assets/images/logo.png"
//                   className="styleleft"
//                   alt="Logo"
//                 />
//             {/* </Avatar> */}
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
          
//             <form className={classes.form} noValidate onSubmit={handleSubmit}>
//             {alert ? <div style={{marginBottom:"10px"}}><Alert severity='error'>{alertContent}</Alert></div> : <></> }
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 value={agrno_MENT}
//                 onChange={(e) => {
//                   setAgrno_MENT(e.target.value);
//                 }}
//               />
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={email_MENT}
//                 onChange={(e) => {
//                   setEmail_MENT(e.target.value);
//                 }}
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 className={classes.submit}
//               >
//                 Sign In
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="https://mydocusoft.com/forgot-password.html" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//               </Grid>
//             </form>
//           </div>
//         </Container>
//         )}
   
//     </div>
//     );
// }



import React, { useEffect, useState } from "react";
import "./sample/css/Logintest.css";
import { Image, makeStyles } from "@fluentui/react-components";
import CallApi from "./sample/Services/Apicall";
import * as microsoftTeams from '@microsoft/teams-js';
import {
  Json_GetAgreementList
} from "./sample/Services/Controller";
import { Client } from "./sample/Client";
import TextField from "@mui/material/TextField";
// import * as microsoftTeams from "@microsoft/teams-js";
// import { PublicClientApplication, InteractionRequiredAuthError, BrowserAuthError } from "@azure/msal-browser";

import { Alert,Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Theme, Typography } from "@mui/material";
import { getAccessTokenLogin, loginIfNeeded } from "../auth/tokenService";
// import { useMemo } from 'react';
const useStyles:any = makeStyles((theme:Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  customContainer: {
    padding: '24px',
    paddingRight: '24px',
    marginTop: '64px',
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "white"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
const customStyles: React.CSSProperties = {
  padding: '24px',
  paddingRight: '24px',
  display: 'block',
  marginTop: '64px',
  alignItems: 'center',
  flexDirection: 'column',
};
export function Login(props: { docsUrl?: string }) {
   const classes:any = useStyles();
  const [agrno_MENT, setAgrno_MENT] = useState("");
  const [email_MENT, setEmail_MENT] = useState("");
  const [showH1, setShowH1] = useState(false); // State to control visibility
  const [alertContent, setAlertContent] = useState('');

  const [alert, setAlert] = useState(false);
  useEffect(() => {
  if(localStorage.getItem('agrno') && localStorage.getItem('email') && localStorage.getItem('pass')){
    setShowH1(true);
  }
  else{
    setShowH1(false)
  }
}, []);
  const Json_GetAccessToken = (agrno: any) => {
    // Define the URL of the API

    // Create the request body
    let requestBody = {
      agrno: agrno, //"0003",
      Email: agrno_MENT, //"Sonam.Choudhari@docusoft.net",
      password: btoa(email_MENT), //"OFlxNDZBQ0Z5OA=="
    };
    console.log(requestBody, "responsdddddddddddddddddddddddddddddde11");

    CallApi(requestBody, "Json_GetAccessToken", function (res: any) {
      if (res) {
        getLoggedInUser();
        localStorage.setItem("agrno", agrno);
        // localStorage.setItem("pass", btoa(email_MENT));
        // localStorage.setItem("email", agrno_MENT);
        localStorage.setItem("pass", requestBody.password);
        localStorage.setItem("email", requestBody.Email);
        let str = JSON.parse(JSON.stringify(res));
        let json = str.d;
        localStorage.setItem("projectid", json);
        console.log(res, "response11");
        // commanData();
        setShowH1(true);//for now only show
      } else {
        localStorage.clear();
      }
    });
  };
  const getLoggedInUser = async () => {
  await microsoftTeams.app.initialize();

  const context = await microsoftTeams.app.getContext();

  console.log(context.user,"Teams Context:", context);

  // return {
  //   name: context.user?.displayName,
  //   email: context.user?.email,
  //   aadObjectId: context.user?.id
  // };
};
// Configuration remains the same new
// const msalConfig = {
//   auth: {
//     clientId: "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
//     authority: "https://login.microsoftonline.com/common",
//   },
//   cache: { cacheLocation: "sessionStorage",storeAuthStateInCookie: true }
//   //newly added

// };

// const msalInstance = new PublicClientApplication(msalConfig);


  
//old
  // const graphRequest = {
  //   scopes: ["https://graph.microsoft.com/Team.ReadBasic.All", "https://graph.microsoft.com/User.Read"]
  // };
  //new
// const graphRequest = {
//   scopes: [
//     "https://graph.microsoft.com/User.Read",
//     "https://graph.microsoft.com/Team.ReadBasic.All"
//   ]
// };

// const getGraphAccessToken = async (): Promise<string> => {
//   await msalInstance.initialize();

//   const accounts = msalInstance.getAllAccounts();

//   if (!accounts || accounts.length === 0) {
//     throw new Error("No signed-in account found");
//   }

//   try {
//     // ✅ Silent call (AUTO refresh happens here)
//     const result = await msalInstance.acquireTokenSilent({
//       ...graphRequest,
//       account: accounts[0],
//     });

//     return result.accessToken;

//   } catch (err: any) {
//     if (err instanceof InteractionRequiredAuthError) {
//       console.warn("Token expired → popup required");
//       const result = await msalInstance.acquireTokenPopup(graphRequest);
//       return result.accessToken;
//     }

//     throw err;
//   }
// };

  // Function to call Graph once we have a token
  // const fetchGraphData = async (token: string) => {
  //   const response = await fetch("https://graph.microsoft.com/v1.0/me/joinedTeams", {
  //     headers: { Authorization: `Bearer ${token}` }
  //   });
  //   const data = await response.json();
  //   // setGraphData(data);
  //   console.log("📊 Joined Teams:", data);
  // };
const fetchGraphData = async () => {
  try {
    const token = await getAccessTokenLogin(); // 🔥 auto refresh

    // const response = await fetch(
    //   "https://graph.microsoft.com/v1.0/me/joinedTeams",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    // const data = await response.json();
    console.log("📊 Joined Teams:", token);

  } catch (error) {
    console.error("Graph API failed", error);
  }
};

  // MANUAL LOGIN (Triggered by button click - Browser allows this popup)


  useEffect(() => {
    async function initializeTeamsAndGraph() {
      try {
        // await msalInstance.initialize();
              await microsoftTeams.app.initialize();


        microsoftTeams.authentication.getAuthToken({
          successCallback: async (ssoToken: string) => {
            console.log("✅ Teams SSO token received");

            try {
              // Try Silent first (no popup)
              // const authResult = await msalInstance.acquireTokenSilent(graphRequest);
              // console.log("✅ Graph token acquired silently", authResult);
              await fetchGraphData();
            } catch (graphErr) {
              // If silent fails, show the button
              // if (graphErr instanceof InteractionRequiredAuthError || graphErr) {
                console.warn("User interaction required for Graph token.");
                // setNeedsConsent(true);
              // }
            }
          },
          failureCallback: (err) => {
            console.error("❌ Teams SSO Failure:", err);
            // setError("SSO Failed. Check Azure Portal configuration.");
          }
        });
      } catch (initErr) {
        console.error("❌ Initialization Failure:", initErr);
      }
    }

    initializeTeamsAndGraph();
  }, []);
  //old
//   const handleLoginClick = async () => {
//   try {
//     // 1. MUST await initialize before ANY MSAL call in v3+
//     // Even if called in useEffect, calling it again here is safe and necessary
//     // if the previous one hasn't completed.
//     await msalInstance.initialize();

//     // 2. Clear any stuck interaction state
//     await msalInstance.handleRedirectPromise();

//     const graphRequest = {
//       scopes: ["https://graph.microsoft.com/Team.ReadBasic.All", "https://graph.microsoft.com/User.Read"]
//     };

//     console.log("Opening Popup...");
//     const authResult = await msalInstance.acquireTokenPopup(graphRequest);
//     console.log("✅ Graph token acquired via Popup222", authResult);
//     // setNeedsConsent(false);
//     await fetchGraphData();
    
//   } catch (err) {
//     if (err instanceof BrowserAuthError && err.errorCode === "interaction_in_progress") {
//         console.error("An auth window is already open. Check your taskbar/other tabs.");
//     } else {
//         console.error("Popup Login Failed:", err);
//     }
//   }
// };
const handleLoginClick = async () => {
  try {
    await loginIfNeeded();
    await fetchGraphData(); // popup will happen automatically if needed
  } catch (err) {
    console.error("Login failed", err);
  }
};

  const handleSubmit = async(event:any) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/typedef
    let requestBody = {
      Email: agrno_MENT, //"Sonam.Choudhari@docusoft.net",
      password: btoa(email_MENT), //"OFlxNDZBQ0Z5OA==",
    };
  handleLoginClick();
    console.log(requestBody, "requestbody_data");

    const gettableJson = (tablename: any, data: any) => {
      var n = data;
      // //alert(data);
      var c = n.indexOf(tablename);
      var q = n.substring(c);
      // //alert(q);
      var m = q.indexOf("[");
      var o = q.indexOf("]");
      // //alert(m & ' ' & o);
      o = o + 1;
      var p = q.substring(m, o);
      return p;
    };
    Json_GetAgreementList(requestBody, function (folderlist: any) {
      if (!folderlist) {
        console.log("error_data: Json_GetAgreementList failed or returned nothing");
        setAlertContent("Unable to sign in. Please check your connection and try again.");
        setAlert(true);
        setTimeout(() => setAlert(false), 3000);
        return;
      }

      let str = JSON.parse(JSON.stringify(folderlist));
      console.log("folderlist", str);

      if (str.d != null) {
        if (str.d != "Invalid" && str.d != "") {
          let jsonData = gettableJson("Table", str.d);
          var json = JSON.parse(jsonData);
          if (json.length === 1) {
            console.log(json[0], "get AgreementList");
            localStorage.setItem("intUserId", json[0].intUserId);
            Json_GetAccessToken(json[0].vAgreementNo);
          }
        } else {
          setAlertContent("Invalid Credentials!")
          // <Alert variant="filled" severity="error">
          // alert("Invalid credentials!")
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 3000); // Hide after 5 seconds
        }
      } else {
        console.log("error_data: returnValue is null or undefined");
       setAlertContent("Invalid Credentials!")
    // <Alert variant="filled" severity="error">
    // alert("Invalid credentials!")
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000); // Hide after 5 seconds
      }
    });
  };
  return (
    <div>
        {showH1 ? (
        <Client />
        ) : (
          <div className="login-split">
            <CssBaseline />

            <div className="login-split__hero">
              <div className="login-split__hero-logo-wrap">
                <Image
                  src="https://mydocusoft.com/assets/images/logo.png"
                  className="login-split__hero-logo"
                  alt="Docusoft"
                />
              </div>
              <h1 className="login-split__hero-title">
                One place to run every client Team.
              </h1>
              <p className="login-split__hero-subtitle">
                Create, import and manage your Microsoft Teams clients directly
                from Docusoft — no more jumping between tools.
              </p>
              <ul className="login-split__hero-points">
                <li>Spin up a branded Team in a few clicks</li>
                <li>Import existing clients without re-keying data</li>
                <li>Keep every engagement organised in one view</li>
              </ul>
            </div>

            <div className="login-split__panel">
              <div className="login-card">
                <Typography className="login-card__title" component="h1" variant="h5">
                  Welcome back
                </Typography>
                <Typography className="login-card__subtitle">
                  Sign in to continue to Docusoft Teams
                </Typography>

                <form noValidate onSubmit={handleSubmit}>
                  {alert ? (
                    <div style={{ marginBottom: "16px" }}>
                      <Alert severity="error">{alertContent}</Alert>
                    </div>
                  ) : (
                    <></>
                  )}
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={agrno_MENT}
                    onChange={(e) => {
                      setAgrno_MENT(e.target.value);
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={email_MENT}
                    onChange={(e) => {
                      setEmail_MENT(e.target.value);
                    }}
                  />
                  <div className="login-card__footer-row">
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label={<span style={{ fontSize: 14 }}>Remember me</span>}
                    />
                    <Link href="https://mydocusoft.com/forgot-password.html" variant="body2">
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    className="login-card__submit btn-blue"
                  >
                    Sign In
                  </Button>
                </form>
              </div>
              <div className="login-screen__copyright">
                &copy; {new Date().getFullYear()} Docusoft. All rights reserved.
              </div>
            </div>
          </div>
        )}

    </div>
    );
}
