import * as React from "react";
// import "./Createtabs.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CallApi, { CallApiphp } from "../Services/Apicall";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Alert,
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ImportclientForm from "./ImportclientForm";
import { useData } from "@microsoft/teamsfx-react";
import Member from "../../Member";
import { TeamsFxContext } from "../../Context";
// import { Json_GetFolders } from "../../redux/dev_teams_api_helper";
import { useDispatch, useSelector } from "react-redux";
import { getMSTeamsTemplatesList, Json_GetConfiguration, Json_GetFolders, Json_getMSTeamsTabList } from "../../../redux/dev_teams_api_helper";
import { getAccessTokenLogin, loginIfNeeded } from "../../../auth/tokenService";
let folderData: any;
let bussinessData: any;
let sourceData: any;
let managerData: any;
let billingcontry: any;
let ragistercountry: any;
let statusData: any;
let agrno: any = localStorage.getItem("agrno");
let email: any = localStorage.getItem("email");
let password: any = localStorage.getItem("pass");
let intUserid: any = localStorage.getItem("intUserId");
function FlushExample() {
  const dispatch = useDispatch<any>();
  // const [folders, setFolders] = useState([]); 
  const folders = useSelector(
  (state: any) => state.dev_teams_slice.GetFolderData
);
  const bussiness = useSelector(
  (state: any) => state.dev_teams_slice.bussiness
);
  const sources = useSelector(
  (state: any) => state.dev_teams_slice.sources
);
  const mangers = useSelector(
  (state: any) => state.dev_teams_slice.mangers
);
  const status = useSelector(
  (state: any) => state.dev_teams_slice.status
);
  const teams = useSelector(
  (state: any) => state.dev_teams_slice.teams
);
 const tabsapidata = useSelector(
  (state: any) => state.dev_teams_slice.tabsapidata
);
console.log(folders,"foldersreduxdata");

  // const [teams, setTeams] = useState([]);
  const [memberuser, setMemberuser] = useState([]);
  const [memberData, setMemberData] = useState<any[]>([]);
const [selectedRoles, setSelectedRoles] = useState<any>({});
  // const [tabsapidata, setTabsapidata] = useState<any>([]);
  // const [bussiness, setBussiness] = useState([]); 
  // const [sources, setSources] = useState([]); 
  // const [mangers, setMangers] = useState([]); 
  // const [status, setStatus] = useState([]); 
  const [selectedFolderID, setSelectedFolderID] = useState<number | null>(null);
  const [selectedBussId, setSelectedBussId] = useState<number | null>(null);
  const [selectedSourceId, setSelectedSourceId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const [alertContent, setAlertContent] = useState("");
  const [main, setMain] = useState(""); 
  const [alert, setAlert] = useState(false);
  const [checkboxfeb, setCheckboxfeb] = useState<any>(false);
  const [mainCountry, setMainCountry] = useState(
    countries.find((country) => country.label === "United Kingdom")?.label
  );
  const [billingsCountry, setBillingsCountry] = useState(
    countries.find((country) => country.label === "United Kingdom")?.label
  );
  const [ragistersCountry, setRagistersCountry] = useState(
    countries.find((country) => country.label === "United Kingdom")?.label
  );
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [value, setValue] = useState<any>(null);
  const [template, setTemplate] = useState<any>(null);
  const [templateData, setTemplateData] = useState<any>(null);
  const [templatesettings, setTemplatesettings] = useState<any>(null);
  const [channels, setChannels] = useState<any>([]);
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
  const [advancedSettingChecked, setAdvancedSettingChecked] = useState(true);
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
  // const Json_GetFolders = () => {
  //   let passdata: any = localStorage.getItem("pass");
  //   let requestBody = {
  //     agrno: localStorage.getItem("agrno"),
  //     Email: localStorage.getItem("email"),
  //     password: passdata,
  //   };

  //   CallApi(requestBody, "Json_GetFolders", function (res: any) {
  //     if (res) {
  //       console.log(res, "response11");
  //       let str = JSON.parse(JSON.stringify(res));
  //       let json = JSON.parse(str.d);
  //       setFolders(json.Table);
  //       console.log(folders, "foldersfolders");
  //     } else {
        
  //     }
  //   });
  // };
//     useEffect(() => {
//   dispatch(Json_GetFolders());
//   dispatch(Json_GetConfiguration());
//   dispatch(getMSTeamsTemplatesList());
//   dispatch(Json_getMSTeamsTabList());
// }, [dispatch]);
useEffect(() => {
  const agrno = localStorage.getItem("agrno");
  const email = localStorage.getItem("email");
 const pass = localStorage.getItem("pass");
  if (!agrno || !email || !pass) {
    console.warn("User data not ready yet");
    return;
  }

  dispatch(Json_GetFolders());
  dispatch(Json_GetConfiguration());
  dispatch(getMSTeamsTemplatesList());
  dispatch(Json_getMSTeamsTabList());
}, [dispatch]);

  // const getAccessToken = async () => {
  //   // let request = {
  //   //   "clientId": "9cc33c54-4615-47f4-94dc-7ccaa75e5378",
  //   //   "clientSecret": "REDACTED_SECRET_ROTATE_ME",
  //   //   "tenantId": "00175dea-da9a-4dfa-8dd0-7f96eb63ace0"
  //   // };
  //   // CallApiphp(request, "getAccessToken", function (res: any) {
  //   //   if (res) {
  //   const token = await getAccessTokenLogin(); // 🔥 auto refresh
  //   console.log(token, "creategetAccessTokenLogin_token");
  //       setTemplateData(token);
  //   //   } else {
  //   //   }
  //   // });
  // };
  // const getMSTeamsTemplatesList = () => {
  //   let requestBody = {
  //     agrno: agrno,
  //     strEmail: email,
  //     password: password,
  //   };

  //   CallApiphp(requestBody, "getMSTeamsTemplatesList", function (res: any) {
  //     if (res) {
  //       console.log(res, "getMSTeamsTemplatesList");
  //       setTeams(res.data);
  //     } else {
  //     }
  //   });
  // };
  const getMSTeamsTemplatesDetailsById = (templateId: any) => {
    let requestBody = {
      agrno: localStorage.getItem("agrno"),
      strEmail: localStorage.getItem("email"),
      password: localStorage.getItem("pass"),
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
          let templateSetting = JSON.parse(jsondata.TemplateSettings);
          console.log(templateSetting, "templatesettings");
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
          if (json && json.length > 0) {
            const initialCheckboxes = json.map(
              (data: any) => data.isFavoriteByDefault || false
            ); 
            setCheckboxfeb(initialCheckboxes);
            json.map((data: any, index1: any) => {
              data &&
                Array.isArray(data.tabs) &&
                data?.tabs.map((item: any, index: any) => {
                  HandleChangeDataPush(item, index1);
                });
            });
          }
          setTemplate(json);
        } else {
        }
      }
    );
  };

  function HandleChangeDataPush(item: any, Ind: any) {
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
          userDetail.Clientid
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
    setChannels((prevChannels: any) => {
      const newChannels = [...prevChannels];
      newChannels[Ind] = {
        ...newChannels[Ind],
        tabs: [newTab],
      };
      return newChannels;
    });
  }
  // const Json_GetConfiguration = () => {
  //   let passdata: any = localStorage.getItem("pass");
  //   let requestBody = {
  //     agrno: localStorage.getItem("agrno"),
  //     Email: localStorage.getItem("email"),
  //     password: passdata,
  //   };
  //   CallApi(requestBody, "Json_GetConfiguration", function (res: any) {
  //     if (res) {
  //       console.log(res, "Json_GetConfiguration");
  //       let str = JSON.parse(JSON.stringify(res));
  //       let json = JSON.parse(str.d);
  //       console.log(json, "Json_GetConfiguration1");
  //       setBussiness(json.Table1);
  //       setSources(json.Table2);
  //       setMangers(json.Table3);
  //       setStatus(json.Table);
  //     } else {
  //     }
  //   });
  // };
  const Json_SetClientAddress = (objdata: any) => {
    CallApi(objdata, "Json_SetClientAddress", function (res: any) {
      if (res) {
        console.log(res, "Json_SetClientAddress");
      } else {
      }
    });
  };
  const mainAddress = () => {
    let obj = {
      agrno: agrno,
      Email: email,
      password: password,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      AddressId: 1,
      AddressType: "Main Address",
      Add1: userDetail.Line1 ? userDetail.Line1 : "",
      Add2: userDetail.Line2 ? userDetail.Line2 : "",
      Add3: userDetail.Line3 ? userDetail.Line3 : "",
      Town: userDetail.Town ? userDetail.Town : "",
      County: userDetail.MCounty ? userDetail.MCounty : "",
      Postcode: userDetail.Postcode ? userDetail.Postcode : "",
      Country: mainCountry,
    };
    console.log(obj, "mainaddress");
    Json_SetClientAddress(obj);
  };

  const billingAddress = () => {
    let obj = {
      agrno: agrno,
      Email: email,
      password: password,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      AddressId: 2,
      AddressType: "Billing Address",
      Add1: userDetail.BilLine1 ? userDetail.BilLine1 : "",
      Add2: userDetail.BilLine2 ? userDetail.BilLine2 : "",
      Add3: userDetail.BilLine3 ? userDetail.BilLine3 : "",
      Town: userDetail.BilTown ? userDetail.BilTown : "",
      County: userDetail.BilCountry ? userDetail.BilCountry : "",
      Postcode: userDetail.BilPostcode ? userDetail.BilPostcode : "",
      Country: billingsCountry,
    };
    console.log(obj, "mainaddress11");
    Json_SetClientAddress(obj);
  };
  const ragisterAddress = () => {
    let obj = {
      agrno: agrno,
      Email: email,
      password: password,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      AddressId: 1,
      AddressType: "Registered Address",
      Add1: userDetail.regLine1 ? userDetail.regLine1 : "",
      Add2: userDetail.regLine2 ? userDetail.regLine2 : "",
      Add3: userDetail.regLine3 ? userDetail.regLine3 : "",
      Town: userDetail.regTown ? userDetail.regTown : "",
      County: userDetail.regCountry ? userDetail.regCountry : "",
      Postcode: userDetail.regPostcode ? userDetail.regPostcode : "",
      Country: ragistersCountry,
    };
    console.log(obj, "mainaddress22");

    Json_SetClientAddress(obj);
  };
  const createDefaultTeam = () => {
    let agrno: any = localStorage.getItem("agrno");
    let email: any = localStorage.getItem("email");
    let password: any = localStorage.getItem("pass");
    let projectId: any = localStorage.getItem("projectid");
    let datacurrent: any = localStorage.getItem("currentUser");
    let currentuserData = JSON.parse(datacurrent);
    console.log(
      datacurrent,
      "channels1",
      channels,
      "template",
      template,
      "datacurrentsonam",
      JSON.parse(datacurrent)
    );
    let templatedata: any = {
      "template@odata.bind":
        "https://graph.microsoft.com/v1.0/teamsTemplates/standard",
      visibility: "Private",
      displayName: userDetail.Clientid,
      description: "Docusoft related data with documents and apps.",
      members: [
        {
          "@odata.type": "#microsoft.graph.aadUserConversationMember",
          roles: ["owner"],
          "user@odata.bind": `https://graph.microsoft.com/v1.0/users/${localStorage.getItem("userId")}`,
        },
      ],
      channels: template,//channels && channels.length > 0 ? channels : template,
      memberSettings: {
        allowCreateUpdateChannels: channelSettings.allowCreateUpdateChannels,
        allowDeleteChannels: channelSettings.allowDeleteChannels,
        allowAddRemoveApps: channelSettings.allowAddRemoveApps,
        allowCreateUpdateRemoveTabs:
          channelSettings.allowCreateUpdateRemoveTabs,
        allowCreateUpdateRemoveConnectors:
          channelSettings.allowCreateUpdateRemoveConnectors,
        "TeamMember.ReadWriteNonOwnerRole.All": true,
        "TeamMember.ReadWrite.All": true,
      },
      guestSettings: {
        allowCreateUpdateChannels: channelSettings.allowCreateUpdateChannels,
        allowDeleteChannels: channelSettings.allowDeleteChannels,
      },
      funSettings: {
        allowGiphy: channelSettings.allowDeleteChannelsFun,
        giphyContentRating: "Moderate",
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
    };
    let memberdata = memberuser;
    let clienttestObj = {
      agrno: agrno,
      Email: email,
      password: password,
      clientId: userDetail.Clientid,
      displayName: userDetail.Clientid,
      description: "Docusoft related data with documents and apps.",
      projectId: projectId,
      TemplateData: [templatedata],
      MembersData: memberdata,
      tenantId: userNameData.tenantId,
      accessToken: templateData,
    };
    console.log("getDomian");
    CallApiphp(clienttestObj, "createDefaultTeam", function (res: any) {
      if (res) {
        console.log(res, "response11");
      } else {
      }
    });
  };
  const onChange = (e: any) => {
    e.preventDefault();
    let data = { ...userDetail };
    let name = e.target.name;
    let val = e.target.value;
    data = { ...data, [name]: val };
    console.log(data, "dataOnchange", e);
    setUserDetail(data);
  };
  const onChangeTeams = (
    event: React.ChangeEvent<{}>,
    value: FilmOptionType | null
  ) => {
    event.preventDefault();
    if (value) {
      setValue(value.TemplateId ? value.TemplateId : "");
       setSelectedTeam(value);
      console.log(value, "SourceIdiiioioioi");
      getMSTeamsTemplatesDetailsById(value.TemplateId);
    } else {
      setValue(null);
    }
  };

  // const onChangeclientlist = (
  //   event: React.ChangeEvent<{}>,
  //   value: FolderList | null
  // ) => {
  //   event.preventDefault();
  //   if (value) {
  //     // Update the selectedFolderID state with the FolderID of the selected option
  //     folderData = value.FolderID;
  //     setSelectedFolderID(value.FolderID);
  //     console.log(value.FolderID, "FolderID", selectedFolderID);
  //   } else {
  //     setSelectedFolderID(null);
  //   }
  // };
const onChangeclientlist = (
  event: any,
  value: FolderList | any
) => {
  if (value) {
    setSelectedFolderID(value.FolderID);

    setUserDetail((prev: any) => ({
      ...prev,
      Selectclient: value, // store full object
    }));
  } else {
    setSelectedFolderID(null);

    setUserDetail((prev: any) => ({
      ...prev,
      Selectclient: null,
    }));
  }
};
  const onChange_registerCountry = (
    event: React.ChangeEvent<{}>,
    value: CountryType | null
  ) => {
    event.preventDefault();
    if (value) {
      // Update the selectedFolderID state with the FolderID of the selected option
      ragistercountry = value.label;
      setRagistersCountry(value.label);
      console.log(value, "onChange_registerCountry", ragistersCountry);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setSelectedFolderID(null);
    }
  };

  const onChange_bilingCountry = (
    event: React.ChangeEvent<{}>,
    value: CountryType | null
  ) => {
    event.preventDefault();
    if (value) {
      // Update the selectedFolderID state with the FolderID of the selected option
      billingcontry = value.label;
      setBillingsCountry(value.label);
      console.log(value, "onChange_bilingCountry", billingsCountry);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setSelectedFolderID(null);
    }
  };

  const onChange_mainCountry = (
    event: React.ChangeEvent<{}>,
    value: CountryType | null
  ) => {
    event.preventDefault();
    if (value) {
      setMain(value.label);
      setMainCountry(value.label);
      console.log(value, "onChange_mainCountry", mainCountry);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setSelectedFolderID(null);
    }
  };
  const onChangebussines = (
    event: React.ChangeEvent<{}>,
    value: BussinessList | null
  ) => {
    event.preventDefault();
    if (value) {
      // Update the selectedFolderID state with the FolderID of the selected option
      bussinessData = value.BussId;
      setSelectedBussId(value.BussId);
      console.log(value.BussId, "BussId", selectedBussId);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setSelectedBussId(null);
    }
  };
  const handleChannecheck = (event: any, index: any) => {
    // setCheckboxfeb(event.target.checked);

    const { checked } = event.target;
    setCheckboxfeb((prevCheckboxes: any) => {
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
  const onChangestatuss = (
    event: React.ChangeEvent<{}>,
    value: StatusList | null
  ) => {
    event.preventDefault();
    if (value) {
      // Update the selectedFolderID state with the FolderID of the selected option
      statusData = value.StatusId;
      setSelectedStatusId(value.StatusId);
      console.log(value.StatusId, "StatusId", selectedStatusId);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setSelectedStatusId(null);
    }
  };
  const onChangesource = (
    event: React.ChangeEvent<{}>,
    value: SourceList | null
  ) => {
    event.preventDefault();
    if (value) {
      // Update the selectedFolderID state with the FolderID of the selected option
      sourceData = value.SourceId;
      setSelectedSourceId(value.SourceId);
      console.log(value.SourceId, "SourceId", selectedSourceId);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setSelectedSourceId(null);
    }
  };
  const onChangeuser = (
    event: React.ChangeEvent<{}>,
    value: UserList | null
  ) => {
    event.preventDefault();
    if (value) {
      // Update the selectedFolderID state with the FolderID of the selected option
      managerData = value.UserId;
      setSelectedUserId(value.UserId);
      console.log(value.UserId, "UserId", selectedUserId);
    } else {
      // If no option is selected, clear the selectedFolderID state
      setSelectedUserId(null);
    }
  };
  function todayDate() {
    var today = new Date().toJSON().slice(0, 10);
    return today;
  }
 
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });
  const userNameData: any = loading || error ? "" : data;
  console.log(memberuser, "memberusermemberuser");
  const defaultUser: any = mangers.find(
    (manager: any) => manager.UserId == intUserid
  );
  const [selectedManager, setSelectedManager] = useState(
    defaultUser ? defaultUser.UserName : ""
  );

  // const [biling, setBiling] = useState(defaultUser);
  console.log(
    template,
    "defaultUsername",
    templatesettings,
    "templatesettings",
    defaultUser
  );
  // const Json_getMSTeamsTabList = () => {
  //   let requestBody = {
  //     agrno: agrno,
  //     Email: email,
  //     password: password,
  //   };
  //   CallApi(requestBody, "Json_getMSTeamsTabList", function (res: any) {
  //     if (res) {
  //       console.log(res, "Json_getMSTeamsTabList");
  //       let str = JSON.parse(JSON.stringify(res));
  //       let json = JSON.parse(str.d);
  //       console.log(json, "Json_getMSTeamsTabList");
  //       console.log(json.Table, "table1111111");
  //       setTabsapidata(json.Table);
  //     } else {
  //     }
  //   });
  // };
  useEffect(() => {
    if (defaultUser) {
      setSelectedManager(defaultUser.UserName);
    }
    console.log(selectedFolderID, "selectedFolderID", selectedManager);
    // Call the function to fetch folders data
    // Json_GetFolders();
    // Json_GetConfiguration();
    // getMSTeamsTemplatesList();
    // Json_getMSTeamsTabList();
      const init = async () => {
    try {
      await loginIfNeeded();      // 🔐 ensure login
      const token = await getAccessTokenLogin(); // 🔑 then token
      console.log(token, "createMycientgetAccessTokenLogin token");
      setTemplateData(token);
    } catch (e) {
      console.error("Auth failed", e);
    }
  };
  init();
  }, []); // Empty dependency array ensures useEffect runs only once after initial render
  const defaultProps = {
    options: teams,
    getOptionLabel: (option: FilmOptionType) => option.Name || "",
  };

  const clientlist = {
    options: folders,
    getOptionLabel: (option: FolderList) => option.Folder || "",
  };
  const bussinesslist = {
    options: bussiness,
    getOptionLabel: (option: BussinessList) => option.BussName || "",
  };
  const sourcelist = {
    options: sources,
    getOptionLabel: (option: SourceList) => option.SourceName || "",
  };
  const userlistdata = {
    options: mangers,
    getOptionLabel: (option: UserList) => option.UserName || "",
  };
  const statuslistdata = {
    options: status,
    getOptionLabel: (option: StatusList) => option.StatusName || "",
  };
  const [selectedValue, setSelectedValue] = useState("create");
  const [channels1true, setChannels1true] = useState<any>(false);

  const handleChangeradio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const handleChangeTabs = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: any,
    itemdata: any
  ) => {
    const isChecked = event.target.checked;
    console.log(itemdata, tabsapidata, "isCheckedggg", event);
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
        contentUrl: `${tabsapidata[0]?.BaseUrl}?clientID=${
          userDetail.Clientid
        }&projectID=${selectedFolderID}&Token=${window.btoa(
          JSON.stringify(Objt)
        )}`,
      },
    };
    console.log(newTab, "newTabdata");
    const newChannels1: any = [...channels];
    newChannels1[index] = {
      ...newChannels1[index],
      tabs: [newTab],
    };
    setChannels(newChannels1);
  };

  const [activeStep, setActiveStep] = React.useState(0);
