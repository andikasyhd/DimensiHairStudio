import ErrorPage from "../components/ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      code="403"
      description="Unauthorized. You don't have permission to access this page."
      image="/img/hp.jpg"
    />
  );
}
