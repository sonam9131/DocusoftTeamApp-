// import { Container } from '@mui/material'
import React, { useContext, useEffect, useState } from "react";
// import { Col } from 'react-bootstrap'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  TextField,
  Box,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,

} from "@mui/material";
import CallApi, { CallApiphp } from "../Services/Apicall";
import { ExpandMore } from "@mui/icons-material";
import Member from "../../Member";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../../Context";
import { app } from "@microsoft/teams-js";
import { settings } from "cluster";
let folderData: any;
let clientData: any;
let clientName: any;
let agrno: any = localStorage.getItem("agrno");
let email: any = localStorage.getItem("email");
let password: any = localStorage.getItem("pass");
let intUserid: any = localStorage.getItem("intUserId");
export default function ImportclientForm() {
  const [tabs, setTabs] = useState<any>([]);
  const [channels, setChannels] = useState<any>([]);
  const [expanded1, setExpanded1] = useState<string | false>(false);
  const [advancedSettingChecked, setAdvancedSettingChecked] = useState(true);
  const [channels1true, setChannels1true] = useState<any>(false);
  const [folders, setFolders] = useState([]); // State to hold folders data
  const [bussiness, setBussiness] = useState([]); // State to hold folders data
  const [checkboxfeb, setCheckboxfeb] = useState<any>(false);
  const [switchStates, setSwitchStates] = useState<any>({});
  const [selectedFolderID, setSelectedFolderID] = useState<number | null>(null);
  const [selectedBussId, setSelectedBussId] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [tabsapidata, setTabsapidata] = useState<any>([]);
  const [teams, setTeams] = useState([]);
  const [value, setValue] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  const [templateData, setTemplateData] = useState<any>(null);
  const [getclientid, setGetclientid] = useState("");
  const [memberuser, setMemberuser] = useState([]);
  const [getprojectid, setGetprojectid] = useState("");
  const [channelSettings, setChannelSettings] = useState({
    allowCreateUpdateChannels: true,
    allowDeleteChannels: true,
    allowAddRemoveApps: true,
    allowCreateUpdateRemoveTabs: true,
    allowCreateUpdateRemoveConnectors: true,
    allowCreateUpdateChannelsGuest: false,
    allowDeleteChannelsGuest: false,
    allowDeleteChannelsFun: true,
    allowStickersAndMemesFun: true,
    allowCustomMemesFun: true,
    allowUserEditMessages: true,
    allowUserDeleteMessages: true,
    allowOwnerDeleteMessages: true,
    allowTeamMentions: true,
    allowChannelMentions: true,
    showInTeamsSearchAndSuggestions: true
  });
  const [userDetail, setUserDetail] = useState({
    CHnumber: "",
    Clientname: "",
    Clientid: "",
    Mobile: "",
    Telephone: "",
    Line1: "",
    Line2: "",
    Line3: "",
    Town: "",
    MCounty: "",
    Postcode: "",
    BilLine1: "",
    BilLine2: "",
    BilLine3: "",
    BilTown: "",
    BilCountry: "",
    BilPostcode: "",
    regLine1: "",
    regLine2: "",
    regLine3: "",
    regTown: "",
    regCountry: "",
    regPostcode: "",
    Selectclient: "",
    Selectteamsa: "",
    addDetails: "",
    mainAddress: "",
    biliAddress: "",
    regAddress: "",
    fullAddress: "",
    Bussiness: "",
    Status: "",
    Source: "",
    Manager: "",
  });
  const handleChannelSettingChange = (event: any) => {
    const { name, checked } = event.target;
    setChannelSettings((prevSettings) => ({
      ...prevSettings,
      [name]: checked,
    }));
  };
  const handleAdvancedSettingChange = (event: any) => {
    setAdvancedSettingChecked(event.target.checked);
  };
  const Json_GetFolders = () => {
    let passdata: any = localStorage.getItem("pass");
    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      Email: localStorage.getItem("email"),
      password: passdata,
    };

    CallApi(requestBody, "Json_GetFolders", function (res: any) {
      if (res) {
        console.log(res, "response11");
        let str = JSON.parse(JSON.stringify(res));
        let json = JSON.parse(str.d);
        // folderData = json.Table
        // console.log(folderData,"foldersfolders");
        setFolders(json.Table);
        console.log(folders, "foldersfolders");
      } else {
        // Handle error if needed
      }
    });
  };
  const onChangeclientlist = (
    event: React.ChangeEvent<{}>,
    value: FolderList | null
  ) => {
    event.preventDefault();
    if (value) {
      // Update the selectedFolderID state with the FolderID of the selected option
      folderData = value.FolderID;
      Json_GetClientsByFolder(folderData);
      setSelectedFolderID(value.FolderID);
      console.log(value.FolderID, "FolderID", selectedFolderID);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setSelectedFolderID(null);
    }
  };
  const Json_GetClientsByFolder = (projectId: any) => {
    let passdata: any = localStorage.getItem("pass");
    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      Email: localStorage.getItem("email"),
      password: passdata,
      ProjectId: projectId,
    };
    CallApi(requestBody, "Json_GetCCodeClientsByFolder", function (res: any) {
      if (res) {
        console.log(res, "Json_GetCCodeClientsByFolder");
        let str = JSON.parse(JSON.stringify(res));
        let json = JSON.parse(str.d);
        const filteredData = json.Table.filter((item: any) => !item.MTeamId);

        console.log(json.Table, "Getclientbyfolder", filteredData);

        setBussiness(filteredData);
      } else {
      }
    });
  };
  const defaultProps = {
    options: teams,
    getOptionLabel: (option: FilmOptionType) => option.Name || "",
  };
  const handleChannecheck = (event: any,index:any) => {

    // setCheckboxfeb(event.target.checked);
    
    const { checked } = event.target;
    setCheckboxfeb((prevCheckboxes:any) => {
      const updatedCheckboxes = [...prevCheckboxes];
      updatedCheckboxes[index] = checked;
      return updatedCheckboxes;
    });
    const newChannels1: any = [...channels];
    newChannels1[index] = {
      ...newChannels1[index],
      isFavoriteByDefault: event.target.checked,
    };
    setChannels(newChannels1);
  };
  const onChangeTeams = (
    event: React.ChangeEvent<{}>,
    value: FilmOptionType | null
  ) => {
    event.preventDefault();
    if (value) {
      setValue(value.TemplateId ? value.TemplateId : "");
      console.log(value, "SourceIdiiioioioi");
      getMSTeamsTemplatesDetailsById(value.TemplateId);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setValue(null);
    }
  };
  const getMSTeamsTemplatesList = () => {
    let requestBody = {
      agrno: agrno,
      strEmail: email,
      password: password,
    };

    CallApiphp(requestBody, "getMSTeamsTemplatesList", function (res: any) {
      if (res) {
        console.log(res, "getMSTeamsTemplatesList");
        setTeams(res.data);
      } else {
      }
    });
  };
  const getAccessToken = () => {
    let request = {
      "clientId": "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
      "clientSecret": "REDACTED_SECRET_ROTATE_ME",
      "tenantId": "00175dea-da9a-4dfa-8dd0-7f96eb63ace0"
    }
    CallApiphp(request, "getAccessToken", function (res: any) {
      if (res) {
        console.log(res.token, "getAccessToken");
        // getUsersMSTeam(res.token);
        setTemplateData(res.token);
      } else {
      }
    });
  }
  const getMSTeamsTemplatesDetailsById = (templateId: any) => {
    let requestBody = {
      agrno: agrno,
      strEmail: email,
      password: password,
      TemplateId: templateId,
    };

    CallApiphp(
      requestBody,
      "getMSTeamsTemplatesDetailsById",
      function (res: any) {
        if (res) {
          console.log(
            JSON.parse(res.data[0].TemplateData),
            "getMSTeamsTemplatesDetailsById",
            res
          );
          let jsondata = res.data[0];
          let templatesettings = JSON.parse(jsondata.TemplateSettings);
          console.log(templatesettings, "templatesettings");
          // setTemplatesettings(templateSettings);
          if (templatesettings) {
            setChannelSettings((prevUserDetail) => ({
              ...prevUserDetail,
              allowCreateUpdateChannels:
                templatesettings.memberSettings.allowCreateUpdateChannels,
              allowDeleteChannels:
                templatesettings.memberSettings.allowDeleteChannels,
              allowAddRemoveApps:
                templatesettings.memberSettings.allowAddRemoveApps,
              allowCreateUpdateRemoveTabs:
                templatesettings.memberSettings.allowCreateUpdateRemoveTabs,
              allowCreateUpdateRemoveConnectors:
                templatesettings.memberSettings
                  .allowCreateUpdateRemoveConnectors,
              allowCreateUpdateChannelsGuest:
                templatesettings.guestSettings.allowCreateUpdateChannelsGuest,
              allowDeleteChannelsGuest:
                templatesettings.guestSettings.allowDeleteChannelsGuest,
              allowDeleteChannelsFun:
                templatesettings.funSettings.allowDeleteChannelsFun,
              allowStickersAndMemesFun:
                templatesettings.funSettings.allowStickersAndMemesFun,
              allowCustomMemesFun:
                templatesettings.funSettings.allowCustomMemesFun,
              allowUserEditMessages:
                templatesettings.messagingSettings.allowUserEditMessages,
              allowUserDeleteMessages:
                templatesettings.messagingSettings.allowUserDeleteMessages,
              allowOwnerDeleteMessages:
                templatesettings.messagingSettings.allowOwnerDeleteMessages,
              allowTeamMentions:
                templatesettings.messagingSettings.allowTeamMentions,
              allowChannelMentions:
                templatesettings.messagingSettings.allowChannelMentions,
              showInTeamsSearchAndSuggestions:
                templatesettings.discoverySettings
                  .showInTeamsSearchAndSuggestions,
            }));
          }
          let json = JSON.parse(jsondata.TemplateData);
          console.log(json, "jsondata");
           setChannels(json);
          if(json && json.length > 0){
            const initialCheckboxes =json.map((data:any) => data.isFavoriteByDefault || false
            ); // Initialize all checkboxes to false
            setCheckboxfeb(initialCheckboxes);
          
            json.map((data:any,index1:any) =>{
              // {item1 &&
              //   Array.isArray(item1.tabs) &&
              //                 item1?.tabs
              data && Array.isArray(data.tabs) && data?.tabs.map((item:any,index:any) =>{
                HandleChangeDataPush(item,index1);
              })
             
            });
           
          
          }
          setTemplate(json);
         
        } else {
        }
      }
    );
  };
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });

  function HandleChangeDataPush(item:any,Ind:any){
 // Create a new tab object structure
 var Objt = {
  agrno: agrno,
  email: email,
  password: password,
};

console.log("dataStringdataString", window.btoa(JSON.stringify(Objt)));
const newTab = {
  "teamsApp@odata.bind":
    "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.web",
  displayName: item.displayName,
  configuration: {
    contentUrl: `${tabsapidata[0]?.BaseUrl}?clientID=${
      clientData
    }&projectID=${selectedFolderID}&Token=${window.btoa(
      JSON.stringify(Objt)
    )}`,
  },
};




const newChannels1: any = [...channels];
    newChannels1[Ind] = {
      ...newChannels1[Ind],
      tabs: [newTab],
    };
   // setChannels(newChannels1);
   setChannels((prevChannels:any) => {
    const newChannels = [...prevChannels];
    newChannels[Ind] = {
      ...newChannels[Ind],
      tabs: [newTab],
    };
    return newChannels;
  });
  
    setTimeout(() => {
      console.log(newChannels1,channels, "newTabdata1111111111111111",newTab);
    }, 4000);

  }
  const userName = loading || error ? "" : data!.displayName;
  const hubName = useData(async () => {
    await app.initialize();
    const context = await app.getContext();
    return context.app.host.name;
  })?.data;
  const userNameData: any = loading || error ? "" : data;
  console.log(memberuser, "memberusermemberuser");
  const createDefaultTeam = () => {
    let datacurrent:any = localStorage.getItem("currentUser");
    let currentuserData = JSON.parse(datacurrent);
    console.log(channels,"datacurrentsonam",template);
    let agrno: any = localStorage.getItem("agrno");
    let email: any = localStorage.getItem("email");
    let password: any = localStorage.getItem("pass");
    let projectId: any = localStorage.getItem("projectid");
    let templatedata: any = {
      "template@odata.bind":
        "https://graph.microsoft.com/v1.0/teamsTemplates/standard",
      visibility: "Private",
      displayName: clientData,
      description: "Docusoft related data with documents and apps.",
      members: [
        {
          "@odata.type":"#microsoft.graph.aadUserConversationMember",
          "roles":[
              "owner"
],
          "user@odata.bind":`https://graph.microsoft.com/v1.0/users/9ea0ec3d-960d-4894-b9ef-f26a4adc6d35`
        }
      ],
      channels: template,//channels && channels.length > 0 ? channels : template,
      memberSettings: {
        allowCreateUpdateChannels: channelSettings.allowCreateUpdateChannels ,
        allowDeleteChannels: channelSettings.allowDeleteChannels,
        allowAddRemoveApps: channelSettings.allowAddRemoveApps,
        allowCreateUpdateRemoveTabs: channelSettings.allowCreateUpdateRemoveTabs,
        allowCreateUpdateRemoveConnectors: channelSettings.allowCreateUpdateRemoveConnectors,
        "TeamMember.ReadWriteNonOwnerRole.All": true,
        "TeamMember.ReadWrite.All": true
      },
      guestSettings: {
        allowCreateUpdateChannels:  channelSettings.allowCreateUpdateChannels,
        allowDeleteChannels: channelSettings.allowDeleteChannels
      },
      funSettings: {
        allowGiphy: channelSettings.allowDeleteChannelsFun,
        giphyContentRating: "Moderate",
        allowStickersAndMemes: channelSettings.allowStickersAndMemesFun,
        allowCustomMemes: channelSettings.allowCustomMemesFun
      },
      messagingSettings: {
        allowUserEditMessages: channelSettings.allowUserEditMessages,
        allowUserDeleteMessages: channelSettings.allowUserDeleteMessages,
        allowOwnerDeleteMessages: channelSettings.allowOwnerDeleteMessages,
        allowTeamMentions: channelSettings.allowTeamMentions,
        allowChannelMentions: channelSettings.allowChannelMentions,
      },
      discoverySettings: {
        showInTeamsSearchAndSuggestions: channelSettings.showInTeamsSearchAndSuggestions
      },
    };
    let memberdata = memberuser;
    let clienttestObj = {
      agrno: agrno,
      Email: email,
      password: password,
      clientId: clientData ? clientData : "",
      displayName:clientName ? clientName : "",
      description: "Docusoft related data with documents and apps.",
      projectId: folderData ? folderData : "",
      TemplateData: [templatedata],
      MembersData: memberdata,
      tenantId: userNameData.tenantId,
      accessToken: templateData,
    };
    console.log("getDomian",clienttestObj);
    CallApiphp(clienttestObj, "createDefaultTeam", function (res: any) {
      if (res) {
        console.log(res, "response11");
      } else {
      }
    });
  };
  // const createDefaultTeam = () => {
  //   let passdata: any = localStorage.getItem("pass");
  //   let requestBody = {
  //     agrno: localStorage.getItem("agrno"),
  //     Email: localStorage.getItem("email"),
  //     password: passdata,
  //     clientId: clientData ? clientData : "",
  //     displayName: clientName ? clientName : "",
  //     description: "Docusoft related data with documents and apps.",
  //     projectId: folderData ? folderData : "",
  //   };
  //   console.log("getDomian");
  //   CallApiphp(requestBody, "createDefaultTeam", function (res: any) {
  //     if (res) {
  //       console.log(res, "response11");
  //     } else {
  //     }
  //   });
  // };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    createDefaultTeam();
  };
  const onChangeProject = (e: any) => {
    setGetprojectid(e.target.value);
  };
  const onChangeClient = (e: any) => {
    setGetclientid(e.target.value);
  };
  const Json_getMSTeamsTabList = () => {
    let requestBody = {
      agrno: localStorage.getItem("agrno"),//agrno,
      Email:  localStorage.getItem("email"),//email,
      password: localStorage.getItem("pass")//password,
    };
    CallApi(requestBody, "Json_getMSTeamsTabList", function (res: any) {
      if (res) {
        console.log(res, "Json_getMSTeamsTabList");
        let str = JSON.parse(JSON.stringify(res));
        let json = JSON.parse(str.d);
        console.log(json, "Json_getMSTeamsTabList");
        console.log(json.Table, "table1111111");
        setTabsapidata(json.Table);
      } else {
      }
    });
  };
  const handleChangeTabs = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any,
    itemdata:any
  ) => {
    const isChecked = event.target.checked;
    
    setChannels1true(event.target.checked);

    // Create a new tab object structure
    var Objt = {
      agrno: agrno,
      email: email,
      password: password,
    };

    console.log("dataStringdataString", window.btoa(JSON.stringify(Objt)));
    const newTab = {
      "teamsApp@odata.bind":
        "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.web",
      displayName: event.target.name,
      configuration: {
        contentUrl: `https://docusoftuk.sharepoint.com/Docusoft/Shared%20Documents/Accountancy/Client/1171`,
      },
    };
   
    const newChannels1: any = [...channels];
    newChannels1[index] = {
      ...newChannels1[index],
      tabs: [newTab],
    };
    setChannels(newChannels1);
setTimeout(() => {
  console.log(channels,index, "isCheckedggg",newTab);
}, 4000);

  };
  useEffect(() => {
    Json_getMSTeamsTabList();
    getAccessToken();
  }, []);
  const Json_GetConfiguration = () => {
    let passdata: any = localStorage.getItem("pass");
    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      Email: localStorage.getItem("email"),
      password: passdata,
    };

    CallApi(requestBody, "Json_GetConfiguration", function (res: any) {
      if (res) {
        console.log(res, "Json_GetConfiguration");
        let str = JSON.parse(JSON.stringify(res));
        let json = JSON.parse(str.d);
        console.log(json, "Json_GetConfiguration1");
        setBussiness(json.Table1);
      } else {
        // Handle error if needed
      }
    });
  };
  useEffect(() => {
    Json_GetFolders();
    Json_GetConfiguration();
    getMSTeamsTemplatesList();
  }, []);
  const handleChangeaccord =
    (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded1(isExpanded ? panel : false);
    };
  const onChangebussines = (
    event: React.ChangeEvent<{}>,
    value: BussinessList | null
  ) => {
    event.preventDefault();
    if (value) {
      // Update the selectedFolderID state with the FolderID of the selected option
      //   bussinessData = value.BussId;
      clientData = value.ClientID;
      clientName = value.Client;
      setSelectedBussId(value.ClientID);
      console.log(value.ClientID, "ClientID", selectedBussId);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setSelectedBussId(null);
    }
  };
  const clientlist = {
    options: folders,
    getOptionLabel: (option: FolderList) => option.Folder || "",
  };
  const bussinesslist = {
    options: bussiness,
    getOptionLabel: (option: BussinessList) => option.Client || "",
  };
  const handleChange =
    (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // stepper
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      createDefaultTeam(); // Call createDefaultTeam only when it's the last step
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const steps = [
    {
      label: 'Import Client',
      description:
        <div style={{ marginBottom: "20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={6} md={6}>
              <Autocomplete
                {...clientlist}
                id="clientlist"
                clearOnEscape
                onChange={onChangeclientlist}
                renderInput={(params) => (


                  <TextField
                    {...params}
                    variant="outlined"
                    name="Selectclient"
                    value={""}
                    //   onChange={onChange}
                    label="Folder List"
                  />
                )}
              />
            </Grid>

            <Grid item xs={6} md={6}>
              <Autocomplete
                {...bussinesslist}
                id="clear-on-escape-teams"
                clearOnEscape
                onChange={onChangebussines}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="Selectteamsa"
                    value={""}
                    //   onChange={onChangebussines}
                    label="Reference List"
                    variant="outlined"
                  />
                )}
              />
            </Grid>

          </Grid>
        </div>,
    },

    {
      label: 'Members Data',
      description:
        <Box className='mb-4'>
          {/* <h6>Members Data</h6> */}
          <Member setMemberuser={setMemberuser} />
        </Box>
    },

    {
      label: 'Teams Setting',
      description:
        <Box>
          <div style={{ marginBottom: "20px" }}>
            <FormControl fullWidth variant="outlined">
              {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}

              <Autocomplete
                {...defaultProps}
                id="clear-on-escape-teams"
                //value={value}
                onChange={onChangeTeams}
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="Selectteamsa"
                    label="Teams Setting"
                    variant="outlined"
                  />
                )}
              />
            </FormControl>
          </div>
          <div style={{ marginBottom: "20px" }}>
              {template &&
                template.map((item1: any, i: any) => (
                  <div key={i} className="white-box mb-3">
                <h5 className="mb-4">{item1?.displayName}</h5>
                {/*  */}


                <Grid container spacing={3}>
                  <Grid item xs={6} md={6}>
                    <div style={{ marginBottom: "20px" }}>
                    {item1?.description}
                    </div>
                  </Grid>

                  {/* <Grid item xs={6} md={6}>

                    <div style={{ marginBottom: "20px" }}>
                      <FormControl fullWidth variant="outlined">
                      {item1?.description}
                      </FormControl>
                    </div>

                  </Grid> */}
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6} md={6} className="d-flex align-items-end">
                    <div style={{ marginBottom: "20px" }}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              name={`jason-${i}`}
                              // disabled={true}
                              checked={checkboxfeb[i]}
                              onChange={(e) => handleChannecheck(e,i)}
                            />
                          }
                          label="Favorite Channel"
                        />
                      </FormGroup>
                    </div>
                  </Grid>
                  <Grid item xs={6} md={6}>
            <Box style={{ marginBottom: "20px" }}>
             
             
              <FormGroup>
              {item1 &&
          Array.isArray(item1.tabs) &&
                        item1?.tabs.map((item: any, index: any) => (
                           <><FormLabel component="legend">Channel Tab</FormLabel><FormControlLabel
                            key={i}
                            control={<Switch
                              // checked={channels1[index]?.[item.displayName] || false}
                              // checked={switchStates[item.displayName] || false}
                              defaultChecked
                              onChange={(e) => handleChangeTabs(e, i,item1)}
                              name={item.displayName} />}
                            label={item.displayName} /></>
                  ))}

                {/* <FormControlLabel
                      control={<Switch   checked={channels1.jason}
                      onChange={(e) => handleChangeTabs(e, i)}
                      name="Task"/>}
                      label="Task"
                    />

<FormControlLabel
                      control={<Switch   checked={channels1.antoine}
                      onChange={(e) => handleChangeTabs(e, i)}
                      name="DMS"/>}
                      label="DMS"
                    />
                    
                   */}
              </FormGroup>
              {/* {channels1true && ( 
                  <>
                    <Grid container spacing={3}>
                      <Grid item xs={6} md={6}>
                        <div style={{ marginBottom: "20px" }}>
                          <TextField
                            fullWidth
                            disabled
                            id="standard-basic-client"
                            label="Project ID"
                            variant="standard"
                            name="ProjectID"
                            
                            value={selectedFolderID}
                            onChange={onChangeProject}
                          />
                        </div>
                      </Grid>

                      <Grid item xs={6} md={6}>
                        <div style={{ marginBottom: "20px" }}>
                          <TextField
                            fullWidth
                            disabled
                            id="standard-basic-id"
                            label="Client ID"
                            variant="standard"
                            name="ClientID"
                            
                            value={clientName}
                            onChange={onChangeClient}
                          />
                        </div>
                      </Grid>
                    </Grid>
                  </>
                )} */}
            </Box>
          </Grid>
                </Grid>

              </div>
              
              ))}
              </div>

          {/* {test setting data start here} */}
          <div style={{ marginBottom: "20px" }}>

            {/* <div style={{ marginBottom: "20px" }}>
              <Accordion
                expanded={expanded1 === "panel2dats"}
                onChange={handleChangeaccord("panel2dats")}
              >

                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2dats-content"
                  id="panel2dats-header"
                >
                  <h6>Members Data</h6>
                </AccordionSummary>
                <AccordionDetails>
                  <Member setMemberuser={setMemberuser} />
                </AccordionDetails>
              </Accordion>
            </div> */}

            <h6>Advanced Setting</h6>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={advancedSettingChecked}
                    onChange={handleAdvancedSettingChange}
                  />
                }
                label="Use Default"
              />
              {/* <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Use Default"
                    /> */}
            </FormGroup>
            {!advancedSettingChecked && (
              <Box className="mt-4">
                <Box className='row'>
                  <Box className='col-xl-4 col-md-4 col-sm-6 d-flex'>
                    <Box className="advance-setting-box">
                      <h6>Member Setting </h6>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              channelSettings.allowCreateUpdateChannels
                            }
                            onChange={handleChannelSettingChange}
                            name="allowCreateUpdateChannels"
                          />
                        }
                        label="allowCreateUpdateChannels"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={channelSettings.allowDeleteChannels}
                            onChange={handleChannelSettingChange}
                            name="allowDeleteChannels"
                          />
                        }
                        label="allowDeleteChannels"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={channelSettings.allowAddRemoveApps}
                            onChange={handleChannelSettingChange}
                            name="allowAddRemoveApps"
                          />
                        }
                        label="allowAddRemoveApps"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              channelSettings.allowCreateUpdateRemoveTabs
                            }
                            onChange={handleChannelSettingChange}
                            name="allowCreateUpdateRemoveTabs"
                          />
                        }
                        label="allowCreateUpdateRemoveTabs"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={
                              channelSettings.allowCreateUpdateRemoveConnectors
                            }
                            onChange={handleChannelSettingChange}
                            name="allowCreateUpdateRemoveConnectors"
                          />
                        }
                        label="allowCreateUpdateRemoveConnectors"
                      />
                    </Box>
                  </Box>

                  <Box className='col-xl-4 col-md-4 col-sm-6 d-flex'>
                    <Box className='advance-setting-box'>
                      <h6>Guest Setting </h6>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={
                                channelSettings.allowCreateUpdateChannelsGuest
                              }
                              onChange={handleChannelSettingChange}
                              name="allowCreateUpdateChannelsGuest"
                            />
                          }
                          label="allowCreateUpdateChannels"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={
                                channelSettings.allowDeleteChannelsGuest
                              }
                              onChange={handleChannelSettingChange}
                              name="allowDeleteChannelsGuest"
                            />
                          }
                          label="allowDeleteChannels"
                        />
                      </FormGroup>
                    </Box>
                  </Box>

                  <Box className='col-xl-4 col-md-4 col-sm-6 d-flex'>
                    <Box className='advance-setting-box'>
                      <FormGroup>
                        <h6>Fun Setting</h6>

                        <Box className="clearfix">
                          <FormControlLabel
                            control={<Switch />}
                            label="allowGiphy"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={channelSettings.allowDeleteChannelsFun}
                                onChange={handleChannelSettingChange}
                                name="allowDeleteChannelsFun"
                              />
                            }
                            label="giphyContentRating"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={
                                  channelSettings.allowStickersAndMemesFun
                                }
                                onChange={handleChannelSettingChange}
                                name="allowStickersAndMemesFun"
                              />
                            }
                            label="allowStickersAndMemes"
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={channelSettings.allowCustomMemesFun}
                                onChange={handleChannelSettingChange}
                                name="allowCustomMemesFun"
                              />
                            }
                            label="allowCustomMemes"
                          />
                        </Box>
                      </FormGroup>
                    </Box>
                  </Box>

                  <Box className='col-xl-4 col-md-4 col-sm-6 d-flex'>
                    <Box className="advance-setting-box">
                      <h6>Message Setting</h6>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={channelSettings.allowUserEditMessages}
                              onChange={handleChannelSettingChange}
                              name="allowUserEditMessages"
                            />
                          }
                          label="allowUserEditMessages"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={
                                channelSettings.allowUserDeleteMessages
                              }
                              onChange={handleChannelSettingChange}
                              name="allowUserDeleteMessages"
                            />
                          }
                          label="allowUserDeleteMessages"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={
                                channelSettings.allowOwnerDeleteMessages
                              }
                              onChange={handleChannelSettingChange}
                              name="allowOwnerDeleteMessages"
                            />
                          }
                          label="allowOwnerDeleteMessages"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={channelSettings.allowTeamMentions}
                              onChange={handleChannelSettingChange}
                              name="allowTeamMentions"
                            />
                          }
                          label="allowTeamMentions"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={channelSettings.allowChannelMentions}
                              onChange={handleChannelSettingChange}
                              name="allowChannelMentions"
                            />
                          }
                          label="allowChannelMentions"
                        />
                      </FormGroup>

                    </Box>
                  </Box>

                  <Box className='col-xl-4 col-md-4 col-sm-6 d-flex'>
                    <Box className="advance-setting-box">
                      <h6>Discovery Setting</h6>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={
                                channelSettings.showInTeamsSearchAndSuggestions
                              }
                              onChange={handleChannelSettingChange}
                              name="showInTeamsSearchAndSuggestions"
                            />
                          }
                          label="showInTeamsSearchAndSuggestions"
                        />
                      </FormGroup>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </div>
          {/* {setting start data end here } */}
        </Box >
    },
  ]

  return (
    <Box>
      <Row>
        <Col>

          {/* stepper start */}
          <Box >
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 2 ? (
                        <Typography variant="caption" className="d-none">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    {/* <Typography>{step.description}</Typography> */}
                    <Box>
                      {step.description}
                    </Box>
                    <Box sx={{ mb: 2, mt: 2 }}>
                      <div>
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                          className="btn-blue"
                        >
                          {activeStep === steps.length - 1 ? 'Add Client' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Box>
          {/* stepper end */}

         
        </Col>
      </Row>
    </Box>
  );
}
interface FilmOptionType {
  Name: string;
  Status: string;
  TemplateId: number;
}
interface FolderList {
  Folder: string;
  FolderID: number;
}
interface BussinessList {
  Client: string;
  ClientID: number;
}
