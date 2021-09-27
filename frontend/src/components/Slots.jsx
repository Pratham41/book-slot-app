import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Slots = ({ slot }) => {
  return (
    <>
      <LinkContainer to={`/slots/${slot._id}`}>
        <Row>
          <Col className="my-2 py-2">
            <Card className=" shadow rounded text-center bg-light">
              <Card.Body>
                <Card.Header
                  className={slot.isBooked === true ? 'bg-danger' : 'bg-info'}
                  as="h4"
                >
                  {`${slot.timing} - ${slot.timing + 1}`}
                </Card.Header>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </LinkContainer>
    </>
  );
};

export default Slots;
