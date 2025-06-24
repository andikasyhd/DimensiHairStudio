import ErrorPage from "../components/ErrorPage";
import FooterGuest from "../components/Guest/FooterGuest";
import Navbar from "../components/Guest/Navbar";

export default function NotFound() {
  return (
    <div>
        <Navbar/>
      <ErrorPage
        code="404"
        description="Not Found Page yang anda cari tidak ada disini"
        image="/img/hp.jpg"
      />
      <FooterGuest/>
    </div>
  );
}
