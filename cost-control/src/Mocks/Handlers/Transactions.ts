import { http, HttpResponse } from "msw";
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "../../API/Manager";
import { getTxByBillId, transactions } from "../Models/Transaction";

interface ITransactionsHandler {
    params: {
        billId: string;
    };
};

const transactionUrl = OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.TRANSACTIONS;
const transactionIdUrl =
    transactionUrl + "/:" + OUR_API_ENDPOINTS.BILLID;

export const transactionsHandlers = [
    http.get(transactionUrl, () => {
        return HttpResponse.json(transactions);
    }),

    http.get(transactionIdUrl, async ({ params }: ITransactionsHandler) => {
        const { billId } = params;
        const transactions = getTxByBillId(billId);
        return HttpResponse.json(transactions);
    }),
];
