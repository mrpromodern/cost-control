import { DefaultBodyType, http, HttpResponse, StrictRequest } from "msw";
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "../../API/Manager";
import {
    updateBill,
    getBill,
    createBill,
    deleteBill,
    bills,
} from "../Models/Bill";
import { IBill } from "../../type";

interface IBillHandler {
    params: {
        billId: string;
    };
    request?: StrictRequest<DefaultBodyType> | undefined;
};

const billUrl = OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.BILLS;
const billIdUrl = billUrl + "/:" + OUR_API_ENDPOINTS.BILLID;

export const billHandlers = [

    http.get(billUrl, () => {
        return HttpResponse.json(bills);
    }),

    http.get(billIdUrl, async ({ params }: IBillHandler) => {
        const { billId } = params;
        const bill = getBill(billId);
        return HttpResponse.json(bill);
    }),

    http.post(billUrl, async ({ request }) => {
        const data = (await request.json()) as IBill;
        createBill(data);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.put(billIdUrl, async ({ params, request }: IBillHandler) => {
        if (request) {
            const { billId } = params;
            const bill = (await request.json()) as IBill;
            updateBill(billId, bill);
            return HttpResponse.json({ success: true }, { status: 200 });
        }
        return HttpResponse.error();
    }),

    http.delete(billIdUrl, async ({ params }: IBillHandler) => {
        const { billId } = params;
        deleteBill(billId);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
