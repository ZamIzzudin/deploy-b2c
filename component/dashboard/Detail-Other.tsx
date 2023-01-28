/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import { Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '../../hooks';
import DetailModal from '../Detail-Modal';

import {
    asyncGetAllFAQ, asyncCreateAllFAQ, asyncEditAllFAQ, asyncRemoveAllFAQ,
} from '../../state/faq/action';

import styles from '../styles/DetailPage.module.css';

function DetailOther() {
    const { auth, faq } = useAppSelector((states) => states);
    const dispatch = useAppDispatch();

    const [addFaqModal, showAddFaqModal] = useState(false);
    const [addReviewModal, showAddReviewModal] = useState(false);
    const [editFaqModal, showEditFaqModal] = useState(false);

    const [newQuestion, setNewQuestion] = useState<any>();
    const [newAnswer, setNewAnswer] = useState<any>();
    const [selectedFaqID, setSelectedFaqID] = useState<any>();

    const [users, setUsers] = useState<any>([]);
    const [reviewsShown, setReviewShown] = useState<any>([]);
    const [reviewsAll, setReviewAll] = useState<any>([]);

    async function getUsers() {
        const url = `${process.env.API}/admin/users?role=user`;

        await axios.get(url)
            .then((res) => setUsers(res.data.data))
            .catch((err) => console.log(err));
    }

    // Function to get spesfic data about FAQ
    function selectFAQ(item) {
        setSelectedFaqID(item.id);
        setNewQuestion(item.question);
        setNewAnswer(item.answer);
    }

    // Function to add new FAQ data
    function addNewFAQ(e) {
        e.preventDefault();
        const data = {
            question: newQuestion,
            answer: newAnswer,
        };

        dispatch(asyncCreateAllFAQ(data));
        showAddFaqModal(false);
    }

    async function addNewBooster(id) {
        const url = `${process.env.API}/admin/set-role/${id}`;

        const data = {
            role: 'booster',
        };

        await axios.put(url, data).then(() => getUsers()).catch((err) => console.log(err));
    }

    // Function to edit FAQ data
    function editFAQ(e, id) {
        e.preventDefault();
        const data = {
            question: newQuestion,
            answer: newAnswer,
        };

        dispatch(asyncEditAllFAQ(data, id));
        showEditFaqModal(false);
    }

    // Function to delete FAQ data
    function deleteFAQ(id) {
        dispatch(asyncRemoveAllFAQ(id));
    }

    // Function to clear a form
    function clearForm() {
        setNewQuestion(null);
        setNewAnswer(null);
        setSelectedFaqID(null);
    }

    async function getReviews() {
        const url = `${process.env.API}/reviews`;

        await axios.get(url)
            .then((res) => {
                setReviewShown(res.data.shown_reviews);
                setReviewAll(res.data.all_review);
            })
            .catch((err) => console.log(err));
    }

    async function showReviews(id) {
        const url = `${process.env.API}/reviews/${id}`;

        const status = { is_shown: true };

        await axios.put(url, status)
            .then((res) => { getReviews(); showAddReviewModal(false); })
            .catch((err) => console.log(err));
    }

    async function hideReviews(id) {
        const url = `${process.env.API}/reviews/${id}`;

        const status = { is_shown: false };

        await axios.put(url, status)
            .then((res) => getReviews())
            .catch((err) => console.log(err));
    }

    // Get data when load the page
    useEffect(() => {
        dispatch(asyncGetAllFAQ());
        getUsers();
        getReviews();
    }, []);

    return (
        <>
            {auth?.role[0] === 'admin' ? (
                <Row className="centered-start mt-4">
                    <Col className=" col-md-6 px-3 mb-4">
                        <div className="card fullwidth">
                            <h3 className="sec-font">Manage FAQ</h3>
                            {/* Looping All FAQ that exist */}
                            <div className={styles['list-container']}>
                                {faq?.map((item) => (
                                    <div className={styles['FAQ-card']} key={item.id}>
                                        <span>{item.question}</span>
                                        <div className={styles['button-container']}>
                                            {/* Edit FAQ Button */}
                                            <button className={styles['edit-btn']} onClick={() => { showEditFaqModal(true); selectFAQ(item); }}>
                                                <i className="fa-solid fa-pen" />
                                            </button>
                                            {/* Delete FAQ Button */}
                                            <button className={styles['delete-btn']} onClick={() => deleteFAQ(item.id)}>
                                                <i className="fa-solid fa-trash-can" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Add FAQ Button */}
                            <div>
                                <button className="button capsule" onClick={() => showAddFaqModal(true)}>Add</button>
                            </div>
                        </div>
                    </Col>
                    <Col className=" col-md-6 px-3 mb-4">
                        <div className="card fullwidth">
                            <h3 className="sec-font">Manage Booster Account</h3>
                            <div className={styles['list-container']}>
                                {users?.map((user) => (
                                    <div className={styles['FAQ-card']} key={user.id}>
                                        <span>{user.email}</span>
                                        <div className={styles['button-container']}>
                                            {/* Delete FAQ Button */}
                                            <button className={styles['delete-btn']} onClick={() => addNewBooster(user.user_id)}>
                                                <i className="fa-solid fa-pen" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col className=" col-md-6 px-3 mb-4">
                        <div className="card fullwidth">
                            <h3 className="sec-font">Manage Review</h3>
                            <div className={styles['list-container']}>
                                {reviewsShown?.map((review) => (
                                    <div className={styles['FAQ-card']} key={review.id}>
                                        <span>{review.review_title}</span>
                                        <div className={styles['button-container']}>
                                            {/* Delete FAQ Button */}
                                            <button className={styles['delete-btn']} onClick={() => hideReviews(review.id)}>
                                                <i className="fa-solid fa-trash-can" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button className="button capsule" onClick={() => showAddReviewModal(true)}>Add</button>
                            </div>
                        </div>
                    </Col>

                    {/* Add FAQ Modal */}
                    <DetailModal
                        show={addFaqModal}
                        onHide={() => { showAddFaqModal(false); clearForm(); }}
                    >
                        <h3 className="sec-font">Add Modal</h3>
                        <Form onSubmit={(e) => addNewFAQ(e)}>
                            <Form.Label>Question</Form.Label>
                            <Form.Control className="form-layout mb-2" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                            <Form.Label>Answer</Form.Label>
                            <Form.Control className="form-layout mb-2" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
                            <button className="button capsule mt-2" type="submit">Add</button>
                        </Form>
                    </DetailModal>

                    {/* Edit FAQ Modal */}
                    <DetailModal
                        show={editFaqModal}
                        onHide={() => { showEditFaqModal(false); clearForm(); }}
                    >
                        <h1>Edit Modal</h1>
                        <Form onSubmit={(e) => editFAQ(e, selectedFaqID)}>
                            <Form.Label>Question</Form.Label>
                            <Form.Control className="form-layout mb-2" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} />
                            <Form.Label>Answer</Form.Label>
                            <Form.Control className="form-layout mb-2" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
                            <button className="button capsule mt-2" type="submit">Edit</button>
                        </Form>
                    </DetailModal>

                    {/* Add Shown Review Modal */}
                    <DetailModal
                        show={addReviewModal}
                        onHide={() => showAddReviewModal(false)}
                    >
                        <h1>Show Review</h1>
                        <div className={styles['list-container']}>
                            {reviewsAll?.map((review) => (
                                <div className={styles['FAQ-card']} key={review.id}>
                                    <span>{review.review_title}</span>
                                    <div className={styles['button-container']}>
                                        {/* Delete FAQ Button */}
                                        <button className={styles['delete-btn']} onClick={() => showReviews(review.id)}>
                                            <i className="fa-solid fa-pen" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DetailModal>
                </Row>
            ) : (
                <div className="error-container fullwidth">
                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                    <span className="sec-font">You Dont Have Access</span>
                    <Link href="/">
                        <button className="button capsule mt-3" type="button">Home</button>
                    </Link>
                </div>
            )}
        </>
    );
}

export default DetailOther;
