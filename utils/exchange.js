import axios from 'axios';

const exchange = (() => {
    async function USD2ETH(data) {
        const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD';

        const response = await axios.get(url);

        const price = data / response.data.USD;

        return price.toString().slice(0, 10);
    }

    return {
        USD2ETH,
    };
})();

export default exchange;
