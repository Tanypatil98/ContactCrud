import { getFirestore } from 'redux-firestore';

export const GET_ID_CONTACT = 'GET_ID_CONTACT';
export const GET_ID_CONTACT_START = 'GET_ID_CONTACT_START';
export const GET_ID_CONTACT_FAIL = 'GET_ID_CONTACT_FAIL';
export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const GET_CONTACT = 'GET_CONTACT';
export const ADD_CONTACT_START = 'ADD_CONTACT_START';
export const REMOVE_CONTACT_START = 'REMOVE_CONTACT_START';
export const UPDATE_CONTACT_START = 'UPDATE_CONTACT_START';
export const GET_CONTACT_START = 'GET_CONTACT_START';
export const ADD_CONTACT_FAIL = 'ADD_CONTACT_FAIL';
export const REMOVE_CONTACT_FAIL = 'REMOVE_CONTACT_FAIL';
export const UPDATE_CONTACT_FAIL = 'UPDATE_CONTACT_FAIL';
export const GET_CONTACT_FAIL = 'GET_CONTACT_FAIL';

export const addContactStart = () => {
    return{
        type: ADD_CONTACT_START
    }
}

export const addContactSuccess = (msg) => {
    return{
        type: ADD_CONTACT,
        msg: msg
    }
}

export const addContactFail = (msg) => {
    return{
        type: ADD_CONTACT_FAIL,
        msg: msg
    }
}

export const updateContactSuccess = (msg) => {
    return{
        type: UPDATE_CONTACT,
        msg: msg
    }
}

export const updateContactStart = () => {
    return{
        type: UPDATE_CONTACT_START
    }
}

export const updateContactFail = (msg) => {
    return{
        type: UPDATE_CONTACT_FAIL,
        msg: msg
    }
}

export const deleteContactStart = () => {
    return{
        type: REMOVE_CONTACT_START
    }
}

export const deleteContactSuccess = (id,msg) => {
    return{
        type: REMOVE_CONTACT,
        id: id,
        msg: msg
    }
}

export const deleteContactFail = (msg) => {
    return{
        type: REMOVE_CONTACT_FAIL,
        msg: msg
    }
}

export const fetchContactStart = () => {
    return{
        type: GET_CONTACT_START
    }
}

export const fetchContactSuccess = (detail) => {
    return{
        type: GET_CONTACT,
        detail: detail
    }
}

export const fetchContactFail = (msg) => {
    return{
        type: GET_CONTACT_FAIL,
        msg: msg
    }
}

export const getIdContactStart = () => {
    return{
        type: GET_ID_CONTACT_START
    }
}

export const getIdContactSuccess = (detail) => {
    return{
        type: GET_ID_CONTACT,
        detail: detail
    }
}

export const getIdContactFail = (msg) => {
    return{
        type: GET_ID_CONTACT_FAIL,
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