import React from 'react'
import './converter.css'
const DOLLARS_PER_EURO = 1.183369

function toDollar(euro) {
    return euro * DOLLARS_PER_EURO
}
function toEuro(dollar) {
    return dollar / DOLLARS_PER_EURO
}

function tryConvert(amount, convertCallback) {
    const input = parseFloat(amount)
    if (isNaN(input)) {
        return ''
    }

    return convertCallback(input).toFixed(2).toString()
}

function CurrancyInput(props) {
    // const money = tryConvert(props.amount, props.currancy === 'Dollar'? toEuro:toDollar)
    return <fieldset>
        <legend>{props.currancy} amount:</legend>
        <input value={props.amount} name={props.name} onChange={props.change} />
    </fieldset>
}

export default class Converter extends React.Component {

    constructor(props) {
        super(props)
        const start_value = 1
        this.state = {
            dollar_amount: start_value,
            euro_amount: tryConvert(start_value, toEuro),
            currancy: 'Dollar'
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        const money = e.target.value
        switch (name) {
            case 'euro':
                this.setState({
                    dollar_amount: tryConvert(money, toDollar),
                    euro_amount: money
                })
                break
            default:
                this.setState({
                    dollar_amount: money,
                    euro_amount: tryConvert(money, toEuro),
                })
                break
        }
    }

    render() {
        return <main>
            <h1>Currency Converter</h1>
            <CurrancyInput
                currancy='Dollar'
                amount={this.state.dollar_amount}
                change={this.handleChange}
                name='dollar' />
            <CurrancyInput
                currancy='Euro'
                amount={this.state.euro_amount}
                change={this.handleChange}
                name='euro' />

        </main>
    }
}