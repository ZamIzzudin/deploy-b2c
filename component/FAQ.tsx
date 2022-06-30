/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import styles from './styles/FAQ.module.css';

function FAQ() {
    return (
        <div className="mb-5 mt-3 centered-down">
            <div className={`${styles['container-card']} card my-2`}>
                <details className={styles['details-card']}>
                    <summary className={styles['details-title']}>How does our rank boosting work?</summary>
                    <p className={styles['details-text']}>Are you wondering how everything works? We've made our process super straightforward. Once you purchase from us, one of our high-ranked players will play on your account to help you reach the rank you desire. It's that easy!</p>
                </details>
            </div>
            <div className={`${styles['container-card']} card my-2`}>
                <details className={styles['details-card']}>
                    <summary className={styles['details-title']}>Why choose us?</summary>
                    <p className={styles['details-text']}>If you are looking to level up your game, we are the perfect company for you! We know exactly how to help our clients reach their goals and achieve the rank they want.</p>
                </details>
            </div>
            <div className={`${styles['container-card']} card my-2`}>
                <details className={styles['details-card']}>
                    <summary className={styles['details-title']}>How much does a boost services cost?</summary>
                    <p className={styles['details-text']}>The cost of a League boost heavily depends on your chosen service and rank. However, lower ranks can be as little as $10, making our service incredibly affordable.</p>
                </details>
            </div>
            <div className={`${styles['container-card']} card my-2`}>
                <details className={styles['details-card']}>
                    <summary className={styles['details-title']}>How long does a once boost service take?</summary>
                    <p className={styles['details-text']}>The cost of a League boost heavily depends on your chosen service and rank. However, lower ranks can be as little as $10, making our service incredibly affordable.</p>
                </details>
            </div>
            <div className={`${styles['container-card']} card my-2`}>
                <details className={styles['details-card']}>
                    <summary className={styles['details-title']}>What are the benefits?</summary>
                    <p className={styles['details-text']}>Many benefits come with our service, including an improved rank, better rewards, and faster progression through the game.</p>
                </details>
            </div>
            <div>
                <button type="button" className="button capsule mt-4">Show More</button>
            </div>
        </div>
    );
}

export default FAQ;
