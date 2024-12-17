import { forwardRef } from "react"
const Input=forwardRef(function Input({label,...props},ref){
//forwardRef ile dışarıdan gelen ref'in bu bileşenin içindeki dom elemanına aktarılmasını sağlar ref input elemanına bağlanır

    return (
        <p className="control">
            <label >{label}</label>
            <input ref={ref} {...props} />
        </p>
    )
})

export default Input;