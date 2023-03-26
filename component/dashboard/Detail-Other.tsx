/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
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
import {
    Row, Col, Form, Pagination,
} from 'react-bootstrap';
import { useState, useEffect } from 'react';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Editor as CKEditorComponentType } from '@ckeditor/ckeditor5-react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Breadcrump from '../Breadcrump';
import DetailModal from '../Detail-Modal';

import {
    asyncGetAllFAQ, asyncCreateAllFAQ, asyncEditAllFAQ, asyncRemoveAllFAQ,
} from '../../state/faq/action';

import styles from '../styles/DetailPage.module.css';

const Editor = dynamic<CKEditorComponentType<any>>(() => import('@ckeditor/ckeditor5-react').then((mod) => mod.Editor), { ssr: false });
const DynamicClassicEditor = dynamic(() => import('@ckeditor/ckeditor5-build-classic'), { ssr: false });

function DetailOther() {
    const { auth, faq } = useAppSelector((states) => states);
    const dispatch = useAppDispatch();

    const [addFaqModal, showAddFaqModal] = useState(false);
    const [addReviewModal, showAddReviewModal] = useState(false);
    const [editFaqModal, showEditFaqModal] = useState(false);
    const [manageRole, showManageRole] = useState(false);

    const [newQuestion, setNewQuestion] = useState<any>();
    const [newAnswer, setNewAnswer] = useState<any>();
    const [selectedFaqID, setSelectedFaqID] = useState<any>();
    const [selectedUser, setSelectedUser] = useState<any>();

    const [users, setUsers] = useState<any>([]);
    const [searchUser, setSearchUser] = useState<any>('');
    const [reviewsShown, setReviewShown] = useState<any>([]);
    const [reviewsAll, setReviewAll] = useState<any>([]);

    const [policy, setPolicy] = useState<any>([]);
    const [addpolicy, setAddPolicy] = useState<any>(false);
    const [policyText, setPolicyText] = useState<any>('');
    const [policyTitle, setPolicyTitle] = useState<any>('');
    const [selectedPolicy, setSelectedPolicy] = useState<any>({});

    const [isActive, setActive] = useState<any>('faq');

    const [paginationPage, setPaginationPage] = useState(1);
    const pagination: any = [];

    function setActiveBreadCrump(page) {
        setActive(page);
    }

    async function getUsers() {
        const url = `${process.env.API}/admin/users`;

        await axios.get(url)
            .then((res) => setUsers(res.data.data.data))
            .catch((err) => console.log(err));
    }

    async function filterUser() {
        if (searchUser === '') {
            getUsers();
        } else {
            const url = `${process.env.API}/admin/users?name=${searchUser}`;

            await axios.get(url)
                .then((res) => { setUsers(res.data.data); setSearchUser(''); })
                .catch((err) => console.log(err));
        }
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

    async function addNewBooster(id, role) {
        const url = `${process.env.API}/admin/set-role/${id}`;

        const data = {
            role,
        };

        await axios.put(url, data).then(() => { getUsers(); showManageRole(false); }).catch((err) => console.log(err));
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

    async function getReviews(page) {
        const url = `${process.env.API}/reviews?page=${page}`;

        await axios.get(url)
            .then((res) => {
                setReviewShown(res.data.shown_reviews.data);
                setReviewAll(res.data.all_review);
            })
            .catch((err) => console.log(err));
    }

    async function showReviews(id) {
        const url = `${process.env.API}/reviews/${id}`;

        const status = { is_shown: true };
        setPaginationPage(1);

        await axios.put(url, status)
            .then((res) => { getReviews(1); showAddReviewModal(false); })
            .catch((err) => console.log(err));
    }

    async function hideReviews(id) {
        const url = `${process.env.API}/reviews/${id}`;

        const status = { is_shown: false };
        setPaginationPage(1);

        await axios.put(url, status)
            .then((res) => getReviews(1))
            .catch((err) => console.log(err));
    }

    async function getPolicy() {
        const url = `${process.env.API}/configs`;

        await axios.get(url)
            .then((res) => { setPolicy(res.data.data.data); setSelectedPolicy(res.data.data.data[0]); })
            .catch((err) => console.log(err));
    }

    async function createPolicy() {
        const url = `${process.env.API}/configs`;

        const data = {
            config_code: Math.random(),
            config_value: policyText,
            config_type: 'Policy',
            config_description: policyTitle,
        };

        await axios.post(url, data)
            .then((res) => { getPolicy(); setSelectedPolicy(null); setPolicyText(''); setPolicyTitle(''); })
            .catch((err) => console.log(err));
    }

    async function updatePolicy(data) {
        const url = `${process.env.API}/configs/${data.id}`;

        const payload = {
            config_code: data.config_code,
            config_value: policyText,
        };

        await axios.put(url, payload)
            .then((res) => { getPolicy(); setSelectedPolicy(null); setPolicyText(''); setPolicyTitle(''); })
            .catch((err) => console.log(err));
    }

    // Get data when load the page
    useEffect(() => {
        dispatch(asyncGetAllFAQ());
        getUsers();
        getReviews(1);
        getPolicy();
    }, []);

    useEffect(() => {
        getReviews(paginationPage);
    }, [paginationPage]);

    const handleEditorDataChange = (event, editor) => {
        const data = editor.getData();
        setPolicyText(data);
    };

    for (let i = 1; i <= reviewsAll.last_page; i++) {
        pagination.push(
            <Pagination.Item className="pagination-items mx-1" key={i} active={i === paginationPage} onClick={() => setPaginationPage(i)}>
                {i}
            </Pagination.Item>,
        );
    }

    return (
        <>
            {auth?.role[0] === 'admin' ? (
                <Row className="centered-start">
                    <Breadcrump isActive={isActive} setActive={setActiveBreadCrump} />
                    <Col className={isActive === 'faq' ? (styles.show) : (styles.hide)}>
                        <div className="card fullwidth">
                            <h3 className="sec-font mb-4">List FAQ</h3>
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
                    <Col className={isActive === 'review' ? (styles.show) : (styles.hide)}>
                        <div className="card fullwidth">
                            <h3 className="sec-font mb-4">Showed Review</h3>
                            <div className={styles['list-container']}>
                                {reviewsShown?.map((review) => (
                                    <div className={styles['FAQ-card']} key={review.id}>
                                        <span>{review.review_title}</span>
                                        <div className={styles['button-container']}>
                                            {/* Delete FAQ Button */}
                                            <button className={styles['delete-btn']} onClick={() => hideReviews(review.id)}>
                                                Hide
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
                    <Col className={isActive === 'policy' ? (styles.show) : (styles.hide)}>
                        <div className="card fullwidth">
                            <h3 className="sec-font mb-4">Policy</h3>
                            <div className={`${styles['policy-container']} mb-3`}>
                                {policy.map((unit) => (
                                    <button className="button" onClick={() => { setAddPolicy(false); setPolicyText(unit.config_value); setSelectedPolicy(unit); }}>{unit.config_description}</button>
                                ))}
                                <button className="button button-org" onClick={() => { setAddPolicy(true); setPolicyText(''); setPolicyTitle(''); setSelectedPolicy(null); }}>+ Add</button>
                            </div>
                            {addpolicy && (
                                <Form.Control placeholder="Title" className="form-layout mb-3" value={policyTitle} onChange={(e) => setPolicyTitle(e.target.value)} />
                            )}
                            <Editor
                                editor={DynamicClassicEditor}
                                data={policyText}
                                onChange={handleEditorDataChange}
                            />
                            <div>
                                {addpolicy ? (
                                    <button className="button capsule mt-3" onClick={() => createPolicy()}>Add</button>
                                ) : (
                                    <button className="button capsule mt-3" onClick={() => updatePolicy(selectedPolicy)}>Update</button>
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col className={isActive === 'role' ? (styles.show) : (styles.hide)}>
                        <div className="card fullwidth">
                            <h3 className="sec-font mb-4">Manage Account Roles</h3>
                            <div className={styles['search-container']}>
                                <Form.Control placeholder="Search User" className="form-layout" value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
                                <button className="button capsule mx-3" onClick={() => filterUser()}>Search</button>
                            </div>

                            <div className={styles['list-container']}>
                                {users?.map((user) => (
                                    <div className={styles['FAQ-card']} key={user.id}>
                                        <span>{user.email}</span>
                                        <div className={styles['button-container']}>
                                            <div className={styles['role-tag']}>{user.role[0]}</div>
                                            {/* Delete FAQ Button */}
                                            <button className={styles['delete-btn']} onClick={() => { showManageRole(true); setSelectedUser(user); }}>
                                                <i className="fa-solid fa-pen" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
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
                        onHide={() => { showAddReviewModal(false); setPaginationPage(1); }}
                    >
                        <h1>Show Review</h1>
                        <div className={styles['list-container']}>
                            {reviewsAll?.data?.map((review) => (
                                <div className={styles['FAQ-card']} key={review.id}>
                                    <span>{review.review_title}</span>
                                    <div className={styles['button-container']}>
                                        {/* Delete FAQ Button */}
                                        <button className={styles['delete-btn']} onClick={() => showReviews(review.id)}>
                                            {/* <i className="fa-solid fa-pen" /> */}
                                            Show
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <Row className="mt-4 mb-3">
                            {reviewsAll?.last_page && (
                                <Col>
                                    <Pagination className={styles['pagination-container']}>
                                        {paginationPage > 1 && (
                                            <Pagination.Prev className="mx-1" onClick={() => setPaginationPage(paginationPage - 1)} />
                                        )}

                                        {pagination}

                                        {paginationPage !== reviewsAll.last_page && (
                                            <Pagination.Next className="mx-1" onClick={() => setPaginationPage(paginationPage + 1)} />
                                        )}
                                    </Pagination>
                                </Col>
                            )}
                        </Row>
                    </DetailModal>

                    {/* Manage Role */}
                    <DetailModal
                        show={manageRole}
                        onHide={() => showManageRole(false)}
                    >
                        <span className={styles['text-center']}>Change Role Account</span>
                        <div className={styles['role-container']}>
                            <button onClick={() => addNewBooster(selectedUser.user_id, 'booster')} className="button capsule button-org">Booster</button>
                            <button onClick={() => addNewBooster(selectedUser.user_id, 'user')} className="button capsule button-org">User</button>
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
