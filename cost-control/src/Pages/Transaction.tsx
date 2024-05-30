import { useCallback, useEffect, useState } from "react";
import TransactionForm from "../components/Transactions/Form/Form";
import { TransactionType } from "../type";
import {
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import TransactionItems from "../components/Transactions/Items";
import DialogForm from "../components/Form/Dialog";
import ButtonAdd from "../components/ButtonAdd";
import MenuAppBar from "../components/AppBar";
import PanelGeneral from "../components/Transactions/General/Panel";
import { observer } from "mobx-react-lite";
import PeriodGeneral from "../components/Transactions/Period";
import { tranStore } from "../store/transaction";
import { groupBillStore } from "../store/groupBill";

const TransactionPage = () => {
    const { fetchGroupBills } = groupBillStore;

    const { transaction, setType, resetTransaction, updateGeneral } = tranStore;

    const tranType: TransactionType = transaction.type;

    const [startDate, setMinDate] = useState(dayjs().startOf("month"));
    const [endDate, setMaxDate] = useState(dayjs().endOf("month"));
    const [dateFormOpen, setDateFormOpen] = useState<boolean>(false);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    // ------------- General -------------

    const handleUpdateGeneral = useCallback(() => {
        updateGeneral();
        fetchGroupBills();
    }, [updateGeneral, fetchGroupBills]);

    // ------------- Date -------------

    const handleOpenDateForm = useCallback(() => {
        setDateFormOpen((prevState: boolean) => !prevState);
    }, []);

    const handleChangePeriod = useCallback((minDate: Dayjs, maxDate: Dayjs) => {
        setMinDate(minDate);
        setMaxDate(maxDate);
    }, []);

    // ------------- Transaction -------------

    const handleClickTranType = useCallback(
        (event: React.MouseEvent<HTMLElement>, tranType: TransactionType) => {
            setType(tranType);
            console.log(transaction);
        },
        [setType, transaction]
    );

    const handleOpenForm = useCallback(() => {
        setIsFormOpen((prevState: boolean) => {
            if (prevState) {
                resetTransaction();
            }

            return !prevState;
        });
    }, [resetTransaction]);

    useEffect(() => {
        handleUpdateGeneral();
    }, [handleUpdateGeneral]);

    const DialogButtons = () => {
        return (
            <ToggleButtonGroup
                exclusive
                value={tranType}
                onChange={handleClickTranType}
            >
                <ToggleButton value={TransactionType.Income}>
                    Доход
                </ToggleButton>
                <ToggleButton value={TransactionType.Expense}>
                    Расход
                </ToggleButton>
            </ToggleButtonGroup>
        );
    };

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <MenuAppBar>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <ButtonAdd handleClick={handleOpenForm} />
                    <Button color="info" onClick={handleOpenDateForm}>
                        <Typography variant="h6">
                            {startDate.format("DD.MM.YYYY")} -{" "}
                            {endDate.format("DD.MM.YYYY")}
                        </Typography>
                    </Button>
                </Box>
            </MenuAppBar>
            <PanelGeneral />
            <TransactionItems
                startDate={startDate}
                endDate={endDate}
                handleOpenForm={handleOpenForm}
            />
            <DialogForm
                title={<DialogButtons />}
                isFormOpen={isFormOpen}
                handleOpenForm={handleOpenForm}
            >
                <TransactionForm handleOpenForm={handleOpenForm} />
            </DialogForm>
            <DialogForm
                title="Период"
                isFormOpen={dateFormOpen}
                handleOpenForm={handleOpenDateForm}
            >
                <PeriodGeneral
                    minDate={startDate}
                    maxDate={endDate}
                    handleChangePeriod={handleChangePeriod}
                    handleOpenDateForm={handleOpenDateForm}
                />
            </DialogForm>
        </Box>
    );
};

export default observer(TransactionPage);
