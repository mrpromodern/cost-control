import { Transaction } from "../Components/Transactions/type";
import { getJson, postJson, putJson } from "./helper";

export const OUR_API_ADDRESS = 'http://127.0.0.1:3000/api/v1';

export enum OUR_API_ENDPOINTS {
    TRANSACTIONS = 'transactions'
}

export function getTransactions() {
    return getJson(OUR_API_ADDRESS + '/' + OUR_API_ENDPOINTS.TRANSACTIONS);
}

export function createTransactions(transaction: Transaction) {
    return postJson(OUR_API_ADDRESS + '/' + OUR_API_ENDPOINTS.TRANSACTIONS, transaction);
}

export function updateTransactions(transactionId: string, transaction: Transaction) {
    return putJson(OUR_API_ADDRESS + '/' + OUR_API_ENDPOINTS.TRANSACTIONS + '/' + transactionId, transaction);
}