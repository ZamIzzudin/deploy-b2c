/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/button-has-type */
import { Table } from 'react-bootstrap';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DetailModal from '../Detail-Modal';

function DetailInvoice(props: any) {
    const { role } = props;
    const [modal, showModal] = useState(false);

    return (
        <div>
            {role === 'user' ? (
                <Table borderless responsive="sm">
                    <thead>
                        <tr>
                            <th>Id Payment</th>
                            <th>Date</th>
                            <th>Game</th>
                            <th>Service</th>
                            <th>Gateaway</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>424853</td>
                            <td>15, January 2022</td>
                            <td>Genshin Impact</td>
                            <td>Daily Mission</td>
                            <td>Metamask</td>
                            <td>
                                <button onClick={() => showModal(true)} className="capsule button-org">Details</button>
                            </td>
                        </tr>
                        <tr>
                            <td>453435</td>
                            <td>2, January 2022</td>
                            <td>Valorant</td>
                            <td>Rank Boosting</td>
                            <td>Paypal</td>
                            <td>
                                <button onClick={() => showModal(true)} className="capsule button-org">Details</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <div className="error-container fullwidth">
                    <Image src="/Jett-Sticker.png" width="300" height="300" />
                    <span className="sec-font">Go Back to Home Page</span>
                    <Link href="/">
                        <button className="button capsule mt-3" type="button">Home</button>
                    </Link>
                </div>
            )}
            <DetailModal
                show={modal}
                onHide={() => showModal(false)}
            >
                <h1>Details</h1>
            </DetailModal>
        </div>
    );
}

export default DetailInvoice;
