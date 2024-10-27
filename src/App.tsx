import Router from "./Router";
import { createGlobalStyle } from "styled-components";

// import { ReactQueryDevtools } from "react-query/devtools";

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: 'Pretty Dahlia'; 
  src: url('/fonts/Pretty Dahlia.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'waltograph';
  src: url('/fonts/waltograph42.otf') format('opentype'); 
  font-weight: normal;
  font-style: normal;
}
@font-face {
    font-family: 'AlexBrush-Regular';
    src: url('/fonts/AlexBrush-Regular.ttf') format('truetype'); 
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Matcha-EaLge';
    src: url('/fonts/Matcha-EaLge.ttf') format('truetype'); 
    font-weight: normal;
    font-style: normal;
  }
  

@import url('https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Cinzel+Decorative:wght@400;700;900&family=Dongle&family=Nanum+Brush+Script&family=Nanum+Pen+Script&family=Sofia&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
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
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
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
*{
  box-sizing: border-box;
}
body {
  font-family:  "AlexBrush-Regular", "waltograph", 'Pretty Dahlia', "Bonheur Royale", "Matcha-EaLge", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor}
}
a {
  text-decoration: none;
  color: inherit;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </>
  );
}
export default App;
