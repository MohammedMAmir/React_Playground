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


    // Handle if an operator button is clicked
    const signClick = () => {
        setCalc({
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0
        })
    }

    // Change result when user clicks equals button
    const equalsClick = () => {

        if(calc.num && calc.res){
            const doMath = (a, b, sign) => {
                switch(sign){
                    case '+': 
                        return (a + b)
                    case '-':
                        return (a - b)
                    case 'x': 
                        return (a * b)
                    case '÷':
                        return(a / b)
                    default:
                        return (a + b)
                }
                // const result = {
                //     '+': a + b,
                //     '-': a - b,
                //     'x': a * b,
                //     '÷': a / b
                // }
                // return result[sign](a, b)
            }
            setCalc({
                res: doMath(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            })
        }
    }

    // User clicks percent symbol
    const percentClick = () => {
        setCalc({
            num: (calc.num/100),
            res: (calc.res/100),
            sign: ''
        })

    }

    // Handle the user clicking the sign button
    const negClick = () => {
        setCalc({
            num: calc.num ? -1*calc.num : 0,
            res: calc.res ? -1*calc.res : 0,
            sign: ''
        })
    }

    const handleBtnClick = () => {
        console.log(value)
        const results = {
            '.': commaClick,
            'C': resetClick,
            '÷': signClick,
            'x': signClick,
            '+': signClick,
            '-': signClick,
            '=': equalsClick,
            '%': percentClick,
            '+/-': negClick
        }
        if(results[value]){
            return results[value]()
        }else{
            handleNumClick()
        }
    }
  return (
    <button onClick={handleBtnClick} className={`${getStyleName(value)} button`}>{value}</button>
  )
}

export default Button