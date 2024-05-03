import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const categories = [
    "Без категории",
    "Продукты",
    "Рестораны и кафе",
    "Транспорт",
    "Жилье",
    "Коммунальные услуги",
    "Одежда и аксессуары",
    "Здоровье и красота",
    "Развлечения",
    "Путешествия",
    "Образование",
    "Подарки",
];

type FormCategoryProps = {
    category: string;
    handleCategorySelect: (event: SelectChangeEvent<string>) => void;
};

const FormCategory = (props: FormCategoryProps) => {
    return (
        <>
            <ListItem>
                <ListItemText>Категория</ListItemText>
                <FormControl>
                    <Select
                        value={props.category}
                        onChange={props.handleCategorySelect}
                    >
                        {categories.map((item, index) => (
                            <MenuItem key={index} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </ListItem>
            <Divider component="li" />
        </>
    );
};

export default FormCategory;
