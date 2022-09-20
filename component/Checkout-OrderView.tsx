/* eslint-disable react/prop-types */
export function RankView(props) {
    const { data } = props;
    const title = Object.keys(data)[0];

    return (
        <h5>
            {title}
            {' '}
            :
            {' '}
            {data[title]}
        </h5>
    );
}
export function NumberGame() {
    return (
        <h1>Jumlah Game</h1>
    );
}
