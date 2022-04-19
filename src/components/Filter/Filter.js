import React from 'react';
import { useContext } from 'react';
import { Context } from 'redux/context';
import s from './Filter.module.css';

export default function Filter() {
  const { searchContact, setSearchContact } = useContext(Context);

  const onChange = e => {
    setSearchContact(e.currentTarget.value);
  };

  return (
    <Context.Provider value={searchContact}>
      <label>
        Find contacts by name
        <input
          className={s.input}
          value={searchContact}
          type="text"
          onChange={onChange}
        />
      </label>
    </Context.Provider>
  );
}
