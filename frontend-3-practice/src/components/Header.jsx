function Header() {
    return (
        <header className="site-header">
            <div className="header-container">
                <a className="logo" href="#">BARBERY</a>

                <nav className="main-nav" aria-label="Основная навигация">
                    <a className="nav-link" href="#">УСЛУГИ</a>
                    <a className="nav-link" href="#">МАСТЕРА</a>
                    <a className="nav-link" href="#">ОТЗЫВЫ</a>
                    <a className="nav-link" href="#">КОНТАКТЫ</a>
                </nav>
            </div>
        </header>
    );
}

export default Header;