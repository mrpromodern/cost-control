import axios from 'axios';

export function getJson(url: string) {
    return axios.get(url);
}

export function postJson(url: string, data: any) {
    return axios.post(url, data);
}

export function putJson(url: string, data: any) {
    return axios.put(url, data);
}