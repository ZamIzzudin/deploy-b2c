/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-unresolved */
import { useEffect, useState } from 'react';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import axios from 'axios';
import styles from '../styles/Testimonial.module.css';

function Testimonial() {
    const [w, setW] = useState(1);

    const [testimonials, setTestimonials] = useState([{
        id: 0, user_id: 0, rating: 5, review_body: '', review_title: '', updated_at: '',
    }]);

    async function getTestimonial() {
        const url = `${process.env.API}/reviews`;

        await axios.get(url).then((res) => {
            setTestimonials(res.data.shown_reviews);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getTestimonial();
    }, []);

    useEffect(() => {
        if (window.innerWidth < 700) {
            setW(1);
        } else if (window.innerWidth < 1200) {
            setW(2);
        } else {
            setW(3);
        }
    }, [w]);

    return (
        <Splide
            hasTrack={false}
            options={{
                type: 'loop',
                perPage: w,
                drag: 'free',
                snap: true,
                height: '260px',
                focus: 'center',
            }}
        >
            <SplideTrack>
                {testimonials?.map((testimonial) => (
                    <SplideSlide key={`testimonial${testimonial.id}`}>
                        <div className={`${styles['testi-card']} no-shadow card`}>
                            <h3 className={styles['review-user']}>
                                {testimonial.user_id}
                            </h3>
                            <h4 className={styles.review}>{testimonial.review_title}</h4>
                            <h5 className={styles['review-detail']}>{testimonial.review_body}</h5>
                            <div className={styles['review-star']}>
                                {testimonial.rating}
                                <i className="fa-solid fa-star fa-1x" />
                            </div>
                            <span className={styles['review-date']}>{testimonial.updated_at.slice(0, 10)}</span>
                        </div>
                    </SplideSlide>
                ))}
                {/* <SplideSlide>
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
                </SplideSlide> */}
            </SplideTrack>
            <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev">{'<'}</button>
                <button className="splide__arrow splide__arrow--next">{'>'}</button>
            </div>
        </Splide>
    );
}

export default Testimonial;