import { FormEvent, useState } from 'react';
import styles from './order.module.css';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className={styles.search}
        type='text'
        placeholder='Search order number #'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
