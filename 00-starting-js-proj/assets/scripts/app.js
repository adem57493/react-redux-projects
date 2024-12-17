//import { apiKey } from "./util.js"; //{} içinde dışa aktarılan şeyin adına atıfta bulunuyoruz sonra hangi dosyadan içe aktardığımız

// ./util => . mevcut dizini temsil eder
//../util =>  .. bir üst dizini

//console.log(apiKey);

//import  apiKey  from "./util.js";
//import {abc} from "./util.js";
//import { apiKey,abc as content} from "./util.js";

import * as util from "./util.js";//tüm export edilen şeyleri util adlı nesnede tutar

console.log(util.default);
console.log(content);

function greetUser(username,message="Hello!"){

    console.log(username);
    console.log(message);
}

greetUser("Max");
greetUser("Manuel","Hello, what's up?");

function greetUser2(username,message="hello"){

    return "Hi! I am:"+username+". "+message;
}

const greeting1=greetUser("Max");


const greeting2=greetUser("Manuel","Hello, what's up?");
console.log(greeting1,greeting2);

//export default function(){//fonksiyonu dışa aktarmış oluruz
 //   console.log("Hello!");
//}

export default (username,message)=>{
console.log("Hello!");
return username + message;
}

//arrow function tek bir parametre alıyorsa parametreyi parantez içine almaya gerek yok birden fazla parametre veya parametre yoksa  parantez gerekli return ifadesş tek satırdaysa süslü paranteze gerek yok 

const user={//user objesi
    name:"Max",
    age:34,
    greet(){// fonksiyon da depolayabilirler function anahtar kelimesi olmadan
        console.log("Hello!")
        console.log(this.age);
    }

};

user.greet();

class User{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    greet(){
        console.log("Hi!");
    }
}

const user1=new User("Manuel",35);
console.log(user1);
user1.greet();

const hobbies=["Sports","Cooking","Reading"];

console.log(hobbies[0]);

hobbies.push("working");
console.log(hobbies);

const index=hobbies.findIndex((item)=>{//findIndex metodu koşulu sağlayan ilk öğeyi döner, bu metot her öğeyi item olarak alıyor eğer item "sports" a eşitse fonksiyon true döner findIndex metodu index'i döndürür
   return item==="Sports";
})

console.log(index);

const index2=hobbies.findIndex((item)=> item==="Sports");
  
// const editedHobbies=hobbies.map((item)=>item+"!");//map fonksiyonu array'daki herbir elemana ! işareti ekler orjinal arrayi değiştirmez 

const editedHobbies=hobbies.map((item)=>({text:item}));//her bir öğe string iken nesne olur
//{text:item} bu her öğeyi nesneye dönüştürür her öğe {text:öğe değeri} olur
//1. {text:"Reading"} 2. {text:"Sport"} 3. {text:"Cooking"} [{text:"Reading"}, {text:"Sport"}, {text:"Cooking"}]
//{text:item} dışında parantez olmazsa js bunu blok gibi düşünür parantezle nesne olduğunu söylüyoruz


//destructuring assignment=yıkıcı atama
const [firstname,lastname]=["Max","Schwarzmüller"];

console.log(firstname);//firstname dizinin ilk elemanına lastname ikinci elemanına atanır
console.log(lastname);


 const user2={
    name:"Max",
    age:34
 };

// const name=user2.name;
// const age=user2.age;

//destruction assignment=yıkıcı atama
const {name:userName,age}={//nesnenin name,age özellikleri doğrudan ilgili değişkene atanıyor
    name:"Max",
    age:34
};
console.log(userName);
console.log(age);

const hobbies2=["sports","cooking"];

const newHobbies=["reading"];

const mergedHobbies=[...hobbies2,...newHobbies];//... operatörü bir diziyi tek tek elemanlarına ayırır ve başka diziye ekleemye yarar hobbies2 ve newhobbies dizilerindeki elemanları alıp başka bir dizi yapar

const extendedUser={
    isAdmin:true,
    ...user2//o nesneden tüm değerleri çeker ve yan yana getirir
}

console.log(extendedUser);

const hobbies3=["Sports","Cooking"];
for(const hobby of hobbies3){
console.log(hobby);

}
//time out=zaman aşımı

function handleTimeout(){
    console.log("Timed out!");
}

const handleTimeout2=()=>{
    console.log("Timed out...again!");
}//1. referans fonks adı 2. referans sn eğer handleTimeout'a parantez koysaydık setTimeout çalışmadan handleTimeout çalışırdı ve değeri geçilirdi
setTimeout(handleTimeout,2000);//2 sn sonra handleTimeout metodu çalıştırılır
setTimeout(handleTimeout2,3000);//3 sn sonra bu  fonksiyon çalıştırılır
setTimeout(()=>{// 4sn sonra çalıştırılır
    console.log("More timing out...");
},4000)



function greeter(greetFn){//greeter fonksiyonu içne aldığı parametreyi fonksiyon olarak çağırır
    greetFn();//greetFn şeklinde çağırsaydık sadece fonksiyon referansını tutmuş olurduk greetFn() bu fonks çalıştırır
}

greeter(()=>console.log("Hi!"));//bu fonksiyon[()=>console.log("Hi!")] yukardakine parametre olarak aktarılır
//bu anonim fonksiyon greeter fonksiyonuna parametre olarak aktarılır greeter içinde de greetFn şeklinde çağrılır

function init(){
    function greet(){
        console.log("Hi!");
    }
    greet();
}

init();