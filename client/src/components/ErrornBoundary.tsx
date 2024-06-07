import React, { ErrorInfo } from "react";
type Props = {
  children: React.ReactNode;
};
type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log("ErrorBoundary caught an error", error, info);
    this.setState({ hasError: true });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <div>Found an error !</div>;
    } else {
      return this.props.children;
    }
  }
}
export default ErrorBoundary;
