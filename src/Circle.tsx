import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}
const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.bgColor};
  width: 200px;
  height: 200px;
  border: 0;
  border-radius: 50%;
  border: 1px solid ${(props) => props.borderColor};
`;
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

function Circle({ bgColor, borderColor }: CircleProps) {
  const [value, setvalue] = useState(0);
  return (
    <Container
      bgColor={bgColor}
      borderColor={borderColor ?? bgColor}
    />
  );
}

export default Circle;
