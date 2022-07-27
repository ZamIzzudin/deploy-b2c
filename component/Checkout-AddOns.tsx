/* eslint-disable react/prop-types */
export function DefaultAddOns() {
    return (
        <div className="flex-row">
            <div className="space-between flex-down fullwidth">
                <span>Priority Booster</span>
                <span>Priority Order</span>
                <span>Stream Games</span>
            </div>
            <div className="space-between flex-down gap-3">
                <input type="checkbox" className="checkbox" />
                <input type="checkbox" className="checkbox" />
                <input type="checkbox" className="checkbox" />
            </div>
        </div>
    );
}

export function OptionalAddons(props) {
    const { name } = props;
    return (
        <div className="flex-row">
            <div className="space-between flex-down fullwidth">
                {name.map((e) => (
                    <span>{e}</span>
                ))}
            </div>
            <div className="space-between flex-down gap-3">
                {name.map(() => (
                    <input type="checkbox" className="checkbox-prim" />
                ))}
            </div>
        </div>
    );
}
