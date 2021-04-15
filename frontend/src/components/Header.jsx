
import styled from "styled-components";

const Banner = styled.div`
  position: fixed;
  top: 0;
  width: 60%;
  height: 10vh;
  margin: 0 20%;
  padding-top: 1.2rem;
  border: 0.05rem solid dodgerblue;
  border-top: 0;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
  background-color: #222;
  box-shadow: 0 0.15rem 0.2rem dodgerblue;
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
`


export function Header() {
  return (
    <>
      <Banner>
        <Title>
          CYC Metrics
        </Title>
      </Banner>
    </>
  );
}
