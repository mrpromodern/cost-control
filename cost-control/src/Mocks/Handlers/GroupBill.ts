import { http, HttpResponse } from "msw";
import { OUR_API_ADDRESS, OUR_API_ENDPOINTS } from "../../API/Manager";
import {
    groupBills,
    getGroupBill,
    createGroupBill,
    updateGroupBill,
    deleteGroupBill,
} from "../Models/GroupBill";
import { IGroupBill } from "../../type";

type GroupBillParams = {
    groupBillId: string;
};

const groupBillUrl = OUR_API_ADDRESS + "/" + OUR_API_ENDPOINTS.GROUPBILLS;
const groupBillIdUrl = groupBillUrl + "/:" + OUR_API_ENDPOINTS.GROUPBILLID;

export const groupBillHandlers = [

    http.get(groupBillUrl, () => {
        return HttpResponse.json(groupBills);
    }),

    http.get<GroupBillParams>(groupBillIdUrl, async ({ params }) => {
        const { groupBillId } = params;
        const groupBill = getGroupBill(groupBillId);
        return HttpResponse.json(groupBill);
    }),

    http.post(groupBillUrl, async ({ request }) => {
        const data = (await request.json()) as IGroupBill;
        createGroupBill(data);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.put<GroupBillParams>(groupBillIdUrl, async ({ params, request }) => {
        const { groupBillId } = params;
        const groupBill = (await request.json()) as IGroupBill;
        updateGroupBill(groupBillId, groupBill);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),

    http.delete<GroupBillParams>(groupBillIdUrl, async ({ params }) => {
        const { groupBillId } = params;
        deleteGroupBill(groupBillId);
        return HttpResponse.json({ success: true }, { status: 200 });
    }),
];
