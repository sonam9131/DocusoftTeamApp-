// import React, { useEffect, useState } from "react";
// import "./Logintest.css";
// import { Image } from "@fluentui/react-components";
// import CallApi from "./sample/Services/Apicall";
// import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
// import getFolder, {
//   Json_GetAgreementList,
//   Json_GetFolders,
// } from "./sample/Services/Controller";
// import App1 from "./App1";
// import { Client } from "./sample/Client";
// // import { useMemo } from 'react';

// export function Login(props: { docsUrl?: string }) {
//   const [agrno, setAgrno] = useState("");
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const [agrno_MENT, setAgrno_MENT] = useState("");
//   const [email_MENT, setEmail_MENT] = useState("");
//   const [showLogin, setShowLogin] = useState(false);
//   const [showH1, setShowH1] = useState(false); // State to control visibility
//   useEffect(() => {
//     try {
//         // app.getContext().then((context: any) => {
//         //     alert("context loaded");
//         //     if (context && context.app.sessionId === "fc504759-7940-48ef-9507-696880745642") {
//         //         console.log("tabs_render",context);
//         //         // User is in a tab
                
//         //       }
//         //     /*...*/
//         // });
//       } catch (err) {
//         // Handle errors
//       }
//   if(localStorage.getItem('agrno') && localStorage.getItem('email') && localStorage.getItem('pass')){
//     setShowH1(true);
//     // eslint-disable-next-line @typescript-eslint/no-use-before-define
//     // commanData();
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
//         localStorage.setItem("agrno", agrno);
//         localStorage.setItem("pass", email_MENT);
//         localStorage.setItem("email", agrno_MENT);
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
//   const setAgrno_data = (event:any, newValue:any) => {
//     setAgrno(newValue || ''); // Use empty string to handle null or undefined values
//   };
//   const setEmail_data = (event:any, newValue:any) => {
//     setEmail(newValue || ''); // Use empty string to handle null or undefined values
//   };
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
//             Json_GetAccessToken(json[0].vAgreementNo);
//           }
//         } else {
//           $("#loginerror").show();
//           // Automatically hide the error message after 5000 milliseconds (5 seconds)
//           setTimeout(function () {
//             $("#loginerror").hide();
//           }, 5000);
//         }
//       } else {
//         console.log("error_data: returnValue is null or undefined");
//         $("#loginerror").show();
//         // Automatically hide the error message after 5000 milliseconds (5 seconds)
//         setTimeout(function () {
//           $("#loginerror").hide();
//         }, 5000);
//       }
//     });
//   };
//   return (
//     <div>
//       {showH1 ? (
//         // <App1/>
//         <Client />
//         ) : (
//           <div className="publish page">
//       {/* <h2>Login to Teams</h2> */}
//       <form onSubmit={handleSubmit}>
//       <div className="container  h-100" id="showLogin">
//         <div className="row h-100">
//           <div className="col-lg-6 col-md-12 col-sm-12 mx-auto align-self-center">
//             <div className="login-form">
//               <div className="text-center">
//                 <img
//                   src="https://mydocusoft.com/assets/images/logo.png"
//                   className=""
//                   alt="Logo"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="mb-1 text-dark">Email</label>
//                 <input
//                   type="email"
//                   name=""
//                   className="form-control form-control"
//                   value={agrno_MENT}
//                   id="txtEmail"
//                   placeholder="Email"
//                   onChange={(e) => {
//                     setAgrno_MENT(e.target.value);
//                   }}
//                 />
//               </div>
//               <div className="mb-4 position-relative">
//                 <label className="mb-1 text-dark">Password</label>
//                 <input
//                   type="password"
//                   name=""
//                   id="txtPass"
//                   className="form-control"
//                   value={email_MENT}
//                   placeholder="Password"
//                   onChange={(e) => {
//                     setEmail_MENT(e.target.value);
//                   }}
//                 />
//                 <span className="show-pass eye">
//                   <i className="fa fa-eye-slash"></i>
//                   <i className="fa fa-eye"></i>
//                 </span>
//               </div>

//               <div className="form-row d-flex justify-content-between mt-4 mb-2">
//                 <div className="mb-4">
//                   <div className="form-check custom-checkbox mb-3">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       id="customCheckBox1"
//                     />
//                     <label className="form-check-label">
//                       Remember my preference
//                     </label>
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <a
//                     href="https://www.mydocusoft.com/forgot-password.html"
//                     className="btn-link text-primary"
//                   >
//                     Forgot Password?
//                   </a>
//                 </div>
//               </div>
//               <div className="text-center mb-4">
//                 <button
//                   type="submit"
//                   className="btn btn-primary btn-block success"
//                   id="btnSubmit"
//                   // onClick={commanData}
//                 >
//                   Sign In
//                 </button>
//                  {/* <PrimaryButton text="Submit" style={{ marginTop: '15px' }} onClick={Json_GetAccessToken} /> */}
//               </div>
//               <h6 className="login-title">
//                 <span></span>
//               </h6>

//               <div className="mb-3"></div>
//               <p className="text-center"></p>
//             </div>
//           </div>
//         </div>
//       </div>
//       </form>
//     </div>
//         )}
    
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import "./Logintest.css";
import { Image, makeStyles } from "@fluentui/react-components";
import CallApi from "./sample/Services/Apicall";
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import getFolder, {
  Json_GetAgreementList,
  Json_GetFolders,
} from "./sample/Services/Controller";
import App1 from "./App1";
import { Client } from "./sample/Client";
import TextField from "@mui/material/TextField";
import { Alert, Avatar, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Theme, Typography } from "@mui/material";
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
  const [agrno, setAgrno] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [agrno_MENT, setAgrno_MENT] = useState("");
  const [email_MENT, setEmail_MENT] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showH1, setShowH1] = useState(false); // State to control visibility
  const [alertContent, setAlertContent] = useState('');

  const [alert, setAlert] = useState(false);
  useEffect(() => {
    try {
        // app.getContext().then((context: any) => {
        //     alert("context loaded");
        //     if (context && context.app.sessionId === "fc504759-7940-48ef-9507-696880745642") {
        //         console.log("tabs_render",context);
        //         // User is in a tab
                
        //       }
        //     /*...*/
        // });
      } catch (err) {
        // Handle errors
      }
  if(localStorage.getItem('agrno') && localStorage.getItem('email') && localStorage.getItem('pass')){
    setShowH1(true);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    // commanData();
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
  const setAgrno_data = (event:any, newValue:any) => {
    setAgrno(newValue || ''); // Use empty string to handle null or undefined values
  };
  const setEmail_data = (event:any, newValue:any) => {
    setEmail(newValue || ''); // Use empty string to handle null or undefined values
  };
  const handleSubmit = (event:any) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/typedef
    let requestBody = {
      Email: agrno_MENT, //"Sonam.Choudhari@docusoft.net",
      password: btoa(email_MENT), //"OFlxNDZBQ0Z5OA==",
    };

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
          <Container component="main" maxWidth="xs" style={customStyles}>
             
          <CssBaseline />
          <div className={classes.paper}>
         
            {/* <Avatar className={classes.avatar}> */}
              {/* <LockOutlinedIcon /> */}
              <Image
                  src="https://mydocusoft.com/assets/images/logo.png"
                  className="styleleft"
                  alt="Logo"
                />
            {/* </Avatar> */}
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            {alert ? <div style={{marginBottom:"10px"}}><Alert severity='error'>{alertContent}</Alert></div> : <></> }
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="https://mydocusoft.com/forgot-password.html" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
            </form>
          </div>
        </Container>
        )}
   
    </div>
    );
}
