import { Component } from 'react'
import { ExpenseForm } from '../Expenses/ExpenseForm'

export class ExpensesPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFormOpen: false,
            expenses: [],
        }
    }

    formOpen = () => {
        this.setState((prevState) => ({
            isFormOpen: !prevState.isFormOpen
        }));
    }

    handleAddExpense = (expense) => {
        this.setState((prevState) => ({
            expenses: [...prevState.expenses, expense],
        }));
    }

    render() {
        return (
            <div>
                <button onClick={this.formOpen}>Добавить расход</button>
                {this.state.isFormOpen &&
                    <ExpenseForm
                        formOpen={this.formOpen}
                        handleAddExpense={this.handleAddExpense}
                    />}
                <ul>
                    {this.state.expenses.map((expense, index) => (
                        <li key={index}>Категория: {expense.category} | Сумма: {expense.amount} | Дата: {expense.date}</li>
                    ))}
                </ul> 
            </div>
        )
    }
}