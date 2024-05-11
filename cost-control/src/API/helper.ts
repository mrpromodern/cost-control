import axios from 'axios';

export function getJson(url: string) {
    return axios.get(url);
}