import { FC } from 'react';

import styles from './footer.module.scss';

const Footer: FC = () => {
  return (
    <footer id='footer' className={styles.footer}>
      Прибит к нижней части, но его нужно еще сделать
    </footer>
  );
};

export default Footer;
