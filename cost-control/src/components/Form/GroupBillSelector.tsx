import React from "react";
import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { observer } from "mobx-react-lite";

interface GroupBill {
    id: string;
    name: string;
}

interface Props {
    groupBills: GroupBill[];
    groupBillId: string;
    handleSelectGroup: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GroupBillSelector: React.FC<Props> = ({
    groupBills,
    groupBillId,
    handleSelectGroup,
}) => {
    return (
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
    );
};

export default observer(GroupBillSelector);