const isStepValid = (step: number) => {
  if (step === 0) {
    return (
      userDetail.Clientname?.trim() !== "" &&
      userDetail.Clientid?.trim() !== "" &&
      userDetail.Selectclient?.trim() !== ""
    );
  }

  return true; // other steps valid by default
};
const handleNext = () => {
  // 🔹 STEP 0 VALIDATION (Folder List Mandatory)
  // if (activeStep === 0) {
  //   if (!folderData || folderData === -1) {
  //     setAlertContent("Folder List is required.");
  //     setAlert(true);
  //     setTimeout(() => setAlert(false), 3000);
  //     return; // 🚫 STOP STEP CHANGE
  //   }
  // }
if (activeStep === 0) {
  // Validate Client Name
  if (!userDetail.Clientname || userDetail.Clientname.trim() === "") {
    setAlertContent("Client Name is required.");
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
    return;
  }

  // Validate Client ID
  if (!userDetail.Clientid || userDetail.Clientid.trim() === "") {
    setAlertContent("Client ID is required.");
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
    return;
  }

  // Validate Folder List
  if (!userDetail.Selectclient) {
    setAlertContent("Folder List is required.");
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
    return;
  }
}
// 🔹 STEP 1 VALIDATION
  // if (activeStep === 1) {
  //   if (!memberuser || memberuser.length === 0) {
  //     setAlertContent("Please select at least one member.");
  //     setAlert(true);
  //     setTimeout(() => setAlert(false), 3000);
  //     return;
  //   }
  // }
  if (activeStep === 1) {
    console.log(memberuser, "memberusermemberuser");
  if (!Array.isArray(memberuser) || memberuser.length == 0) {
    setAlertContent("Please select at least one member.");
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
    return;
  }

  const invalidRole = memberuser.some(
    (m: any) => !m.roles || !m.roles[0]
  );

  if (invalidRole) {
    setAlertContent("Please assign role to selected member.");
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
    return;
  }
}
// ✅ STEP 2 - Only Teams Dropdown Required
if (activeStep === 2) {
  if (!selectedTeam) {
    setAlertContent("Please select a Team.");
    setAlert(true);
    setTimeout(() => setAlert(false), 3000);
    return;
  }
}


  // 🔹 IF LAST STEP → CALL API
  if (activeStep === steps.length - 1) {
    let agrno: any = localStorage.getItem("agrno");
    let email: any = localStorage.getItem("email");
    let password: any = localStorage.getItem("pass");
    let projectId: any = localStorage.getItem("projectid");

    let clientdata = {
      agrno: agrno,
      Email: email,
      password: password,
      ProjectIdList: folderData ? folderData : -1,
      OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
      OriginatorName: userDetail.Clientname ? userDetail.Clientname : "",
      Address: userDetail.fullAddress ? userDetail.fullAddress : "",
      TelNo: "",
      AlteTelNo: "",
      Faxno: "",
      ContactName: "",
      UDF1: "",
      UDF2: "",
      UDF3: "",
      StickyNote: "",
      ContactEmail: "",
      MParameter: "",
      CDate: todayDate(),
      BussId: bussinessData ? bussinessData : 0,
      SourceId: sourceData ? sourceData : 0,
      StatusId: statusData ? statusData : 0,
      Description: "",
      OrgPassword: "",
      ManagerId: managerData ? managerData : parseInt(intUserid),
      OrgActive: "Yes",
    };

    CallApi(clientdata, "Json_AddClient", function (res: any) {
      if (res) {
        let str = JSON.parse(JSON.stringify(res));
        let json = JSON.parse(str.d);

        if (json.Status == "Success") {
          mainAddress();
          billingAddress();
          ragisterAddress();
          createDefaultTeam();
        } else {
          setAlertContent("Reference ID Already Exist");
          setAlert(true);
          setTimeout(() => setAlert(false), 3000);
        }
      }
    });

    return; // 🚫 DO NOT INCREMENT STEP AFTER API
  }

  // 🔹 NORMAL STEP INCREMENT
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   if (activeStep === steps.length - 1) {
  //     let agrno: any = localStorage.getItem("agrno");
  //     let email: any = localStorage.getItem("email");
  //     let password: any = localStorage.getItem("pass");
  //     let projectId: any = localStorage.getItem("projectid");
  //     let clientdata = {
  //       agrno: agrno,
  //       Email: email,
  //       password: password,
  //       ProjectIdList: folderData ? folderData : -1,
  //       OriginatorNo: userDetail.Clientid ? userDetail.Clientid : "",
  //       OriginatorName: userDetail.Clientname ? userDetail.Clientname : "",
  //       Address: userDetail.fullAddress ? userDetail.fullAddress : "",
  //       TelNo: "",
  //       AlteTelNo: "",
  //       Faxno: "",
  //       ContactName: "",
  //       UDF1: "",
  //       UDF2: "",
  //       UDF3: "",
  //       StickyNote: "",
  //       ContactEmail: "",
  //       MParameter: "",
  //       CDate: todayDate(),
  //       BussId: bussinessData ? bussinessData : 0,
  //       SourceId: sourceData ? sourceData : 0,
  //       StatusId: statusData ? statusData : 0,
  //       Description: "",
  //       OrgPassword: "",
  //       ManagerId: managerData ? managerData : parseInt(intUserid),
  //       OrgActive: "Yes",
  //     };

  //     CallApi(clientdata, "Json_AddClient", function (res: any) {
  //       if (res) {
  //         let str = JSON.parse(JSON.stringify(res));
  //         let json = JSON.parse(str.d);
  //         console.log(json, "Json_AddClient");
  //         if (json.Status == "Success") {
  //           mainAddress();
  //           billingAddress();
  //           ragisterAddress();
  //           createDefaultTeam();
  //         } else {
  //           setAlertContent("Reference ID Already Exist");
  //           setAlert(true);
  //           setTimeout(() => {
  //             setAlert(false);
  //           }, 3000); // Hide after 5 seconds
  //         }
  //       } else {
  //         // Handle error if needed
  //       }
  //     }); // Call createDefaultTeam only when it's the last step
  //   }
  // };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange2 = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // sadik
  // stepper
  const steps = [
    {
      label: "Client Details",
      description: (
        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              id="standard-basic-client"
              label="Client Name"
              variant="outlined"
              name="Clientname"
              value={userDetail.Clientname}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <TextField
              fullWidth
              id="standard-basic-id"
              label="Client ID"
              variant="outlined"
              name="Clientid"
              value={userDetail.Clientid}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <Autocomplete
  {...clientlist}
  id="clientlist"
  clearOnEscape
  value={userDetail.Selectclient || null}   // 👈 CONTROL HERE
  onChange={onChangeclientlist}
  isOptionEqualToValue={(option:any, value:any) =>
    option.FolderID === value.FolderID
  }
  getOptionLabel={(option:any) => option.Folder || ""}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Folder List"
      variant="outlined"
    />
  )}
/>
            {/* <Autocomplete
              {...clientlist}
              id="clientlist"
              clearOnEscape
              onChange={onChangeclientlist}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  name="Selectclient"
                  value={userDetail.Selectclient}
                  onChange={onChange}
                  label="Folder List"
                />
              )}
            /> */}
          </Grid>
        </Grid>
      ),
    },
    // end

    {
      label: "Members Data",
      description: (
        <Box className="mb-4">
          {/* <h6>Members Data</h6> */}
          {/* <Member setMemberuser={setMemberuser} /> */}
          <Member
  memberData={memberData}
  setMemberData={setMemberData}
  selectedRoles={selectedRoles}
  setSelectedRoles={setSelectedRoles}
  setMemberuser={setMemberuser}   // ✅ ADD THIS
/>
        </Box>
      ),
    },

    {
      label: "Teams Setting",
      description: (
        <Box>
          <div style={{ marginBottom: "20px" }}>
            <FormControl fullWidth variant="outlined">
              {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}

              <Autocomplete
                {...defaultProps}
                id="clear-on-escape-teams"
                 value={selectedTeam}
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
                                onChange={(e) => handleChannecheck(e, i)}
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
                              <>
                                <FormLabel component="legend">
                                  Channel Tab
                                </FormLabel>
                                <FormControlLabel
                                  key={i}
                                  control={
                                    <Switch
                                      // checked={channels1[index]?.[item.displayName] || false}
                                      defaultChecked
                                      onChange={(e) =>
                                        handleChangeTabs(e, i, item1)
                                      }
                                      name={item.displayName}
                                    />
                                  }
                                  label={item.displayName}
                                />
                              </>
                            ))}

                          
                        </FormGroup>
                    
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              ))}
          </div>

          {/* {test setting data start here} */}
          <div style={{ marginBottom: "20px" }}>
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
             
            </FormGroup>
            {!advancedSettingChecked && (
              <Box className="mt-4">
                <Box className="row">
                  <Box className="col-xl-4 col-md-4 col-sm-6 d-flex">
                    <Box className="advance-setting-box">
                      <h6>Member Setting </h6>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={channelSettings.allowCreateUpdateChannels}
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

                  <Box className="col-xl-4 col-md-4 col-sm-6 d-flex">
                    <Box className="advance-setting-box">
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
                              checked={channelSettings.allowDeleteChannelsGuest}
                              onChange={handleChannelSettingChange}
                              name="allowDeleteChannelsGuest"
                            />
                          }
                          label="allowDeleteChannels"
                        />
                      </FormGroup>
                    </Box>
                  </Box>

                  <Box className="col-xl-4 col-md-4 col-sm-6 d-flex">
                    <Box className="advance-setting-box">
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

                  <Box className="col-xl-4 col-md-4 col-sm-6 d-flex">
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
                              checked={channelSettings.allowUserDeleteMessages}
                              onChange={handleChannelSettingChange}
                              name="allowUserDeleteMessages"
                            />
                          }
                          label="allowUserDeleteMessages"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={channelSettings.allowOwnerDeleteMessages}
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

                  <Box className="col-xl-4 col-md-4 col-sm-6 d-flex">
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
        </Box>
      ),
    },
    {
      label: "Additional Details",
      description: (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  {...bussinesslist}
                  id="clear-on-escape-bussiness"
                  clearOnEscape
                  onChange={onChangebussines}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="Bussiness"
                      value={userDetail.Bussiness}
                      onChange={onChange}
                      label="Bussiness"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  {...statuslistdata}
                  id="clear-on-escape-status"
                  clearOnEscape
                  onChange={onChangestatuss}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="Status"
                      value={userDetail.Status}
                      onChange={onChange}
                      label="Status"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  {...sourcelist}
                  id="clear-on-escape-source"
                  clearOnEscape
                  onChange={onChangesource}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="Source"
                      value={userDetail.Source}
                      onChange={onChange}
                      label="Source"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <FormControl fullWidth variant="outlined">
                <Autocomplete
                  {...userlistdata}
                  // options={mangers.map((manager: UserList) => ({
                  //   id: manager.UserId,
                  //   label: manager.UserName
                  // }))}
                  // getOptionLabel={(option:any) => option.label}
                  // id={`clear-on-escape-manager`}
                  key={`uniques-manager`}
                  value={defaultUser || null}
                  onChange={onChangeuser}
                  clearOnEscape
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      key={`textfield`}
                      name="Manager"
                      onChange={onChange}
                      label="Manager"
                      variant="outlined"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Mobile"
                variant="outlined"
                name="Mobile"
                value={userDetail.Mobile}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Telephone"
                variant="outlined"
                name="Telephone"
                value={userDetail.Telephone}
                onChange={onChange}
              />
            </Grid>
          </Grid>
        </Box>
      ),
    },
    {
      label: "Main Address ",
      description: (
        <Box>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value || ""}>
              <Box>
                <TabList
                  onChange={handleChange2}
                  aria-label="lab API tabs example"
                  className="custom-tabs"
                >
                  <Tab className="btn-tabs" label="Main Address" value="1" />
                  <Tab className="btn-tabs" label="Billing Address" value="2" />
                  <Tab
                    className="btn-tabs"
                    label="Ragistered Address"
                    value="3"
                  />
                  <Tab className="btn-tabs" label="Full Address" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1" className="ps-0">
                <h6 className="mb-3">Main Address</h6>

                <Grid container spacing={3}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Line1"
                      variant="outlined"
                      name="Line1"
                      value={userDetail.Line1}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Line2"
                      variant="outlined"
                      name="Line2"
                      value={userDetail.Line2}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Line3"
                      variant="outlined"
                      name="Line3"
                      value={userDetail.Line3}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Town"
                      variant="outlined"
                      name="Town"
                      value={userDetail.Town}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Country"
                      variant="outlined"
                      name="MCounty"
                      value={userDetail.MCounty}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Postcode"
                      variant="outlined"
                      name="Postcode"
                      value={userDetail.Postcode}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <FormControl fullWidth variant="outlined">
                      {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}

                      <Autocomplete
                        autoHighlight
                        options={countries}
                        id="clear-on-escape-c"
                        getOptionLabel={(option) => option.label}
                        onChange={onChange_mainCountry}
                        value={countries.find(
                          (country) => country.label === mainCountry
                        )}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              alt=""
                            />
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        )}
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="mainAddress"
                            value={userDetail.mainAddress}
                            onChange={onChange}
                            label="Country"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value="2" className="ps-0">
                <h6 className="mb-3">Billing Address</h6>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Line1"
                      variant="outlined"
                      name="BilLine1"
                      value={userDetail.BilLine1}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Line2"
                      variant="outlined"
                      name="BilLine2"
                      value={userDetail.BilLine2}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Line3"
                      variant="outlined"
                      name="BilLine3"
                      value={userDetail.BilLine3}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Town"
                      variant="outlined"
                      name="BilTown"
                      value={userDetail.BilTown}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="County"
                      variant="outlined"
                      name="BilCountry"
                      value={userDetail.BilCountry}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Postcode"
                      variant="outlined"
                      name="BilPostcode"
                      value={userDetail.BilPostcode}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <FormControl fullWidth variant="outlined">
                      {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}

                      <Autocomplete
                        id="clear-on-escapegh"
                        autoHighlight
                        options={countries}
                        getOptionLabel={(option) => option.label}
                        onChange={onChange_bilingCountry}
                        value={countries.find(
                          (country) => country.label === billingsCountry
                        )}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              alt=""
                            />
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        )}
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="biliAddress"
                            value={userDetail.biliAddress}
                            onChange={onChange}
                            label="Country"
                            variant="outlined"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value="3" className="ps-0">
                <h6 className="mb-3">Ragistered Address</h6>
                <Grid container spacing={3}>
                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Line1"
                      variant="outlined"
                      name="regLine1"
                      value={userDetail.regLine1}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Line2"
                      variant="outlined"
                      name="regLine2"
                      value={userDetail.regLine2}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    {" "}
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Line3"
                      variant="outlined"
                      name="regLine3"
                      value={userDetail.regLine3}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Town"
                      variant="outlined"
                      name="regTown"
                      value={userDetail.regTown}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="County"
                      variant="outlined"
                      name="regCountry"
                      value={userDetail.regCountry}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Postcode"
                      variant="outlined"
                      name="regPostcode"
                      value={userDetail.regPostcode}
                      onChange={onChange}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <FormControl fullWidth variant="outlined">
                      {/* <InputLabel id="demo-simple-select-standard-label">Age</InputLabel> */}

                      <Autocomplete
                        autoHighlight
                        options={countries}
                        id="clear-on-escapefhg"
                        getOptionLabel={(option) => option.label}
                        onChange={onChange_registerCountry}
                        value={countries.find(
                          (country) => country.label === ragistersCountry
                        )}
                        renderOption={(props, option) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              alt=""
                            />
                            {option.label} ({option.code}) +{option.phone}
                          </Box>
                        )}
                        clearOnEscape
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            name="regAddress"
                            value={userDetail.regAddress}
                            onChange={onChange}
                            variant="outlined"
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </TabPanel>

              <TabPanel value="4" className="ps-0">
                <h6 className="mb-3">Full Address</h6>
                <TextField
                  aria-label="minimum height"
                  name="fullAddress"
                  value={userDetail.fullAddress}
                  onChange={onChange}
                  className="textarea"
                  // placeholder="Full Address"
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      ),
    },
  ];

  return (
    <Box className="white-box">
      <Row>
        {/* <Welcome /> */}
        <Col>
          {/* <Welcome /> */}
          <Box style={{ display: "flex", flexDirection: "row" }}>
            <RadioGroup
              aria-label="client-options"
              name="client-options"
              value={selectedValue}
              onChange={handleChangeradio}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Box>
                <FormControlLabel
                  value="create"
                  control={<Radio />}
                  label="Create Client1"
                />
              </Box>
              <Box>
                <FormControlLabel
                  value="import"
                  control={<Radio />}
                  label="Import Client11"
                />
              </Box>
            </RadioGroup>
          </Box>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          {alert ? (
            <div style={{ marginBottom: "20px" }}>
              <Alert severity="error">{alertContent}</Alert>
            </div>
          ) : (
            <></>
          )}
          {selectedValue === "create" ? (
            <div>
              <Box>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={
                          index === 2 ? (
                            <Typography variant="caption" className="d-none">
                              Last step
                            </Typography>
                          ) : null
                        }
                      >
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        {/* <Typography>{step.description}</Typography> */}
                        <Box>{step.description}</Box>
                        <Box sx={{ mb: 2, mt: 2 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                              className="btn-blue"
                            >
                              {activeStep === steps.length - 1
                                ? "Add Client"
                                : "Continue"}
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
                    <Typography>Teams Group Created Successfully!</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Create Another
                    </Button>
                  </Paper>
                )}
              </Box>
            </div>
          ) : (
            <ImportclientForm />
          )}
        </Col>
      </Row>
    </Box>
  );
}

