    // Set the options that I want
    toastr.options = {
        "closeButton": true,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
  
 
 const form = document.querySelector('form');
    const input = document.querySelector("#taskAdderInput");
    const btnDeleteAll =document.querySelector("#btnDeleteAll");
    const taskList = document.querySelector("#taskList");
  

        loadItems();
        eventListeners();
  
    function eventListeners(){
        form.addEventListener('submit',addNewItem);
        taskList.addEventListener("click",deleteItem);
        btnDeleteAll.addEventListener("click",deleteAllTasks);
    }
    // Get Data From Local Storage
    function getItemsFromLS(){
        if(localStorage["items"]==null){
            items = [];
        }else{
            items = JSON.parse(localStorage["items"]);
        }
        return items;
    }
    // Edit Item From Local Storage
    function setItemLS(text){
        items = getItemsFromLS();
        items.push(text);
        localStorage["items"]=JSON.stringify(items);
    }
    // Delete Item From Local Storage
    function deleteItemLS(text){
        var val = text;
        items = getItemsFromLS();

        items.forEach(function(item,index,val){
            if(item==text){
                items.splice(index,1);
            }
            index++;
        })
        localStorage["items"] = JSON.stringify(items);
    }
    // Load Items
    function loadItems(){
        items=getItemsFromLS();
        items.forEach(function(item){
            createItem(item);
        });
    }
    // Create Task Item
    function createItem(text){
        var val = text;
     
      
            const li = document.createElement("li");
            li.className="task-item d-flex";
            li.innerHTML=`<input type="text" class="form-custom-control me-3" name="task-" disabled="disabled" value="${val}">
                          <i class="fa-regular fa-pen-to-square data-editor" data-editable="false"></i>
                          <i class="fa-solid fa-trash text-danger"></i>
            `;
            taskList.appendChild(li);
    
      
       
    }
    // Add New Task
    function addNewItem(e){
            e.preventDefault();
            var text = input.value;
            input.value="";
            if(text==""){
                toastr.error("Empty Task??");
            }
            else{
                // Create Item
                createItem(text);
                // Save to local storage
                setItemLS(text);
                toastr.success("Task Added succesfully");
                }
        }
           
    var old_text;
    // Delete Task
    function deleteItem(e){

        if(e.target.className=="fa-solid fa-trash text-danger"){
            e.target.parentElement.remove();
            
            // Delete From Local Storage
            deleteItemLS(e.target.parentElement.querySelector("input").value);
        }
        // Change item to edit mode
        else if(e.target.className=="fa-regular fa-pen-to-square data-editor"){
             e.target.className="far fa-save text-warning data-editor";
             old_text = e.target.parentElement.querySelector("input").value;
             changeEditable(e.target,old_text);

        }
        // İf task in edit mode
        else if(e.target.getAttribute("data-editable")){
         changeEditable(e.target,old_text);
        }
        else{
            
        }

        e.preventDefault();
    }
    function changeEditable(item,old_text){
        var input = item.parentElement.querySelector("input");
        var edit_icons = Array.from(document.getElementsByClassName("data-editor"));

        // All task change non-editable
        edit_icons.forEach(function(e){
            e.className="fa-regular fa-pen-to-square data-editor";
            e.setAttribute("data-editor",false);
            e.parentElement.querySelector("input").setAttribute("disabled",true);
            e.parentElement.querySelector("input").classList.remove("focus-input");
            

        });
        // Chande editable our task
        item.className=" far fa-save text-warning data-editor";
        item.setAttribute("data-editor",true);
        input.setAttribute("disabled",false);
        input.classList.add("focus-input");

        // Data Editable Control
        if(item.getAttribute("data-editable")=="false"){
            input.removeAttribute("disabled");
            item.setAttribute("data-editable",true);

        }
        else{
            editItem(old_text,input.value,item);
        }
        
    }
    function editItem(old_text,text,e){

        items = JSON.parse(localStorage["items"]);
        var empty_items=[];
        items.forEach(function(item){
            if(item==old_text){
                item=text;
            }
            empty_items.push(item);
        })
        e.setAttribute("data-editable",false);
        e.className="fa-regular fa-pen-to-square data-editor";
        e.parentElement.querySelector("input").classList.remove("focus-input");
        localStorage["items"] = JSON.stringify(empty_items);
    }



    // Delete All Tasks
    function deleteAllTasks(e){
        taskList.innerHTML="";
    }
    



