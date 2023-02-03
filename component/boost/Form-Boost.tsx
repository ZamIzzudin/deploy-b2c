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
import { useAppSelector } from '../../hooks';

import {
    IncludeRank, NumberGame, Points, ListForm, ServerSelect, ApexIncludeRank, NestedListForm, NewApexIncludeRank,
} from './Form-Boost-Type';

import styles from '../styles/FormBoost.module.css';

function FormBoost(props: any) {
    const {
        form, titleService,
    } = props;

    const { servers } = useAppSelector((states) => states);

    const [typeForm, setTypeForm] = useState<any>(form);

    useEffect(() => {
        setTypeForm(form);
    }, [form]);

    return (
        <div className={styles['form-container']}>
            {titleService === 'Apex Rank Boost' && (
                <NewApexIncludeRank serviceName={titleService} />
            )}
            {/* Solo Form */}
            {typeForm?.map((f) => {
                // if (f.type === 'apexIncludeRank') {
                //     return (<ApexIncludeRank key={f.title} title={f.title} serviceName={titleService} />);
                // }
                if (f.type === 'includeRank') {
                    return (<IncludeRank key={f.title} title={f.title} serviceName={titleService} />);
                } if (f.type === 'gameNumber') {
                    return (<NumberGame key={f.title} max={f.maxGameOrder} min={f.minGameOrder} title={f.title} serviceName={titleService} />);
                } if (f.type === 'points') {
                    return (<Points key={f.title} start={f.start} to={f.to} title={f.title} unit={f.unit} serviceName={titleService} />);
                }
            })}

            {/* Grouping Dropdown Form */}
            <div className={styles.container}>
                {servers.length > 0 && (
                    <ServerSelect servers={servers} serviceName={titleService} />
                )}
                {typeForm?.map((f) => {
                    if (f.type === 'ListForm') {
                        return (<ListForm key={f.title} title={f.title} unit={f.unit} items={f.items} serviceName={titleService} />);
                    }
                    if (f.type === 'NestedListForm') {
                        return (<NestedListForm key={f.title} title={f.title} unit={f.unit} items={f.items} serviceName={titleService} />);
                    }
                })}
            </div>
        </div>
    );
}

export default FormBoost;
