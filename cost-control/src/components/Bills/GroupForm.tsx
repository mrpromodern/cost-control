import { useCallback, useState } from "react";
import CommentForm from "../Form/Comment";
import Divider from "@mui/material/Divider";
import ButtonForm from "../Form/Button";
import { IGroupBill } from "../../type";
import { user } from "../../store/user";

interface IProps {
    handleAddGroup: Function;
    handleOpenForm: Function;
}

const GroupBillForm = (props: IProps) => {
    const { handleAddGroup, handleOpenForm } = props;
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

            handleAddGroup(newGroupBill);

            handleOpenForm();
        },
        [handleAddGroup, handleOpenForm, name]
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
};

export default GroupBillForm;
