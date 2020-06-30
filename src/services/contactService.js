import db from './db';
import storageService from './storageService';

export default {
  query,
  remove,
  save
};

const KEY = 'contacts';
var gContacts = null;
_createContacts();

function _createContacts() {
  const defaultData = db.getDefaultData();
  gContacts = storageService.load(KEY, defaultData);
  storageService.store(KEY, gContacts);
}

function query() {
  return Promise.resolve(gContacts);
}

function remove(id) {
  const idx = gContacts.findIndex((contact) => contact.id === id);
  gContacts.splice(idx, 1);
  storageService.store(KEY, gContacts);
  return Promise.resolve();
}

function save(contact) {
  if (contact.id) {
    const idx = gContacts.findIndex((_contact) => _contact.id === contact.id);
    gContacts.splice(idx, 1, contact);
  } else {
    contact.id = _makeId();
    contact.img =
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png';
    gContacts.unshift(contact);
  }
  storageService.store(KEY, gContacts);
  return Promise.resolve(contact);
}

function _makeId(length = 11) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