export default FlushExample;
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
  BussName: string;
  BussId: number;
}
interface SourceList {
  SourceName: string;
  SourceId: number;
}
interface UserList {
  UserName: string;
  UserId: number;
}
interface StatusList {
  StatusName: string;
  StatusId: number;
}

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}
const countries: readonly CountryType[] = [
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268",
  },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { code: "AW", label: "Aruba", phone: "297" },
  { code: "AX", label: "Alland Islands", phone: "358" },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "387",
  },
  { code: "BB", label: "Barbados", phone: "1-246" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BE", label: "Belgium", phone: "32" },
  { code: "BF", label: "Burkina Faso", phone: "226" },
  { code: "BG", label: "Bulgaria", phone: "359" },
  { code: "BH", label: "Bahrain", phone: "973" },
  { code: "BI", label: "Burundi", phone: "257" },
  { code: "BJ", label: "Benin", phone: "229" },
  { code: "BL", label: "Saint Barthelemy", phone: "590" },
  { code: "BM", label: "Bermuda", phone: "1-441" },
  { code: "BN", label: "Brunei Darussalam", phone: "673" },
  { code: "BO", label: "Bolivia", phone: "591" },
  { code: "BR", label: "Brazil", phone: "55" },
  { code: "BS", label: "Bahamas", phone: "1-242" },
  { code: "BT", label: "Bhutan", phone: "975" },
  { code: "BV", label: "Bouvet Island", phone: "47" },
  { code: "BW", label: "Botswana", phone: "267" },
  { code: "BY", label: "Belarus", phone: "375" },
  { code: "BZ", label: "Belize", phone: "501" },
  {
    code: "CA",
    label: "Canada",
    phone: "1",
    suggested: true,
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
    phone: "61",
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
    phone: "243",
  },
  {
    code: "CF",
    label: "Central African Republic",
    phone: "236",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
    phone: "242",
  },
  { code: "CH", label: "Switzerland", phone: "41" },
  { code: "CI", label: "Cote d'Ivoire", phone: "225" },
  { code: "CK", label: "Cook Islands", phone: "682" },
  { code: "CL", label: "Chile", phone: "56" },
  { code: "CM", label: "Cameroon", phone: "237" },
  { code: "CN", label: "China", phone: "86" },
  { code: "CO", label: "Colombia", phone: "57" },
  { code: "CR", label: "Costa Rica", phone: "506" },
  { code: "CU", label: "Cuba", phone: "53" },
  { code: "CV", label: "Cape Verde", phone: "238" },
  { code: "CW", label: "Curacao", phone: "599" },
  { code: "CX", label: "Christmas Island", phone: "61" },
  { code: "CY", label: "Cyprus", phone: "357" },
  { code: "CZ", label: "Czech Republic", phone: "420" },
  {
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { code: "DJ", label: "Djibouti", phone: "253" },
  { code: "DK", label: "Denmark", phone: "45" },
  { code: "DM", label: "Dominica", phone: "1-767" },
  {
    code: "DO",
    label: "Dominican Republic",
    phone: "1-809",
  },
  { code: "DZ", label: "Algeria", phone: "213" },
  { code: "EC", label: "Ecuador", phone: "593" },
  { code: "EE", label: "Estonia", phone: "372" },
  { code: "EG", label: "Egypt", phone: "20" },
  { code: "EH", label: "Western Sahara", phone: "212" },
  { code: "ER", label: "Eritrea", phone: "291" },
  { code: "ES", label: "Spain", phone: "34" },
  { code: "ET", label: "Ethiopia", phone: "251" },
  { code: "FI", label: "Finland", phone: "358" },
  { code: "FJ", label: "Fiji", phone: "679" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
    phone: "500",
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
    phone: "691",
  },
  { code: "FO", label: "Faroe Islands", phone: "298" },
  {
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true,
  },
  { code: "GA", label: "Gabon", phone: "241" },
  { code: "GB", label: "United Kingdom", phone: "44" },
  { code: "GD", label: "Grenada", phone: "1-473" },
  { code: "GE", label: "Georgia", phone: "995" },
  { code: "GF", label: "French Guiana", phone: "594" },
  { code: "GG", label: "Guernsey", phone: "44" },
  { code: "GH", label: "Ghana", phone: "233" },
  { code: "GI", label: "Gibraltar", phone: "350" },
  { code: "GL", label: "Greenland", phone: "299" },
  { code: "GM", label: "Gambia", phone: "220" },
  { code: "GN", label: "Guinea", phone: "224" },
  { code: "GP", label: "Guadeloupe", phone: "590" },
  { code: "GQ", label: "Equatorial Guinea", phone: "240" },
  { code: "GR", label: "Greece", phone: "30" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { code: "GT", label: "Guatemala", phone: "502" },
  { code: "GU", label: "Guam", phone: "1-671" },
  { code: "GW", label: "Guinea-Bissau", phone: "245" },
  { code: "GY", label: "Guyana", phone: "592" },
  { code: "HK", label: "Hong Kong", phone: "852" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    phone: "672",
  },
  { code: "HN", label: "Honduras", phone: "504" },
  { code: "HR", label: "Croatia", phone: "385" },
  { code: "HT", label: "Haiti", phone: "509" },
  { code: "HU", label: "Hungary", phone: "36" },
  { code: "ID", label: "Indonesia", phone: "62" },
  { code: "IE", label: "Ireland", phone: "353" },
  { code: "IL", label: "Israel", phone: "972" },
  { code: "IM", label: "Isle of Man", phone: "44" },
  { code: "IN", label: "India", phone: "91" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    phone: "246",
  },
  { code: "IQ", label: "Iraq", phone: "964" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    phone: "98",
  },
  { code: "IS", label: "Iceland", phone: "354" },
  { code: "IT", label: "Italy", phone: "39" },
  { code: "JE", label: "Jersey", phone: "44" },
  { code: "JM", label: "Jamaica", phone: "1-876" },
  { code: "JO", label: "Jordan", phone: "962" },
  {
    code: "JP",
    label: "Japan",
    phone: "81",
    suggested: true,
  },
  { code: "KE", label: "Kenya", phone: "254" },
  { code: "KG", label: "Kyrgyzstan", phone: "996" },
  { code: "KH", label: "Cambodia", phone: "855" },
  { code: "KI", label: "Kiribati", phone: "686" },
  { code: "KM", label: "Comoros", phone: "269" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    phone: "1-869",
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    phone: "850",
  },
  { code: "KR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", label: "Kuwait", phone: "965" },
  { code: "KY", label: "Cayman Islands", phone: "1-345" },
  { code: "KZ", label: "Kazakhstan", phone: "7" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
    phone: "856",
  },
  { code: "LB", label: "Lebanon", phone: "961" },
  { code: "LC", label: "Saint Lucia", phone: "1-758" },
  { code: "LI", label: "Liechtenstein", phone: "423" },
  { code: "LK", label: "Sri Lanka", phone: "94" },
  { code: "LR", label: "Liberia", phone: "231" },
  { code: "LS", label: "Lesotho", phone: "266" },
  { code: "LT", label: "Lithuania", phone: "370" },
  { code: "LU", label: "Luxembourg", phone: "352" },
  { code: "LV", label: "Latvia", phone: "371" },
  { code: "LY", label: "Libya", phone: "218" },
  { code: "MA", label: "Morocco", phone: "212" },
  { code: "MC", label: "Monaco", phone: "377" },
  {
    code: "MD",
    label: "Moldova, Republic of",
    phone: "373",
  },
  { code: "ME", label: "Montenegro", phone: "382" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
    phone: "590",
  },
  { code: "MG", label: "Madagascar", phone: "261" },
  { code: "MH", label: "Marshall Islands", phone: "692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { code: "ML", label: "Mali", phone: "223" },
  { code: "MM", label: "Myanmar", phone: "95" },
  { code: "MN", label: "Mongolia", phone: "976" },
  { code: "MO", label: "Macao", phone: "853" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    phone: "1-670",
  },
  { code: "MQ", label: "Martinique", phone: "596" },
  { code: "MR", label: "Mauritania", phone: "222" },
  { code: "MS", label: "Montserrat", phone: "1-664" },
  { code: "MT", label: "Malta", phone: "356" },
  { code: "MU", label: "Mauritius", phone: "230" },
  { code: "MV", label: "Maldives", phone: "960" },
  { code: "MW", label: "Malawi", phone: "265" },
  { code: "MX", label: "Mexico", phone: "52" },
  { code: "MY", label: "Malaysia", phone: "60" },
  { code: "MZ", label: "Mozambique", phone: "258" },
  { code: "NA", label: "Namibia", phone: "264" },
  { code: "NC", label: "New Caledonia", phone: "687" },
  { code: "NE", label: "Niger", phone: "227" },
  { code: "NF", label: "Norfolk Island", phone: "672" },
  { code: "NG", label: "Nigeria", phone: "234" },
  { code: "NI", label: "Nicaragua", phone: "505" },
  { code: "NL", label: "Netherlands", phone: "31" },
  { code: "NO", label: "Norway", phone: "47" },
  { code: "NP", label: "Nepal", phone: "977" },
  { code: "NR", label: "Nauru", phone: "674" },
  { code: "NU", label: "Niue", phone: "683" },
  { code: "NZ", label: "New Zealand", phone: "64" },
  { code: "OM", label: "Oman", phone: "968" },
  { code: "PA", label: "Panama", phone: "507" },
  { code: "PE", label: "Peru", phone: "51" },
  { code: "PF", label: "French Polynesia", phone: "689" },
  { code: "PG", label: "Papua New Guinea", phone: "675" },
  { code: "PH", label: "Philippines", phone: "63" },
  { code: "PK", label: "Pakistan", phone: "92" },
  { code: "PL", label: "Poland", phone: "48" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    phone: "508",
  },
  { code: "PN", label: "Pitcairn", phone: "870" },
  { code: "PR", label: "Puerto Rico", phone: "1" },
  {
    code: "PS",
    label: "Palestine, State of",
    phone: "970",
  },
  { code: "PT", label: "Portugal", phone: "351" },
  { code: "PW", label: "Palau", phone: "680" },
  { code: "PY", label: "Paraguay", phone: "595" },
  { code: "QA", label: "Qatar", phone: "974" },
  { code: "RE", label: "Reunion", phone: "262" },
  { code: "RO", label: "Romania", phone: "40" },
  { code: "RS", label: "Serbia", phone: "381" },
  { code: "RU", label: "Russian Federation", phone: "7" },
  { code: "RW", label: "Rwanda", phone: "250" },
  { code: "SA", label: "Saudi Arabia", phone: "966" },
  { code: "SB", label: "Solomon Islands", phone: "677" },
  { code: "SC", label: "Seychelles", phone: "248" },
  { code: "SD", label: "Sudan", phone: "249" },
  { code: "SE", label: "Sweden", phone: "46" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "SH", label: "Saint Helena", phone: "290" },
  { code: "SI", label: "Slovenia", phone: "386" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
    phone: "47",
  },
  { code: "SK", label: "Slovakia", phone: "421" },
  { code: "SL", label: "Sierra Leone", phone: "232" },
  { code: "SM", label: "San Marino", phone: "378" },
  { code: "SN", label: "Senegal", phone: "221" },
  { code: "SO", label: "Somalia", phone: "252" },
  { code: "SR", label: "Suriname", phone: "597" },
  { code: "SS", label: "South Sudan", phone: "211" },
  {
    code: "ST",
    label: "Sao Tome and Principe",
    phone: "239",
  },
  { code: "SV", label: "El Salvador", phone: "503" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
    phone: "1-721",
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
    phone: "963",
  },
  { code: "SZ", label: "Swaziland", phone: "268" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { code: "TD", label: "Chad", phone: "235" },
  {
    code: "TF",
    label: "French Southern Territories",
    phone: "262",
  },
  { code: "TG", label: "Togo", phone: "228" },
  { code: "TH", label: "Thailand", phone: "66" },
  { code: "TJ", label: "Tajikistan", phone: "992" },
  { code: "TK", label: "Tokelau", phone: "690" },
  { code: "TL", label: "Timor-Leste", phone: "670" },
  { code: "TM", label: "Turkmenistan", phone: "993" },
  { code: "TN", label: "Tunisia", phone: "216" },
  { code: "TO", label: "Tonga", phone: "676" },
  { code: "TR", label: "Turkey", phone: "90" },
  {
    code: "TT",
    label: "Trinidad and Tobago",
    phone: "1-868",
  },
  { code: "TV", label: "Tuvalu", phone: "688" },
  {
    code: "TW",
    label: "Taiwan",
    phone: "886",
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
    phone: "255",
  },
  { code: "UA", label: "Ukraine", phone: "380" },
  { code: "UG", label: "Uganda", phone: "256" },
  {
    code: "US",
    label: "United States",
    phone: "1",
    suggested: true,
  },
  { code: "UY", label: "Uruguay", phone: "598" },
  { code: "UZ", label: "Uzbekistan", phone: "998" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "379",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { code: "VE", label: "Venezuela", phone: "58" },
  {
    code: "VG",
    label: "British Virgin Islands",
    phone: "1-284",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
    phone: "1-340",
  },
  { code: "VN", label: "Vietnam", phone: "84" },
  { code: "VU", label: "Vanuatu", phone: "678" },
  { code: "WF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", label: "Samoa", phone: "685" },
  { code: "XK", label: "Kosovo", phone: "383" },
  { code: "YE", label: "Yemen", phone: "967" },
  { code: "YT", label: "Mayotte", phone: "262" },
  { code: "ZA", label: "South Africa", phone: "27" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" },
];
