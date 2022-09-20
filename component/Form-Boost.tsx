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
    IncludeRank, NumberGame, Points, PlatformSelect,
} from './Form-Boost-Type';
import styles from './styles/FormBoost.module.css';

function FormBoost(props: any) {
    const { form, getData } = props;

    const [dataForm, setDataForm] = useState<any>([]);
    const [typeItems, setTypeItems] = useState<any>([]);

    function setData(data, type) {
        if (typeItems.length > 0) {
            if (typeItems.includes(type)) {
                const newArr = dataForm.map((arr, i) => {
                    const oneType = Object.keys(arr)[0];
                    if (oneType === type) {
                        return { ...arr, [type]: data };
                    }
                    return arr;
                });

                setDataForm(newArr);
            } else {
                const item = {};
                item[type] = data;
                setDataForm([...dataForm, item]);
                setTypeItems([...typeItems, type]);
            }
        } else {
            const item = {};
            item[type] = data;
            setDataForm([item]);
            setTypeItems([...typeItems, type]);
        }
    }

    function sendData(data) {
        getData(data);
    }

    useEffect(() => {
        sendData(dataForm);
    }, [dataForm]);

    return (
        <div className={styles['form-container']}>
            {form?.map((f) => {
                if (f.type === 'includeRank') {
                    return (<IncludeRank title={f.title} game={f.game} getData={setData} />);
                } if (f.type === 'numberGame') {
                    return (<NumberGame max={f.max} min={f.min} title={f.title} getData={setData} />);
                } if (f.type === 'points') {
                    return (<Points start={f.start} to={f.to} title={f.title} type={f.type} unit={f.unit} getData={setData} />);
                } if (f.type === 'platformSelect') {
                    return (<PlatformSelect game={f.game} title={f.title} platforms={f.platform} getData={setData} />);
                }
            })}
        </div>
    );
}

export default FormBoost;
