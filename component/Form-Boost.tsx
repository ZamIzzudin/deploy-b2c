/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { IncludeRank, NumberGame } from './Form-Boost-Type';
import styles from './styles/FormBoost.module.css';

function FormBoost(props: any) {
    const { form } = props;
    return (
        <div className={styles['form-container']}>
            {form?.map((f) => {
                if (f.type === 'includeRank') {
                    return (<IncludeRank title={f.title} game={f.game} />);
                } if (f.type === 'numberGame') {
                    return (<NumberGame max={f.max} min={f.min} title={f.title} />);
                }
            })}
        </div>
    );
}

export default FormBoost;
