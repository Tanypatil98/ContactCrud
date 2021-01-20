import React, {  useEffect, useState } from 'react';
import Loading from '../Loading/LoadingIndicator';
import {useDispatch, useSelector} from 'react-redux';
import './Modal.css';
import Aux from '../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop.component';
import * as actionType from '../../store/action';


const Modal = (props) => {
    let [firstName, setFirstname] = useState('');
    let [lastName, setLastName] = useState('');
    let [phone, setPhone] = useState('');
    let [email, setEmail] = useState('');
    let [age, setAge] = useState('');
    //const message = useSelector(state => state.message);
    const isLoading = useSelector(state => state.loading);
    const detail = useSelector(state => state.detail);
    const dispatch = useDispatch();
    //const color = useSelector(state => state.color);
    //const isLoading = useSelector(state => state.loading);

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
  const detail = {email: email,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    age: age };
    dispatch(actionType.updateContact(props.id, detail));
    dispatch(actionType.fetchContact());
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
                    <label htmlFor='firstName'>FirstName :-</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={event => {
                          setFirstname(event.target.value);
                        }} /> 
                </div>
                <div className='control'>
                    <label htmlFor='lastName'>LastName :-</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={event => {
                          setLastName(event.target.value);
                        }} /> 
                </div>
                <div className='control'>
                    <label htmlFor='email'>Email :-</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={event => {
                          setEmail(event.target.value);
                        }} /> 
                </div>
                <div className='control'>
                    <label htmlFor='phone'>Phone :-</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={event => {
                          setPhone(event.target.value);
                        }} /> 
                </div>
                <div className='control'>
                    <label htmlFor='age'>Age :-</label>
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