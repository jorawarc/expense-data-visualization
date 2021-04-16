
import axios from 'axios';

const URL = "http://localhost:3000";

const client = axios.create({
    baseURL: URL,
    responseType: "json",
});

const fetch = async (filter, expense) => {
    try {
        const response = await client.post('/fetch', {filter: filter, expense: expense})
        return response.data
    } catch (e) {
        console.log(e)
        return null
    }
}

const caucusAverage = async () => {
    try {
        const response = await client.get('/avg-group')
        return response.data
    } catch (e) {
        console.log(e)
        return null
    }
}

const caucusTotal = async () => {
    try {
        const response = await client.get('/sum-group')
        return response.data
    } catch (e) {
        console.log(e)
        return null
    }
}

const topSpenders = async () => {
    try {
        const response = await client.get('/top-spenders')
        return response.data
    } catch (e) {
        console.log(e)
        return null
    }
}

const transactions = async () => {
    try {
        const response = await client.get('/fetch-transactions')
        console.log(response)
        return response.data
    } catch (e) {
        console.log(e)
        return null
    }
}

export default {service: {fetch, caucusAverage, caucusTotal, topSpenders, transactions}}