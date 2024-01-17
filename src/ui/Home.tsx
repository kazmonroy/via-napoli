import styles from './shared.module.css';
import CreateUser from '../features/user/CreateUser';
import { useAppSelector } from '../hooks';
import Button from './Button';

function Home() {
  const username = useAppSelector((state) => state.user.username);
  return (
    <div className={styles.home}>
      <h1>The best pizza.</h1>
      <h2>From the oven, straight to you.</h2>

      {username ? (
        <Button to='menu' size='md'>
          Continue ordering
        </Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;
