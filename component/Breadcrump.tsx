/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-absolute-path */
import styles from './styles/Breadcrump.module.css';

function Breadcrump({ isActive, setActive }) {
    return (
        <div className={styles.breadcrump}>
            <button onClick={() => setActive('faq')} className={isActive === 'faq' ? (styles.active) : ('')} type="button">FAQ</button>
            <button onClick={() => setActive('review')} className={isActive === 'review' ? (styles.active) : ('')} type="button">Review</button>
            <button onClick={() => setActive('policy')} className={isActive === 'policy' ? (styles.active) : ('')} type="button">Policy</button>
            <button onClick={() => setActive('role')} className={isActive === 'role' ? (styles.active) : ('')} type="button">Roles</button>
        </div>
    );
}

export default Breadcrump;
