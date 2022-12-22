import { Col } from 'react-bootstrap';
import Image from 'next/image';

export default function ErrorPage() {
    function reloadHome() {
        window.location.reload();
    }

    return (
        <main>
            <Col className="error-page-container">
                <div className="flex flex-down centered">
                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                    <span className="sec-font">Check Your Connection</span>
                    <button onClick={() => reloadHome()} className="button capsule mt-3" type="button">Reload</button>
                </div>
            </Col>
        </main>
    );
}
