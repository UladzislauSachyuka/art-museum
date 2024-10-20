import { Props, State } from "@types";
import { Component, ErrorInfo } from "react";

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Oops...Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
