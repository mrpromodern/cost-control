import { http, HttpResponse } from "msw";
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "../../API/Manager";
import {
    updateBill,
    getBill,
    createBill,
    deleteBill,
    bills,
} from "../Models/Bill";
import { IBill } from "../../type";

type BillParams = {
    billId: string;
};

const billUrl = OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.BILLS;
const billIdUrl = billUrl + "/:" + OUR_API_ENDPOINTS.BILLID;

export const billHandlers = [
    
    http.get(billUrl, () => {
        return HttpResponse.json(bills);
    }),

    http.get<BillParams>(billIdUrl, async ({ params }) => {
        const { billId } = params;
        const bill = getBill(billId);
        return HttpResponse.json(bill);
    }),

    http.post(billUrl, async ({ request }) => {
        const data = (await request.json()) as IBill;
        createBill(data);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.put<BillParams>(billIdUrl, async ({ params, request }) => {
        const { billId } = params;
        const bill = (await request.json()) as IBill;
        updateBill(billId, bill);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.delete<BillParams>(billIdUrl, async ({ params }) => {
        const { billId } = params;
        deleteBill(billId);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
