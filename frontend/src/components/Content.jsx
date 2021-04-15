
import styled from "styled-components";
import { QuickStats } from "./QuickStats";


const Block = styled.div`
  width: 60%;
  height: 120vh;
  margin: 12vh 20% 0 20%;
  padding: 2vh;
  border: 0.1rem solid dodgerblue;
  border-bottom: 0;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  background-color: #222;
  box-shadow: 0 -0.15rem 0.2rem dodgerblue;
`

export function Content() {
  return (
    <Block>
      <QuickStats />
    </Block>
  );
}
