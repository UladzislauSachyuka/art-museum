import ErrorBoundary from "components/ErrorBoundary";
import Layout from "components/Layout";

const ErrorBoundaryLayout = () => {
  return (
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  );
};

export default ErrorBoundaryLayout;
