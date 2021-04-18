
import styled from "styled-components";

import QuickStats from "./tabs/QuickStats";
import TotalSupply from "./tabs/TotalSupply";
import MarketCap from "./tabs/MarketCap";
import PerShareAmount from "./tabs/PerShareAmount";


const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 70vw;
  margin: 0 15%;
`

const Block = styled.div`
  width: ${props => props.w}%;
  height: ${props => props.h}vh;
  margin-bottom: 2vh;
  padding: 2vh;
  border: 0.08rem solid dodgerblue;
  border-radius: 0.3rem;
  background-color: #222;
  box-shadow: 0 -0.15rem 0.2rem dodgerblue
  0 0.15rem 0.2rem dodgerblue;
`

export default function Content() {
  return (
    <ContentContainer>

      <Block w={100} h={40}>
        <QuickStats />
      </Block>

      <Block w={100}>
        <TotalSupply />
      </Block>

      {/* <Block w={100}>
        <MarketCap />
      </Block> */}

      {/* <Block w={100}>
        <PerShareAmount />
      </Block> */}

    </ContentContainer>
  );
}
