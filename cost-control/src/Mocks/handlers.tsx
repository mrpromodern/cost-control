import { http, HttpResponse } from "msw";
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "../API/API";
import {
    transactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransaction,
    groupBills,
    getGroupBill,
    createGroupBill,
    updateBill,
    updateGroupBill,
    deleteGroupBill,
    getBill,
    createBill,
    deleteBill,
} from "./helper";
import { Bill, GroupBill, Transaction } from "../type";

type TransactionParams = {
    transactionId: string;
};

type GroupBillParams = {
    groupBillId: string;
};

type BillParams = {
    billId: string;
};

const transactionUrl = OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.TRANSACTIONS;
const transactionIdUrl =
    transactionUrl + "/:" + OUR_API_ENDPOINTS.TRANSACTIONID;

const groupBillUrl = OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.GROUPBILLS;
const groupBillIdUrl = groupBillUrl + "/:" + OUR_API_ENDPOINTS.GROUPBILLID;

const billUrl = OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.BILLS;
const billIdUrl = billUrl + "/:" + OUR_API_ENDPOINTS.BILLID;

export const handlers = [
    // ------------- Transaction -------------

    http.get(transactionUrl, () => {
        return HttpResponse.json(transactions);
    }),

    http.get<TransactionParams>(transactionIdUrl, async ({ params }) => {
        const { transactionId } = params;
        const transaction = getTransaction(transactionId);
        return HttpResponse.json(transaction);
    }),

    http.post(transactionUrl, async ({ request }) => {
        const data = (await request.json()) as Transaction;
        createTransaction(data);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.put<TransactionParams>(
        transactionIdUrl,
        async ({ params, request }) => {
            const { transactionId } = params;
            const transaction = (await request.json()) as Transaction;
            updateTransaction(transactionId, transaction);
            return HttpResponse.json({ success: true }, { status: 200 });
        }
    ),

    http.delete<TransactionParams>(transactionIdUrl, async ({ params }) => {
        const { transactionId } = params;
        deleteTransaction(transactionId);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.get(`${OUR_API_ADDRESS}/${OUR_API_ENDPOINTS.BILLS}`, () => {
        return HttpResponse.json(transactions);
    }),

    // ------------- Group Bill -------------

    http.get(groupBillUrl, () => {
        return HttpResponse.json(groupBills);
    }),

    http.get<GroupBillParams>(groupBillIdUrl, async ({ params }) => {
        const { groupBillId } = params;
        const groupBill = getGroupBill(groupBillId);
        return HttpResponse.json(groupBill);
    }),

    http.post(groupBillUrl, async ({ request }) => {
        const data = (await request.json()) as GroupBill;
        createGroupBill(data);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.put<GroupBillParams>(groupBillIdUrl, async ({ params, request }) => {
        const { groupBillId } = params;
        const groupBill = (await request.json()) as GroupBill;
        updateGroupBill(groupBillId, groupBill);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.delete<GroupBillParams>(groupBillIdUrl, async ({ params }) => {
        const { groupBillId } = params;
        deleteGroupBill(groupBillId);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    // ------------- Bill -------------

    http.get(billUrl, () => {
        return HttpResponse.json(groupBills);
    }),

    http.get<BillParams>(billIdUrl, async ({ params }) => {
        const { billId } = params;
        const bill = getBill(billId);
        return HttpResponse.json(bill);
    }),

    http.post(billUrl, async ({ request }) => {
        const data = (await request.json()) as Bill;
        createBill(data);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.put<BillParams>(billIdUrl, async ({ params, request }) => {
        const { billId } = params;
        const bill = (await request.json()) as Bill;
        updateBill(billId, bill);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.delete<BillParams>(billIdUrl, async ({ params }) => {
        const { billId } = params;
        deleteBill(billId);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
