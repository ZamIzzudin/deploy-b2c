/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useAppSelector } from '../../hooks';
import DetailModal from '../Detail-Modal';

export default function OptionalAddons(props) {
    const API = process.env.VALO_API;

    const { data, getAddOns, game } = props;

    const { addonsDetail } = useAppSelector((states) => states);

    const [modal, showModal] = useState(false);
    const [agents, setAgents] = useState<any>([]);
    const [agent, setAgent] = useState<any>('Astra');
    const [agent2, setAgent2] = useState<any>('Astra');
    const [legend, setLegend] = useState<any>('Ash');
    const [legend2, setLegend2] = useState<any>('Ash');
    const [checked, setChecked] = useState<any>(false);

    const legends = ['Ash', 'Bangalore', 'Bloodhound', 'Catalyst', 'Caustic', 'Crypto', 'Fuse', 'Gibraltar', 'Horizon', 'Lifeline', 'Loba', 'Mad Maggie', 'Mirage', 'Newcastle', 'Octane', 'Pathfinder', 'Rampart', 'Revenant', 'Seer', 'Valkyrie', 'Vantage', 'Wattson', 'Wraith'];

    function sendAddOns() {
        if (data.name.includes('Specific') && checked === false) {
            showModal(true);
        } else {
            getAddOns({ name: data.name });
            setChecked(!checked);
        }
    }

    function addSpecificAgent() {
        const specificAgent = `${data.name} (${agent}/${agent2})`;
        // getAddOns({ name: specificAgent, percentage_price: data.percentage_price });
        getAddOns({ name: specificAgent });
        setChecked(!checked);
        showModal(false);
        setAgent('Astra');
        setAgent2('Astra');
    }

    function addSpecificLegend() {
        const specificLegend = `${data.name} (${legend}/${legend2})`;
        // getAddOns({ name: specificLegend, percentage_price: data.percentage_price });
        getAddOns({ name: specificLegend });
        setChecked(!checked);
        showModal(false);
        setLegend('Ash');
        setLegend2('Ash');
    }

    async function getAgents() {
        const url = `${API}/v1/agents?isPlayableCharacter=true`;
        const response = await axios.get(url);

        setAgents(response.data.data);
    }

    useEffect(() => {
        if (addonsDetail.length === 0) {
            setChecked(false);
        }
        getAgents();
    }, [addonsDetail]);

    return (
        <div className="flex-row mb-2">
            <div className="space-between flex-down fullwidth">
                <span className="set2">
                    {data.name}
                    <span className="bubble-text mx-2">
                        {data.percentage_price * 100}
                        %
                    </span>
                </span>
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
                {game.name === 'Valorant' ? (
                    <Form.Select className="form-layout mb-4" value={agent} onChange={(e) => setAgent(e.target.value)}>
                        {agents?.map((agnt, index) => (
                            <option key={`agent${index}`} value={agnt.displayName}>{agnt.displayName}</option>
                        ))}
                    </Form.Select>
                ) : (
                    <Form.Select className="form-layout mb-4" value={legend} onChange={(e) => setLegend(e.target.value)}>
                        {legends?.map((lgnd, index) => (
                            <option key={`legend${index}`} value={lgnd}>{lgnd}</option>
                        ))}
                    </Form.Select>
                )}
                <span>Second Option</span>
                {game.name === 'Valorant' ? (
                    <Form.Select className="form-layout mb-4" value={agent2} onChange={(e) => setAgent2(e.target.value)}>
                        {agents.map((agnt, index) => (
                            <option key={`agent${index}`} value={agnt.displayName}>{agnt.displayName}</option>
                        ))}
                    </Form.Select>
                ) : (
                    <Form.Select className="form-layout mb-4" value={legend2} onChange={(e) => setLegend2(e.target.value)}>
                        {legends.map((lgnd, index) => (
                            <option key={`legend${index}`} value={lgnd}>{lgnd}</option>
                        ))}
                    </Form.Select>
                )}
                {game.name === 'Valorant' ? (
                    <button className="capsule button mt-4" onClick={() => addSpecificAgent()}>Add Agents</button>
                ) : (
                    <button className="capsule button mt-4" onClick={() => addSpecificLegend()}>Add Legends</button>
                )}
            </DetailModal>
        </div>
    );
}
