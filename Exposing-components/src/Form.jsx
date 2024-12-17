import { useRef,forwardRef,useImperativeHandle } from "react";

const Form=forwardRef( function Form(props,ref) {
   
        const form=useRef();//useImperatiiveHandle dışarıya clear() metodunu açar
        useImperativeHandle(ref,()=>{//ilk argüman olan ref dışardan gelen referansı temsil eder
            return{
                clear(){
                    form.current.reset()//formu temizlemek için reset() metodu kullanılır
                }/**
                ref üzerinden dışarıya açılacak metotları tanımlar. Bu durumda, clear() metodu dışarıya açılmış olur 
                ve bileşeni kullanan bir bileşen, bu metoda ref.current.clear() ile erişebilir. */
            }
        })
        return(
      <form ref={form}>
        <p>
          <label>Name</label>
          <input type="text" />
        </p>
  
        <p>
          <label>Email</label>
          <input type="email" />
        </p>
        <p id="actions">
          <button>Save</button>
        </p>
      </form>
    );
  })
  export default Form;
  