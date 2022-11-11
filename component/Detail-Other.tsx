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
import DetailModal from './Detail-Modal';
import styles from './styles/DetailPage.module.css';

function DetailOther(props: any) {
    const [addFaqModal, showAddFaqModal] = useState(false);
    const [editFaqModal, showEditFaqModal] = useState(false);

    const { role, token } = props;

    const [FAQ, setFAQ] = useState<any>([]);
    const [newQuestion, setNewQuestion] = useState<any>();
    const [newAnswer, setNewAnswer] = useState<any>();
    const [selectedFaqID, setSelectedFaqID] = useState<any>();

    // Function to get all FAQ data
    async function getFAQ() {
        const url = `${process.env.API}/faqs`;
        await axios.get(url).then((res) => setFAQ(res.data.data)).catch((err) => console.log(err));
    }

    // Function to get spesfic data about FAQ
    function selectFAQ(item) {
        setSelectedFaqID(item.id);
        setNewQuestion(item.question);
        setNewAnswer(item.answer);
    }

    // Function to add new FAQ data
    async function addNewFAQ(e) {
        e.preventDefault();
        const url = `${process.env.API}/faqs`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const data = {
            question: newQuestion,
            answer: newAnswer,
        };

        await axios.post(url, data, config).then(() => { getFAQ(); showAddFaqModal(false); }).catch((err) => console.log(err));
    }

    // Function to delete FAQ data
    async function deleteFAQ(id) {
        const url = `${process.env.API}/faqs/${id}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        await axios.delete(url, config).then((res) => getFAQ()).catch((err) => console.log(err));
    }

    // Function to edit FAQ data
    async function editFAQ(e, id) {
        e.preventDefault();
        const url = `${process.env.API}/faqs/${id}`;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        const data = {
            question: newQuestion,
            answer: newAnswer,
        };

        await axios.put(url, data, config).then((res) => { getFAQ(); showEditFaqModal(false); }).catch((err) => console.log(err));
    }

    // Function to clear a form
    function clearForm() {
        setNewQuestion(null);
        setNewAnswer(null);
        setSelectedFaqID(null);
    }

    // Get data when load the page
    useEffect(() => {
        getFAQ();
    }, []);

    return (
        <>
            {role === 'admin' ? (
                <Row className="centered mt-4">
                    <Col className=" col-md-6 px-3">
                        <div className="card fullwidth">
                            <h3 className="sec-font">Manage FAQ</h3>
                            {/* Looping All FAQ that exist */}
                            {FAQ?.map((item) => (
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
                            {/* Add FAQ Button */}
                            <div className="mt-3">
                                <button className="button capsule" onClick={() => showAddFaqModal(true)}>Add FAQ</button>
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
