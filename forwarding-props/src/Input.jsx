export default function Input({richtext,...props}){

if(richtext){//{richtext} yapmadık çünkü böyle yapsaydık bir objenin olup olmadığını kontrol ederdi

    return <textarea {...props}/>
}
return <input {...props}/>

}


