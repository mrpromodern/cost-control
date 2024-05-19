import { http, HttpResponse } from "msw";
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "../../API/Manager";
import {
    transactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getTransaction,
} from "../Models/Transaction";
import { ITransaction } from "../../type";

type TransactionParams = {
    transactionId: string;
};

const transactionUrl = OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.TRANSACTIONS;
const transactionIdUrl =
    transactionUrl + "/:" + OUR_API_ENDPOINTS.TRANSACTIONID;

export const transactionHandlers = [
    http.get(transactionUrl, () => {
        return HttpResponse.json(transactions);
    }),

    http.get<TransactionParams>(transactionIdUrl, async ({ params }) => {
        const { transactionId } = params;
        const transaction = getTransaction(transactionId);
        return HttpResponse.json(transaction);
    }),

    http.post(transactionUrl, async ({ request }) => {
        const data = (await request.json()) as ITransaction;
        createTransaction(data);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.put<TransactionParams>(
        transactionIdUrl,
        async ({ params, request }) => {
            const { transactionId } = params;
            const transaction = (await request.json()) as ITransaction;
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
];
