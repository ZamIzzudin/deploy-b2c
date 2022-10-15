/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import {
    IncludeRank, NumberGame, Points, PlatformSelect, ServerSelect,
} from './Form-Boost-Type';
import styles from './styles/FormBoost.module.css';

function FormBoost(props: any) {
    const {
        form, getData, ranks, servers, titleService,
    } = props;

    const [typeForm, setTypeForm] = useState<any>(form);

    function setData(data, title) {
        data.title = title;
        getData(data);
    }

    function reRender(data) {
        setTypeForm(data);
    }

    useEffect(() => {
        reRender(form);
    }, [form]);

    return (
        <div className={styles['form-container']}>
            {typeForm?.map((f) => {
                if (f.type === 'includeRank') {
                    return (<IncludeRank key={f.title} title={f.title} getData={setData} ranks={ranks} serviceName={titleService} />);
                } if (f.type === 'gameNumber') {
                    return (<NumberGame key={f.title} max={f.max} min={f.min} title={f.title} getData={setData} serviceName={titleService} />);
                } if (f.type === 'points') {
                    return (<Points key={f.title} start={f.start} to={f.to} title={f.title} unit={f.unit} getData={setData} serviceName={titleService} />);
                } if (f.type === 'platformSelect') {
                    return (<PlatformSelect key={f.title} title={f.title} platforms={f.platforms} getData={setData} serviceName={titleService} />);
                }
            })}
            {servers.length > 0 && (
                <ServerSelect servers={servers} getData={setData} serviceName={titleService} />
            )}
        </div>
    );
}

export default FormBoost;
