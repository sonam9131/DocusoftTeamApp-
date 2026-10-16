import { Image } from "@fluentui/react-components";
import { Button } from "@mui/material";

// Shared top bar for every top-level screen (the Client tabs shell, Admin,
// and any other standalone route) so navigating between them feels like one
// product instead of the Teams-tab UI vs. bare unstyled pages.
export default function AppHeader(props: { title?: string; showSignOut?: boolean }) {
  const { title = "Teams Client Manager", showSignOut = true } = props;

  const clearLocal = (e: any) => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "https://teams.docusms.uk/index.html#/login";
  };

  return (
    <div className="app-header">
      <div className="app-header__brand">
        <Image
          src="https://mydocusoft.com/assets/images/logo.png"
          className="app-header__logo"
          alt="Docusoft"
        />
        <span className="app-header__title">{title}</span>
      </div>
      {showSignOut && (
        <Button
          variant="contained"
          className="app-header__signout btn-red"
          onClick={clearLocal}
        >
          Sign Out
        </Button>
      )}
    </div>
  );
}
