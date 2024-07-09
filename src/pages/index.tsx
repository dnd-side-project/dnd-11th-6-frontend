import styled from "styled-components";

type ButtonProps = {
  primary?: boolean;
};

const Button = styled.button<ButtonProps>`
  background-color: ${(props) => (props.primary ? "blue" : "white")};
  color: ${(props) => (props.primary ? "white" : "blue")};
  border: 2px solid blue;
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
