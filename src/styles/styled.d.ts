import "styled-components";

declare module "styled-components" {
  type Theme = typeof import("./theme").default;

  export interface DefaultTheme extends Theme {}
}
