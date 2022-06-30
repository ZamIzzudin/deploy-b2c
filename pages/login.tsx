/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Container } from 'react-bootstrap';
import { facebookProvider, googleProvider } from '../config/socialAuth';
import socialMediaAuth from '../login-auth/auth';

function Login() {
    const handleLogin = async (provider: any) => {
        const res = await socialMediaAuth(provider);
        console.log(res);
    };

    return (
        <Container className="my-5 py-5 centered-down">
            <h1 className="mt-5 section-title">Login</h1>
            <div>
                <button className="button capsule" onClick={() => handleLogin(facebookProvider)}>facebook</button>
                <button className="button capsule mx-3 my-5" onClick={() => handleLogin(googleProvider)}>google</button>
            </div>
        </Container>
    );
}

export default Login;
