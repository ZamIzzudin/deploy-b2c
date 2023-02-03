/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Form, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { editBoostDetail } from '../../state/boostDetail/action';
import { useAppSelector, useAppDispatch } from '../../hooks';
import styles from '../styles/FormBoost.module.css';

export function IncludeRank({
    title, serviceName,
}) {
    const { ranks } = useAppSelector((states) => states);
    const [clearRanks, setClearRanks] = useState<any>([]);

    const [selectedRank, setSelectedRank] = useState<any>({ id: 1 });
    const [selectedDivision, setSelectedDivision] = useState<any>(0);

    const dispatch = useAppDispatch();

    function sendData(data) {
        dispatch(editBoostDetail(data, title));
    }

    function setUpRanks() {
        const splitRanks = ranks.map((rank, index) => {
            const tempArray = rank.name.split(' ');
            return {
                id: ranks[index].id,
                name: tempArray[0],
                badge: ranks[index].badge,
            };
        });

        const newRanks: any = [];

        splitRanks.forEach((rank, index) => {
            if (rank.name !== splitRanks[index - 1]?.name) {
                newRanks.push(rank);
            }
        });

        setClearRanks(newRanks);
        setSelectedRank({ id: 1 });
    }

    function getRank() {
        const data = {
            ...ranks[selectedRank.id + selectedDivision - 1],
        };

        sendData(data);
    }

    useEffect(() => {
        getRank();
    }, [selectedDivision, selectedRank]);

    useEffect(() => {
        setUpRanks();
    }, [serviceName, ranks]);

    return (
        <div className={styles.container}>
            <h1 className={styles['title-form']}>{title}</h1>
            <Row className={styles['rank-division-container']}>
                <Col className={`${styles['rank-container']} col-md-6 gap-2 col-12`}>
                    {clearRanks.map((rank) => (
                        <Image className={`${styles['rank-list']} ${selectedRank.id === rank.id ? (styles.active) : ('')} p-1`} key={rank.name} src={rank.badge} width={60} height={60} onClick={() => { setSelectedRank(rank); setSelectedDivision(0); }} />
                    ))}
                </Col>
                <Col className={`${styles['division-container']} col-md-6 col-12`}>
                    <div className={`${styles['division-list']} ${selectedDivision === 0 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(0)}>I</div>
                    <div className={`${styles['division-list']} ${selectedDivision === 1 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(1)}>II</div>
                    <div className={`${styles['division-list']} ${selectedDivision === 2 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(2)}>III</div>
                </Col>
            </Row>
        </div>
    );
}

export function ApexIncludeRank({
    title, serviceName,
}) {
    const { ranks } = useAppSelector((states) => states);

    const [selectedRank, setSelectedRank] = useState<any>(ranks[0]);
    const [selectedDivision, setSelectedDivision] = useState<any>(1);

    const dispatch = useAppDispatch();

    function sendData(data) {
        dispatch(editBoostDetail(data, title));
    }

    function getRank() {
        if (selectedRank.name.toLowerCase() === 'master') {
            const setupRank = { ...selectedRank, name: `${selectedRank.name.toLowerCase()}_${selectedDivision}` };
            sendData(setupRank);
        } else {
            const setupRank = { ...selectedRank, name: `${selectedRank.name.toLowerCase()}_${selectedDivision}` };
            sendData(setupRank);
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getRank();
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [selectedDivision, selectedRank]);

    useEffect(() => {
        setSelectedRank(ranks[0]);
    }, [ranks, serviceName]);

    return (
        <div className={styles.container}>
            <h1 className={styles['title-form']}>{title}</h1>
            <Row className={styles['rank-division-container']}>
                <Col className={`${styles['rank-container']} col-md-6 gap-2 col-12`}>
                    {ranks.map((rank) => (
                        <Image className={`${styles['rank-list']} ${selectedRank.name === rank.name ? (styles.active) : ('')} p-1`} key={rank.name} src={rank.badge} width={60} height={60} onClick={() => { setSelectedRank(rank); setSelectedDivision(1); }} />
                    ))}
                </Col>
                {selectedRank.name.toLowerCase() === 'master' ? (
                    <Col className="centered-down col-md-6 col-12">
                        <span className="set1">
                            {selectedDivision}
                            K
                        </span>
                        <input className="fullwidth range-input mt-3" type="range" min={1} max={30} value={selectedDivision} onChange={(e) => setSelectedDivision(+e.target.value)} />
                    </Col>
                ) : (
                    <Col className={`${styles['division-container']} col-md-6 col-12`}>
                        <div className={`${styles['division-list']} ${selectedDivision === 4 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(4)}>IV</div>
                        <div className={`${styles['division-list']} ${selectedDivision === 3 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(3)}>III</div>
                        <div className={`${styles['division-list']} ${selectedDivision === 2 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(2)}>II</div>
                        <div className={`${styles['division-list']} ${selectedDivision === 1 ? (styles.active) : ('')}`} onClick={() => setSelectedDivision(1)}>I</div>
                    </Col>
                )}

            </Row>
        </div>
    );
}

export function NewApexIncludeRank({
    serviceName,
}) {
    const { ranks } = useAppSelector((states) => states);

    const [type, setType] = useState('package');

    const [selectedRank, setSelectedRank] = useState<any>(ranks[0]);
    const [currentDivision, setCurrentDivision] = useState<any>(4);
    const [desiredDivision, setDesiredDivision] = useState<any>(4);

    const [currentRank, setCurrentRank] = useState<any>(ranks[0]);
    const [desiredRank, setDesiredRank] = useState<any>(ranks[0]);

    const dispatch = useAppDispatch();

    function sendData(data, title) {
        dispatch(editBoostDetail(data, title));
    }

    function getRank(rank, division, title) {
        if (rank.name.toLowerCase() === 'master') {
            const setupRank = { ...rank, name: `${rank.name.toLowerCase()}_${division}` };
            sendData(setupRank, title);
        } else {
            const setupRank = { ...rank, name: `${rank.name.toLowerCase()}_${division}` };
            sendData(setupRank, title);
        }
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getRank(selectedRank, desiredDivision, 'Desired Rank');
            getRank(selectedRank, currentDivision, 'Current Rank');
        }, 800);

        return () => clearTimeout(delayDebounceFn);
    }, [currentDivision, desiredDivision, selectedRank]);

    useEffect(() => {
        getRank(currentRank, 4, 'Current Rank');
        if (desiredRank.name === 'Master') {
            getRank(desiredRank, 0, 'Desired Rank');
        } else {
            getRank(desiredRank, 4, 'Desired Rank');
        }
    }, [currentRank, desiredRank]);

    useEffect(() => {
        setSelectedRank(ranks[0]);
        setCurrentRank(ranks[0]);
        setDesiredRank(ranks[0]);
        setCurrentDivision(4);
        setDesiredDivision(4);
    }, [ranks, serviceName, type]);

    return (
        <div className={styles.container}>
            <h1 className={styles['title-form']}>Select Ranks</h1>
            <Form.Select className="form-layout mt-3" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="package">Package</option>
                <option value="per-division">Per Division</option>
            </Form.Select>
            {type === 'package' ? (
                <Row className={styles['rank-division-container']}>
                    <Col className="col-md-6 col-12 p-2 flex-down mt-3">
                        <span className="set2">Current Rank</span>
                        <div className={`${styles['rank-container']}`}>
                            {ranks.map((rank) => (
                                <span className={`${styles['rank-list']} ${currentRank.name === rank.name ? (styles.active) : ('')} p-1`} key={rank.name} onClick={() => setCurrentRank(rank)}>
                                    <Image src={rank.badge} width={50} height={50} />
                                </span>
                            ))}
                        </div>
                    </Col>
                    <Col className="col-md-6 col-12 p-2 flex-down mt-3">
                        <span className="set2">Desired Rank</span>
                        <div className={`${styles['rank-container']}`}>
                            {ranks.map((rank) => (
                                <span className={`${styles['rank-list']} ${desiredRank.name === rank.name ? (styles.active) : ('')} p-1`} key={rank.name} onClick={() => setDesiredRank(rank)}>
                                    <Image src={rank.badge} width={50} height={50} />
                                </span>
                            ))}
                        </div>
                    </Col>
                </Row>
            ) : (
                <Row className={styles['rank-division-container']}>
                    <Col className="col-md-12 col-12 pt-2">
                        <div className={`${styles['rank-container']} gap-3`}>
                            {ranks.map((rank) => (
                                <span className={`${styles['rank-list']} ${selectedRank.name === rank.name ? (styles.active) : ('')} p-1`} key={rank.name} onClick={() => setSelectedRank(rank)}>
                                    <Image src={rank.badge} width={50} height={50} />
                                </span>
                            ))}
                        </div>
                    </Col>
                    <Col className="col-md-6 col-12 flex-down mt-3">
                        <span className="set2">Current Division</span>
                        {selectedRank.name === 'Master' ? (
                            <div className={`${styles['rank-container']} gap-3`}>
                                <span className="set3">
                                    {currentDivision}
                                    K
                                </span>
                                <input className="fullwidth range-input" type="range" min={1} max={30} value={currentDivision} onChange={(e) => setCurrentDivision(+e.target.value)} />
                            </div>
                        ) : (
                            <div className={`${styles['rank-container']} gap-3`}>
                                <span className={`${styles['rank-list']} ${currentDivision === 4 ? (styles.active) : ('')}`} onClick={() => setCurrentDivision(4)}>
                                    IV
                                </span>
                                <span className={`${styles['rank-list']} ${currentDivision === 3 ? (styles.active) : ('')}`} onClick={() => setCurrentDivision(3)}>
                                    III
                                </span>
                                <span className={`${styles['rank-list']} ${currentDivision === 2 ? (styles.active) : ('')}`} onClick={() => setCurrentDivision(2)}>
                                    II
                                </span>
                                <span className={`${styles['rank-list']} ${currentDivision === 1 ? (styles.active) : ('')}`} onClick={() => setCurrentDivision(1)}>
                                    I
                                </span>
                            </div>
                        )}
                    </Col>
                    <Col className="col-md-6 col-12 flex-down mt-3">
                        <span className="set2">Desired Division</span>
                        {selectedRank.name === 'Master' ? (
                            <div className={`${styles['rank-container']} gap-3`}>
                                <span className="set3">
                                    {desiredDivision}
                                    K
                                </span>
                                <input className="fullwidth range-input" type="range" min={1} max={30} value={desiredDivision} onChange={(e) => setDesiredDivision(+e.target.value)} />
                            </div>
                        ) : (
                            <div className={`${styles['rank-container']} gap-3`}>
                                <span className={`${styles['rank-list']} ${desiredDivision === 4 ? (styles.active) : ('')}`} onClick={() => setDesiredDivision(4)}>
                                    IV
                                </span>
                                <span className={`${styles['rank-list']} ${desiredDivision === 3 ? (styles.active) : ('')}`} onClick={() => setDesiredDivision(3)}>
                                    III
                                </span>
                                <span className={`${styles['rank-list']} ${desiredDivision === 2 ? (styles.active) : ('')}`} onClick={() => setDesiredDivision(2)}>
                                    II
                                </span>
                                <span className={`${styles['rank-list']} ${desiredDivision === 1 ? (styles.active) : ('')}`} onClick={() => setDesiredDivision(1)}>
                                    I
                                </span>
                            </div>
                        )}
                    </Col>
                </Row>
            )}
        </div>
    );
}

