import styles from './styles/FormBoost.module.css';

function FormBoost(props: any) {
    const { type } = props;

    return (
        <div className={styles['form-container']}>
            {type.length > 0 && (
                <h1>
                    type :
                    {' '}
                    {type}
                </h1>
            )}
        </div>
    );
}

export default FormBoost;
