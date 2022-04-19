import { useDeleteContactMutation } from 'ApiService/ContactApi';
import s from './ContactItem.module.css';
import { toast } from 'react-toastify';

export default function ContactItem({ item: { id, name, phone } }) {
  const [deleteContact, { isError, isSuccess, isUninitialized }] =
    useDeleteContactMutation();
  const onDelete = id => {
    deleteContact(id);
    if (!isSuccess) {
      toast.info(`Contact  "${name} - №${phone}"  deleted`);
    }
    if (isError) {
      toast.error(`Contact  "${name}"  not deleted`);
    }
  };

  return (
    <li>
      {name} : {phone}
      <button
        disabled={!isUninitialized}
        className={s.buttonList}
        type="button"
        onClick={() => onDelete(id)}
      >
        Delete
      </button>
    </li>
  );
}
