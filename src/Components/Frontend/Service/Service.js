import React from "react";
import { Card, Col, Button } from "react-bootstrap";

const Service = ({ service }) => {
    const {name,price,img} = service;
  return (
    <Col className="col-12 col-sm-6 col-md-4 col-md-4">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>
           $ {price}
          </Card.Subtitle>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Service;
