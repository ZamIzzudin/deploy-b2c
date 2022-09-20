/* eslint-disable react/prop-types */
export default function OptionalAddons(props) {
    const { data } = props;
    return (
        <div className="flex-row">
            <div className="space-between flex-down fullwidth">
                {data.map((e) => (
                    <span key={e.id}>{e.name}</span>
                ))}
            </div>
            <div className="space-between flex-down gap-3">
                {data.map((e) => (
                    <input key={e.id} type="checkbox" className="checkbox" />
                ))}
            </div>
        </div>
    );
}
