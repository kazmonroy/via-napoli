import { useState } from 'react';
import styles from './user.module.css';
import { useAppDispatch } from '../../hooks';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate('/menu');
    setUsername('');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button size='md'>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
