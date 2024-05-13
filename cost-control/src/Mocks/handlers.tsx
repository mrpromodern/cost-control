import { http, HttpResponse } from "msw";
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "../API/API";
import {
    transactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
} from "./helper";
import { Transaction } from "../Components/Transactions/type";

type TransactionParams = {
    transactionId: string;
};

export const handlers = [
    http.get(OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.TRANSACTIONS, () => {
        return HttpResponse.json(transactions);
    }),

    http.post(
        OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.TRANSACTIONS,
        async ({ request }) => {
            const data = (await request.json()) as Transaction;
            createTransaction(data);
            return HttpResponse.json({ success: true }, { status: 200 });
        }
    ),

    http.put<TransactionParams>(
        OUR_API_ADDRESS +
            "/" +
            OUR_API_ENDPOINTS.TRANSACTIONS +
            "/:" +
            OUR_API_ENDPOINTS.TRANSACTIONID,
        async ({ params, request }) => {
            const { transactionId } = params;
            const transaction = (await request.json()) as Transaction;
            updateTransaction(transactionId, transaction);
            return HttpResponse.json({ success: true }, { status: 200 });
        }
    ),

    http.delete<TransactionParams>(
        OUR_API_ADDRESS +
            "/" +
            OUR_API_ENDPOINTS.TRANSACTIONS +
            "/:" +
            OUR_API_ENDPOINTS.TRANSACTIONID,
        async ({ params }) => {
            const { transactionId } = params;
            deleteTransaction(transactionId);
            return HttpResponse.json({ success: true }, { status: 200 });
        }
    ),
];
