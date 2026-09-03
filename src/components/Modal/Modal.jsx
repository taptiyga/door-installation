import { useCallback, useEffect, useState } from "react";
import styles from "./Modal.module.css";
export function Modal({ onClose, isOpen }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const handleClose = useCallback(() => {
    onClose();
    setName("");
    setPhone("");
    setNameError("");
    setPhoneError("");
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    },
    [handleClose],
  );

  useEffect(() => {
    if (!isOpen) return;

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  function stopPropagation(event) {
    event.stopPropagation();
  }
  function handleSubmit(event) {
    event.preventDefault();
    let hasError = false;
    if (name.trim().length < 2) {
      setNameError("Введите корректное имя");
      hasError = true;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
      setPhoneError("Введите корректный номер телефона");
      hasError = true;
    }
    if (hasError) {
      return;
    }

    console.log(name);
    console.log(phone);

    handleClose();
  }

  function handlePhoneChange(event) {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);

    if (value && value[0] !== "8") {
      value = "8" + value.slice(1);
    }

    setPhone(value);
    setPhoneError("");
  }

  function formatPhone(value) {
    if (!value) return "";

    let result = value.slice(0, 1);

    if (value.length > 1) {
      result += ` (${value.slice(1, 4)}`;
    }

    if (value.length >= 5) {
      result += `) ${value.slice(4, 7)}`;
    }
    if (value.length >= 8) {
      result += `-${value.slice(7, 9)}`;
    }
    if (value.length >= 10) {
      result += `-${value.slice(9, 11)}`;
    }
    return result;
  }

  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={stopPropagation}>
        <h2 className={styles.title}>Оставить заявку</h2>
        <button
          className={styles.buttonClose}
          type="button"
          onClick={handleClose}
        >
          X
        </button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="name">
            Ваше имя
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setNameError("");
            }}
            autoFocus
            required
            aria-invalid={Boolean(nameError)}
          />
          <div className={styles.error}>{nameError}</div>
          <label className={styles.label} htmlFor="tel">
            Ваш номер
          </label>
          <input
            className={styles.input}
            type="tel"
            id="tel"
            value={formatPhone(phone)}
            onChange={handlePhoneChange}
            required
            aria-invalid={Boolean(phoneError)}
          />
          <div className={styles.error}>{phoneError}</div>
          <button className={styles.button} type="submit">
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
}
