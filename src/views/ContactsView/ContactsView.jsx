import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';

import Filter from '../../components/Filter/Filter';

export default function ContactsView() {
  return (
    <>
      <h1 className="visually_hidden">This is contacts page.</h1>

      <ContactForm />
      <Filter />
      <ContactList />
    </>
  );
}
