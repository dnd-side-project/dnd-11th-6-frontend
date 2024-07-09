import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.primary ? props.theme.colors.blue : props.theme.colors.purple};
  color: ${(props) => props.theme.colors.white};
  border: 2px solid;
  padding: 10px 20px;
  cursor: pointer;
`;

export default function Home() {
  return (
    <div>
      <Button primary>Primary</Button>
      <Button>Secondary</Button>
    </div>
  );
}
