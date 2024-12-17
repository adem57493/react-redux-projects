import {useState,useCallback} from 'react'
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from './QuestionTimer.jsx'
export default function Quiz(){
    const [answerState,setAnswerState]=useState('')
    const [userAnswers,setUserAnswers]=useState([])
    const activeQuestionIndex=
    answerState==='' ?userAnswers.length:userAnswers.length-1;
 /**
  * Kullanıcı ilk soruya bir yanıt verir ve bu yanıt userAnswers dizisine eklenir.
Örneğin: userAnswers = ['A'] olur.
Yanıt verildiği için answerState "answered" veya "correct" gibi bir değere güncellenir (artık boş değil).
activeQuestionIndex = userAnswers.length - 1; // 1 - 1 = 0
Sonuç: activeQuestionIndex = 0 olur, yani hâlâ ilk soruyu işaret eder, çünkü bu soruya yanıt verilmiştir ve o anki aktif soru tamamlanmış durumdadır.
Kullanıcı İkinci Soruyu Yanıtlamadan Önce
Şimdi answerState sıfırlanır ('' yapılır), çünkü yeni bir soruya geçilmiştir:

userAnswers = ['A']
answerState = ''
Bu durumda:

userAnswers.length = 1
answerState === '' olduğundan activeQuestionIndex = userAnswers.length kullanılır.
Yani:


activeQuestionIndex = userAnswers.length; // 1
Sonuç: activeQuestionIndex = 1 olur, bu da ikinci soruya geçtiğimiz anlamına gelir.
  */
    const questionIsComplete=activeQuestionIndex===QUESTIONS.length;
/**
 * Neden activeQuestionIndex === QUESTIONS.length - 1 Kullanılmıyor?
Eğer activeQuestionIndex === QUESTIONS.length - 1 şeklinde bir kontrol yaparsak, bu durumda son soruya geldiğimizi ama henüz o sorunun yanıtlanmadığını işaret eder. Yani,
 bu durum son soruya geldiğimiz anlamına gelir, ancak tüm soruların tamamlandığını göstermez.
 */
    const handleSelectAnswer=useCallback(function handleSelectAnswer(selectedAnswer){

        setAnswerState('answered')
     setUserAnswers((prevUserAnswers)=>{
        return[...prevUserAnswers,selectedAnswer]
     })
/**
 * setTimeout kullanarak yanıtın doğruluğunu kontrol eder. Yanıt doğruysa setAnswerState('correct'), yanlışsa setAnswerState('wrong') yapılır.
2 saniye sonra setAnswerState('') ile yanıt durumunu sıfırlar.
 */
     setTimeout(() => {
        if(selectedAnswer==QUESTIONS[activeQuestionIndex].answers[0]){
            setAnswerState('correct')
        }else{
            setAnswerState('wrong')
        }
        setTimeout(()=>{//işteki timeOut yanıtı doğru ya da yanlış olarak işaretledikten sonra 2000 sn süre kullanıcının yanıtının doğru ya da yanlış olarak gösterilebileceği bir süre sağlıyor Geri bildirimi kullanıcıya gösterip ardından durumu sıfırlamak için.
            setAnswerState('');//cevabın sıfırlanmasını sağlar yani artık doğru ya da yanlış olarak işaretlenmiyor
        },2000)
     }, 1000);
    },[activeQuestionIndex])//soru indexi değiştiğinde bu fonksiyon yeniden oluşturulmalıdır

    const handleSkipAnswer=useCallback(()=>handleSelectAnswer(null),[handleSelectAnswer])
    /**
     * handleSkipAnswer, yalnızca handleSelectAnswer fonksiyonunu çağırıyor ve bağımlılık olarak onu kullanıyor. Eğer handleSelectAnswer fonksiyonu değişirse, handleSkipAnswer fonksiyonunun da güncellenmesi gerekiyor. Bu yüzden handleSkipAnswer, handleSelectAnswer fonksiyonuna bağımlı.
    activeQuestionIndex Bağımlılığı Gerekli Değil
handleSkipAnswer içinde activeQuestionIndex doğrudan kullanılmıyor. activeQuestionIndex yalnızca handleSelectAnswer fonksiyonu içinde kullanılıyor.
    */
//handleSkipAnswer sadece handleSelectAnswer'a bağımlıdır, çünkü activeQuestionIndex doğrudan handleSkipAnswer içinde kullanılmıyor.
    if(questionIsComplete){
        return<div id='summary'>
            
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz completed!</h2>
        </div>
    }

    const shuffledAnswers=[...QUESTIONS[activeQuestionIndex].answers]//başka bir soruya geçtiğimizde zamanlayıcı baştan başlamıyordu bu yüzden başka bir soruya geçtiğimizde questiontimer'ın yeniden oluşmasını sağlamalıyız ve bunları benzersiz kılmak için key propu ekleriz soru değiştiğinde değişecek olan soru indexi
    shuffledAnswers.sort(()=>Math.random()-0.5)
    /**
     * Neden Math.random() Bir Fonksiyonun İçine Alındı?
Buradaki () => Math.random() - 0.5 kullanımı, her karşılaştırma için yeni bir rastgele sayı üretilmesini sağlar. Yani her eleman çifti karşılaştırıldığında, Math.random() - 0.5 ifadesi yeniden değerlendirilir ve bu da sıralama işleminin her adımında farklı bir sonuç üretir.
 Bu şekilde dizi tamamen rastgele bir sıraya göre karıştırılmış olur.
     */
return <div id='quiz'>
    
    <div id='question'>
        <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeOut={handleSkipAnswer}/>
<h2>{QUESTIONS[activeQuestionIndex].text}</h2>

<ul id='answers'>

    {shuffledAnswers.map((answer)=>{
        const isSelected=userAnswers[userAnswers.length-1]===answer

        let cssClass='';

        if(answerState=='answered' && isSelected){
            cssClass='selected'
        }
        if((answerState=='correct' || answerState=='wrong')&&isSelected){
            cssClass=answerState;
        }
        return <li key={answer} className='answer'>
        <button onClick={()=>handleSelectAnswer(answer)} className={cssClass}>{answer}</button>
    </li>
    })}
</ul>
</div>
</div>
}