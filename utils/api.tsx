import axios from 'axios';

const api = (() => {
    const BASE_URL = process.env.API;

    function setConfig(token) {
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };
    }

    async function getAllGames() {
        const url = `${BASE_URL}/games`;

        const games = await axios.get(url);

        return games;
    }

    async function getAllAccountsMarket() {
        const url = `${BASE_URL}/accounts`;

        const accounts = await axios.get(url);

        return accounts;
    }

    async function getAllAccountsMarketByFilter(sort, rankID, serverID) {
        let url = `${BASE_URL}/accounts/?sortOrder=${sort}`;
        let accounts = {};

        if (rankID === 'All' || serverID === 'All') {
            accounts = await axios.get(url);
        }
        if (rankID !== 'All') {
            url += `&rank=${rankID}`;
            accounts = await axios.get(url);
        }
        if (serverID !== 'All') {
            url += `&server_region=${serverID}`;
            accounts = await axios.get(url);
        }
        return accounts;
    }

    async function showAccountsWithPagination(page) {
        const url = `${BASE_URL}/accounts/?page=${page}`;

        const accounts = await axios.get(url);

        return accounts;
    }

    async function getAllRanks() {
        const url = `${BASE_URL}/ranks`;

        const ranks = await axios.get(url);

        return ranks;
    }

    async function getAllServers() {
        const url = `${BASE_URL}/servers`;

        const ranks = await axios.get(url);

        return ranks;
    }

    async function getServicesPerGame(slueGameName) {
        const url = `${BASE_URL}/boosting/${slueGameName}`;

        const services = await axios.get(url);

        return services;
    }

    async function calculatePrice(game, service, orderDetail = {}) {
        const url = `${BASE_URL}/service/price/calculate?game=${game}&service=${service}`;

        const price = await axios.post(url, orderDetail);

        return price;
    }

    async function userGetBoost(token) {
        const url = `${BASE_URL}/boost/boost-order`;

        const config = setConfig(token);
        const orders = await axios.get(url, config);

        return orders.data.data;
    }

    async function userGetAccount(token) {
        const url = `${BASE_URL}/account/account-order`;

        const config = setConfig(token);
        const orders = await axios.get(url, config);

        return orders.data.data;
    }

    async function boosterGetBoost(token) {
        const url = `${BASE_URL}/booster/detail`;

        const config = setConfig(token);
        const orders = await axios.get(url, config);

        return orders.data.data;
    }

    async function adminGetBoost(token) {
        const url = `${BASE_URL}/admin/boosts`;

        const config = setConfig(token);
        const orders = await axios.get(url, config);

        return orders.data.data;
    }

    async function adminGetAccount(token) {
        const url = `${BASE_URL}/`;

        const config = setConfig(token);
        const orders = await axios.get(url, config);

        return orders.data.data;
    }

    async function checkoutBoostOrder(config, orderId, form) {
        const url = `${process.env.API}/boost/checkout/${orderId}`;
        await axios.post(url, form, config).then((res) => {
            global.location.href = '/dashboard';
            return res;
        });
    }

    async function makeBoostOrder(config, form, serviceRequire, serviceName) {
        const url = `${process.env.API}/boosts/${serviceName}`;

        await axios.post(url, serviceRequire, config).then(async (res) => {
            console.log(res.data.data);
            await checkoutBoostOrder(config, res.data.data.id, form);
        });
    }

    async function checkoutAccountOrder(config, form, accountId) {
        const url = `${process.env.API}/account/checkout/${accountId}`;

        await axios.post(url, form, config).then((res) => {
            global.location.href = '/dashboard';
            return res;
        });
    }

    return {
        getAllGames,
        getAllAccountsMarket,
        getAllAccountsMarketByFilter,
        showAccountsWithPagination,
        getAllRanks,
        getAllServers,
        getServicesPerGame,
        calculatePrice,
        userGetBoost,
        userGetAccount,
        boosterGetBoost,
        adminGetBoost,
        adminGetAccount,
        makeBoostOrder,
        checkoutAccountOrder,
    };
})();

export default api;
