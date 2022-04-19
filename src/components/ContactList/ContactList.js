import React from 'react';
import { useGetContactsQuery } from 'ApiService/ContactApi';
import { useContext } from 'react';
import { Context } from 'context/context';
import { PushSpinner } from 'react-spinners-kit';
import s from './ContactList.module.css';
import ContactItem from '../ContactItem/ContactItem';

const ContactList = () => {
  const { searchContact } = useContext(Context);
  const { data, isSuccess, isFetching } = useGetContactsQuery();
  const getVisibleContacts = data?.filter(contact =>
    contact.name.toLowerCase().includes(searchContact.toLowerCase())
  );

  return (
    <>
      <div className={s.spinner}>
        <PushSpinner size={50} color="#321616" loading={!isSuccess} />
      </div>
      <ul>
        {searchContact !== '' && getVisibleContacts?.length === 0 ? (
          <h2>Contact {searchContact} not found</h2>
        ) : (
          <div>
            {getVisibleContacts?.map(item => (
              <ContactItem key={item.id} item={item} />
            ))}
          </div>
        )}
        {!isFetching && data?.length === 0 && <h2>Phone book empty</h2>}
      </ul>
    </>
  );
};

export default ContactList;
