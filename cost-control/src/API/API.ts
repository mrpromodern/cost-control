import { Bill, GroupBill, Transaction } from "../type";
import { deleteJson, getJson, postJson, putJson } from "./helper";

export const OUR_API_ADDRESS = 'http://127.0.0.1:3000/api/v1';

export enum OUR_API_ENDPOINTS {
    TRANSACTIONS = 'transactions',
    TRANSACTIONID = 'transactionId',
    GROUPBILLS = 'group-bill',
    GROUPBILLID = 'groupBillId',
    BILLS = 'bills',
    BILLID = 'billId',
}

const buildUrl = (endpoint: string, id?: string) => {
    return `${OUR_API_ADDRESS}/${endpoint}${id ? `/${id}` : ''}`;
}

// ------------- Transaction -------------

export function getTransactions() {
    return getJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTIONS));
}

export function getTransaction(transactionId: string) {
    return getJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTIONS, transactionId));
}

export function createTransaction(transaction: Transaction) {
    return postJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTIONS), transaction);
}

export function updateTransaction(transactionId: string, transaction: Transaction) {
    return putJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTIONS, transactionId), transaction);
}

export function deleteTransaction(transactionId: string) {
    return deleteJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTIONS, transactionId));
}

// ------------- Group Bill -------------

export function getGroupBills() {
    return getJson(buildUrl(OUR_API_ENDPOINTS.GROUPBILLS));
}

export function getGroupBill(groupBillId: string) {
    return getJson(buildUrl(OUR_API_ENDPOINTS.GROUPBILLS, groupBillId));
}

export function createGroupBill(groupBill: GroupBill) {
    return postJson(buildUrl(OUR_API_ENDPOINTS.GROUPBILLS), groupBill);
}

export function updateGroupBill(groupBillId: string, groupBill: GroupBill) {
    return putJson(buildUrl(OUR_API_ENDPOINTS.GROUPBILLS, groupBillId), groupBill);
}

export function deleteGroupBill(groupBillId: string) {
    return deleteJson(buildUrl(OUR_API_ENDPOINTS.GROUPBILLS, groupBillId));
}

// ------------- Bill -------------

export function getBills() {
    return getJson(buildUrl(OUR_API_ENDPOINTS.BILLS));
}

export function getBill(billId: string) {
    return getJson(buildUrl(OUR_API_ENDPOINTS.BILLS, billId));
}

export function createBill(bill: Bill) {
    return postJson(buildUrl(OUR_API_ENDPOINTS.BILLS), bill);
}

export function updateBill(billId: string, bill: Bill) {
    return putJson(buildUrl(OUR_API_ENDPOINTS.BILLS, billId), bill);
}

export function deleteBill(billId: string) {
    return deleteJson(buildUrl(OUR_API_ENDPOINTS.BILLS, billId));
}