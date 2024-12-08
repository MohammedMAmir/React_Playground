import { useContext } from "react"
import { CalcContext } from "../context/CalContext"
import { Textfit } from "react-textfit";

const Screen = () => {
    const { calc } = useContext(CalcContext);
    return (
        <Textfit className="screen">
            {calc.num}
        </Textfit>    
        )
}

export default Screen