import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import "./Detail.scss";
import { propTypes } from "react-bootstrap/esm/Image";
import { CSSTransition } from "react-transition-group";
let 박스 = styled.div`
  padding: 20px;
`;

let 제목 = styled.h4`
  font-size: 25px;
  color: ${(props) => props.색상};
`;
function Info(props) {
  return <p>재고 : {props.재고[1]}</p>;
}

function Alert1() {
  return (
    <div className="my-alert">
      <p>재고가 얼마 남지 않았습니다</p>
    </div>
  );
}

function Detail(props) {
  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState("");

  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);
  useEffect(() => {
    let 타이머 = setTimeout(() => {
      alert변경(false);
    }, 2000);
    return () => {
      clearTimeout(타이머);
    };
  }, [alert]);

  let { id } = useParams();
  let history = useHistory();

  return (
    <div className="container">
      <박스>
        <제목 색상="smokingwhite">Detail</제목>
        <div>{alert === true ? <Alert1 /> : null}</div>
      </박스>

      <input
        onChange={(e) => {
          inputData변경(e.target.value);
        }}
      />

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}원</p>
          <Info 재고={props.재고}></Info>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.재고변경([9, 10, 11]);
              console.log(props.재고[0]);
            }}
          >
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              스위치변경(false);
              누른탭변경(0);
            }}
          >
            Active
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              스위치변경(false);
              누른탭변경(1);
            }}
          >
            Option 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={스위치} classNames="wow" timeout={500}>
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div>
  );
}

function TabContent(props) {
  useEffect(() => {
    props.스위치변경(true);
  });

  if (props.누른탭 === 0) {
    return <div>0번째 내용이네요</div>;
  } else if (props.누른탭 === 1) {
    return <div>1번째 내용이네요</div>;
  } else if (props.누른탭 === 2) {
    return <div>2번째 내용이네요</div>;
  }
}

export default Detail;
