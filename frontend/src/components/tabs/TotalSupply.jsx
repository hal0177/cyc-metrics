
import { useState } from "react";
import styled from "styled-components";

const TotalSupplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Title = styled.div`
  width: 28%;
  height: 5vh;
  margin: 0 2%;
  font-family: "Russo One", sans-serif;
  font-size: 1.2rem;
  line-height: 5vh;
  color: rgb(255, 255, 255, 0.7);
  cursor: default;
`

const TimespanContainer = styled.div`
  width: 68%;
  height: 5vh;
  margin: 0 2%;
  border-radius: 0.2rem;
  background-color: rgb(0, 0, 0, 0.8);
  box-shadow: 0.08rem 0.08rem 0.1rem rgb(255, 255, 255, 0.1);
`

const Timespans = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
`

const TimespanSelect = styled.li`
  display: inline-block;
  width: 20%;
  height: 5vh;
  color: ${props => props.selected ? "rgb(255, 255, 255, 1)" : "rgb(255, 255, 255, 0.6)"};
  font-family: "Russo One", sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  line-height: 5vh;
  text-shadow: ${props => props.selected ? "0.1rem 0.1rem 0.1rem rgb(255, 255, 255, 0.1)" : ""};
  // background-color: ${props => props.selected ? "dodgerblue" : ""};
  outline: ${props => props.selected ? "0.08rem solid dodgerblue" : ""};

  &:hover {
    background-color: dodgerblue;
    color: rgb(255, 255, 255, 1);
    text-shadow: 0.1rem 0.1rem 0.1rem rgb(255, 255, 255, 0.1);
  }
`

const Main = styled.div`
  width: 100%;
  height: 40vh;
`


export default function TotalSupply() {

  const [ timespan, setTimespan ] = useState(0);

  return (
    <TotalSupplyContainer>
      
      <Nav>
        <Title>
          Total Supply
        </Title>

        <TimespanContainer>
          <Timespans>
            <TimespanSelect selected={timespan === 0} onClick={() => setTimespan(0)}>
              1-Day
            </TimespanSelect>
            <TimespanSelect selected={timespan === 1} onClick={() => setTimespan(1)}>
              3-Day
            </TimespanSelect>
            <TimespanSelect selected={timespan === 2} onClick={() => setTimespan(2)}>
              7-Day
            </TimespanSelect>
            <TimespanSelect selected={timespan === 3} onClick={() => setTimespan(3)}>
              30-Day
            </TimespanSelect>
            <TimespanSelect selected={timespan === 4} onClick={() => setTimespan(4)}>
              All Time
            </TimespanSelect>
          </Timespans>
        </TimespanContainer>
      </Nav>

      <Main>
      </Main>

    </TotalSupplyContainer>
  );
}