    
    document.addEventListener('DOMContentLoaded', function () {
    username = localStorage["username"];
    if(!localStorage["tasks"]){
        localStorage["tasks"] = "{}";
    }
  
    })

    
    
    const task_adder = document.querySelector(".task_adder");
    const task_list = document.querySelector("ul#tasks");
   
    function add_task_event(){
        var count = document.querySelector("#tasks").children.length+1;
        var val = document.querySelector("input[name=task_adder]").value;
        var error_message_area = document.querySelector(".error_message_area");

        if(val==""){
            error_message_area.classList.remove("d-none");
            error_message_area.innerHTML=`<i class="fa fa-exclamation-triangle pe-3" aria-hidden="true"></i> Sence Boş Olabilir Mi ?`;
            setTimeout(() => {
            error_message_area.classList.add("d-none");
            error_message_area.innerHTML=``;
            }, 3000);
        }
        else{
            var li = document.createElement("li");
            li.classList.add("task-item","d-flex");
            li.name=`task-${count}`;
            li.innerHTML=`
            <b>${count})</b>
            <input type="text" class="form-custom-control me-3" name="task-${count}" disabled value="${val}">
            <a href="javascript:" onClick="" class="btn btn-warning text-white me-2 rounded-0">
                <i class="fa-regular fa-pen-to-square"></i>
            </a>
            <a href="javascript:" onClick="delete_task_event(this)" class="btn btn-danger text-white me-2 rounded-0">
                <i class="fa-solid fa-trash"></i>
            </a>
            `;
        
            task_list.appendChild(li);    
      

            var tasks = JSON.parse(localStorage["tasks"]);
            var task_group = {};
            for(var i in tasks){
                task_group.push(tasks[i]);
            }

            console.log(task_group);



        
            document.querySelector("input[name=task_adder]").value ="";
            document.querySelector("input[name=task_adder]").focus();

        }
    }

    function delete_task_event(task){
        var count = document.querySelector("#tasks").children.length+1;
        if(count==3){
            document.querySelector(".empty-message").innerHTML="";
        }
        console.log(count);
        task.parentNode.remove();
    }

    document.querySelector(".task_adder").addEventListener("click",function(){
        add_task_event();
    });

