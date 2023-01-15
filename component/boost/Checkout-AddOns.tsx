/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import DetailModal from '../Detail-Modal';

export default function OptionalAddons(props) {
    const { data, getAddOns } = props;

    const { addonsDetail } = useAppSelector((states) => states);

    const [modal, showModal] = useState(false);
    const [agent, setAgent] = useState<any>('Astra');
    const [agent2, setAgent2] = useState<any>('Astra');
    const [checked, setChecked] = useState<any>(false);

    const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Fade', 'Jett', 'Kay/O', 'Killjoy', 'Neon', 'Omen', 'Phoniex', 'Reyna', 'Raze', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru'];

    function sendAddOns() {
        if (data.name.includes('Specific') && checked === false) {
            showModal(true);
        } else {
            getAddOns(data);
            setChecked(!checked);
        }
    }

    function addSpecificAgent() {
        const specificAgent = `${data.name} (${agent}/${agent2})`;
        getAddOns({ name: specificAgent, percentage_price: data.percentage_price });
        setChecked(!checked);
        showModal(false);
        setAgent('Astra');
        setAgent2('Astra');
    }

    useEffect(() => {
        if (addonsDetail.length === 0) {
            setChecked(false);
        }
    }, [addonsDetail]);

    return (
        <div className="flex-row mb-2">
            <div className="space-between flex-down fullwidth">
                <span>{data.name}</span>
            </div>
            <div className="space-between flex-down">
                <input type="checkbox" checked={checked} className="checkbox" onChange={() => sendAddOns()} />
            </div>
            <DetailModal
                show={modal}
                onHide={() => showModal(false)}
            >
                <h5>Select Agent</h5>
                <span>First Option</span>
                <Form.Select className="form-layout mb-4" value={agent} onChange={(e) => setAgent(e.target.value)}>
                    {agents.map((agnt, index) => (
                        <option key={`agent${index}`} value={agnt}>{agnt}</option>
                    ))}
                </Form.Select>
                <span>Second Option</span>
                <Form.Select className="form-layout" value={agent2} onChange={(e) => setAgent2(e.target.value)}>
                    {agents.map((agnt, index) => (
                        <option key={`agent${index}`} value={agnt}>{agnt}</option>
                    ))}
                </Form.Select>
                <button className="capsule button mt-4" onClick={() => addSpecificAgent()}>Add</button>
            </DetailModal>
        </div>
    );
}
