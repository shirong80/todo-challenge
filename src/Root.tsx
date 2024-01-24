import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { createGlobalStyle } from "styled-components";
import { categoryState, toDoState } from "./core/services/atoms";
import { useEffect } from "react";

const GlobalStyle = createGlobalStyle`
  /* fonts import */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* custom styles */
  body {
    font-weight: 300;
    font-family: 'Source Sans 3', sans-serif;
    background-color: #2f3640;
    color: white;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Root() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);

  useEffect(() => {
    const toDos = localStorage.getItem("toDos");
    const categories = localStorage.getItem("categories");

    if (toDos) {
      setToDos(JSON.parse(toDos));
    }

    if (categories) {
      setCategory(JSON.parse(categories));
    }
  }, [setToDos, setCategory]);

  useEffect(() => {
    if (toDos.length > 0) {
      localStorage.setItem("toDos", JSON.stringify(toDos));
    }
  }, [toDos]);

  useEffect(() => {
    if (category.length > 0) {
      localStorage.setItem("categories", JSON.stringify(category));
    }
  }, [category]);

  return (
    <div>
      <GlobalStyle />
      <Outlet />
    </div>
  );
}
