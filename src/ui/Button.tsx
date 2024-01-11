import { Link } from 'react-router-dom';
import styles from './UI.module.css';

interface Props {
  children: string | string[] | JSX.Element | JSX.Element[];
  onClick?: () => void;
  size: string;
  disabled?: boolean;
  to?: string;
  style?: string;
}

function Button({ children, onClick, size, disabled, to, style }: Props) {
  // const handleClick = () => {
  //   if (!onClick) return;
  //   onClick!();
  // };

  if (to)
    return (
      <Link
        to={to}
        className={`${styles.btn} ${size ? styles[size] : ''} ${
          style ? styles[style] : ''
        }`}
      >
        {children}
      </Link>
    );
  return (
    <button
      disabled={disabled}
      className={`${styles.btn} ${size ? styles[size] : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;