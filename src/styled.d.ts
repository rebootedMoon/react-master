import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    boardColor: string;
    bgColor: string;
    cardColor: string;
  }
}
