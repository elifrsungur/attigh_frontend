import React from 'react'
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "/src/assets/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import './Home.css';
import TrackVisibility from 'react-on-screen';

const Home = () => {

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Arazi Toplulaştırma", "Tarla İçi Geliştirme" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 4);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(30);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }
  return (
    <div>
      <section className="banner" id="home">
        <Container>
          <Row className="aligh-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                    <span className="tagline">DSİ SİVAS 19. BÖLGE MÜDÜRLÜĞÜ</span>
                    <h1>{`Hizmetlerimiz:`} <span className="txt-rotate" dataPeriod="10" data-rotate='[ "Arazi Toplulaştırma", "Tarla İçi Geliştirme" ]'><span className="wrap">{text}</span></span></h1>
                    <p>Arazi Toplulaştırma ve Tarla İçi Geliştirme Hizmetleri Proje Takip Programı </p>
                    {/*<button onClick={() => console.log('connect')}>Let’s Connect <ArrowRightCircle size={25} /></button>*/}
                  </div>}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                    <img src={headerImg} alt="Header Img" />
                  </div>}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home
