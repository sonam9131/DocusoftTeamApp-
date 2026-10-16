// // import { toast } from "react-toastify";
// import { portalClient,portalUser } from "./AxiosInstance";

// import { setGetFolderData,setBussiness,setSources,setMangers,setStatus,setTeams,setTabsapidata } from "./dev_teams_slice";
// let commanObj = { agrno: localStorage.getItem("agrno"), Email: localStorage.getItem("email"), password: localStorage.getItem("pass")};
// let commanObjDigi = { agrno: localStorage.getItem("agrno"), strEmail: localStorage.getItem("email"), password: localStorage.getItem("password")};
// export const Json_GetFolders = () => async (dispatch) => {
//   try {
//     const res = await portalClient.post("/Json_GetFolders", {
//       ...commanObj
//     });
//      console.log(commanObj,"commanObj");
//     if (res?.data?.d) {
//         let parsedata = JSON.parse(res.data.d);
//         console.log("Json_GetFolders response:", parsedata);
//         dispatch(setGetFolderData(parsedata.Table || []));
//     }
//   } catch (err) {
//     console.log("Error while calling Json_GetFolders", err);
//   }
// };
// export const Json_GetConfiguration = () => async (dispatch) => {
//   try {
//     const res = await portalClient.post("/Json_GetConfiguration", {
//       ...commanObj
//     });

//     if (res?.data?.d) {
//         let json = JSON.parse(res.data.d);
//         console.log("Json_GetConfiguration response:", json);
//         dispatch(setBussiness(json.Table1));
//         dispatch(setSources(json.Table2))   ;
//         dispatch(setMangers(json.Table3));
//         dispatch(setStatus(json.Table));
//     }
//   } catch (err) {
//     console.log("Error while calling Json_GetFolders", err);
//   }
// };
// export const getMSTeamsTemplatesList = () => async (dispatch) => {
//   try {
//     const res = await portalUser.post("/getMSTeamsTemplatesList", {
//       ...commanObjDigi
//     });

//     if (res?.data?.d) {
//         let json = JSON.parse(res.data.d);
//         console.log("getMSTeamsTemplatesList response:", json);
//         dispatch(setTeams(json.data || []));
//     }
//   } catch (err) {
//     console.log("Error while calling getMSTeamsTemplatesList", err);
//   }
// };
// export const Json_getMSTeamsTabList = () => async (dispatch) => {
//   try {
//     const res = await portalClient.post("/Json_getMSTeamsTabList", {
//       ...commanObj
//     });

//     if (res?.data?.d) {
//         let json = JSON.parse(res.data.d);
//         console.log("getMSTeamsTemplatesList response:", json);
//         dispatch(setTabsapidata(json.Table || []));
//     }
//   } catch (err) {
//     console.log("Error while calling getMSTeamsTemplatesList", err);
//   }
// };


// import { toast } from "react-toastify";
import { portalClient, portalUser } from "./AxiosInstance";
import {
  setGetFolderData,
  setBussiness,
  setSources,
  setMangers,
  setStatus,
  setTeams,
  setTabsapidata
} from "./dev_teams_slice";

/* 🔥 Always read latest localStorage values */
const getCommonObj = () => ({
  agrno: localStorage.getItem("agrno"),
  Email: localStorage.getItem("email"),
  password: localStorage.getItem("pass"),
});

const getCommonObjDigi = () => ({
  agrno: localStorage.getItem("agrno"),
  strEmail: localStorage.getItem("email"),
  password: localStorage.getItem("pass"),
});

export const Json_GetFolders = () => async (dispatch) => {
  try {
    const commanObj = getCommonObj();
    console.log("Json_GetFolders payload:", commanObj);

    const res = await portalClient.post("/Json_GetFolders", commanObj);

    if (res?.data?.d) {
      const parsedata = JSON.parse(res.data.d);
      dispatch(setGetFolderData(Array.isArray(parsedata.Table) ? parsedata.Table : []));
    }
  } catch (err) {
    console.log("Error while calling Json_GetFolders", err);
  }
};

export const Json_GetConfiguration = () => async (dispatch) => {
  try {
    const commanObj = getCommonObj();
    console.log("Json_GetConfiguration payload:", commanObj);

    const res = await portalClient.post("/Json_GetConfiguration", commanObj);

    if (res?.data?.d) {
      const json = JSON.parse(res.data.d);
      dispatch(setBussiness(Array.isArray(json.Table1) ? json.Table1 : []));
      dispatch(setSources(Array.isArray(json.Table2) ? json.Table2 : []));
      dispatch(setMangers(Array.isArray(json.Table3) ? json.Table3 : []));
      dispatch(setStatus(Array.isArray(json.Table) ? json.Table : []));
    }
  } catch (err) {
    console.log("Error while calling Json_GetConfiguration", err);
  }
};

export const getMSTeamsTemplatesList = () => async (dispatch) => {
  try {
    const commanObjDigi = getCommonObjDigi();
    console.log("getMSTeamsTemplatesList payload:", commanObjDigi);

    const res = await portalUser.post(
      "/getMSTeamsTemplatesList",
      commanObjDigi
    );
     console.log(res,"getMSTeamsTemplatesListgetMSTeamsTemplatesList",res?.data?.data);

    // if (res?.data?.data) {
      const json = res?.data?.data; //JSON.parse(res?.data?.data);
      if(Array.isArray(json) && json.length > 0){
console.log(json,"jsongetMSTeamsTemplatesListgetMSTeamsTemplatesList")
      dispatch(setTeams(json));
      }
       
    // }
  } catch (err) {
    console.log("Error while calling getMSTeamsTemplatesList", err);
  }
};

export const Json_getMSTeamsTabList = () => async (dispatch) => {
  try {
    const commanObj = getCommonObj();
    console.log("Json_getMSTeamsTabList payload:", commanObj);

    const res = await portalClient.post("/Json_getMSTeamsTabList", commanObj);

    if (res?.data?.d) {
      const json = JSON.parse(res.data.d);
      dispatch(setTabsapidata(Array.isArray(json.Table) ? json.Table : []));
    }
  } catch (err) {
    console.log("Error while calling Json_getMSTeamsTabList", err);
  }
};



