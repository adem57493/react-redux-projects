export default function Review({name,feedback}){


    return(

      <figure>
        <blockquote>
            <p>{name}</p>
        </blockquote>
        <figcaption>{feedback}</figcaption>
      </figure>


    )
}