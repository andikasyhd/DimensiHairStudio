import ErrorPage from "../components/ErrorPage";

export default function Error401() {
  return (
    <ErrorPage
      code="401"
      description="Unauthorized. You don't have permission to access this page."
      image="/img/hp.jpg"
    />
  );
}
