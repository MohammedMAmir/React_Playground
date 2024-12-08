import { createContext, useState } from "react"

export const CalcContext = createContext()

const CalcProvider = ({ children }) => {
    const [calc, setCalc] = useState({
        sign: "",
        num: 4000000,
        res: 0
    });

    const providerValue = {
        calc, setCalc
    }

    return (
        <CalcContext.Provider value = {providerValue}>
            {children}
        </CalcContext.Provider>
    )
}

export default CalcProvider