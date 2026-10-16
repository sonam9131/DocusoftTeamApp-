import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  // SelectChangeEvent,
  Switch,
  TextField,
} from "@mui/material";
import {
  SelectTabData,
  SelectTabEvent,
  Tab,
  TabList,
  TabValue,
} from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import CallApi, { CallApiphp } from "./sample/Services/Apicall";
import MergeComponent from "./Merge";
import AppHeader from "./AppHeader";
// let agrno: any = localStorage.getItem("agrno");
// let email: any = localStorage.getItem("email");
// let password: any = localStorage.getItem("pass");
export default function Admin() {
  // const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [additionalFieldsCount, setAdditionalFieldsCount] = useState(0);
  // const [age, setAge] = useState("");
  // const [groupname, setGroupname] = useState<any>("");
  // const [description, setDescription] = useState<any>("");
  const [channelname, setChannelname] = useState<any>("");
  const [channeldes, setChanneldes] = useState<any>("");
  const [checkboxfeb, setCheckboxfeb] = useState<any>("");
  const [channels, setChannels] = useState<any[]>([]);
  const [tabs, setTabs] = useState<any>([]);
  const [tabsapidata, setTabsapidata] = useState<any>([]);
  // const [advancedSettingChecked, setAdvancedSettingChecked] = useState(true);
  // const [isviblebutton, setIsviblebutton] = useState<any>(true);
  const [channels1true, setChannels1true] = useState<any>(false);
  // const [isCreateButton, setIsCreateButton] = useState<any>(false);
  const [channels1, setChannels1] = useState<any>([
    {
      channelname: "",
      checkboxfeb: "",
      channeldes: "",
      gilad: false,
      jason: false,
      antoine: false,
    },
  ]);

  const [state, setState] = useState<any>({
    gilad: false,
    jason: false,
    antoine: false,
  });

  // const [newChannels, setNewChannels] = useState<any>([]);
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
  // const handleChannelSettingChange = (event: any) => {
  //   const { name, checked } = event.target;
  //   setChannelSettings((prevSettings) => ({
  //     ...prevSettings,
  //     [name]: checked,
  //   }));
  // };
  // const handleAdvancedSettingChange = (event: any) => {
  //   setAdvancedSettingChecked(event.target.checked);
  // };
  // const toggleAdditionalFields = () => {
  //   setChannelname(null);
  //   setCheckboxfeb(false);
  //   setState(false);
  //   setChanneldes(null);
  //   setTabs([]);
  //   setShowAdditionalFields(true);
  //   // setShowAdditionalFields(!showAdditionalFields);
  //   setAdditionalFieldsCount((prevCount) => prevCount + 1);
  //   let createChannalData = {
  //     "template@odata.bind":
  //       "https://graph.microsoft.com/v1.0/teamsTemplates('standard')",
  //     visibility: age ? age : "",
  //     displayName: groupname ? groupname : "",
  //     description: description ? description : "",
  //     //   "members":[
  //     //     {
  //     //        "@odata.type":"#microsoft.graph.aadUserConversationMember",
  //     //        "roles":[
  //     //           "owner"
  //     //        ],
  //     //        "user@odata.bind":"https://graph.microsoft.com/v1.0/users('0040b377-61d8-43db-94f5-81374122dc7e')"
  //     //     },
  //     //     {
  //     //        "@odata.type":"#microsoft.graph.aadUserConversationMember",
  //     //        "roles":[
  //     //           "guest"
  //     //        ],
  //     //        "user@odata.bind":"https://graph.microsoft.com/v1.0/users('0040b377-61d8-43db-94f5-81374122dc7e')"
  //     //     }
  //     //  ],
  //     channels: channels,
  //     memberSettings: {
  //       allowCreateUpdateChannels: channelSettings.allowCreateUpdateChannels,
  //       allowDeleteChannels: channelSettings.allowDeleteChannels,
  //       allowAddRemoveApps: channelSettings.allowAddRemoveApps,
  //       allowCreateUpdateRemoveTabs:
  //         channelSettings.allowCreateUpdateRemoveTabs,
  //       allowCreateUpdateRemoveConnectors:
  //         channelSettings.allowCreateUpdateRemoveConnectors,
  //     },
  //     guestSettings: {
  //       allowCreateUpdateChannels:
  //         channelSettings.allowCreateUpdateChannelsGuest,
  //       allowDeleteChannels: channelSettings.allowDeleteChannelsGuest,
  //     },
  //     funSettings: {
  //       allowGiphy: channelSettings.allowDeleteChannelsFun,
  //       giphyContentRating: "Moderate"
  //         ? "Moderate"
  //         : channelSettings.allowDeleteChannelsFun,
  //       allowStickersAndMemes: channelSettings.allowStickersAndMemesFun,
  //       allowCustomMemes: channelSettings.allowCustomMemesFun,
  //     },
  //     messagingSettings: {
  //       allowUserEditMessages: channelSettings.allowUserEditMessages,
  //       allowUserDeleteMessages: channelSettings.allowUserDeleteMessages,
  //       allowOwnerDeleteMessages: channelSettings.allowOwnerDeleteMessages,
  //       allowTeamMentions: channelSettings.allowTeamMentions,
  //       allowChannelMentions: channelSettings.allowChannelMentions,
  //     },
  //     discoverySettings: {
  //       showInTeamsSearchAndSuggestions:
  //         channelSettings.showInTeamsSearchAndSuggestions,
  //     },
  //     installedApps: [
  //       {
  //         "teamsApp@odata.bind":
  //           "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps('com.microsoft.teamspace.tab.vsts')",
  //       },
  //       {
  //         "teamsApp@odata.bind":
  //           "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps('1542629c-01b3-4a6d-8f76-1938b779e48d')",
  //       },
  //     ],
  //   };
    
  //   const createMSTeamsTemplatesWithChannelsTabs = () => {
  //     let passdata: any = localStorage.getItem("pass");
  //     let requestBody = {
  //       agrno: agrno,
  //       strEmail: email,
  //       password: password,
  //       Name: groupname ? groupname : "",
  //       TemplateData: channels,
  //       TabseCheck: channels1true,
  //       TemplateSettings: {
  //         memberSettings: {
  //           allowCreateUpdateChannels:
  //             channelSettings.allowCreateUpdateChannels,
  //           allowDeleteChannels: channelSettings.allowDeleteChannels,
  //           allowAddRemoveApps: channelSettings.allowAddRemoveApps,
  //           allowCreateUpdateRemoveTabs:
  //             channelSettings.allowCreateUpdateRemoveTabs,
  //           allowCreateUpdateRemoveConnectors:
  //             channelSettings.allowCreateUpdateRemoveConnectors,
  //         },
  //         guestSettings: {
  //           allowCreateUpdateChannels:
  //             channelSettings.allowCreateUpdateChannelsGuest,
  //           allowDeleteChannels: channelSettings.allowDeleteChannelsGuest,
  //         },
  //         funSettings: {
  //           allowGiphy: channelSettings.allowDeleteChannelsFun,
  //           giphyContentRating: "Moderate"
  //             ? "Moderate"
  //             : channelSettings.allowDeleteChannelsFun,
  //           allowStickersAndMemes: channelSettings.allowStickersAndMemesFun,
  //           allowCustomMemes: channelSettings.allowCustomMemesFun,
  //         },
  //         messagingSettings: {
  //           allowUserEditMessages: channelSettings.allowUserEditMessages,
  //           allowUserDeleteMessages: channelSettings.allowUserDeleteMessages,
  //           allowOwnerDeleteMessages: channelSettings.allowOwnerDeleteMessages,
  //           allowTeamMentions: channelSettings.allowTeamMentions,
  //           allowChannelMentions: channelSettings.allowChannelMentions,
  //         },
  //         discoverySettings: {
  //           showInTeamsSearchAndSuggestions:
  //             channelSettings.showInTeamsSearchAndSuggestions,
  //         },
  //       },
  //     };
  //     console.log("getDomian", requestBody);
  //     CallApiphp(
  //       requestBody,
  //       "createMSTeamsTemplatesWithChannelsTabs",
  //       function (res: any) {
  //         if (res) {
  //           console.log(res, "response11");
  //         } else {
  //         }
  //       }
  //     );
  //   };
  //   // createMSTeamsTemplatesWithChannelsTabs();
  //   console.log(
  //     tabs,
  //     "createChannalData",
  //     createChannalData,
  //     "ddfgfdgdfgfdgdfg",
  //     channels
  //   );
  //   // console.log(newChannels,"newchanneldata",newTab);
  // };
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
  useEffect(() => {
    Json_getMSTeamsTabList();
  }, []);
  const handleChangeTabs = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any
  ) => {
    const isChecked = event.target.checked;
    console.log(isChecked, "isChecked", tabsapidata);
    setChannels1true(event.target.checked);
    const newChannels: any = [...channels];
    let newTabs: any = [...tabs];

    // Create a new tab object structure
    const newTab = {
      teamsApp: {
        "@odata.bind":
          "https://graph.microsoft.com/v1.0/appCatalogs/teamsApps('com.microsoft.teamspace.tab.web')",
      },
      displayName: event.target.name,
      configuration: {
        contentUrl: tabsapidata[0]?.BaseUrl ?? "",
      },
    };

    if (isChecked) {
      // Add the new tab object to the tabs array
      newTabs.push(newTab);
    } else {
      // Remove the tab object from the tabs array if the checkbox is unchecked
      const tabIndex = newTabs.findIndex(
        (tab: any) => tab.displayName === event.target.name
      );
      if (tabIndex !== -1) {
        newTabs.splice(tabIndex, 1);
      }
    }

    // Update the channels array with tabs information
    newChannels[index] = {
      ...newChannels[index],
      tabs: newTabs, // Set tabs to newTabs array
    };

    // Update state
    setTabs(newTabs);
    setChannels(newChannels);
    console.log(newChannels, "newChannelsAdmin");
  };

