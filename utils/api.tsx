/* eslint-disable no-unused-vars */
import axios from 'axios';

const api = (() => {
    const BASE_URL = process.env.API;

    async function Login(data) {
        const url = `${BASE_URL}/v1/auth/login`;

        const response = await axios.post(url, data);

        return response.data;
    }

    async function GoogleLogin(data) {
        const url = `${BASE_URL}/v1/auth`;

        const response = await axios.post(url, data);

        return response.data;
    }

    async function Register(data) {
        const url = `${BASE_URL}/v1/auth/register`;

        const response = await axios.post(url, data);

        return response.data;
    }

    async function getAllGames() {
        const url = `${BASE_URL}/games`;

        const games = await axios.get(url);

        return games;
    }

    async function getAdminAllAccountsMarket(page, sort, rankID, serverID) {
        let url = `${BASE_URL}/admin/accounts?page=${page}?sortOrder=${sort}`;
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

    async function getAllAccountsMarketByFilter(page, sort, rankID, serverID) {
        let url = `${BASE_URL}/accounts?page=${page}?sortOrder=${sort}`;
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

    async function userGetAccountOrder(page) {
        const url = `${BASE_URL}/profile/detail?page${page}`;

        const orders = await axios.get(url);

        return orders.data;
    }

    async function userGetBoostOrder(page) {
        const url = `${BASE_URL}/profile/detail/boost?page${page}`;

        const orders = await axios.get(url);

        return orders.data;
    }

    async function boosterGetBoost(page) {
        const url = `${BASE_URL}/booster/detail?page${page}`;

        const orders = await axios.get(url);

        return orders.data.data;
    }

    async function adminGetBoost(page) {
        const url = `${BASE_URL}/admin/boosts?page${page}`;

        const orders = await axios.get(url);

        return orders.data.data;
    }

    async function adminGetAccount(page) {
        const url = `${BASE_URL}/admin/account-orders?page${page}`;

        const orders = await axios.get(url);

        return orders.data.data;
    }

    async function adminChangeStatusAccountOrder(id) {
        const url = `${BASE_URL}/admin/account-orders/${id}?status=finished`;

        const response = await axios.put(url, {});

        return response;
    }

    async function checkoutBoostOrder(orderId, form) {
        const url = `${process.env.API}/boost/checkout/${orderId}`;
        await axios.post(url, form).then((res) => res);
    }

    async function makeBoostOrder(form, serviceRequire, serviceName) {
        const url = `${process.env.API}/boosts/${serviceName}`;

        await axios.post(url, serviceRequire).then(async (res) => {
            await checkoutBoostOrder(res.data.data.boost_id, form);
        });
    }

    async function checkoutAccountOrder(form, accountId) {
        const url = `${process.env.API}/account/checkout/${accountId}`;

        await axios.post(url, form).then((res) => res);
    }

    async function userMakeReview(data) {
        const url = `${BASE_URL}/reviews`;

        await axios.post(url, data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    async function boosterSeeAvailableOrder() {
        const url = `${BASE_URL}/booster/boost/available`;

        const response = await axios.get(url);

        return response.data.data;
    }

    async function boosterTakeOrder(id) {
        const url = `${BASE_URL}/booster/boost/${id}?status=on-progress`;

        await axios.post(url, {})
            .then((res) => res.data.data)
            .catch((err) => console.log(err));
    }

    async function makeAccount(data) {
        const url = `${BASE_URL}/accounts`;

        await axios.post(url, data).then((res) => res).catch((err) => console.log(err));
    }

    async function editAccount(data, id) {
        const url = `${BASE_URL}/accounts/${id}`;

        await axios.post(url, data).then((res) => res).catch((err) => console.log(err));
    }

    async function deleteAccount(id) {
        const url = `${BASE_URL}/accounts/${id}`;

        await axios.delete(url).then((res) => res).catch((err) => console.log(err));
    }

    async function getFAQ() {
        const url = `${BASE_URL}/faqs`;

        const response = await axios.get(url);

        return response.data.data;
    }

    async function makeFAQ(data) {
        const url = `${BASE_URL}/faqs`;

        await axios.post(url, data).then((res) => res.data).catch((err) => console.log(err));
    }

    async function editFAQ(data, id) {
        const url = `${BASE_URL}/faqs/${id}`;

        await axios.put(url, data).then((res) => res.data).catch((err) => console.log(err));
    }

    async function deleteFAQ(id) {
        const url = `${BASE_URL}/faqs/${id}`;

        await axios.delete(url).then((res) => res).catch((err) => console.log(err));
    }

    return {
        Login,
        GoogleLogin,
        Register,
        getAllGames,
        getAdminAllAccountsMarket,
        getAllAccountsMarketByFilter,
        getAllRanks,
        getAllServers,
        getServicesPerGame,
        calculatePrice,
        userGetAccountOrder,
        userGetBoostOrder,
        boosterGetBoost,
        adminGetBoost,
        adminGetAccount,
        adminChangeStatusAccountOrder,
        makeBoostOrder,
        checkoutAccountOrder,
        userMakeReview,
        boosterSeeAvailableOrder,
        boosterTakeOrder,
        makeAccount,
        editAccount,
        deleteAccount,
        getFAQ,
        makeFAQ,
        editFAQ,
        deleteFAQ,
    };
})();

export default api;
