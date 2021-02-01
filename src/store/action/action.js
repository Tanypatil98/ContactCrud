import { getFirestore } from 'redux-firestore';
import * as action from '../actionTypes';

export const addContactStart = () => {
    return{
        type: action.ADD_CONTACT_START
    }
}

export const addContactSuccess = (msg) => {
    return{
        type: action.ADD_CONTACT,
        msg: msg
    }
}

export const addContactFail = (msg) => {
    return{
        type: action.ADD_CONTACT_FAIL,
        msg: msg
    }
}

export const updateContactSuccess = (msg) => {
    return{
        type: action.UPDATE_CONTACT,
        msg: msg
    }
}

export const updateContactStart = () => {
    return{
        type: action.UPDATE_CONTACT_START
    }
}

export const updateContactFail = (msg) => {
    return{
        type: action.UPDATE_CONTACT_FAIL,
        msg: msg
    }
}

export const deleteContactStart = () => {
    return{
        type: action.REMOVE_CONTACT_START
    }
}

export const deleteContactSuccess = (id,msg) => {
    return{
        type: action.REMOVE_CONTACT,
        id: id,
        msg: msg
    }
}

export const deleteContactFail = (msg) => {
    return{
        type: action.REMOVE_CONTACT_FAIL,
        msg: msg
    }
}

export const fetchContactStart = () => {
    return{
        type: action.GET_CONTACT_START
    }
}

export const fetchContactSuccess = (detail) => {
    return{
        type: action.GET_CONTACT,
        detail: detail
    }
}

export const fetchContactFail = (msg) => {
    return{
        type: action.GET_CONTACT_FAIL,
        msg: msg
    }
}

export const getIdContactStart = () => {
    return{
        type: action.GET_ID_CONTACT_START
    }
}

export const getIdContactSuccess = (detail) => {
    return{
        type: action.GET_ID_CONTACT,
        detail: detail
    }
}

export const getIdContactFail = (msg) => {
    return{
        type: action.GET_ID_CONTACT_FAIL,
        msg: msg
    }
}

export const addContact = (detail) => {
    return dispatch => {
        dispatch(addContactStart());
            const firestore = getFirestore();
            firestore.collection("contacts")
              .add(detail)
              .then(() => {
                const msg = "Your Data Added has been Submitted 👍.";
                dispatch( addContactSuccess(msg));
              })
              .catch((error) => dispatch( addContactFail(error.message)));
    }
}

export const fetchContact = () => {
    return dispatch => {
        dispatch(fetchContactStart());
        const tempDoc = [];
        const firestore = getFirestore();
        const snapshot  =  firestore.collection("contacts").get();
    snapshot.then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
           tempDoc.push({id: doc.id, ...doc.data()});
        })
        dispatch(fetchContactSuccess(tempDoc));
   }).catch((error) => dispatch( fetchContactFail(error.message)));
    }
}

export const updateContact = (id, detail) => {
    return dispatch => {
        dispatch(updateContactStart());
        const firestore = getFirestore();
        firestore.collection("contacts").doc(id)
        .update(detail)
        .then(() => {
          const msg = "Your Data Update has been Submitted 👍.";
          dispatch( updateContactSuccess(msg));
        })
        .catch((error) => dispatch( updateContactFail(error.message)));
    }
}

export const deleteContact = (id) => {
    return dispatch => {
        dispatch(deleteContactStart());
        const firestore = getFirestore();
        const res = firestore.collection("contacts").doc(id).delete();
        res.then(() => {
            const msg = "Data is Deleting Successfully 👍.";
            dispatch( deleteContactSuccess(id,msg));
        })
        .catch((error) => dispatch( deleteContactFail(error.message)));
    }
}

export const getIdContact = (id) => {
    return dispatch => {
        const tempDoc = [];
        dispatch(getIdContactStart());
        const firestore = getFirestore();
        const res = firestore.collection("contacts").doc(id).get();
        res.then((res) => {
            tempDoc.push(res.data());
            dispatch( getIdContactSuccess(tempDoc));
        })
        .catch((error) => dispatch( getIdContactFail(error.message)));
    }
}