//  const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };
  // const handleChangeName = (event: any) => {
  //   setGroupname(event.target.value);
  // };
  // const handleChangeDescrition = (event: any) => {
  //   setDescription(event.target.value);
  // };
  const handleChannelName = (event: any, index: any) => {
    setChannelname(event.target.value);
    const newChannels: any = [...channels];
    newChannels[index] = {
      ...newChannels[index],
      displayName: event.target.value,
    };
    setChannels(newChannels);
  };
  const handleChannelDes = (event: any, index: any) => {
    setChanneldes(event.target.value);
    const newChannels: any = [...channels];
    newChannels[index] = {
      ...newChannels[index],
      description: event.target.value,
    };
    setChannels(newChannels);
  };
  const handleChannecheck = (event: any, index: any) => {
    setChannels((prevChannels: any) => {
      const newChannels = [...prevChannels];
      newChannels[index] = {
        ...newChannels[index],
        checkboxfeb: event.target.checked,
        isFavoriteByDefault: event.target.checked,
      };
      return newChannels;
    });

    setCheckboxfeb(index);
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
      <div key={i}>
        <h5>Channel-{i + 1}</h5>
        <div style={{ marginBottom: "20px" }}>
          <TextField
            fullWidth
            id={`standard-basic-client-${i}`}
            label="Channel Name"
            variant="standard"
            value={channels1.channelname}
            onChange={(e) => handleChannelName(e, i)}
            name={`Clientname-${i}`}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
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
                  checked={checkboxfeb === i}
                  onChange={(e) => handleChannecheck(e, i)}
                />
              }
              label="Favorite Channel"
            />
          </FormGroup>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <FormControl fullWidth variant="standard">
            <TextField
              aria-label="minimum height"
              minRows={3}
              name={`fullAddress-${i}`}
              value={channels1.channeldes}
              onChange={(e) => handleChannelDes(e, i)}
              variant="standard"
              label="Channel Description"
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: "20px" }}>
          {/* <Box sx={{ display: "flex" }}>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Channel Tab</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={channels1.gilad}
                      onChange={(e) => handleChangeTabs(e, i)}
                      name="gilad"
                    />
                  }
                  label="Client"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={channels1.jason}
                      onChange={(e) => handleChangeTabs(e, i)}
                      name="jason"
                    />
                  }
                  label="Task"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={channels1.antoine}
                      onChange={(e) => handleChangeTabs(e, i)}
                      name="antoine"
                    />
                  }
                  label="DMS"
                />
              </FormGroup>
            </FormControl>
            <FormControl
              required
              sx={{ m: 3 }}
              variant="standard"
            ></FormControl>
             
          </Box> */}
          <FormLabel component="legend">Channel Tab  </FormLabel>
          <FormGroup>
            {tabsapidata &&
              tabsapidata.map((item: any, i: any) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={channels1true}
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
        </div>
      </div>
    );
  }
  const [selectedValue, setSelectedValue] = useState<TabValue>("local");
  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };
  console.log(channels, "channelschannels", channelSettings);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);

  const CreateTemplate =() => {
    setShowCreateTemplate(!showCreateTemplate);
  }
  return (
    <div className="welcome page container">
      <AppHeader title="Template Administration" />
    <div className="tabList container">
      <TabList selectedValue={selectedValue} onTabSelect={onTabSelect} className='custom-tabs'>
        <Tab className="btn-tabs" id="Local" value="local">
          1. TEMPLATE SETTING  
        </Tab>
        {/* <Tab className="btn-tabs" id="Azure" value="azure">
          2. MY CLIENT
        </Tab>
        <Tab className="btn-tabs" id="Publish" value="publish">
          3. All CLIENTS
        </Tab> */}
      </TabList>
      <div>
        {selectedValue === "local" && (
          <MergeComponent />
        )}
      </div>
    </div>
    </div>
  );
}
