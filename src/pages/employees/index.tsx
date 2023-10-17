import { EmployeesTab } from '@modules/employees/organism';

import styles from './index.module.scss';

const EmployeesPage = () => {
  return (
    <div className={styles.root}>
      <EmployeesTab />
    </div>
  );
};

export { EmployeesPage };
