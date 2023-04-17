import PropTypes from 'prop-types';
import styles from './contact-list.module.css';

export const ContactList = ({ contacts, onDeleteContact }) => {
  if (contacts.length === 0) return <p>Your contact list is empty.</p>;
  else
    return (
      <ul className={styles.contactList}>
        {contacts.map(({ id, name, number }) => (
          <li key={id} className={styles.contactItem}>
            {name}: {number}
            <button type="button" onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
