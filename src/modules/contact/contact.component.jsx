import React, { useState, useEffect } from 'react';
import Loading from '../../component/Loading/LoadingIndicator';
import './contact.css';
import {useDispatch, useSelector} from 'react-redux';
import * as actionType from '../../store/action/action';
import {toast} from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  

toast.configure();
const Contact = () => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const message = useSelector(state => state.messagead);
    const color = useSelector(state => state.color);
    const isLoading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const [emerror, setEmerror] = useState('');
    const [strerror, setStrerror] = useState('');
    const [lstrerror, setLStrerror] = useState('');
    const [numerror, setNumerror] = useState('');

    const handleValid = () => {
        let check = true;
        if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === null){
            setEmerror("Please Enter The Correct email");
            check = false;
        }else{
            setEmerror('');
        }
         if (firstName.match(/\b[^\d\W]+\b/g) === null){
             setStrerror("Please Enter The Correct String");
             check = false;
         } else {
             setStrerror('');
         }
        if (lastName.match(/\b[^\d\W]+\b/g) === null){
            setLStrerror("Please Enter The Correct String");
            check = false;
        } else {
            setLStrerror('');
        }
         if (phone.match(/\b\d+\b/g) === null   ){
            setNumerror("Please Enter The Correct Number");
             check = false;
         } else {
             setNumerror('');
         }
            return check;
    
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== '' && firstName !== '' && lastName !== '' && phone !== '' && age !== ''){
            let valid = handleValid();
          
            if(valid){
            const detail = {email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                age: age };
                dispatch(actionType.addContact(detail));
                setFirstname('');
                setLastName('');
                setEmail('');
                setPhone('');
                setAge('');
            }
        } else {
            dispatch(actionType.addContactFail("Please Fill All Deatil in the Form"));
        }
       
      };

      useEffect(() => {
          if(message){
        color === 'green' ? toast.success(message, {autoClose:3000}) : toast.error(message, {autoClose:10000})
          }
      },[color, message]);

        return (
            <div className="form">
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
                            {strerror && <p style={{color: "red"}}>{strerror}</p>}
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
                    
                        <button type="submit" className="btn" style={{color: 'blue'}}>Add Contact</button>
                        
                </form>
            </div>
        );
}

export default Contact;