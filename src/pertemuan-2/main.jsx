import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import Container from "./Container";
import ArtikelDetail from "./ArtikelDetail";
import "./custom.css";
import ListProduct from "./ListProduct";
import QnASection from "./QnASection";
createRoot(document.getElementById("root")).render(
  <div>
    <Container>
      <HelloWorld/>
    </Container>
    <ArtikelDetail/>
    <ListProduct/>
    <QnASection/>
  </div>
);
