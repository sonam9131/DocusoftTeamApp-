import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@mui/material";

interface Props {
  children: ReactNode;
  // Short label for what this boundary protects, shown in the fallback and
  // in the console so a crash can be traced back to the section that threw.
  label?: string;
}

interface State {
  hasError: boolean;
}

// React render errors below this boundary would otherwise unmount the whole
// tree and leave the Teams tab on a blank white screen. Catching them here
// keeps the rest of the app (other tabs, the header, navigation) usable.
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`ErrorBoundary${this.props.label ? ` [${this.props.label}]` : ""}:`, error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="white-box" style={{ textAlign: "center", margin: "24px" }}>
          <p style={{ fontWeight: 600, marginBottom: 8 }}>
            {this.props.label ? `${this.props.label} couldn't load.` : "Something went wrong."}
          </p>
          <p style={{ color: "var(--ds-text-muted, #6b7280)", marginBottom: 16 }}>
            Please try again. If the problem continues, refresh the page.
          </p>
          <Button variant="contained" className="btn-blue" onClick={this.handleRetry}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
