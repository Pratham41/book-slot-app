import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { login } from '../redux/actions/userActions';
import ReactLoading from 'react-loading';
import Message from '../components/Message';

const RegisterScreen = ({ location, history }) => {
  // LOCAL STATES FOR INPUT

  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  // DISPATCH
  const dispatch = useDispatch();

  // REGISTER USER REDUCER
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  // SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault();

    if (!mobile) {
      setMessage('mobile number is required');
    } else {
      dispatch(login(mobile));
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();

    setMobile('');
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        <i className="fas fa-arrow-circle-left text-dark"> GO BACK</i>
      </Link>
      <FormContainer>
        <h2 className="text-center text-secondary my-2">
          <i className="fas fa-user text-info"></i> LOGIN HERE
        </h2>

        {message && <Message variant="warning"> {message}</Message>}
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

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="mobile">
            <Form.Label>mobile </Form.Label>
            <Form.Control
              placeholder="enter mobile number"
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{ borderLeft: '5px solid #33C1FF' }}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className="btn btn-block btn-info py-2">
            <i className="fas fa-sign-in-alt"></i> Login
          </Button>
          <Button
            type="btn"
            onClick={cancelHandler}
            className="btn btn-block btn-danger py-2"
          >
            <i class="fas fa-backspace"></i> Cancel
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User ? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
