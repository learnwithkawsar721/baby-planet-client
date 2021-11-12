import { Rating } from "@mui/material";
import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useAuth from "../../../hooks/Firebase/useAuth";
import { useHistory } from "react-router";
import getUrl from "../../../Utilits/getUrl";
import Notification from "../../Notification/Notification";
const Service = ({ service }) => {
  const { title, price, img } = service;
  const { user } = useAuth();
  const history = useHistory();
  const hendleBuyNow = (id) => {
    if (!user?.email) {
      history.replace("/login");
      return;
    }
    const orderData = {
      email: user?.email,
      title,
      price,
      img,
      id,
      quantity: 1,
      status:"panding",
    };
    const url = getUrl("orders");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.insertedId) {
          Notification("success", "Order added Successfully");
        }
      });
  };
  return (
    <Col className="col-12 col-sm-6 col-md-4 col-md-4">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} className="w-100" />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <div className="d-flex align-items-center justify-content-between my-3">
            <Card.Subtitle>$ {price}</Card.Subtitle>
            <Rating name="read-only" value={3} readOnly />
          </div>
          <Button onClick={() => hendleBuyNow(service._id)} variant="primary">
            <ShoppingCartIcon /> Buy Now
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Service;
