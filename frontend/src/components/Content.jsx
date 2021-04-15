
import styled from "styled-components";
import { QuickStats } from "./QuickStats";


const Block = styled.div`
  position: absolute;
  bottom: 0;
  width: 70%;
  height: 90%;
  margin: 0 15%;
  border: 0.1rem solid dodgerblue;
  border-bottom: 0;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  background-color: #222;
  box-shadow: 0 -0.1rem 0.2rem dodgerblue;
`

export function Content() {
  return (
    <Block>
      <QuickStats />
    </Block>
  );
}