import contactService from '../services/contactService';

export function loadContacts() {
  return (dispatch) => {
    try {
      contactService
        .query()
        .then((contacts) =>
          dispatch({ type: 'SET_CONTACTS', payload: contacts })
        );
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeContact(id) {
  return (dispatch) => {
    try {
      contactService
        .remove(id)
        .then(() => dispatch({ type: 'REMOVE_CONTACT', payload: id }));
    } catch (err) {
      console.log(err);
    }
  };
}

export function saveContact(contact) {
  return (dispatch) => {
    const type = contact.id ? 'UPDATE_CONTACT' : 'ADD_CONTACT';
    try {
      dispatch({ type, payload: contact });
      contactService
        .save(contact)
        .then((savedContact) => console.log(savedContact));
    } catch (err) {
      console.log(err);
    }
  };
}
