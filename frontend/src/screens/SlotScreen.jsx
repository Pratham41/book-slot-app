import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { listSlotDetails, updateSlot } from '../redux/actions/slotActions';
import Message from '../components/Message';
import ReactLoading from 'react-loading';

const SlotScreen = ({ match, history }) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');

  // DISPATCH
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // CREATE POST REDUCER
  const slotDetails = useSelector((state) => state.slotDetails);
  const { loading, slot, error } = slotDetails;

  const slotUpdate = useSelector((state) => state.slotUpdate);
  const { loading: loadingUpdate, success, error: errorUpdate } = slotUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (slot?.slotData?._id !== match.params.id) {
        dispatch(listSlotDetails(match.params.id));
      } else {
        if (slot?.slotData?.isBooked) {
          setFirstName(slot?.slotData?.firstname);
          setLastName(slot?.slotData?.lastname);
          setMobile(slot?.slotData?.mobile);
        }
        setAction(slot?.slotData?.isBooked ? 'Update' : 'Create');
      }
    }
  }, [history, userInfo, slot, dispatch, match]);

  useEffect(() => {
    if (success) {
      dispatch(listSlotDetails(match.params.id));
    }
  }, [dispatch, success, match]);

  // SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !mobile) {
      setMessage('All fields are required');
    } else {
      // DISPATCH CREATE POST
      dispatch(updateSlot(firstname, lastname, mobile, match.params.id));
      // REDIRECT TO HOMEPAGE
      history.push('/');
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setFirstName('');
    setLastName('');
    setMobile('');
  };

  return (
    // LOCAL STATES FOR INPUT

    <>
      <Link to="/" className="btn btn-light my-3">
        <i className="fas fa-arrow-circle-left text-dark"> GO BACK</i>
      </Link>
      <FormContainer>
        <h2 className="text-center text-secondary my-2">
          <i className="fas fa-clock text-info"></i> BOOK SLOT
        </h2>
        {message && <Message variant="warning"> {message}</Message>}
        {error && <Message variant="danger"> {error}</Message>}
        {errorUpdate && <Message variant="danger"> {error}</Message>}

        {loadingUpdate && (
          <ReactLoading
            className="m-auto"
            type="spin"
            color="#33C1FF"
            height={'10%'}
            width={'10%'}
          />
        )}

        {loading && (
          <ReactLoading
            className="m-auto"
            type="spin"
            color="#33C1FF"
            height={'10%'}
            width={'10%'}
          />
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="firstname">
            <Form.Label>firstname </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ borderLeft: '5px solid #33C1FF' }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>lastname </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              style={{ borderLeft: '5px solid #33C1FF' }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="mobile">
            <Form.Label>mobile </Form.Label>
            <Form.Control
              placeholder="enter mobile"
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{ borderLeft: '5px solid #33C1FF' }}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className="btn btn-block btn-info py-2">
            <i class="fas fa-save"></i> {action}
          </Button>
          <Button
            type="btn"
            onClick={cancelHandler}
            className="btn btn-block btn-danger py-2"
          >
            <i class="fas fa-backspace"></i> Cancel
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default SlotScreen;
