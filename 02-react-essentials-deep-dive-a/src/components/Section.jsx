export default function Section({title,children,...props}){
    return(//...props  diğer tüm propları toplamasını ve props nesnesinde birleştirmesini söyler
     <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
    )
}

// export default function Section({title,children,id,className}){
//     return(//...props  diğer tüm propları toplamasını ve props nesnesinde birleştirmesini söyler böylece burdaki gibi sürekli prop oluşturmayız
//      <section id={id} className={className}>
//       <h2>{title}</h2>
//       {children}
//     </section>
//     )
// }