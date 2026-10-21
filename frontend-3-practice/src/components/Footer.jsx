function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-columns">
                    <div className="footer-column footer-brand">
                        <p className="footer-logo">
                            BARBERY
                        </p>

                        <p className="footer-description">
                            Барбершоп для тех, кто ценит стиль,
                            качество и своё время.
                        </p>
                    </div>

                    <div className="footer-column">
                        <h2 className="footer-title">
                            КОНТАКТЫ
                        </h2>

                        <address className="footer-contacts">
                            <p className="contact-item">
                                <svg
                                    className="contact-icon"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M12 21s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Z"
                                    />
                                    <circle
                                        cx="12"
                                        cy="8"
                                        r="2.5"
                                    />
                                </svg>

                                <span>ул. Садовая, 15, Москва</span>
                            </p>

                            <p className="contact-item">
                                <svg
                                    className="contact-icon"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M6.6 3.5 9 8.3 6.9 10c1.5 3.1 4 5.6 7.1 7.1l1.7-2.1 4.8 2.4c.3.2.5.5.4.9-.4 1.8-2 3.2-3.9 3.2C9 21.5 2.5 15 2.5 7c0-1.9 1.4-3.5 3.2-3.9.4-.1.7.1.9.4Z"
                                    />
                                </svg>

                                <span>+7 (495) 123-45-67</span>
                            </p>
                        </address>
                    </div>

                    <div className="footer-column">
                        <h2 className="footer-title">
                            РЕЖИМ РАБОТЫ
                        </h2>

                        <p className="working-hours">
                            Пн–Пт: 10:00–21:00
                        </p>

                        <p className="working-hours">
                            Сб–Вс: 10:00–20:00
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © 2026 BARBERY. Все права защищены.
                    </p>

                    <a className="privacy-link" href="#">
                        Политика конфиденциальности
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;