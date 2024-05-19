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
    groupBills: IGroupBill[];
    handleAddBill: Function;
    handleOpenForm: Function;
}

const BillForm = (props: IProps) => {
    const { groupBills, handleAddBill, handleOpenForm } = props;

    const [groupBillId, setGroupBillId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [balance, setBalance] = useState<number>(0);

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
            setGroupBillId(event.target.value);
        },
        []
    );

    const handleSubmit = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();

            const newBill: IBill = {
                id: "",
                groupBillId: groupBillId,
                name: name,
                balance: balance,
            };

            handleAddBill(newBill);

            handleOpenForm();
        },
        [balance, handleAddBill, handleOpenForm, name, groupBillId]
    );

    return (
        <>
            <Divider component="li" />

            <CommentForm title="Название" handleChange={handleNameChange} />

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
