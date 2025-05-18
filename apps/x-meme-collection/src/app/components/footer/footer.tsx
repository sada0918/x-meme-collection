import styles from './footer.module.css';
import { Theme } from '@x-meme-collection/shared-interfaces';

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={styles.footer}>
      <p
        className={`${styles.copyright} ${
          theme === 'dark' ? styles.copyrightDark : styles.copyrightLight
        }`}
      >
        © {new Date().getFullYear()} Meme Collection / 作成者: さだ
      </p>
    </footer>
  );
};

export default Footer;
