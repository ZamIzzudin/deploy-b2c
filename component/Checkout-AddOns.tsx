/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';

export default function OptionalAddons(props) {
    const { data, getAddOns } = props;

    const [checked, setChecked] = useState<any>(false);

    return (
        <div className="flex-row mb-2">
            <div className="space-between flex-down fullwidth">
                <span>{data.name}</span>
            </div>
            <div className="space-between flex-down">
                <input type="checkbox" className="checkbox" onChange={(e) => { getAddOns(data.name, !checked); setChecked(!checked); }} />
            </div>
        </div>
    );
}
