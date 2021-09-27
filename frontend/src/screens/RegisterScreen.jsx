import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { register } from '../redux/actions/userActions';
import ReactLoading from 'react-loading';
import Message from '../components/Message';

const RegisterScreen = ({ location, history }) => {
  // LOCAL STATES FOR INPUT

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');

  // DISPATCH
  const dispatch = useDispatch();

  // REGISTER USER REDUCER
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  }, [history, userInfo]);

  // SUBMIT HANDLER
  const submitHandler = (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !mobile) {
      setMessage('All fields are required');
    } else {
      dispatch(register(firstname, lastname, mobile));
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setFirstName('');
    setLastName('');
    setMobile('');
  };

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        <i className="fas fa-arrow-circle-left text-dark"> GO BACK</i>
      </Link>
      <FormContainer>
        <h2 className="text-center text-secondary my-2">
          <i className="fas fa-user-plus text-info"></i> REGISTER HERE
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
          <Form.Group controlId="firstname">
            <Form.Label>firstname </Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your firstname"
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
              placeholder="enter mobile number"
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              style={{ borderLeft: '5px solid #33C1FF' }}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" className="btn btn-block btn-info py-2">
            <i class="fas fa-save"></i> Register
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

export default RegisterScreen;
