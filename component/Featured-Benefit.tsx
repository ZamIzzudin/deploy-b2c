/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/self-closing-comp */
import styles from './styles/FeaturedBenefit.module.css';

function FeaturedBenefit() {
    return (
        <div className={`${styles['benefit-container']} my-5`}>
            <div className={styles.debug1}>
                <div className={`${styles['benefit-card']} card`}>
                    <i className="fa-solid fa-rss fa-2x"></i>
                    <h3 className={styles['benefit-card-title']}>Appear Offline</h3>
                    <p className={styles['benefit-card-subtitle']}>The booster plays offline, so the process is undetectable from your friend list.</p>
                </div>
            </div>
            <div className={styles.debug2}>
                <h2 className={styles['benefit-title']}>Our Key Features</h2>
                <h3 className={styles['benefit-subtitle']}>The most satisfying in-game service.</h3>
                <p className={styles['benefit-desc']}>Forget about frustrating games; reach your deserved rank effortlessly. Whether you're purchasing our Boosting services, you are privileged to all premium features.</p>
                <div>
                    <button type="button" className="button capsule">Get Started</button>
                </div>
            </div>
            <div className={styles.debug3}>
                <div className={`${styles['benefit-card']} card`}>
                    <i className="fa-solid fa-shield-halved fa-2x"></i>
                    <h3 className={styles['benefit-card-title']}>VPN Protection</h3>
                    <p className={styles['benefit-card-subtitle']}>Your account remains safe with our automated VPN system.</p>
                </div>
            </div>
            <div className={styles.debug4}>
                <div className={`${styles['benefit-card']} card`}>
                    <i className="fa-solid fa-arrows-turn-to-dots fa-2x"></i>
                    <h3 className={styles['benefit-card-title']}>Order Tracking</h3>
                    <p className={styles['benefit-card-subtitle']}>Spectate, chat with the booster, and follow your match history in the client's area.</p>
                </div>
            </div>
            <div className={styles.debug5}>
                <div className={`${styles['benefit-card']} card`}>
                    <i className="fa-solid fa-headset fa-2x"></i>
                    <h3 className={styles['benefit-card-title']}>24/7 Support</h3>
                    <p className={styles['benefit-card-subtitle']}>Use our live support to receive premium help whenever you are in need.</p>
                </div>
            </div>
        </div>
    );
}

export default FeaturedBenefit;
