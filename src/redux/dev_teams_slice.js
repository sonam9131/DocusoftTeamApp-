// import { teams } from "@microsoft/teams-js";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  GetFolderData: [],
  bussiness: [],
  sources: [],
  mangers: [],
  status: [],
  teams: [],
  tabsapidata: []
};

const dev_teams_slice = createSlice({
  name: 'Docu_History',
  initialState,
  reducers: {
    setGetFolderData: (state, action) => {
      state.GetFolderData = action.payload;
    },
    setBussiness: (state, action) => {
      state.bussiness = action.payload;
    },
    setSources: (state, action) => {
      state.sources = action.payload;
    },
    setMangers: (state, action) => {
      state.mangers = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    setTabsapidata: (state, action) => {
      state.tabsapidata = action.payload;
    }
  }
});

export const { setGetFolderData, setBussiness, setSources, setMangers, setStatus, setTeams,setTabsapidata } = dev_teams_slice.actions;
export default dev_teams_slice.reducer;
