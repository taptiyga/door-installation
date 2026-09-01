import { useState } from "react";
import styles from "./Header.module.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuToggle() {
    setIsMenuOpen((prev) => !prev);
  }

  function handleLinkClick() {
    setIsMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <a href="#" className={styles.logo} onClick={handleLinkClick}>
          <div className={styles.logoIcon}>🚪</div>

          <div className={styles.logoText}>
            <h1 className={styles.title}>DOOR MASTER</h1>
            <p className={styles.subtitle}>Установка межкомнатных дверей</p>
          </div>
        </a>

        {/* Навигация */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <ul className={styles.navList}>
            <li>
              <a
                href="#services"
                className={styles.link}
                onClick={handleLinkClick}
              >
                Услуги
              </a>
            </li>

            <li>
              <a
                href="#how-it-works"
                className={styles.link}
                onClick={handleLinkClick}
              >
                Как мы работаем
              </a>
            </li>

            <li>
              <a
                href="#advantages"
                className={styles.link}
                onClick={handleLinkClick}
              >
                Преимущества
              </a>
            </li>

            <li>
              <a
                href="#gallery"
                className={styles.link}
                onClick={handleLinkClick}
              >
                Примеры работ
              </a>
            </li>

            <li>
              <a
                href="#contacts"
                className={styles.link}
                onClick={handleLinkClick}
              >
                Контакты
              </a>
            </li>
          </ul>

          {/* Контакты внутри мобильного меню */}
          <div className={styles.mobileContacts}>
            <a href="tel:+79909900999" className={styles.mobilePhone}>
              8-990-990-09-99
            </a>

            <span className={styles.mobileWorkTime}>
              Ежедневно с 8:00 до 20:00
            </span>

            <button type="button" className={styles.mobileButton}>
              Оставить заявку
            </button>
          </div>
        </nav>

        {/* Контакты desktop */}
        <div className={styles.contacts}>
          <div className={styles.phoneBlock}>
            <a href="tel:+79909900999" className={styles.phone}>
              8-990-990-09-99
            </a>

            <span className={styles.workTime}>Ежедневно с 8:00 до 20:00</span>
          </div>

          <button type="button" className={styles.button}>
            Оставить заявку
          </button>
        </div>

        {/* Бургер */}
        <button
          type="button"
          className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
          onClick={handleMenuToggle}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
