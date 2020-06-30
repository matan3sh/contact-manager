import React from 'react';
import ContactPreview from './ContactPreview';

const ContactList = ({ contacts, onDelete, onEdit, onAdd }) => {
  return (
    <div className='container'>
      {contacts.map((contact) => (
        <ContactPreview
          contact={contact}
          key={contact.id}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      <button className='add-btn' onClick={() => onAdd()}>
        <i className='fas fa-plus-square fa-5x'></i>
      </button>
    </div>
  );
};

export default ContactList;
