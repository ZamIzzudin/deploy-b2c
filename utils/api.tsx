/* eslint-disable no-unused-vars */
import axios from 'axios';

const api = (() => {
    const BASE_URL = process.env.API;

    // function setConfig(token) {
    //     return {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     };
    // }

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

    async function userGetOrder() {
        const url = `${BASE_URL}/profile/detail`;

        const orders = await axios.get(url);

        return orders.data;
    }

    async function boosterGetBoost() {
        const url = `${BASE_URL}/booster/detail`;

        const orders = await axios.get(url);

        return orders.data.data;
    }

    async function adminGetBoost() {
        const url = `${BASE_URL}/admin/boosts`;

        const orders = await axios.get(url);

        return orders.data.data;
    }

    async function adminGetAccount() {
        const url = `${BASE_URL}/admin/account-orders`;

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
            await checkoutBoostOrder(res.data.data.id, form);
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
        const url = `${BASE_URL}/boosts`;

        await axios.get(url)
            .then((res) => res.data.data)
            .catch((err) => console.log(err));
    }

    async function boosterTakeOrder(id) {
        const url = `${BASE_URL}/boosts/${id}?status=on-progress`;

        await axios.put(url, {})
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
        getAllAccountsMarket,
        getAllAccountsMarketByFilter,
        showAccountsWithPagination,
        getAllRanks,
        getAllServers,
        getServicesPerGame,
        calculatePrice,
        boosterGetBoost,
        adminGetBoost,
        adminGetAccount,
        adminChangeStatusAccountOrder,
        makeBoostOrder,
        checkoutAccountOrder,
        userGetOrder,
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
