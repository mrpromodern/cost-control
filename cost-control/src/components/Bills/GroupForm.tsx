import { useCallback, useState } from "react";
import CommentForm from "../Form/Comment";
import Divider from "@mui/material/Divider";
import ButtonForm from "../Form/Button";
import { IGroupBill } from "../../type";
import { user } from "../../store/user";
import { groupBillStore } from "../../store/groupBill";
import { observer } from "mobx-react-lite";

interface IProps {
    handleOpenForm: () => void;
}

const GroupBillForm: React.FC<IProps> = observer(({ handleOpenForm }) => {
    const { createGroupBill } = groupBillStore;
    const [name, setName] = useState<string>("");

    const handleNameChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
        },
        []
    );

    const handleSubmit = useCallback(
        (event: React.MouseEvent) => {
            event.preventDefault();

            const newGroupBill: IGroupBill = {
                id: "",
                userId: user.userId,
                name: name,
                bills: [],
            };

            createGroupBill(newGroupBill);
            handleOpenForm();
        },
        [createGroupBill, handleOpenForm, name]
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

            <ButtonForm color="primary" onClick={handleSubmit}>
                Создать группу
            </ButtonForm>
        </>
    );
});

export default GroupBillForm;
