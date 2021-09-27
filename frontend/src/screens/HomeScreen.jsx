import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slots from '../components/Slots';
import { Col, Row } from 'react-bootstrap';
import { listSlots } from '../redux/actions/slotActions';
import ReactLoading from 'react-loading';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const slotsList = useSelector((state) => state.slotsList);
  const { loading, allSlots, error } = slotsList;

  useEffect(() => {
    dispatch(listSlots());
  }, [dispatch]);

  return (
    <>
      <h1 className="text-info my-4">
        <i className="fas fa-user-clock text-secondary"></i> Slots
      </h1>

      {error && <Message variant="danger"> {error}</Message>}

      {loading && (
        <ReactLoading
          className="m-auto"
          type="spin"
          color="#33C1FF"
          height={'10%'}
          width={'10%'}
        />
      )}

      <Row>
        {allSlots?.slots?.map((slot) => (
          <Col key={slot._id} sm={12} md={6} lg={4} xl={3}>
            <Slots slot={slot} />
          </Col>
        ))}
      </Row>

      <ul className="my-4 py-4">
        <li className="text-danger">Booked</li>
        <li className="text-info">Not Booked</li>
      </ul>
    </>
  );
};

export default HomeScreen;
