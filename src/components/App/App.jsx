import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';

import styles from './app.module.css';

export function App() {
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  const initialContacts = parsedContacts ?? defaultContacts;

  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const setContactFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const nameIsDoubled = name =>
    contacts.find(contact => contact.name.toLowerCase() === name);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const normalizedName = newContact.name.toLowerCase();

    if (nameIsDoubled(normalizedName)) {
      return alert(`${name} is already in contacts.`);
    }

    setContacts(prevState => [newContact, ...prevState]);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={styles.subTitle}>Contacts</h2>

      <Filter value={filter} onChange={setContactFilter} />
      <ContactList
        contacts={filteredContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
