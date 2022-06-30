/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-bootstrap';

function AccountDetails() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Container className="my-5 py-5 ">
            <Row className="mt-5 centered">
                <h1 className="text-center title">Account Details</h1>
            </Row>
            <Row className="mt-5">
                <Col className="card mx-2">
                    <h2>Champion</h2>
                </Col>
                <Col className="card mx-2">
                    <h2>Skin</h2>
                </Col>
                <Col className="card mx-2">
                    <h2>Ranked Stats</h2>
                </Col>
            </Row>

        </Container>

    );
}

export default AccountDetails;
