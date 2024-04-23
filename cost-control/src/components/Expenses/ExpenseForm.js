import { Component } from 'react'
import { CategorySelect } from './CategorySelect'

export class ExpenseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: '',
            amount: '',
            date: ''
        }
    }

    handleCategorySelect = (category) => {
        this.setState({ category });
    }

    handleAmountChange = (event) => {
        this.setState({ amount: event.target.value });
    }

    handleDataChange = (event) => {
        this.setState({ date: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.formOpen();
        this.props.handleAddExpense(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Категория:</label>
                    <CategorySelect onCategorySelect={this.handleCategorySelect} />
                </div>
                <div>
                    <label>Сумма:</label>
                    <input
                        type="number"
                        value={this.state.amount}
                        onChange={this.handleAmountChange}
                    />
                </div>
                <div>
                    <label>Дата:</label>
                    <input
                        type="date"
                        value={this.state.date}
                        onChange={this.handleDataChange}
                    />
                </div>
                <button
                    type='submit'
                >Добавить</button>
            </form>
        )
    }
}