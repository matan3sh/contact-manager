import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveContact } from '../../store/actions';
import Modal from 'react-modal';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

Modal.setAppElement('#root');

class ContactEdit extends Component {
  state = {
    name: '',
    role: '',
    address: '',
    companyName: '',
    companyAddress: '',
    companyPhone: ''
  };

  onChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState({ [field]: value });
  };

  onSumbit = (e) => {
    e.preventDefault();
    const {
      name,
      role,
      address,
      companyName,
      companyAddress,
      companyPhone
    } = this.state;
    const newContact = {
      name,
      role,
      address,
      company: {
        name: companyName,
        address: companyAddress,
        phone: companyPhone
      }
    };
    this.props.saveContact(newContact);
    this.props.onClose();
  };

  render() {
    const { openModal, onClose } = this.props;
    const {
      name,
      role,
      address,
      companyName,
      companyAddress,
      companyPhone
    } = this.state;
    return (
      <Modal
        isOpen={openModal}
        onRequestClose={() => onClose()}
        className={'modal'}
        overlayClassName={'overlay'}
      >
        <form onSubmit={this.onSumbit} className='form-container'>
          <img
            src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
            alt='contact-thumb'
          />

          <input
            type='text'
            name='name'
            placeholder='Contact Name'
            value={name}
            onChange={this.onChange}
          />
          <input
            type='text'
            name='role'
            placeholder='Contact Role'
            value={role}
            onChange={this.onChange}
          />
          <input
            type='text'
            name='address'
            placeholder='Contact Address'
            value={address}
            onChange={this.onChange}
          />
          <input
            type='text'
            name='companyName'
            placeholder='Contact Company Name'
            value={companyName}
            onChange={this.onChange}
          />
          <input
            type='text'
            name='companyAddress'
            placeholder='Contact Company Address'
            value={companyAddress}
            onChange={this.onChange}
          />
          <input
            type='text'
            name='companyPhone'
            placeholder='Contact Company Phone'
            value={companyPhone}
            onChange={this.onChange}
          />
          <button type='submit' className='btn'>
            Add Contact
          </button>
        </form>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  saveContact
};

export default connect(null, mapDispatchToProps)(ContactEdit);
