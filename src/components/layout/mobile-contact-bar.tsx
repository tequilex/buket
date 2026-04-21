import { ContactButtons } from '@/components/cta/contact-buttons';
import styles from './mobile-contact-bar.module.scss';

export function MobileContactBar() {
  return (
    <div className={styles.bar}>
      <ContactButtons source="mobile_bar" compact />
    </div>
  );
}
