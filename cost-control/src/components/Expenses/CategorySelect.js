import { Component } from 'react'

const categories = [
    'Продукты',
    'Рестораны и кафе',
    'Транспорт',
    'Жилье',
    'Коммунальные услуги',
    'Одежда и аксессуары',
    'Здоровье и красота',
    'Развлечения',
    'Путешествия',
    'Образование',
    'Подарки',
    'Другое',
];

export class CategorySelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: ''
        }
    }

    handleChange = (e) => {
        this.setState({ selectedCategory: e.target.value });
        this.props.onCategorySelect(e.target.value);
    }

    render() {
        return (
            <select
                value={this.state.selectedCategory}
                onChange={this.handleChange}
            >
                {categories.map((item, index) => (
                    <option
                        key={index}
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
        )
    }
}