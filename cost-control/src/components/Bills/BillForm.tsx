import { useCallback, useState } from "react";
import CommentForm from "../Form/Comment";
import SumForm from "../Form/Sum";
import Divider from "@mui/material/Divider";
import ButtonForm from "../Form/Button";
import { IBill, IGroupBill } from "../../type";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";

interface IProps {
    bill: IBill;
    groupBills: IGroupBill[];
    handleAddBill: Function;
    handleUpdateBill: Function;
    handleOpenForm: Function;
}

const BillForm = (props: IProps) => {
    const {
        bill,
        groupBills,
        handleAddBill,
        handleUpdateBill,
        handleOpenForm,
    } = props;

    const id = bill.id;

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
            const value = parseFloat(event.target.value);
            setBalance(value);
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
            const newBill: IBill = {
                id: id,
                groupBillId: groupBillId,
                name: name,
                balance: balance,
            };

            if (id === "") {
                handleAddBill(newBill);
            } else {
                handleUpdateBill(id, newBill);
            }

            handleOpenForm();
        },
        [
            id,
            balance,
            handleAddBill,
            handleUpdateBill,
            handleOpenForm,
            name,
            groupBillId,
        ]
    );

    return (
        <>
            <Divider component="li" />

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

            <FormControl sx={{ paddingTop: 2 }}>
                <FormLabel>Группы счетов</FormLabel>
                <RadioGroup value={groupBillId} onChange={handleSelectGroup}>
                    {groupBills.map((groupBill) => (
                        <FormControlLabel
                            key={groupBill.id}
                            label={groupBill.name}
                            value={groupBill.id}
                            control={<Radio />}
                        />
                    ))}
                </RadioGroup>
            </FormControl>

            <Divider component="li" />

            <ButtonForm color="primary" onClick={handleSubmit}>
                Сохранить счет
            </ButtonForm>
        </>
    );
};

export default BillForm;
