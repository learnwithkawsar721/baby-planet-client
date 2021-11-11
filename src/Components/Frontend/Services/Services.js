import React from "react";
import { Container, Row } from "react-bootstrap";
import Service from "../Service/Service";

const Services = () => {
  const service = {
    name: "Feeding Bottles",
    price: 20,
    img: "https://cdn.shopify.com/s/files/1/0119/4632/8123/products/baby53_grande.jpg",
  };
  return (
    <Container className="mt-5">
      <Row className="g-4">
        <h3 className="text-center">Baby Accessories</h3>
        {Array.from(Array(6)).map((_, index) => (
          <Service service={service} key={index} />
        ))}
      </Row>
    </Container>
  );
};

export default Services;
