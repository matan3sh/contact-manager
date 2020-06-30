import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import ContactApp from './components/pages/ContactApp';

function App() {
  return (
    <Provider store={store}>
      <ContactApp />
    </Provider>
  );
}

export default App;
