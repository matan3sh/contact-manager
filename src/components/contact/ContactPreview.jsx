import React from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class ContactPreview extends React.Component {
  state = { lat: null, lng: null };

  componentDidMount() {
    this.getCoords(this.props.contact.company.address);
  }

  getCoords = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    this.setState({ lat: latLng.lat, lng: latLng.lng });
  };

  render() {
    const { contact, onDelete, onEdit } = this.props;
    return (
      <div className='card-container'>
        <div className='card-left'>
          <img src={contact.img} alt='contact-thumb' />
          <p>{contact.role}</p>
        </div>
        <div className='card-right'>
          <h3>{contact.name}</h3>
          <div className='contact-address'>
            <i className='fas fa-map-marker-alt'></i>{' '}
            <span>{contact.address}</span>
            {this.state.lat !== null && this.state.lng !== null ? (
              <p className='coords'>
                <span>Lat:</span> {this.state.lat.toFixed(2)} <span> Lng:</span>{' '}
                {this.state.lng.toFixed(2)}
              </p>
            ) : (
              ''
            )}
          </div>

          <div className='company-address'>
            <h4>{contact.company.name}</h4>
            <p>{contact.company.address}</p>
            <span>P: {contact.company.phone}</span>
          </div>
          <div className='edit-delete'>
            <span onClick={() => onEdit(contact)}>
              <i className='fas fa-pen'></i>
            </span>
            <span onClick={() => onDelete(contact.id)}>
              <i className='fas fa-trash-alt pointer'></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactPreview;
