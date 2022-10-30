import Link from 'next/link';
import Image from 'next/image';

export default function ErrorPage() {
    return (
        <div className="error-container ">
            <Image src="/Jett-Sticker.png" width="300" height="300" />
            <span className="sec-font">Go Back to Home Page</span>
            <Link href="/">
                <button className="button capsule mt-3" type="button">Home</button>
            </Link>
        </div>
    );
}
