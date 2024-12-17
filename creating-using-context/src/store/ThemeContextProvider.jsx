import { useState } from "react";
import { createContext } from "react";


export const ThemeContext=createContext({theme:'light',toggleTheme:()=>{}})

//<Page/> bileşeni {children} yerine gelicek
export default function ThemeContextProvider({children}){

    const [theme,setTheme]=useState('light');
    const toggleTheme=()=>{
        setTheme((prevTheme)=>{
            return prevTheme=='light'?'dark':'light'
        })
    }//ThemeContext.Provider bu ThemeContext bağlamına değerleri sağlayan bileşendir sağlanan değerler theme,toggleTheme bu değerler ThemeContext'e abone olan her bileşen tarafından kullanılabilir
    //{children}: Sağlayıcının içine sarılmış tüm bileşenler burada yer alır. Bu, ThemeContext'ten temayı ve toggleTheme fonksiyonunu alabilecek hale gelir.
    return <ThemeContext.Provider value={{theme,toggleTheme}}>
        {children}
    </ThemeContext.Provider>
}