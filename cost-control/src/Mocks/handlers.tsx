import { http, HttpResponse } from "msw";
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "../API/API";
import { createTransactions, transactions } from "./helper";
import { Transaction } from "../Components/Transactions/type";

export const handlers = [
    http.get(OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.TRANSACTIONS, () => {
        return HttpResponse.json(transactions);
    }),

    http.post(
        OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.TRANSACTIONS,
        async ({ request }) => {
            const data = (await request.json()) as Transaction;
            createTransactions(data);
            return HttpResponse.json({ success: true }, { status: 200 });
        }
    ),
];
