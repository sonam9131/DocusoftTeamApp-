import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
  Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
} from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import CallApi, { CallApiphp } from "./sample/Services/Apicall";
import Templatelist from "./Templatelist";
let agrno: any = localStorage.getItem("agrno");
let email: any = localStorage.getItem("email");
let password: any = localStorage.getItem("pass");
export default function Merge() {
  const [showAlert, setShowAlert] = React.useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [additionalFieldsCount, setAdditionalFieldsCount] = useState(0);
  const [age, setAge] = useState("");
  const [groupname, setGroupname] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [channelname, setChannelname] = useState<any>("");
  const [channeldes, setChanneldes] = useState<any>("");
  const [checkboxfeb, setCheckboxfeb] = useState<any>("");
  const [channels, setChannels] = useState<any[]>([]);
  const [tabs, setTabs] = useState<any>([]);
  const [tabsapidata, setTabsapidata] = useState<any>([]);
  const [advancedSettingChecked, setAdvancedSettingChecked] = useState(true);
  const [isviblebutton, setIsviblebutton] = useState<any>(true);
  const [channels1true, setChannels1true] = useState<any>(false);
  const [isCreateButton, setIsCreateButton] = useState<any>(false);
  const [channels1, setChannels1] = useState<any>([]);
  // const [channels1, setChannels1] = useState<any>([
  //   {
  //     channelname: "",
  //     checkboxfeb: "",
  //     channeldes: "",
  //     gilad: false,
  //     jason: false,
  //     antoine: false,
  //   },
  // ]);

  const [state, setState] = useState<any>({
    gilad: false,
    jason: false,
    antoine: false,
  });

  const [newChannels, setNewChannels] = useState<any>([]);
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
    showInTeamsSearchAndSuggestions: true,
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
  const toggleAdditionalFields = () => {
    setChannelname(null);
    setCheckboxfeb(false);
    setState(false);
    setChanneldes(null);
    setTabs([]);
    setShowAdditionalFields(true);
    // setShowAdditionalFields(!showAdditionalFields);
    setAdditionalFieldsCount((prevCount) => prevCount + 1);
    let createChannalData = {
      "template@odata.bind":
        "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
      visibility: age ? age : "",
      displayName: groupname ? groupname : "",
      description: description ? description : "",
      //   "members":[
      //     {
      //        "@odata.type":"#microsoft.graph.aadUserConversationMember",
      //        "roles":[
      //           "owner"
      //        ],
      //        "user@odata.bind":"https://graph.microsoft.com/v1.0/users('0040b377-61d8-43db-94f5-81374122dc7e')"
      //     },
      //     {
      //        "@odata.type":"#microsoft.graph.aadUserConversationMember",
      //        "roles":[
      //           "guest"
      //        ],
      //        "user@odata.bind":"https://graph.microsoft.com/v1.0/users('0040b377-61d8-43db-94f5-81374122dc7e')"
      //     }
      //  ],
      channels: channels,
      memberSettings: {
        allowCreateUpdateChannels: channelSettings.allowCreateUpdateChannels,
        allowDeleteChannels: channelSettings.allowDeleteChannels,
        allowAddRemoveApps: channelSettings.allowAddRemoveApps,
        allowCreateUpdateRemoveTabs:
          channelSettings.allowCreateUpdateRemoveTabs,
        allowCreateUpdateRemoveConnectors:
          channelSettings.allowCreateUpdateRemoveConnectors,
      },
      guestSettings: {
        allowCreateUpdateChannels:
          channelSettings.allowCreateUpdateChannelsGuest,
        allowDeleteChannels: channelSettings.allowDeleteChannelsGuest,
      },
      funSettings: {
        allowGiphy: channelSettings.allowDeleteChannelsFun,
        giphyContentRating: "Moderate"
          ? "Moderate"
          : channelSettings.allowDeleteChannelsFun,
        allowStickersAndMemes: channelSettings.allowStickersAndMemesFun,
        allowCustomMemes: channelSettings.allowCustomMemesFun,
      },
      messagingSettings: {
        allowUserEditMessages: channelSettings.allowUserEditMessages,
        allowUserDeleteMessages: channelSettings.allowUserDeleteMessages,
        allowOwnerDeleteMessages: channelSettings.allowOwnerDeleteMessages,
        allowTeamMentions: channelSettings.allowTeamMentions,
        allowChannelMentions: channelSettings.allowChannelMentions,
      },
      discoverySettings: {
        showInTeamsSearchAndSuggestions:
          channelSettings.showInTeamsSearchAndSuggestions,
      },
      installedApps: [
        {
          "teamsApp@odata.bind":
            "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps('com.microsoft.teamspace.tab.vsts')",
        },
        {
          "teamsApp@odata.bind":
            "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps('1542629c-01b3-4a6d-8f76-1938b779e48d')",
        },
      ],
    };

  
    // createMSTeamsTemplatesWithChannelsTabs();
    console.log(
      tabs,
      "createChannalData",
      createChannalData,
      "ddfgfdgdfgfdgdfg",
      channels
    );
    // console.log(newChannels,"newchanneldata",newTab);
  };
  const createMSTeamsTemplatesWithChannelsTabs = () => {
    let passdata: any = localStorage.getItem("pass");
    let requestBody = {
      agrno: agrno,
      strEmail: email,
      password: password,
      Name: groupname ? groupname : "",
      TemplateData: channels,
      TabseCheck: channels1true,
      TemplateSettings: {
        memberSettings: {
          allowCreateUpdateChannels:
            channelSettings.allowCreateUpdateChannels,
          allowDeleteChannels: channelSettings.allowDeleteChannels,
          allowAddRemoveApps: channelSettings.allowAddRemoveApps,
          allowCreateUpdateRemoveTabs:
            channelSettings.allowCreateUpdateRemoveTabs,
          allowCreateUpdateRemoveConnectors:
            channelSettings.allowCreateUpdateRemoveConnectors,
        },
        guestSettings: {
          allowCreateUpdateChannels:
            channelSettings.allowCreateUpdateChannelsGuest,
          allowDeleteChannels: channelSettings.allowDeleteChannelsGuest,
        },
        funSettings: {
          allowGiphy: channelSettings.allowDeleteChannelsFun,
          giphyContentRating: "Moderate"
            ? "Moderate"
            : channelSettings.allowDeleteChannelsFun,
          allowStickersAndMemes: channelSettings.allowStickersAndMemesFun,
          allowCustomMemes: channelSettings.allowCustomMemesFun,
        },
        messagingSettings: {
          allowUserEditMessages: channelSettings.allowUserEditMessages,
          allowUserDeleteMessages: channelSettings.allowUserDeleteMessages,
          allowOwnerDeleteMessages: channelSettings.allowOwnerDeleteMessages,
          allowTeamMentions: channelSettings.allowTeamMentions,
          allowChannelMentions: channelSettings.allowChannelMentions,
        },
        discoverySettings: {
          showInTeamsSearchAndSuggestions:
            channelSettings.showInTeamsSearchAndSuggestions,
        },
      },
    };
    console.log("getDomian", requestBody);
    if(channels && channels.length > 0) {
      setShowAlert(false);
      CallApiphp(
        requestBody,
        "createMSTeamsTemplatesWithChannelsTabs",
        function (res: any) {
          if (res) {
             console.log(res, "response11 createMSTeamsTemplatesWithChannelsTabs");
             setShowCreateTemplate(!showCreateTemplate);
           
          } else {
          }
        }
      );
    }else {
      setShowAlert(true);
      setTimeout(()=>{
        setShowAlert(false);
      },3000);
      // return;
    }
   
  };
//   const savetemplate = () => {
//     createMSTeamsTemplatesWithChannelsTabs();
//     if(showAlert !== true){
//  setShowCreateTemplate(!showCreateTemplate);
//     }
   
    
//   }
const savetemplate = () => {
  // Validate first
  // if (!channels || channels.length === 0) {
  //   setShowAlert(true);
  //   return; // stop execution
  // }

  // Hide alert if valid
  // setShowAlert(false);

  // Call your existing function
  createMSTeamsTemplatesWithChannelsTabs();

  // Toggle UI only when valid
  // setShowCreateTemplate(!showCreateTemplate);
};

  const Json_getMSTeamsTabList = () => {
    let requestBody = {
      agrno: agrno,
      Email: email,
      password: password,
    };
    CallApi(requestBody, "Json_getMSTeamsTabList", function (res: any) {
      if (res) {
        console.log(res, "Json_getMSTeamsTabList");
        let str = JSON.parse(JSON.stringify(res));
        let json = str?.d ? JSON.parse(str.d) : null;
        console.log(json, "Json_getMSTeamsTabList");
        if (json?.Table) {
          console.log(json.Table, "table1111111");
          setTabsapidata(json.Table);
        } else {
          setTabsapidata([]);
        }
        let data = {
          "TabId": 2,
          "TabName": "DMS",
          "BaseUrl": "https://sharepointapps.docusms.uk/Clientcard/build/#/tab",
          "strParam": "Token,ClientId,ProjectId",
          "Status": "Active"
      }
        setTabsapidata((prevTabsapidata:any) => [...prevTabsapidata, data]);

      } else {
      }
    });
  };
  useEffect(() => {
    Json_getMSTeamsTabList();
  }, []);
  // const handleChangeTabs = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   index: any
  // ) => {
  //   const isChecked = event.target.checked;
  //   console.log(isChecked, "isChecked", tabsapidata);
  //   setChannels1true(event.target.checked);
  //   const newChannels: any = [...channels];
  //   let newTabs: any = [...tabs];

  //   // Create a new tab object structure
  //   const newTab = {
  //     "teamsApp@odata.bind":
  //       "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.web",
  //     displayName: event.target.name,
  //     configuration: {
  //        contentUrl: `${tabsapidata[0]?.BaseUrl}`,
  //        removeUrl: null,          // optional
  //        websiteUrl: `${tabsapidata[0]?.BaseUrl}` // optional for browser fallback

  //     },
  //   };

  //   if (isChecked) {
  //     // Add the new tab object to the tabs array
  //     newTabs.push(newTab);
  //   } else {
  //     // Remove the tab object from the tabs array if the checkbox is unchecked
  //     const tabIndex = newTabs.findIndex(
  //       (tab: any) => tab.displayName === event.target.name
  //     );
  //     if (tabIndex !== -1) {
  //       newTabs.splice(tabIndex, 1);
  //     }
  //   }

  //   // Update the channels array with tabs information
  //   newChannels[index] = {
  //     ...newChannels[index],
  //     tabs: newTabs, // Set tabs to newTabs array
  //   };

  //   // Update state
  //   setTabs(newTabs);
  //   setChannels(newChannels);
  //   console.log(newChannels, "newChannelsAdmin");
  //   const updatedChannels = [...channels1];
  //   updatedChannels[index] = { ...updatedChannels[index], [event.target.name]: event.target.checked };
  //   setChannels1(updatedChannels);
  // };

  const handleChangeTabs = (
  event: React.ChangeEvent<HTMLInputElement>,
  index: number
) => {
  const isChecked = event.target.checked;
  const tabName = event.target.name;

  // Find the tab data from tabsapidata that matches the clicked checkbox
  const selectedTabData = tabsapidata.find((t: any) => t.TabName === tabName);

  if (!selectedTabData) return; // safety check

  const newTab = {
    "teamsApp@odata.bind":
      "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.web",
    displayName: tabName,
    configuration: {
      contentUrl: selectedTabData.BaseUrl, // use the correct tab URL
      removeUrl: null,
      websiteUrl: selectedTabData.BaseUrl,
    },
  };

  const newChannels: any = [...channels];
  let newTabs: any = [...tabs];

  if (isChecked) {
    newTabs.push(newTab);
  } else {
    const tabIndex = newTabs.findIndex((tab: any) => tab.displayName === tabName);
    if (tabIndex !== -1) {
      newTabs.splice(tabIndex, 1);
    }
  }

  newChannels[index] = {
    ...newChannels[index],
    tabs: newTabs,
  };

  setTabs(newTabs);
  setChannels(newChannels);

  const updatedChannels = [...channels1];
  updatedChannels[index] = { ...updatedChannels[index], [tabName]: isChecked };
  setChannels1(updatedChannels);

  console.log(newChannels, "newChannelsAdmin");
};


  const handleChangeTabs44 = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    // const isChecked = event.target.checked;
    // const updatedChannels:any = [...channels];
    // //  setState({
    // //   ...state,
    // //   tabs: event.target.checked,
    // // });
    // if (isChecked) {
    //   // Create a new tab object structure
    //   const newTab = {
    //     teamsApp: {
    //       '@odata.bind': "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps('com.microsoft.teamspace.tab.web')",
    //     },
    //     displayName: event.target.name,
    //     configuration: {
    //       contentUrl: "https://learn.microsoft.com/microsoftteams/microsoft-teams"
    //     }
    //   };

    //   // Add the new tab object to the channels array at the specified index
    //   updatedChannels[index] = {
    //     ...updatedChannels[index],
    //     tabs: [newTab]  // Add tabs property with value true
    //   };

    //   // Add the new tab object to the tabs array
    //   setTabs((prevTabs:any) => [...prevTabs, newTab]);
    // }

    // setChannels(channels);

    const newChannels: any = [...channels];
    const newChannels1: any = [...channels];

    // const newChannels: any = [...channels];
    setState({
      ...state,
      tabs: tabs,
    });

    const isChecked = event.target.checked;
    // const newChannels = [...channels];
    newChannels[index] = {
      ...newChannels[index],
      tabs: tabs,
    };
    if (isChecked) {
      // Create a new tab object structure
      const newTab = {
        "teamsApp@odata.bind":
          "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.web",
        displayName: event.target.name,
        configuration: {
          contentUrl:
            "https://learn.microsoft.com/microsoftteams/microsoft-teams",
        },
      };

      // Add the new tab object to the channels array at the specified index
      newChannels1[index] = newTab;
      setTabs((prevTabs: any) => [...prevTabs, newTab]);

      console.log(tabs, "tabstabstabs");
    }

    setChannels(newChannels);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const handleChangeName = (event: any) => {
    setGroupname(event.target.value);
  };
  const handleChangeDescrition = (event: any) => {
    setDescription(event.target.value);
  };
  const handleChannelName = (event: any, index: any) => {
    const { value } = event.target;
    setChannelname(value);
    setChannels((prevChannels: any) => {
      const newChannels = [...prevChannels];
      newChannels[index] = {
        ...newChannels[index],
        displayName: value,
      };
      return newChannels;
    });
  };
  const handleChannelDes = (event: any, index: any) => {
    const { value } = event.target;
    setChanneldes(value);
    setChannels((prevChannels: any) => {
      const newChannels = [...prevChannels];
      newChannels[index] = {
        ...newChannels[index],
        description: value,
      };
      return newChannels;
    });
  };
  const handleChannecheck = (event: any, index: any) => {
    const { checked } = event.target;
    setChannels((prevChannels: any) => {
      const newChannels = [...prevChannels];
      newChannels[index] = {
        ...newChannels[index],
        checkboxfeb: checked,
        isFavoriteByDefault: checked,
      };
      return newChannels;
    });

    setCheckboxfeb(checked);
  };
  const deleteChannel = (index: any) => {
    const newChannels = [...channels];
    newChannels.splice(index, 1);
    setChannels(newChannels);
  };
  const additionalFields: any = [];
  const { gilad, jason, antoine } = state;
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeaccord =
    (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  for (let i = 0; i < additionalFieldsCount; i++) {

    additionalFields.push(
      <Grid key={i} className="white-box white-box-bordered mb-4" item xs={6} md={6}>
        <h5 className="mb-4">Channel-{i + 1}</h5>

        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <div style={{ marginBottom: "20px" }}>
              <TextField
                fullWidth
                id={`standard-basic-client-${i}`}
                label="Channel Name"
                variant="outlined"
                value={channels[i]?.displayName || ''}
                onChange={(e) => handleChannelName(e, i)}
                name={`Clientname-${i}`}
              />
            </div>
          </Grid>

          <Grid item xs={6} md={6}>
            <div style={{ marginBottom: "20px" }}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  aria-label="minimum height"
                  minRows={3}
                  name={`fullAddress-${i}`}
                  value={channels[i]?.description || ''}
                  onChange={(e) => handleChannelDes(e, i)}
                  variant="outlined"
                  label="Channel Description"
                />
              </FormControl>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} md={6} className="d-flex align-items-end">
            <Box style={{ marginBottom: "20px" }}>
              {/* <FormLabel component="legend">Favorite Channel</FormLabel>
          <Checkbox
            name={`jason-${i}`}
            checked={channels1.checkboxfeb}
            onChange={(e) => handleChannecheck(e, i)}
          /> */}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      name={`jason-${i}`}
                      checked={channels[i]?.isFavoriteByDefault || false}
                      onChange={(e) => handleChannecheck(e, i)}
                    />
                  }
                  label="Favorite Channel"
                />
              </FormGroup>
            </Box>
          </Grid>

          <Grid item xs={6} md={6}>
            <Box style={{ marginBottom: "20px" }}>
             
              <FormLabel component="legend">Channel Tab</FormLabel>
              <FormGroup>
                {tabsapidata &&
                  tabsapidata.map((item: any, index: any) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Switch
                          checked={channels1[i]?.[item.TabName] || false}
                          onChange={(e) => handleChangeTabs(e, i)}
                          name={item.TabName}
                        />
                      }
                      label={item.TabName}
                    />
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
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );

  }

  const [selectedValue, setSelectedValue] = useState<TabValue>("local");
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };
  console.log(channels, "channelschannels", channelSettings);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);

  const CreateTemplate = () => {
    // setChannelname(null);
    // setCheckboxfeb(false);
    // setState(false);
    // setChanneldes(null);
    // setTabs([]);
    // setShowAdditionalFields(true);
    setShowCreateTemplate(!showCreateTemplate);
    if (!showCreateTemplate) {
      setGroupname(''); // Clear groupname when toggling to showCreateTemplate
      setChannels1([]); // Clear channels1 array
      setAdditionalFieldsCount(0);
    }
  }
  return (



    <div>

      <div style={{ marginTop: "20px", margin: "0 auto" }}
      >
<div className="mb-4">
  {showAlert && (
  <Alert severity="error">
    Please select at least one channel before proceeding.
  </Alert>
)}
</div>

        {/* <Templatelist /> */}
        {showCreateTemplate ? (
          <div className="row white-box" >
            <div className="col">
              {/* <h6>Group</h6> */}
              <div style={{ marginBottom: "20px" }}>
                <TextField
                  fullWidth
                  id="standard-basic-client"
                  label="Template Name"
                  variant="outlined"
                  name="Clientname"
                  value={groupname}
                  onChange={handleChangeName}
                />
              </div>


              <Box>
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
              </Box>

              <hr />

              <div style={{ marginBottom: "20px" }}>

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

              {showAdditionalFields && additionalFields}
              <div style={{ marginBottom: "20px" }}>
                <Stack spacing={2} direction="row">
                <Button variant="outlined"
                //  onClick={(e) => deleteChannel(e, i)}
                onClick={savetemplate}
                disabled={!groupname}
                >
                Save Template
                </Button>
                  <Button
                    variant="contained"
                    onClick={toggleAdditionalFields}
                    disabled={!groupname}
                    className="btn-blue"
                  >
                    Add Channel
                  </Button>
                  <Button variant="contained"
                    onClick={CreateTemplate}
                    // onClick={toggleAdditionalFields}
                    // disabled={
                    //   !groupname
                    // }
                    className="btn-red"
                  >
                    Cancel
                  </Button>
                  {/* <Button variant="outlined" startIcon={<DeleteIcon />}
                //  onClick={(e) => deleteChannel(e, i)}
                onClick={(e) => deleteChannel(e, i)}
                >
                Delete Channel
                </Button> */}

                  {/* <AddIcon /> */}
                </Stack>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isviblebutton && (<Button
              variant="contained"
              onClick={CreateTemplate}
              className="btn-blue position-btn"
            // disabled={!groupname}
            >
              Create Template
            </Button>)}

            <Templatelist setIsviblebutton={setIsviblebutton} />
          </>

        )}
      </div>
    </div>


  );
}
