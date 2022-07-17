/* eslint-disable react/button-has-type */
import { Table } from 'react-bootstrap';

function DetailInvoice(props: any) {
    const { role } = props;

    return (
        <div>
            {role === 'user' ? (
                <Table>
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
                            <td className="centered">
                                <button className="capsule button">Details</button>
                            </td>
                        </tr>
                        <tr>
                            <td>453435</td>
                            <td>2, January 2022</td>
                            <td>Valorant</td>
                            <td>Rank Boosting</td>
                            <td>Paypal</td>
                            <td className="centered">
                                <button className="capsule button">Details</button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <h1>404 Error</h1>
            )}
        </div>
    );
}

export default DetailInvoice;