export function NumberGame({
    max, min, title, serviceName,
}) {
    const dispatch = useAppDispatch();

    function sendData(data) {
        dispatch(editBoostDetail(data, title));
    }

    const [num, setNum] = useState<number>(1);

    useEffect(() => {
        sendData(1);
        setNum(1);
    }, [serviceName]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            sendData(num);
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [num]);

    return (
        <Row className={styles.container2}>
            <Col className="m-0 centered pad-0 col">
                <h1 className="big-num">{num}</h1>
            </Col>
            <Col className="flex-down col-10">
                <div>
                    <h1 className={styles['title-form']}>{title}</h1>
                </div>
                <div>
                    <input className="fullwidth range-input mt-3" type="range" min={min} max={max} value={num} onChange={(e) => setNum(+e.target.value)} />
                </div>
            </Col>

        </Row>

    );
}

export function Points({
    start, to, title, unit, serviceName,
}) {
    const [max, setMax] = useState(to);
    const [min, setMin] = useState(start);

    const dispatch = useAppDispatch();

    function rangeLogic(value, kind) {
        if (kind === 'max') {
            if (value > to) {
                setMax(to);
            } else {
                setMax(value);
            }
        } else if (kind === 'min') {
            if (value < start) {
                setMin(start);
            } else {
                setMin(value);
            }
        }
    }

    function sendData() {
        const newData = { start: min * 1, to: max * 1, unit_type: unit };
        dispatch(editBoostDetail(newData, unit));
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            sendData();
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [max, min]);

    useEffect(() => {
        setMax(to);
        setMin(start);
        sendData();
    }, [unit]);

    useEffect(() => {
        sendData();
    }, [serviceName]);

    return (
        <Row className={styles.container}>
            <h1 className={styles['title-form']}>{title}</h1>
            <Row className="pt-1 pb-1 centered">
                <Col className="col-md-6 col-12">
                    <Form.Group className="fullwidth py-4 centered-down">
                        <span className="capitalized set3">
                            Current
                            {' '}
                            {unit}
                        </span>
                        <div className="centered my-2">
                            <button className={styles['point-button']} onClick={() => rangeLogic(parseInt(min, 10) - 1, 'min')}>-</button>
                            <span className="content-text"><b className="sec-font">{min}</b></span>
                            <button className={styles['point-button']} onClick={() => rangeLogic(parseInt(min, 10) + 1, 'min')}>+</button>
                        </div>
                        <input className="w-90 range-input mt-3" type="range" max={parseInt(max, 10) - 1} min={start} value={min} onChange={(e) => setMin(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col className="col-md-6 col-12">
                    <Form.Group className="fullwidth py-4 centered-down">
                        <span className="capitalized set3">
                            Desire
                            {' '}
                            {unit}
                        </span>
                        <div className="centered my-2">
                            <button type="button" className={styles['point-button']} onClick={() => rangeLogic(parseInt(max, 10) - 1, 'max')}>-</button>
                            <span className="content-text"><b className="sec-font">{max}</b></span>
                            <button className={styles['point-button']} onClick={() => rangeLogic(parseInt(max, 10) + 1, 'max')}>+</button>
                        </div>
                        <input className="w-90 range-input mt-3" type="range" max={to} min={parseInt(min, 10) + 1} value={max} onChange={(e) => setMax(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
        </Row>

    );
}

export function ListForm({
    title, items, serviceName, unit,
}) {
    const dispatch = useAppDispatch();

    function sendData(data) {
        dispatch(editBoostDetail(data, unit));
    }

    useEffect(() => {
        sendData(items[0]);
    }, [serviceName]);

    return (
        <Col className="flex-down fullwidth">
            <Form.Label className="set2">{title}</Form.Label>
            <Form.Select className="form-layout mb-4" onChange={(e) => sendData(e.target.value)}>
                {items.map((item) => <option key={item} value={item}>{item}</option>)}
            </Form.Select>
        </Col>
    );
}

export function NestedListForm({
    title, items, serviceName, unit,
}) {
    const dispatch = useAppDispatch();

    const [keysItems, setKeysItems] = useState<any>(Object.keys(items));
    const [selectedKey, setSelectedKey] = useState<any>(keysItems[0]);
    const [itemsByKey, setItemsByKey] = useState<any>(items[selectedKey]);
    const [selectedItem, setSelectedItem] = useState<any>(itemsByKey[0]);

    function sendData() {
        const data = `${selectedKey.replace(/ /g, '_')}/${selectedItem}`;
        dispatch(editBoostDetail(data, unit));
    }

    useEffect(() => {
        sendData();
    }, [selectedItem, selectedKey]);

    useEffect(() => {
        const keys = Object.keys(items);
        setKeysItems(keys);
        setSelectedKey(keys[0]);
        setItemsByKey(items[keys[0]]);
        setSelectedItem(items[keys[0]][0]);

        sendData();
    }, [serviceName, items]);

    return (
        <Col className="flex-down fullwidth">
            <Form.Label className="set2">{title}</Form.Label>
            <Form.Select className="form-layout mb-4" onChange={(e) => { setSelectedKey(e.target.value); setItemsByKey(items[e.target.value]); }}>
                {keysItems.map((key) => <option key={key} value={key}>{key}</option>)}
            </Form.Select>
            <Form.Select className="form-layout mb-4" onChange={(e) => setSelectedItem(e.target.value)}>
                {itemsByKey.map((item) => <option key={item} value={item}>{item}</option>)}
            </Form.Select>
        </Col>
    );
}

export function ServerSelect({
    servers, serviceName,
}) {
    const dispatch = useAppDispatch();

    function sendData(data) {
        dispatch(editBoostDetail(data, 'server'));
    }

    useEffect(() => {
        sendData(servers[0].name || 'NA');
    }, [serviceName]);

    return (
        <Col className="flex-down fullwidth">
            <Form.Label className="set2">Select Your Server</Form.Label>
            <Form.Select className="form-layout mb-4" onChange={(e) => sendData(e.target.value)}>
                {servers.map((server) => <option key={server.name} value={server.name}>{server.name}</option>)}
            </Form.Select>
        </Col>
    );
}
