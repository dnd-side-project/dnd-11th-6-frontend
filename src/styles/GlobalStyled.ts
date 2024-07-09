import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.white};
}
`;

export default GlobalStyled;
