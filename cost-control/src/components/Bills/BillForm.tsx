import { useCallback, useState } from "react";
import CommentForm from "../Form/Comment";
import SumForm from "../Form/Sum";
import Divider from "@mui/material/Divider";
import ButtonForm from "../Form/Button";
import { IBill, IGroupBill } from "../../type";
import GroupBillSelector from "../Form/GroupBillSelector";
import { billStore } from "../../store/bill";

interface IProps {
    groupBills: IGroupBill[];
    handleOpenForm: () => void;
}

const BillForm: React.FC<IProps> = ({ groupBills, handleOpenForm }) => {
    const { bill, createBill, updateBill } = billStore;
    const [groupBillId, setGroupBillId] = useState<string>(bill.groupBillId);
    const [name, setName] = useState<string>(bill.name);
    const [balance, setBalance] = useState<number>(bill.balance);

    const handleNameChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
        },
        []
    );

    const handleBalanceChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setBalance(parseFloat(event.target.value));
        },
        []
    );

    const handleSelectGroup = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setGroupBillId(value);
        },
        []
    );

    const handleSubmit = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();
            const id = bill.id;

            const newBill: IBill = {
                id,
                groupBillId,
                name,
                balance,
            };

            if (id === "") {
                createBill(newBill);
            } else {
                updateBill(newBill);
            }

            handleOpenForm();
        },
        [
            bill.id,
            groupBillId,
            name,
            balance,
            handleOpenForm,
            createBill,
            updateBill,
        ]
    );

    return (
        <>
            <CommentForm
                title="Название"
                value={name}
                handleChange={handleNameChange}
            />

            <Divider component="li" />

            <SumForm
                title="Начальный баланс"
                amount={balance}
                handleChange={handleBalanceChange}
            />

            <Divider component="li" />

            <GroupBillSelector
                groupBills={groupBills}
                groupBillId={groupBillId}
                handleSelectGroup={handleSelectGroup}
            />

            <Divider component="li" />

            <ButtonForm color="secondary" onClick={handleSubmit}>
                Сохранить счет
            </ButtonForm>
        </>
    );
};

export default BillForm;
