import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  Switch,
  Box,
  Grid,
  TextField,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CallApi, { CallApiphp } from "./sample/Services/Apicall";
import Templatelist from "./Templatelist";
import Admin from "./Admin";
import Merge from "./Merge";
let agrno: any = localStorage.getItem("agrno");
let email: any = localStorage.getItem("email");
let password: any = localStorage.getItem("pass");
export default function EditAdmin({ showInput, templatesettings, templatedata, templateID }: any) {
  console.log(templatedata, "Edit-Admin", templatesettings);
  const [showAlert, setShowAlert] = React.useState(false);
  const [additionalFieldsCount, setAdditionalFieldsCount] = useState(0);
  const [isviblebutton, setIsviblebutton] = useState<any>(true);
  const [groupname, setGroupname] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [channelname, setChannelname] = useState<any>("");
  const [channeldes, setChanneldes] = useState<any>("");
  const [checkboxfeb, setCheckboxfeb] = useState<any>(false);
  const [channels, setChannels] = useState<any>([]);
  const [tabs, setTabs] = useState<any>([]);
  const [tabsapidata, setTabsapidata] = useState<any>([]);
  const [advancedSettingChecked, setAdvancedSettingChecked] = useState(true);
  const [channels1true, setChannels1true] = useState<any>(false);
  const [template, setTemplate] = useState<any>(null);
  const [templatesettings1, setTemplatesettings1] = useState<any>(null);
  const [channels1, setChannels1] = useState<any>([]);
  const [channelSettings, setChannelSettings] = useState({
    allowCreateUpdateChannels: false,
    allowDeleteChannels: false,
    allowAddRemoveApps: false,
    allowCreateUpdateRemoveTabs: false,
    allowCreateUpdateRemoveConnectors: false,
    allowCreateUpdateChannelsGuest: false,
    allowDeleteChannelsGuest: false,
    allowDeleteChannelsFun: false,
    allowStickersAndMemesFun: false,
    allowCustomMemesFun: false,
    allowUserEditMessages: false,
    allowUserDeleteMessages: false,
    allowOwnerDeleteMessages: false,
    allowTeamMentions: false,
    allowChannelMentions: false,
    showInTeamsSearchAndSuggestions: false,
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
    // setChannelname(null);
    // setCheckboxfeb(false);
    // setState(false);
    // setChanneldes(null);
    // setTabs([]);
    // setShowAdditionalFields(true);
    // setShowAdditionalFields(!showAdditionalFields);
    setAdditionalFieldsCount((prevCount) => prevCount + 1);

    const createMSTeamsTemplatesWithChannelsTabs = () => {
      let passdata: any = localStorage.getItem("pass");
      let requestBody = {
        agrno: agrno,
        strEmail: email,
        password: password,
        Name: groupname ? groupname : "",
        TemplateData: channels && channels.length > 0 ? channels : templatedata,
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
        TemplateId: templateID,
        Status: "active"
      };
      console.log(channels,"updateMSTeamsTemplate", requestBody);
      CallApiphp(
        requestBody,
        "updateMSTeamsTemplate",
        function (res: any) {
          if (res) {
            console.log(res, "response11");
            // setShowTemplateList(true);
            setShowAlert(true)
            setTimeout(()=>{
               setShowAlert(false);
            },3000);
          } else {
            setShowAlert(false);
          }
        }
      );
    };
    createMSTeamsTemplatesWithChannelsTabs();
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
        let json = str?.d ? JSON.parse(str.d) : null;
        console.log(json, "Json_getMSTeamsTabList");
        if (json?.Table) {
          console.log(json.Table, "table1111111");
          setTabsapidata(json.Table);
        } else {
          setTabsapidata([]);
        }
      } else {
        setTabsapidata([]);
      }
    });
  };
  console.log(template, "templatecreated1", JSON.stringify(showInput.TemplateData));
  useEffect(() => {
    Json_getMSTeamsTabList();

    setTemplate(showInput);
    if (templatesettings) {
      setTemplatesettings1(templatesettings)
    }

    if (showInput && showInput.Name) {
      setGroupname(showInput.Name);
    }

    if (templatedata && templatedata.length > 0) {
      setChannels(templatedata);

      // setCheckboxfeb(templatedata[0].isFavoriteByDefault ? templatedata[0].isFavoriteByDefault : false);
      const initialNames = templatedata.map((data:any) => data.displayName || '');
      const initialDescriptions = templatedata.map((data:any) => data.description || '');
      // const initialCheckboxes = Array.from({ length: templatedata.length }, () => false); // Initialize all checkboxes to false
      const initialCheckboxes = templatedata.map((data:any) => data.isFavoriteByDefault || false);
      setChannelname(initialNames);
      setChanneldes(initialDescriptions);
      setCheckboxfeb(initialCheckboxes);
      templatedata.map((data:any,index1:any) =>{
        // {item1 &&
        //   Array.isArray(item1.tabs) &&
        //                 item1?.tabs
        data && Array.isArray(data.tabs) && data?.tabs.map((item:any,index:any) =>{
          HandleChangeDataPush(item,index1);
        })
       
      });
    }
    // if (templatedata) {
    //     setChannels1true(templatedata[0].isFavoriteByDefault);
    //   }

    if (templatesettings) {
      setChannelSettings(prevUserDetail => ({
        ...prevUserDetail,
        allowCreateUpdateChannels: templatesettings.memberSettings.allowCreateUpdateChannels,
        allowDeleteChannels: templatesettings.memberSettings.allowDeleteChannels,
        allowAddRemoveApps: templatesettings.memberSettings.allowAddRemoveApps,
        allowCreateUpdateRemoveTabs: templatesettings.memberSettings.allowCreateUpdateRemoveTabs,
        allowCreateUpdateRemoveConnectors: templatesettings.memberSettings.allowCreateUpdateRemoveConnectors,
        allowCreateUpdateChannelsGuest: templatesettings.guestSettings.allowCreateUpdateChannelsGuest,
        allowDeleteChannelsGuest: templatesettings.guestSettings.allowDeleteChannelsGuest,
        allowDeleteChannelsFun: templatesettings.funSettings.allowDeleteChannelsFun,
        allowStickersAndMemesFun: templatesettings.funSettings
          .allowStickersAndMemesFun,
        allowCustomMemesFun: templatesettings.funSettings
          .allowCustomMemesFun,
        allowUserEditMessages: templatesettings.messagingSettings.allowUserEditMessages,
        allowUserDeleteMessages: templatesettings.messagingSettings
          .allowUserDeleteMessages,
        allowOwnerDeleteMessages: templatesettings.messagingSettings
          .allowOwnerDeleteMessages,
        allowTeamMentions: templatesettings.messagingSettings
          .allowTeamMentions,
        allowChannelMentions: templatesettings.messagingSettings
          .allowChannelMentions,
        showInTeamsSearchAndSuggestions: templatesettings.discoverySettings
          .showInTeamsSearchAndSuggestions,
      }));
    }
  }, [showInput]);
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
       contentUrl: `${tabsapidata[0]?.BaseUrl}`,
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
  const handleChangeTabs = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any,
    itemdata:any
  ) => {
    const isChecked = event.target.checked;
    console.log(itemdata,tabsapidata, "isCheckedggg", event);
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
        contentUrl: `${tabsapidata[0]?.BaseUrl}`,
      },
    };
    console.log(newTab, "newTabdata");
    setChannels((prevChannels: any) => {
      const newChannels1 = [...prevChannels];
      newChannels1[index] = {
        ...newChannels1[index],
        tabs: [newTab],
      };
      return newChannels1;
    });

  //   if (isChecked) {
  //     // Push a new channel object with the tab information
  //     // setChannels((prevChannels:any) => [
  //     //   ...prevChannels,
  //     //   {
  //     //     displayName: template[0].displayName,
  //     //     isFavoriteByDefault: template[0].isFavoriteByDefault,
  //     //     description: template[0].description,
  //     //     tabs: [newTab],
  //     //   },
  //     // ]);
  //     // Assuming template is defined and contains the array of channel objects
  
  // setChannels((prevChannels:any) => [
  //   ...prevChannels,
  //   {
  //     displayName: itemdata.displayName,
  //     isFavoriteByDefault: itemdata.isFavoriteByDefault,
  //     description: itemdata.description,
  //     tabs: [newTab],
  //   },
  // ])


  //   } else {
  //     // Handle the case when checkbox is unchecked if needed
  //   }
  };
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
  //       contentUrl: tabsapidata[0].BaseUrl,
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
  //   // const updatedChannels = [...channels1];
  //   // updatedChannels[index] = { ...updatedChannels[index], [event.target.name]: event.target.checked };
  //   // setChannels1(updatedChannels);
  // };
  // const handleChangeTabs = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   index: any,
  //   itemdata:any
  // ) => {
  //   const isChecked = event.target.checked;
  //   console.log(itemdata,isChecked, "isCheckedggg", event);
  //   setChannels1true(event.target.checked);

  //   // Create a new tab object structure
  //   var Objt = {
  //     agrno: agrno,
  //     email: email,
  //     password: password,
  //   };

  //   console.log("dataStringdataString", window.btoa(JSON.stringify(Objt)));
  //   const newTab = {
  //     "teamsApp@odata.bind":
  //       "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/com.microsoft.teamspace.tab.web",
  //     displayName: event.target.name,
  //     configuration: {
  //       contentUrl: `${tabsapidata[0]?.tabs[0]?.configuration?.contentUrl}`,
  //     },
  //   };
  //   console.log(newTab, "newTabdata");

    
  //     // Push a new channel object with the tab information
  //     // setChannels((prevChannels:any) => [
  //     //   ...prevChannels,
  //     //   {
  //     //     displayName: template[0].displayName,
  //     //     isFavoriteByDefault: template[0].isFavoriteByDefault,
  //     //     description: template[0].description,
  //     //     tabs: [newTab],
  //     //   },
  //     // ]);
  //     // Assuming template is defined and contains the array of channel objects
  
  // setChannels((prevChannels:any) => [
  //   ...prevChannels,
  //   {
  //     displayName: itemdata.displayName,
  //     isFavoriteByDefault: itemdata.isFavoriteByDefault,
  //     description: itemdata.description,
  //     tabs: [newTab],
  //   },
  // ])


  // };
  const handleChangeName = (event: any) => {
    setGroupname(event.target.value);
  };
  const handleChangeDescrition = (event: any) => {
    setDescription(event.target.value);
  };
  const handleChannelName = (event: any,index:any) => {
    // setChannelname(event.target.value);
    const { value } = event.target;
    setChannelname((prevNames:any) => {
      const updatedNames = [...prevNames];
      updatedNames[index] = value;
      return updatedNames;
    });
    setChannels((prevChannels: any) => {
      const newChannels = [...prevChannels];
      newChannels[index] = {
        ...newChannels[index],
        displayName: value,
      };
      return newChannels;
    });
  };
  const handleChannelDes = (event: any,index:any) => {
    // setChanneldes(event.target.value);
    const { value } = event.target;
    setChanneldes((prevDescriptions:any) => {
      const updatedDescriptions = [...prevDescriptions];
      updatedDescriptions[index] = value;
      return updatedDescriptions;
    });
    setChannels((prevChannels: any) => {
      const newChannels = [...prevChannels];
      newChannels[index] = {
        ...newChannels[index],
        description: value,
      };
      return newChannels;
    });
  };
  const handleChannecheck = (event: any,index:any) => {

    // setCheckboxfeb(event.target.checked);

    const { checked } = event.target;
    setCheckboxfeb((prevCheckboxes:any) => {
      const updatedCheckboxes = [...prevCheckboxes];
      updatedCheckboxes[index] = checked;
      return updatedCheckboxes;
    });
    setChannels((prevChannels: any) => {
      const newChannels1 = [...prevChannels];
      newChannels1[index] = {
        ...newChannels1[index],
        isFavoriteByDefault: checked,
      };
      return newChannels1;
    });
  };
  const additionalFields: any = [];
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChangeaccord =
    (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  console.log(channels, "channelschannels", channelSettings);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [showTemplateList, setShowTemplateList] = useState(false);

  const CreateTemplate = () => {
    setShowTemplateList(true);



  }
  
  const allowCreateUpdateChannels =
    templatesettings1 && templatesettings1.memberSettings
      ? templatesettings1.memberSettings.allowCreateUpdateChannels
      : channelSettings.allowCreateUpdateChannels;
  return (
    <div>
     <div className="mb-4">
       {showAlert && (
        <Alert severity="success">
          Updated Successfully!
        </Alert>
      )}
     </div>
      {!showTemplateList && (
        <div
          className="white-box"
          style={{ marginTop: "20px", margin: "0 auto" }}
        >

          {/* <Templatelist /> */}

          <div className="row">
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

              <div style={{ marginBottom: "20px" }}>

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
              </div>

              <div style={{ marginBottom: "20px" }}>
              {templatedata &&
                templatedata.map((item1: any, i: any) => (
                  <div key={i} className="white-box mb-3">
                <h5 className="mb-4">{item1?.displayName}</h5>
                {/*  */}


                <Grid container spacing={3}>
                  <Grid item xs={6} md={6}>
                    <div style={{ marginBottom: "20px" }}>
                      <TextField
                        fullWidth
                        id={`standard-basic-client-${i}`}
                        label="Channel Name"
                        variant="outlined"
                        // value={channelname}
                        value={channelname[i] || ''}
                        onChange={(e) => handleChannelName(e,i)}
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
                          //value={channeldes}
                          value={channeldes[i] || ''}
                          onChange={(e) => handleChannelDes(e,i)}
                          variant="outlined"
                          label="Channel Description"
                        />
                      </FormControl>
                    </div>

                  </Grid>
                </Grid>

                <Grid container spacing={3}>
                  <Grid item xs={6} md={6} className="d-flex align-items-end">
                    <div style={{ marginBottom: "20px" }}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              name={`jason-${i}`}
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
            </Box>
          </Grid>
                </Grid>

              </div>
              
              ))}
              </div>
              {additionalFields}
              <div style={{ marginBottom: "20px" }}>
                <Stack spacing={2} direction="row">
                  <Button
                    variant="contained"
                    onClick={toggleAdditionalFields}
                    disabled={!groupname}
                    className="btn-blue"
                  >
                    Update Channel
                  </Button>
                  <Button variant="contained"
                    onClick={CreateTemplate}
                    className="btn-red"
                  // onClick={toggleAdditionalFields}
                  // disabled={
                  //   !groupname
                  // }
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






        </div>
      )}
      {showTemplateList && <Merge />}
    </div>
  );
}
