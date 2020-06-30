import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadContacts, removeContact } from '../../store/actions';

import ContactList from '../contact/ContactList';
import ContactEdit from '../contact/ContactEdit';
import ContactAdd from '../contact/ContactAdd';

class ContactApp extends Component {
  state = { openModal: false, currContact: null };

  async componentDidMount() {
    await this.props.loadContacts();
  }

  onDelete = (id) => {
    this.props.removeContact(id);
    this.forceUpdate();
  };

  onEdit = (contact) => {
    this.setState({ openModal: true, currContact: contact });
  };

  onClose = () => {
    this.setState({ openModal: false, currContact: null });
  };

  onAdd = () => {
    this.setState({ openModal: true });
  };

  render() {
    const { contacts } = this.props;
    const { openModal, currContact } = this.state;
    return (
      <>
        {!contacts.length ? (
          'Loading Contacts'
        ) : (
          <ContactList
            contacts={contacts}
            onDelete={this.onDelete}
            onEdit={this.onEdit}
            onAdd={this.onAdd}
          />
        )}
        {currContact !== null && (
          <ContactEdit
            openModal={openModal}
            onClose={this.onClose}
            contact={currContact}
          />
        )}
        <ContactAdd openModal={openModal} onClose={this.onClose} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contactApp.contacts
});

const mapDispatchToProps = {
  loadContacts,
  removeContact
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactApp);
