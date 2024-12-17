export default function Tabs({children,buttons,buttonsContainer}){
     


    // return(//<></>=fragment
    //   <>
    //  / <menu>
       
    //    {buttons}

    //   </menu>
      
    //   {children}
    //   </>


    // )

    const ButtonsContainer=buttonsContainer;
    return(//<></>=fragment
      <>
      <ButtonsContainer>
       
       {buttons}

      </ButtonsContainer>
      
      {children}
      </>


    )
}