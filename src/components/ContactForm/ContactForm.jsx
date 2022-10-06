import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addContact } from '../../redux/contacts/contacts-operations';
import { getContacts } from '../../redux/contacts/contacts-selectors';

import s from './ContactForm.module.scss';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleInputChange = ({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleBtnSubmit = e => {
    e.preventDefault();

    if (name === '' && number === '') {
      return alert('Empty');
    }

    contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number,
    )
      ? alert(`${name} is already in contacts.`)
      : dispatch(addContact({ name, number }));
    reset();
  };

  const reset = () => {
    setNumber('');
    setName('');
  };

  return (
    <div className={s.box}>
      <h2 className={s.title}>Phonebook</h2>

      <form onSubmit={handleBtnSubmit} className={s.form} autoComplete="off">
        <label className={s.label}>
          Name
          <input
            autoFocus
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            className={s.input}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="імя може містити лиш букви, апостроф, тире та пропуски. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={s.label}>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={handleInputChange}
            className={s.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефону повинен містити цифри, пропуски, тире і починатись з +"
            required
          />
        </label>

        <button type="submit" className={s.btn}>
          Add contact
        </button>
      </form>
    </div>
  );
}
