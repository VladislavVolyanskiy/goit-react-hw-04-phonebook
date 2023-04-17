import PropTypes from 'prop-types';
import styles from './filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <label className={styles.filterLabel}>
      Find contacts by name
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
