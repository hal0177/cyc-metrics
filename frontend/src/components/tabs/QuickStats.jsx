
import styled from "styled-components";

const QuickStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`

const Title = styled.div`
  width: 96%;
  height: 5vh;
  margin: 0 2%;
  font-family: "Russo One", sans-serif;
  font-size: 1.2rem;
  line-height: 5vh;
  color: rgb(255, 255, 255, 0.7);
  cursor: default;
`

const InfoRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  height: ${props => props.type === "panels" ? "20%" : "10%"};
`

const InfoPanel = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 0.2rem;
  background-color: rgb(0, 0, 0, 0.8);
  box-shadow: 0.08rem 0.08rem 0.1rem rgb(255, 255, 255, 0.1);
`

const InfoHeading = styled.div`
  width: 30%;
  height: 100%;
  text-align: center;
  font-family: "Russo One", sans-serif;
  font-size: 1rem;
  color: rgb(255, 255, 255);
  opacity: 0.6;
  cursor: default;
  &:hover {
    opacity: 1;
    text-shadow: 0.1rem 0.1rem 0.1rem rgb(255, 255, 255, 0.1);
  }
`

const Data = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 2rem;
  line-height: 3.5rem;
  color: rgb(255, 255, 255, 0.8);
`


export default function QuickStats() {

  return (
    <QuickStatsContainer>

      <Title>
        Recent Data
      </Title>

      <InfoRow type="panels">
        <InfoPanel>
          <Data>
            -
          </Data>
        </InfoPanel>
        <InfoPanel>
          <Data>
            -
          </Data>
        </InfoPanel>
        <InfoPanel>
          <Data>
            $-
          </Data>
        </InfoPanel>
      </InfoRow>

      <InfoRow>
        <InfoHeading>
          Total Supply
        </InfoHeading>
        <InfoHeading>
          Market Cap
        </InfoHeading>
        <InfoHeading>
          Price
        </InfoHeading>
      </InfoRow>

      <InfoRow type="panels">
        <InfoPanel>
          <Data>
            -
          </Data>
        </InfoPanel>
        <InfoPanel>
          <Data>
            --/--/--
          </Data>
        </InfoPanel>
        <InfoPanel>
          <Data>
            -
          </Data>
        </InfoPanel>
      </InfoRow>

      <InfoRow>
        <InfoHeading>
          Per Share Amount
        </InfoHeading>
        <InfoHeading>
          Last Rebase
        </InfoHeading>
        <InfoHeading>
          Blocknumber
        </InfoHeading>
      </InfoRow>

    </QuickStatsContainer>    
  );
}