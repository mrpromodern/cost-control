import { IBill, IGroupBill, ITransaction } from "../type";
import { deleteJson, getJson, postJson, putJson } from "./helper";

export const OUR_API_ADDRESS = `${process.env.PUBLIC_URL}/api/v1`;

export enum OUR_API_ENDPOINTS {
    TRANSACTIONS = 'transactions',
    TRANSACTION = 'transaction',
    TRANSACTIONID = 'transactionId',
    GROUPBILLS = 'group-bill',
    GROUPBILLID = 'groupBillId',
    BILLS = 'bills',
    BILLID = 'billId',
}

const buildUrl = (endpoint: string, id?: string) => {
    return `${OUR_API_ADDRESS}/${endpoint}${id ? `/${id}` : ''}`;
}

// ------------- Transactions -------------

export function getTransactions() {
    return getJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTIONS));
}

// get transactions by bill_id
export function getTxByBillId(billId: string) {
    return getJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTIONS, billId));
}

// ------------- Transaction -------------


export function getTransaction(transactionId: string) {
    return getJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTION, transactionId));
}

export function createTransaction(transaction: ITransaction) {
    return postJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTION), transaction);
}

export function updateTransaction(transactionId: string, transaction: ITransaction) {
    return putJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTION, transactionId), transaction);
}

export function deleteTransaction(transactionId: string) {
    return deleteJson(buildUrl(OUR_API_ENDPOINTS.TRANSACTION, transactionId));
}

// ------------- Group Bill -------------

export function getGroupBills() {
    return getJson(buildUrl(OUR_API_ENDPOINTS.GROUPBILLS));
}

export function getGroupBill(groupBillId: string) {
    return getJson(buildUrl(OUR_API_ENDPOINTS.GROUPBILLS, groupBillId));
}

export function createGroupBill(groupBill: IGroupBill) {
    return postJson(buildUrl(OUR_API_ENDPOINTS.GROUPBILLS), groupBill);
}

export function updateGroupBill(groupBillId: string, groupBill: IGroupBill) {
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

export function createBill(bill: IBill) {
    return postJson(buildUrl(OUR_API_ENDPOINTS.BILLS), bill);
}

export function updateBill(billId: string, bill: IBill) {
    return putJson(buildUrl(OUR_API_ENDPOINTS.BILLS, billId), bill);
}

export function deleteBill(billId: string) {
    return deleteJson(buildUrl(OUR_API_ENDPOINTS.BILLS, billId));
}