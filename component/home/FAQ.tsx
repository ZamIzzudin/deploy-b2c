/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/FAQ.module.css';

function FAQ() {
    const [faqs, setFaqs] = useState([{ id: 0, question: '', answer: '' }]);
    const [allFAQ, setAllFAQ] = useState([{ id: 0, question: '', answer: '' }]);
    const [expandFAQ, setExpandFAQ] = useState(false);

    async function getFAQ() {
        const url = `${process.env.API}/faqs`;
        await axios.get(url).then((res) => {
            setFaqs(res.data.data.slice(0, 3));
            setAllFAQ(res.data.data);
        }).catch((err) => console.log(err));
    }

    useEffect(() => {
        getFAQ();
    }, []);

    return (
        <div className="mb-5 mt-3 centered-down">
            {!expandFAQ ? (
                <div className="w-100">
                    {faqs?.map((faq) => (
                        <div key={`faq${faq.id}`} className={`${styles['container-card']} card my-2`}>
                            <details className={styles['details-card']}>
                                <summary className={styles['details-title']}>{faq.question}</summary>
                                <p className={styles['details-text']}>{faq.answer}</p>
                            </details>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-100">
                    {allFAQ?.map((faq) => (
                        <div key={`faq${faq.id}`} className={`${styles['container-card']} card my-2`}>
                            <details className={styles['details-card']}>
                                <summary className={styles['details-title']}>{faq.question}</summary>
                                <p className={styles['details-text']}>{faq.answer}</p>
                            </details>
                        </div>
                    ))}
                </div>
            )}
            <div>
                <button type="button" className="button capsule mt-4" onClick={() => setExpandFAQ(!expandFAQ)}>Show More</button>
            </div>
        </div>
    );
}

export default FAQ;
