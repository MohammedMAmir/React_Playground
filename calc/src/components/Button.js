import React, { useContext } from 'react'
import { CalcContext } from '../context/CalContext'


const getStyleName = (value) => {
    const className = {
        '=': 'equals',
        'x': 'opt',
        '+': 'opt',
        '÷': 'opt',
        '-': 'opt',
    }
    return className[value]
}

const Button = ({ value }) => {

    const { calc, setCalc } = useContext(CalcContext);

    // If the user clicks decimal sign, check if decimal is already there. Otherwise, add decimal
    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        })
    }

    // Reset the screen
    const resetClick = () => {
        setCalc({
            sign: "",
            num: 0,
            res: 0
        })
    }

    // User clicks a number
    const handleNumClick = () => {
        const numberString = value.toString()

        let numberVal;

        if(numberString === '0' && calc.num === 0){
            numberVal = '0';
        }else {
            numberVal = Number(calc.num + numberString)
        }

        setCalc({
            ...calc,
            num: numberVal
        })
    }

    const handleOptBtnClick = () => {
        console.log(value)
        const results = {
            '.': commaClick,
            'C': resetClick
        }
        if(results[value]){
            return results[value]()
        }else{
            handleNumClick()
        }
    }
  return (
    <button onClick={handleOptBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}

export default Button