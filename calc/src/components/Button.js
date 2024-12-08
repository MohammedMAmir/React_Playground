import React from 'react'

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
  return (
    <button className={`${getStyleName(value)} button`}>{value}</button>
  )
}

export default Button