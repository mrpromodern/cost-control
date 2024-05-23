import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { evaluate } from "mathjs";

const buttons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    ".",
    "0",
    "⌫",
    "+",
    "×",
    "÷",
    "-",
    "=",
];

interface IProps {
    amount: string;
    setAmount: Function;
}

const CustomKeypad = (props: IProps) => {
    const { amount, setAmount } = props;

    const [lastEvaluatedValue, setLastEvaluatedValue] = useState<string>("");

    const handleKeypadClick = (value: string) => {
        if (value === "×") value = "*";
        if (value === "÷") value = "/";
        setAmount(amount + value);
    };

    const handleBackspace = () => {
        const newAmount = amount.slice(0, -1);
        setAmount(newAmount);
    };

    const handleEvaluate = () => {
        if (amount === lastEvaluatedValue) {
            return;
        }
        try {
            const result = evaluate(amount);
            const formattedResult =
                Math.round((result + Number.EPSILON) * 1000) / 1000;
            setAmount(formattedResult.toString());
            setLastEvaluatedValue(amount);
        } catch (error) {
            setAmount("Error");
        }
    };

    return (
        <Box sx={{ textAlign: "center", paddingBottom: 1 }}>
            <Grid container spacing={1}>
                {buttons.map((value) => (
                    <Grid item xs={4} key={value}>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                if (value === "⌫") {
                                    handleBackspace();
                                } else if (value === "=") {
                                    handleEvaluate();
                                } else {
                                    handleKeypadClick(value);
                                }
                            }}
                        >
                            <Typography variant="h6">{value}</Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CustomKeypad;
