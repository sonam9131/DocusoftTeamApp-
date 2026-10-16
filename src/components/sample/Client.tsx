import { useContext, useState } from "react";
import "./css/Client.css";
import { EditCode } from "./EditCode";
import { AzureFunctions } from "./AzureFunctions";
import { CurrentUser } from "./CurrentUser";
import { useData } from "@microsoft/teamsfx-react";
import { TeamsFxContext } from "../Context";
import { app } from "@microsoft/teams-js";
import App1 from "../App1";
import Myclient from "../Myclient";
import ErrorBoundary from "../ErrorBoundary";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

type SectionValue = "local" | "azure" | "publish";

const NAV_ITEMS: { value: SectionValue; label: string; icon: JSX.Element }[] = [
  { value: "local", label: "Create Client", icon: <AddCircleOutlineRoundedIcon fontSize="inherit" /> },
  { value: "azure", label: "My Client", icon: <PersonOutlineRoundedIcon fontSize="inherit" /> },
  { value: "publish", label: "All Clients", icon: <GroupsRoundedIcon fontSize="inherit" /> },
];

export function Client(props: { showFunction?: boolean; environment?: string }) {
  const { showFunction } = {
    showFunction: true,
    ...props,
  };

  const [selectedValue, setSelectedValue] = useState<SectionValue>("local");

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
  console.log(data, hubName, "userNameData");

  const clearLocal = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "https://teams.docusms.uk/index.html#/login";
  };

  const activeLabel = NAV_ITEMS.find((item) => item.value === selectedValue)?.label ?? "";

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-sidebar__brand">
          <div className="app-sidebar__logo-wrap">
            <img
              src="https://mydocusoft.com/assets/images/logo.png"
              className="app-sidebar__logo"
              alt="Docusoft"
            />
          </div>
        </div>

        <div className="app-sidebar__section-label">Workspace</div>
        <nav className="app-sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`app-sidebar__link${selectedValue === item.value ? " active" : ""}`}
              onClick={() => setSelectedValue(item.value)}
            >
              <span className="app-sidebar__icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="app-sidebar__footer">
          <button type="button" className="app-sidebar__signout" onClick={clearLocal}>
            <LogoutRoundedIcon fontSize="small" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="app-main">
        <div className="app-main__header">
          <div className="app-main__eyebrow">Docusoft Teams</div>
          <div className="app-main__title">{activeLabel}</div>
        </div>

        <div className="app-main__content">
          {selectedValue === "local" && (
            <ErrorBoundary label="Create Client">
              <EditCode showFunction={showFunction} />
              <CurrentUser userName={userName} />
              {showFunction && <AzureFunctions />}
            </ErrorBoundary>
          )}
          {selectedValue === "azure" && (
            <ErrorBoundary label="My Client">
              <div className="white-box data-grid-card">
                <Myclient />
              </div>
            </ErrorBoundary>
          )}
          {selectedValue === "publish" && (
            <ErrorBoundary label="All Clients">
              <div className="white-box data-grid-card">
                <App1 />
              </div>
            </ErrorBoundary>
          )}
        </div>
      </main>
    </div>
  );
}
