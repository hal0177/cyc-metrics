
import styled from "styled-components";

import github from "../icons/GitHub-Mark-Light-64px.png";
import bscscan from "../icons/bscscan-logo-light-circle.png";
import telegram from "../icons/Logo.png";

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70vw;
  height: 10vh;
  margin: 0 15%;
  border: 0.05rem solid dodgerblue;
  border-bottom: 0;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  background-color: #222;
  box-shadow: 0 -0.2rem 0.2rem dodgerblue;
  overflow: hidden;
`

const Socials = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 20%;
  padding: 2vh 1vh;
`

const A = styled.a`
  display: inline-block;
  height: 100%;
`

const Logo = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`

const Sig = styled.div`
  height: 100%;
  padding: 3vh 2vh;
  font-family: "Russo One", sans-serif;
  font-size: 1rem;
  color: rgb(252, 252, 252);
  opacity: 0.6;
  cursor: default;
  &:hover {
    opacity: 1;
  }
`


export default function Footer() {
  return (
    <FooterContainer>
      <Socials>
        <A href="https://github.com/paddyc1/cyc-metrics">
          <Logo src={github} alt="GitHub" />
        </A>
        <A href="https://bscscan.com/token/0x4028433877f9c14764eb93d0bb6570573da2726f">
          <Logo src={bscscan} alt="BscScan" />
        </A>
        <A href="#">
          <Logo src={telegram} alt="Telegram" />
        </A>
      </Socials>
      <Sig>by Paddy Curé</Sig>
    </FooterContainer>
  );
}