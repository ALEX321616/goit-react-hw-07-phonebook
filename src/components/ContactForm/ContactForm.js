import { useState } from 'react';
import s from './ContactForm.module.css';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'ApiService/ContactApi';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const [addContact, { isLoading }] = useAddContactMutation();
  const { data } = useGetContactsQuery();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value.trim());
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const canSave = [name, number].every(Boolean) && !isLoading;
    const newName = e.target.elements.name.value;

    if (
      data.find(
        item => item.name.toLowerCase() === newName.toLowerCase().trim()
      )
    ) {
      toast.error(`Contact  "${name}"  already exists`);
      // alert(`${newName} is already in the contacts`);
      reset();
      return;
    }

    if (canSave) {
      try {
        await addContact({ name, phone: number });
        toast.success(`Contact  "${name} - №${number}"  recorded`);
      } catch (err) {
        toast.error(`Failed to save the contact  "${name}"`);
        console.error(err);
      }
    }
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <label htmlFor="name" className={s.formLabel}>
          Name
          <input
            className={s.formInput}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label htmlFor="number" className={s.formLabel}>
          Number
          <input
            className={s.formInput}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className={s.formButton} type="submit">
          Add contact
        </button>
      </form>
    </>
  );
};

export default ContactForm;
