import { useState } from "react";

const categories = [
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

const ExpenseForm = (props: any) => {
    const [category, setCategory] = useState<string>(categories[0]);
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<string>("");

    const handleCategorySelect = (event: any) => {
        setCategory(event.target.value);
    };

    const handleAmountChange = (event: any) => {
        setAmount(event.target.value);
    };

    const handleDataChange = (event: any) => {
        setDate(event.target.value);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        props.handleOpenForm();
        props.handleAddExpense({
            category,
            amount,
            date,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Категория:</label>
                <select
                    value={category}
                    onChange={handleCategorySelect}
                >
                    {categories.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Сумма:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                />
            </div>
            <div>
                <label>Дата:</label>
                <input type="date" value={date} onChange={handleDataChange} />
            </div>
            <button type="submit">Добавить</button>
        </form>
    );
};

export default ExpenseForm;
