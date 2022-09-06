/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    IncludeRank, NumberGame, Points, PlatformSelect,
} from './Form-Boost-Type';
import styles from './styles/FormBoost.module.css';

function FormBoost(props: any) {
    const { form, getData } = props;

    const A = {};

    function sendData(data, type) {
        A[type] = data;
        getData(A);
    }

    return (
        <div className={styles['form-container']}>
            {form?.map((f) => {
                if (f.type === 'includeRank') {
                    return (<IncludeRank title={f.title} game={f.game} getData={sendData} />);
                } if (f.type === 'numberGame') {
                    return (<NumberGame max={f.max} min={f.min} title={f.title} getData={sendData} />);
                } if (f.type === 'points') {
                    return (<Points start={f.start} to={f.to} title={f.title} type={f.type} unit={f.unit} getData={sendData} />);
                } if (f.type === 'platformSelect') {
                    return (<PlatformSelect game={f.game} title={f.title} platforms={f.platform} getData={sendData} />);
                }
            })}
        </div>
    );
}

export default FormBoost;
