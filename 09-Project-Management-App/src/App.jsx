import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import { useState } from "react";
import SelectedProject from "./components/SelectedProjects";
function App() {//projectState projenin mevcut durumunu temsil eder
  const [projectState,setProjectState]=useState({selectedProjectId:undefined,projects:[],tasks:[]})
  //projectState ilk argüman seçilen proje id'si 2. argüman  seçilen proje listesi

  function handleAddTask(text){//text paramterresi kullanıcının girdiği görev metnini temsil eder
    setProjectState(prevState=>{//
      const taskId=Math.random()//yeni görev için benzersiz bir id
      const newTask={
       text:text,//kulalnıcıdan alınana veriler
       projectId:prevState.selectedProjectId,//o anda seçili olan proje id'si
       id:taskId//projeyi benzersiz olarak tanımlayan id bu projeleri silmek ,güncellemek için lazım olacak
      }//her projects projenin id'sini ve proje bilgilerini içerir
      return{//önceki durumun kopyası alınıyor ve üzerindeki task listesi güncelleniyor
        ...prevState,
        tasks:[newTask,...prevState.tasks]
    };
  })

  }

  function handleDeleteTask(id){
    setProjectState(prevState=>{
      return{
        ...prevState,
        tasks:prevState.tasks.filter((task)=>task.id !== id)//bu koşula uyanları geri döner
      }//Eğer bir projenin id değeri, selectedProjectId'ye eşit değilse, bu proje yeni diziye dahil edilir.
//selectedProjectId'ye eşit olan proje ise yeni dizide yer almaz, yani silinmiş olur.
    })
  }
 function handleSelectProject(id){
  setProjectState(prevState=>{
    return{
      ...prevState,
      selectedProjectId:id,//Seçilen projenin idsi, selectedProjectId alanına atanır.
    }
  })
 }

  function handleStartAddProject(){//kullanıcı yeni proje eklemeye başladığında projeId'si null yapılır böylece yeni proje ekleme formu görüntülenir
//handleStartAddProject ve handleAddProject farkı bu sadece kullanıcıyı yeni proje ekleme sürecine başlatmak için kullanılır henüz proje eklenmez selcetedProjectId'yi null yapar bu da yeni proje ekleme moduna geçildiğini gösterir
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:null,//yeni proje ekleniyorsa id null henüz proje seçilmediyse id undifined
      }
    })
  }

  function handleCancelAddProject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
      }
    })

  }

  function handleAddProject(projectData){//yeni proje verileriyle bir proje oluşturulur ve mevcut listeye eklenir
 //bu fonksiyon kullanıcı formu doldurum kaydet butonuna tıkladığında çalışır
    setProjectState(prevState=>{//
      const projectId=Math.random()
      const newProject={
       ...projectData,//kulalnıcıdan alınana veriler
       id:projectId//projeyi benzersiz olarak tanımlayan id bu projeleri silmek ,güncellemek için lazım olacak
      }//her projects projenin id'sini ve proje bilgilerini içerir
      return{
        ...prevState,
        selectedProjectId:undefined,//Proje eklendikten sonra hiçbir proje seçilmez
        projects:[...prevState.projects,newProject]//yeni projeyi mevcut proje listesine ekle
      }
    })
  }//bu koda göre selectedProjectId null olarak kalıyor null olarak kalmasını istemiyorsak
  /* return{
        ...prevState,
        selectedProjectId:newProject.id,
        projects:[...prevState.projects,newProject]//yeni projeyi mevcut proje listesine ekle
      }
  */

  console.log(projectState)

  function handleDeleteProject(){
    setProjectState(prevState=>{
      return{
        ...prevState,
        selectedProjectId:undefined,
        projects:prevState.projects.filter((project)=>project.id !== prevState.selectedProjectId)//bu koşula uyanları geri döner
      }//Eğer bir projenin id değeri, selectedProjectId'ye eşit değilse, bu proje yeni diziye dahil edilir.
//selectedProjectId'ye eşit olan proje ise yeni dizide yer almaz, yani silinmiş olur.
    })

  }
//selectedProjectId kullanıcının seçmiş olduğu projeyi temsil eder bir projenin seçili olup olmadığını anlamanın yolu project.id ile selectedProjectId'yi karşılaştırmaktır
//undifined kullanıcı proje seçmediğinde bu değeri alır ve proje listesi gösterilir
//null kullanıcı proje eklemeye başladığında selectedProjectId bu değeri alır bu durumda yeni proje ekleme ekranı açılır
//ancak bir proje seçildiğinde selectedProjectId seçilen projeninId'si olur bu da handleSelectProject fonksiyonunda
  const selectedProject=projectState.projects.find(project=>project.id===projectState.selectedProjectId)
//find ile o  koşula uyan projects döndürülür
  let content=<SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks}/>;
  if(projectState.selectedProjectId===null){
    content=<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  }else if(projectState.selectedProjectId===undefined){//hiçbir proje seçili değildir
    content=    <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    
  }
  return (
   <main className="h-screen my-8 flex gap-8">
     <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectState.selectedProjectId}/>
    
     {content}
     </main>
  );
}

export default App;
