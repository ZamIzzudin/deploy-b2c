/* eslint-disable react/no-danger */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

function Legal() {
    const router = useRouter();
    const { type } = router.query;

    const [legal, setLegal] = useState({ config_description: '', config_value: '' });

    async function getData(legalType) {
        const data: any = await api.getConfig(legalType);
        setLegal(data);
    }

    useEffect(() => {
        getData(type);
    }, [type]);

    return (
        <div className="container mt-5 pt-5">
            <div className="legal-aggreement mb-5">
                <h1 className="mb-4">
                    {legal?.config_description}
                </h1>
                <p dangerouslySetInnerHTML={{ __html: `${legal?.config_value}` }} />
            </div>
        </div>
    );
}

export default Legal;
