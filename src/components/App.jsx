import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Filter from './Filter/Filter';
import { Context } from '../context';
import { useState } from 'react';

const App = () => {
  const [searchContact, setSearchContact] = useState('');

  return (
    <Context.Provider value={{ searchContact, setSearchContact }}>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <h1> Phonebook </h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </Context.Provider>
  );
};

export default App;
