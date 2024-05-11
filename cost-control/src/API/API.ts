import { getJson } from "./helper";

export const OUR_API_ADDRESS = 'http://127.0.0.1:3000/api/v1';

export enum OUR_API_ENDPOINTS {
    TRANSACTIONS = 'transactions'
}

export function getTransactions() {
    return getJson(OUR_API_ADDRESS + '/' + OUR_API_ENDPOINTS.TRANSACTIONS)
}