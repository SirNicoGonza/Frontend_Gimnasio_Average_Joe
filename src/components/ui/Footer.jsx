import "../ui/Footer.css";

export default function Footer() {
    return (
        <footer className="footer-main">
            <div className="footer-center-text">
                &copy; {new Date().getFullYear()} Average Joe - Todos los derechos
                reservados.
            </div>
        </footer>
    );
}