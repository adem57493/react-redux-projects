import {useState,useCallback} from 'react'
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx'
export default function Quiz(){

    const [userAnswers,setUserAnswers]=useState([])
    const activeQuestionIndex=userAnswers.length;
 
    const questionIsComplete=activeQuestionIndex===QUESTIONS.length;
//bu fonksiyon kullanıcının bir yanıt seçmesi durumunda çağrılır,useCallBack ile sarmalanmıştır bu sayede sadece selectedAnswer değiştiğinde yeniden oluşturulur
//kullanıcı tarafından tetiklenen sürekli işlemlerde useCallback() kullanıyoruz sistem tarafından tetiklenenlerde useEffect() kullanıyoru bilşenin bir kez render edilmesini sağlar
    const handleSelectAnswer=useCallback(function handleSelectAnswer(selectedAnswer){
     setUserAnswers((prevUserAnswers)=>{
        return[...prevUserAnswers,selectedAnswer]
     })
    },[])//[] bağımlılık dizisini boş bırakmamızın nedeni handleSelectAnswer fonksiyonunun ilk render sırasında yalnızca bir kez oluşturulmasını istememizdir.
    //bu kullanıcı bir soruyu atlamak istediğinde çağrılır ,handleSelectAnswer(null) çağrılarak userAnswers dizisine null eklenir bu da atlanan soruyu temsil eder
    const handleSkipAnswer=useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer])
//yine useCallback kullandık çünkü kullanıcının tetiklediği bir fonksiyon 
/**
 * bağımlılık dizisine [handleSelectAnswer] eklememizin sebebi, handleSelectAnswer fonksiyonuna
 *  bağlı olarak handleSkipAnswer'ın yeniden oluşturulmasını sağlamak. 
 * burada handleSelctAnswer handleSkipAnswer içinde kullanılan bir bağımlılıktır çünkü handleSkipAnswer işlevini yerine getirmek için handleSkipAnswer fonksiyonuna ihtiyaç duyar
 * bağımlılığı eklemezsek handleSelectAnswer güncellenmiş olsa bile handleSkipAnswer eski referansı kullanır böylece handleSelectAnswer üzerinde yapılan değişiklikler handleSkipAnswer'a yansımaz
 */
    if(questionIsComplete){
        return<div id='summary'>
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz
                 completed!</h2>
        </div>
    }
/**bu satırda mevcut sorunun answers dizisi kopyalanır ve karıştırılır böylece her sorunun şıkları her seferinde farklı bir sırada görüntülenir  */
//shuffle=karıştırmak,shuffled=karıştırılmış
    const shuffledAnswers=[...QUESTIONS[activeQuestionIndex].answers]//başka bir soruya geçtiğimizde zamanlayıcı baştan başlamıyordu bu yüzden başka bir soruya geçtiğimizde questiontimer'ın yeniden oluşmasını sağlamalıyız ve bunları benzersiz kılmak için key propu ekleriz soru değiştiğinde değişecek olan soru indexi
    shuffledAnswers.sort(()=>Math.random()-0.5)//0 ile 0.5 arasında olursa Math.random() - 0.5 negatif bir değer döndürür. 0.5 ile 1 arasında olursa Math.random() - 0.5 pozitif bir değer döndürür. dizideki öğeler rastgele bir şekilde yer değiştirir, çünkü sıralamanın pozitif ya da negatif olması tamamen rastgele hale gelir. çünkü sort metodunda pozitif ise yer değiştiriyor negatif ise yer değiştirmiyordu
return <div id='quiz'>
    <div id='question'>
        
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeOut={handleSkipAnswer}/>
<h2>{QUESTIONS[activeQuestionIndex].text}</h2>

<ul id='answers'>
    {shuffledAnswers.map((answer)=>{
        <li key={answer} className='answer'>
            <button onClick={()=>handleSelectAnswer(answer)}>{answer}</button>
        </li>
    })}
</ul>
</div>
</div>
}//key propuna activeQuestionIndex verilmiştir. Bu, her yeni soruya geçildiğinde QuestionTimer bileşeninin sıfırlanmasını sağlar.