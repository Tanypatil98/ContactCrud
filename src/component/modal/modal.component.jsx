import React, {  useEffect, useState } from 'react';
import Loading from '../Loading/LoadingIndicator';
import {useDispatch, useSelector} from 'react-redux';
import './Modal.css';
import Aux from '../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop.component';
import * as actionType from '../../store/action/action';


const Modal = (props) => {
    let [firstName, setFirstname] = useState('');
    let [lastName, setLastName] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [age, setAge] = useState('');
    const isLoading = useSelector(state => state.loading);
    const detail = useSelector(state => state.detail);
    const dispatch = useDispatch();


  const [emerror, setEmerror] = useState('');
  const [strerror, setStrerror] = useState('');
  const [lstrerror, setLStrerror] = useState('');
  const [numerror, setNumerror] = useState('');

  const handleValid = () => {
    let check = true;
    if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null) {
      setEmerror("Please Enter The Correct email");
      check = false;
    } else {
      setEmerror('');
    }
    if (firstName.match(/\b[^\d\W]+\b/g) === null) {
      setStrerror("Please Enter The Correct String");
      check = false;
    } else {
      setStrerror('');
    }
    if (lastName.match(/\b[^\d\W]+\b/g) === null) {
      setLStrerror("Please Enter The Correct String");
      check = false;
    } else {
      setLStrerror('');
    }
    if (phone.match(/\b\d+\b/g) === null) {
      setNumerror("Please Enter The Correct Number");
      check = false;
    } else {
      setNumerror('');
    }
    return check;

  }


    useEffect(() => {
      dispatch(actionType.getIdContact(props.id));
    }, [dispatch, props.id]);

    useEffect(() => {
      detail.map((doc) => {
        return ( setFirstname(doc.firstName),
        setLastName(doc.lastName),
        setEmail(doc.email),
        setPhone(doc.phone),
        setAge(doc.age)
        );
    });
    }, [detail]);
    
 const handleSubmit = (e) => {
  e.preventDefault();
   if (email !== '' && firstName !== '' && lastName !== '' && phone !== '' && age !== '') {
     let valid = handleValid();

     if (valid) {
  const detail = {email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    age: age };
    dispatch(actionType.updateContact(props.id, detail));
  }
}
    dispatch(actionType.fetchContact());
    props.modalClosed();
};

        return (
            <Aux>
                <Backdrop show={props.show} clicked={props.modalClosed} />
                <div
                    className='Modal'
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                      <div className='head'>
                        <h2>Edit Form</h2>
                      <p onClick={props.modalClosed} style={{float: 'right', cursor: 'pointer', padding: '5px'}}>&#10006;</p>
                      </div>
                    <div >
                      
                    {isLoading && <Loading />}
            <form onSubmit={handleSubmit}>
                <div className='control'>
                    <label htmlFor='firstName'>FirstName</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={event => {
                          setFirstname(event.target.value);
                        }} /> 
                    {strerror && <p style={{ color: "red" }}>{strerror}</p>}
                </div>
                <div className='control'>
                    <label htmlFor='lastName'>LastName</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={event => {
                          setLastName(event.target.value);
                        }} /> 
                    {lstrerror && <p style={{ color: "red" }}>{lstrerror}</p>}
                </div>
                <div className='control'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={event => {
                          setEmail(event.target.value);
                        }} /> 
                    {emerror && <p style={{ color: "red" }}>{emerror}</p>}
                </div>
                <div className='control'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={event => {
                          setPhone(event.target.value);
                        }} /> 
                    {numerror && <p style={{ color: "red" }}>{numerror}</p>}
                </div>
                <div className='control'>
                    <label htmlFor='age'>Age</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={event => {
                          setAge(event.target.value);
                        }} /> 
                </div>
            </form>
        </div>
        <button className="btn btn-secondary" onClick={props.modalClosed}>
              Close
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
                </div>
            </Aux>
        );
}

export default Modal;