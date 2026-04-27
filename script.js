const input=document.getElementById("input");
const btn=document.getElementById("btn");
const list=document.getElementById("tasklist");
const dateInput=document.getElementById("dateInput");

let tasks=[];
btn.addEventListener("click",()=>{
    let taskText=input.value.trim();
    if(taskText==="") return;
    const dateValue=dateInput.value;
    const finalDate=dateValue?
            new Date(dateValue).toLocaleDateString("en-GB")
            : new Date().toLocaleDateString("en-GB");
    tasks.push({text:taskText,
            completed:false,
            date:finalDate
        });
    input.value="";
    dateInput.value = "";
    renderTasks();
});

function renderTasks() {
    list.innerHTML = "";
    tasks.forEach(function(task,index) {
        const li = document.createElement("li");
        li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <span class="task-date">${task.date}</span>
        `;
        if(task.completed){
            li.style.textDecoration="line-through";
            li.style.opacity = "0.6";
        }
        li.onclick = function(event) {
        task.completed = !task.completed;
        renderTasks();
         };

        const delBtn = document.createElement("button");
        delBtn.innerText = "Delete";

        delBtn.onclick=function(event) {
            event.stopPropagation();
            deleteTask(index); 
        };
        const editBtn=document.createElement("button");
        editBtn.innerText="Edit";
        editBtn.classList.add("edit-btn");
        
        editBtn.onclick=function(event){
            event.stopPropagation();

            const newText=prompt("Edit Task:",task.text);
            if(newText!==null &&newText.trim()!==""){
                tasks[index].text=newText.trim();
                renderTasks();
            }
        };

        li.appendChild(editBtn);
        li.appendChild(delBtn);
        list.appendChild(li);
        
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function deleteTask(index){
    tasks.splice(index,1);
    renderTasks();
}

window.onload= function(){
    const savedTasks=localStorage.getItem("tasks");
    if(savedTasks){
        tasks=JSON.parse(savedTasks);
        renderTasks();
    }
}