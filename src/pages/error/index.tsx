import { useNavigate } from 'react-router-dom';
import { EMPLOYEES_TAB } from '@config/constants/routes';

import styles from './index.module.scss';

const ErrorPage = () => {
  const navitate = useNavigate();
  const { state } = window.history;

  if (state) {
    console.log(state.usr);
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1>Error 404</h1>
        <button onClick={() => navitate(EMPLOYEES_TAB)}>Попробовать снова</button>
      </div>
    </div>
  );
};

export { ErrorPage };
