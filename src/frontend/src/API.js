
import axios from 'axios';

const URL = "http://localhost:3000";

const client = axios.create({
    baseURL: URL,
    responseType: "json",
});

const standardGETGenerator = (endpoint) => {
    return async function () {
        try {
            const response = await client.get(endpoint)
            return response.data
        } catch (e) {
            console.log(e)
            return null
        }
    }
}

const fetch = async (filter, expense) => {
    try {
        const response = await client.post('/fetch', {filter: filter, expense: expense})
        return response.data
    } catch (e) {
        console.log(e)
        return null
    }
}

const caucusAverage = standardGETGenerator('/avg-group');
const caucusTotal = standardGETGenerator('/sum-group');
const topSpenders = standardGETGenerator('/top-spenders');
const transactions = standardGETGenerator('/fetch-transactions');
const totalSum = standardGETGenerator('/sum-total');


export default {service: {fetch, caucusAverage, caucusTotal, topSpenders, transactions, totalSum}}