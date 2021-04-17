
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 70vw;
  height: 10vh;
  margin: 0 15% 2vh;
  padding-top: 1vh;
  border: 0.05rem solid dodgerblue;
  border-top: 0;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  background-color: #222;
  box-shadow: 0 0.2rem 0.2rem dodgerblue;
  overflow: hidden;
`

const Title = styled.div`
  width: 50%;
  height: 100%;
  margin-left: 3%;
  font-size: 3rem;
  font-family: "Russo One", sans-serif;
  font-style: italic;
  font-weight: bold;
  color: rgb(0, 0, 0, 0.8);
  text-shadow: 0.08rem 0.08rem 0.1rem rgb(255, 255, 255, 0.1);
  cursor: default;
`


export default function Header() {
  return (
    <HeaderContainer>
      <Title>
        CYCoin
      </Title>
    </HeaderContainer>
  );
}
