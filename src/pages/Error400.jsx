import ErrorPage from "../components/ErrorPage";

export default function Error400() {
  return (
    <ErrorPage
      code="400"
      description="Unauthorized. You don't have permission to access this page."
      image="/img/hp.jpg"
    />
  );
}
