import { DefaultBodyType, http, HttpResponse, StrictRequest } from "msw";
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "../../API/Manager";
import {
    getGroupBill,
    createGroupBill,
    updateGroupBill,
    deleteGroupBill,
    getGroupBills,
} from "../Models/GroupBill";
import { IGroupBill } from "../../type";

interface IGroupBillHandler {
    params: {
        groupBillId: string;
    };
    request?: StrictRequest<DefaultBodyType> | undefined;
};


const groupBillUrl = OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.GROUPBILLS;
const groupBillIdUrl = groupBillUrl + "/:" + OUR_API_ENDPOINTS.GROUPBILLID;

export const groupBillHandlers = [

    http.get(groupBillUrl, () => {
        const groupBills = getGroupBills();
        return HttpResponse.json(groupBills);
    }),

    http.get(groupBillIdUrl, async ({ params }: IGroupBillHandler) => {
        const { groupBillId } = params;
        const groupBill = getGroupBill(groupBillId);
        return HttpResponse.json(groupBill);
    }),

    http.post(groupBillUrl, async ({ request }) => {
        const data = (await request.json()) as IGroupBill;
        createGroupBill(data);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.put(groupBillIdUrl, async ({ params, request }: IGroupBillHandler) => {
        if (request) {
            const { groupBillId } = params;
            const groupBill = (await request.json()) as IGroupBill;
            updateGroupBill(groupBillId, groupBill);
            return HttpResponse.json({ success: true }, { status: 200 });
        }
        return HttpResponse.error();
    }),

    http.delete(groupBillIdUrl, async ({ params }: IGroupBillHandler) => {
        const { groupBillId } = params;
        deleteGroupBill(groupBillId);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
