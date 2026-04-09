import { useContext, useEffect, useState } from "react";
import {
  Image,
  TabList,
  Tab,
  SelectTabEvent,
  SelectTabData,
  TabValue,
} from "@fluentui/react-components";
import "./css/Client.css";
import { EditCode } from "./EditCode";
import { AzureFunctions } from "./AzureFunctions";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import { TeamsFxContext } from "../Context";
import { app } from "@microsoft/teams-js";
import App1 from "../App1";
import { Button } from "@mui/material";
import Myclient from "../Myclient";

export function Client(props: { showFunction?: boolean; environment?: string }) {
  const { showFunction, environment } = {
    showFunction: true,
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const [selectedValue, setSelectedValue] = useState<TabValue>("local");

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };
  const { teamsUserCredential } = useContext(TeamsFxContext);
  const { loading, data, error } = useData(async () => {
    if (teamsUserCredential) {
      const userInfo = await teamsUserCredential.getUserInfo();
      return userInfo;
    }
  });
  const userName = loading || error ? "" : data!.displayName;
  const hubName = useData(async () => {
    
    await app.initialize();
    const context = await app.getContext();
    return context.app.host.name;
  })?.data;
  const userNameData = loading || error ? "" : data;
  console.log(userNameData,"userNameData");
  
  const clearLocal = (e:any) => {
    console.log("clear")
    e.preventDefault();
    localStorage.clear();
    window.location.href = "https://teams.docusms.uk/index.html#/login"; // Adjust the path as needed
  
   // prop.setShowH1(false);
  //  history.replace('/app1');
  }
  return (
    <div className="welcome page container">
      <div className="narrow ">
      <Button variant="contained" style={{width:"8%",position: "fixed",
    right: "1%"}} onClick={clearLocal}>Sign Out</Button>
        <div className="tabList">
       

   
          <TabList selectedValue={selectedValue} onTabSelect={onTabSelect} className='custom-tabs'>
            <Tab id="Local" value="local" className="btn-tabs">
              1. CREATE
            </Tab>
            <Tab id="Azure" value="azure" className="btn-tabs">
              2. MY CLIENT  
            </Tab>
            <Tab id="Publish" value="publish" className="btn-tabs">
              3. All CLIENTS
            </Tab>
          </TabList>
          
          <div>
            {selectedValue === "local" && (
              <div>
                <EditCode showFunction={showFunction} />
                <CurrentUser userName={userName} />
                {showFunction && <AzureFunctions />}
              </div>
            )}
            {selectedValue === "azure" && (
              <div>
                {/* <Deploy /> */}
                <Myclient />
              </div>
            )}
            {selectedValue === "publish" && (
              <div>
                <App1 />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
