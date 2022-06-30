/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import styles from './styles/Testimonial.module.css';

function Testimonial() {
    return (
        <Splide
            hasTrack={false}
            options={{
                type: 'loop',
                perPage: 3,
                drag: 'free',
                snap: true,
                height: '260px',
                focus: 'center',
            }}
        >
            <SplideTrack>
                <SplideSlide>
                    <div className={`${styles['testi-card']} no-shadow card`}>
                        <h3 className={styles['review-user']}>Username</h3>
                        <h4 className={styles.review}>Great Service</h4>
                        <h5 className={styles['review-detail']}>Great Service</h5>
                        <div className={styles['review-star']}>
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                        </div>
                        <span className={styles['review-date']}>12 januari 2022</span>
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div className={`${styles['testi-card']} no-shadow card`}>
                        <h3 className={styles['review-user']}>Username</h3>
                        <h4 className={styles.review}>Very Trusted</h4>
                        <h5 className={styles['review-detail']}>Very Trusted</h5>
                        <div className={styles['review-star']}>
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star-half fa-1x" />
                        </div>
                        <span className={styles['review-date']}>12 januari 2022</span>
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div className={`${styles['testi-card']} no-shadow card`}>
                        <h3 className={styles['review-user']}>Username</h3>
                        <h4 className={styles.review}>Fast Response</h4>
                        <h5 className={styles['review-detail']}>Their admin is very fast response</h5>
                        <div className={styles['review-star']}>
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                        </div>
                        <span className={styles['review-date']}>12 januari 2022</span>
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div className={`${styles['testi-card']} card`}>
                        <h3 className={styles['review-user']}>Username</h3>
                        <h4 className={styles.review}>Good Service</h4>
                        <h5 className={styles['review-detail']}>Good service and very affordable price</h5>
                        <div className={styles['review-star']}>
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star fa-1x" />
                            <i className="fa-solid fa-star-half fa-1x" />
                        </div>
                        <span className={styles['review-date']}>12 januari 2022</span>
                    </div>
                </SplideSlide>
            </SplideTrack>
            <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev">{'<'}</button>
                <button className="splide__arrow splide__arrow--next">{'>'}</button>
            </div>
        </Splide>
    );
}

export default Testimonial;
