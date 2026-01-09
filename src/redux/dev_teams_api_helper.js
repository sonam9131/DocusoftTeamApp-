// import { toast } from "react-toastify";
import { portalClient,portalUser } from "./AxiosInstance";

import { setGetFolderData,setBussiness,setSources,setMangers,setStatus,setTeams,setTabsapidata } from "./dev_teams_slice";
let commanObj = { agrno: localStorage.getItem("agrno"), Email: localStorage.getItem("email"), password: localStorage.getItem("pass")};
let commanObjDigi = { agrno: localStorage.getItem("agrno"), strEmail: localStorage.getItem("email"), password: localStorage.getItem("password")};
export const Json_GetFolders = () => async (dispatch) => {
  try {
    const res = await portalClient.post("/Json_GetFolders", {
      ...commanObj
    });

    if (res?.data?.d) {
        let parsedata = JSON.parse(res.data.d);
        console.log("Json_GetFolders response:", parsedata);
        dispatch(setGetFolderData(parsedata.Table || []));
    }
  } catch (err) {
    console.log("Error while calling Json_GetFolders", err);
  }
};
export const Json_GetConfiguration = () => async (dispatch) => {
  try {
    const res = await portalClient.post("/Json_GetConfiguration", {
      ...commanObj
    });

    if (res?.data?.d) {
        let json = JSON.parse(res.data.d);
        console.log("Json_GetConfiguration response:", json);
        dispatch(setBussiness(json.Table1));
        dispatch(setSources(json.Table2))   ;
        dispatch(setMangers(json.Table3));
        dispatch(setStatus(json.Table));
    }
  } catch (err) {
    console.log("Error while calling Json_GetFolders", err);
  }
};
export const getMSTeamsTemplatesList = () => async (dispatch) => {
  try {
    const res = await portalUser.post("/getMSTeamsTemplatesList", {
      ...commanObjDigi
    });

    if (res?.data?.d) {
        let json = JSON.parse(res.data.d);
        console.log("getMSTeamsTemplatesList response:", json);
        dispatch(setTeams(json.data || []));
    }
  } catch (err) {
    console.log("Error while calling getMSTeamsTemplatesList", err);
  }
};
export const Json_getMSTeamsTabList = () => async (dispatch) => {
  try {
    const res = await portalClient.post("/Json_getMSTeamsTabList", {
      ...commanObj
    });

    if (res?.data?.d) {
        let json = JSON.parse(res.data.d);
        console.log("getMSTeamsTemplatesList response:", json);
        dispatch(setTabsapidata(json.Table || []));
    }
  } catch (err) {
    console.log("Error while calling getMSTeamsTemplatesList", err);
  }
};





