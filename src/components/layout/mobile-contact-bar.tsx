import { ContactButtons } from '@/components/cta/contact-buttons';
import styles from './mobile-contact-bar.module.scss';

export function MobileContactBar() {
  return (
    <nav className={styles.bar} aria-label="Быстрые контакты">
      <div className={styles.inner}>
        <ContactButtons source="mobile_bar" compact />
      </div>
    </nav>
  );
}
