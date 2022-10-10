import { Row, Col } from 'react-bootstrap';
import styles from './styles/Skeleton-Loading.module.css';

export function SForm() {
    return (
        <div className={`${styles['form-container']} mt-3`}>
            <div className={styles.form1}>
                <div className={styles.skeleton} />
            </div>
            <div className={styles.form2}>
                <div className={styles.skeleton} />
            </div>
            <div className={styles.checkout}>
                <div className={styles.skeleton} />
            </div>
        </div>
    );
}

export function SGameList() {
    return (
        <div className="flex-row gap-3 mt-5">
            <div className={`${styles['game-container']} mt-3`} />
            <div className={`${styles['game-container']} mt-3`} />
        </div>
    );
}

export function SServiceList() {
    return (
        <Row className={`${styles['service-container']} w-90 my-5`}>
            <Col>
                <div className={styles.service_skeleton} />
            </Col>
            <Col>
                <div className={styles.service_skeleton} />
            </Col>
            <Col>
                <div className={styles.service_skeleton} />
            </Col>
            <Col>
                <div className={styles.service_skeleton} />
            </Col>
            <Col>
                <div className={styles.service_skeleton} />
            </Col>
        </Row>
    );
}

export function SAccountList() {
    return (
        <Row className="fullwidth">
            <Col className="col-md-3 col-12">
                <div className={styles.account_skeleton} />
            </Col>
            <Col className="col-md-3 col-12">
                <div className={styles.account_skeleton} />
            </Col>
            <Col className="col-md-3 col-12">
                <div className={styles.account_skeleton} />
            </Col>
            <Col className="col-md-3 col-12">
                <div className={styles.account_skeleton} />
            </Col>
        </Row>
    );
}

export function SDetailAccount() {
    return (
        <Row className="fullwidth mt-5">
            <Col className="col-12 col-md-4">
                <div className={styles.skeleton} />
            </Col>
            <Col className="col-12 col-md-4">
                <div className={styles.skeleton} />
            </Col>
            <Col className="col-12 col-md-4">
                <div className={styles.skeleton} />
            </Col>
        </Row>
    );
}
