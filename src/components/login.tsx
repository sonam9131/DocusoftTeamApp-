
import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { TextField } from '@fluentui/react/lib/TextField';
import { useState,useEffect } from 'react';
// import {DatePickerBasicExample} from './upload';
import CallApi from './sample/Services/Apicall';
import getFolder, { Json_GetFolders } from './sample/Services/Controller';
import App1 from './App1';
import { app, Context } from "@microsoft/teams-js";
// eslint-disable-next-line @typescript-eslint/naming-convention
interface PanelFooterExampleProps {
  base64Data: string;
}
export const PanelFooterExample: React.FC<PanelFooterExampleProps> = ({ base64Data }) => {
  const [isOpen, { setFalse: dismissPanel }] = useBoolean(true);
  const [agrno,setAgrno]=useState("");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [showH1, setShowH1] = useState(false); // State to control visibility
  const [folderdata,setfolderdata] =useState([]);
  const [folderlist,setfolderlist] =useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    commanData();
  }
  else{
    setShowH1(false)
  }
}, []);
const commanData =()=>{
    // eslint-disable-next-line @typescript-eslint/typedef
    let requestBody = {
      agrno:localStorage.getItem('agrno'), //"0003",
      Email: localStorage.getItem('email'),//"Sonam.Choudhari@docusoft.net",
      password: localStorage.getItem('pass'),//"OFlxNDZBQ0Z5OA==",
    };
    let requestBody1 = {
      agrno:localStorage.getItem('agrno'), //"0003",
      Email: localStorage.getItem('email'),//"Sonam.Choudhari@docusoft.net",
      password: localStorage.getItem('pass'),//"OFlxNDZBQ0Z5OA==",
      ProjectId:localStorage.getItem('projectid'), 
      SectionId:"-1",
      ClientId:"",
      //ProjectId:fid
    };
   
    getFolder(requestBody1,function(folderdata:any){
      console.log("folderdata",folderdata);
      let str = JSON.parse(JSON.stringify(folderdata));
      let json = JSON.parse(str.d);         
      console.log("str_str11",json);
      setfolderdata(json);
    });
    Json_GetFolders(requestBody,function(folderlist:any){
      console.log("folderlist",folderlist);
      let str = JSON.parse(JSON.stringify(folderlist));
      let json = JSON.parse(str.d)
      console.log("str_str22",json);
      setfolderlist(json);
    });
  }
  const Json_GetAccessToken = () => {
    // Define the URL of the API

    // Create the request body
    let requestBody = {
      agrno: agrno,//"0003",
      Email:email, //"Sonam.Choudhari@docusoft.net",
      password: btoa(pass)//"OFlxNDZBQ0Z5OA=="
    };
    console.log(requestBody,"responsdddddddddddddddddddddddddddddde11");  

    CallApi(requestBody,'Json_GetAccessToken',function(res:any){
      if(res){
        localStorage.setItem("agrno",agrno);
        localStorage.setItem("pass",pass);
        localStorage.setItem("email",email);
        let str = JSON.parse(JSON.stringify(res));
        let json = str.d;        
        localStorage.setItem("projectid",json);
        console.log(res,"response11");  
        commanData();
        setShowH1(true);
      } else {
        //localStorage.clear();
        
      }
    })
  };
const setAgrno_data = (event:any, newValue:any) => {
  setAgrno(newValue || ''); // Use empty string to handle null or undefined values
};
const setEmail_data = (event:any, newValue:any) => {
  setEmail(newValue || ''); // Use empty string to handle null or undefined values
};

const setPass_data = (event:any, newValue:any) => {
  setPass(newValue || ''); // Use empty string to handle null or undefined values
};


  return (
    <div>
      {/* <DefaultButton text="Open panel" onClick={openPanel} /> */}
      {/* <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="MyDocusoft"
        closeButtonAriaLabel="Close"
      > */}
         {showH1 ? (
        <App1/>
        ) : (
          <div>
            <div >
              <label>Agno:</label>
              <TextField onChange={setAgrno_data} />
              <label>Email:</label>
              <TextField onChange={setEmail_data} />
              <label>Password:</label>
              <TextField onChange={setPass_data} />
              <PrimaryButton text="Submit" style={{ marginTop: '15px' }} onClick={Json_GetAccessToken} />
            </div>
          </div>
        )}
       
      {/* </Panel> */}
    </div>
  );
};
