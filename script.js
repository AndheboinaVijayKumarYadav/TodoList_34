/* selecting the form containing the task input field*/
const addForm = document.querySelector('.add');
const tasks = document.querySelector('.tasks');
const deleteBtn = document.querySelector('.delete');
const messageSpan = document.querySelector('.message span');
const searchForm = document.querySelector('.search');
const clearAll = document.querySelector('.clear');

/* updateMessage function */
function updateMessage(){
    const taskCount = tasks.children.length;
    messageSpan.textContent = `You have ${taskCount} pending tasks to complete`
}


/* calling the update function here */
updateMessage();


/* adding eventlistener to addform element */

addForm.addEventListener('submit', (event) => {
    /* its prevents submitting the form */
    event.preventDefault();
   /*  console.log(addForm.task.value); */
   let inputValue = addForm.task.value.trim();

   if(inputValue.length){
        let li = document.createElement('li');
        let span = document.createElement('span')
        let i = document.createElement('i');

        span.innerText =`${inputValue}`;
        i.classList.add('bi', 'bi-trash-fill', 'delete');
        /* appending the childern to li */
        li.appendChild(span);
        li.appendChild(i);

        tasks.append(li)
        addForm.reset();
        updateMessage();
   }
    
})

/* added event listener to the tasks class element i.e ul */
tasks.addEventListener('click',(event) => {
    if(event.target.classList.contains("delete")){
        event.target.parentElement.remove();
        updateMessage();
    }
})

/* filter search function */
function filterTask(term){
    /* converting the nodeElement to array and filter the task  */
    Array.from(tasks.children)
    .filter((task) => {
        return !task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
        task.classList.add('hide');
    })

    Array.from(tasks.children)
    .filter((task) => {
        return task.textContent.toLowerCase().includes(term)
    })
    .forEach((task) => {
        task.classList.remove('hide');
    })
}


/* added  keyup event listener to search form elements */
searchForm.addEventListener('keyup', event => {
    const term = searchForm.task.value.trim().toLowerCase();
    filterTask(term)
})

/* added click event listener on searchform */
searchForm.addEventListener('click' ,(event) => {
    if(event.target.classList.contains('reset')){
        searchForm.reset();
        const term = searchForm.task.value.trim().toLowerCase();
        filterTask(term);
    }
})

clearAll.addEventListener('click', () => {
    const taskItem = document.querySelectorAll('li');

    taskItem.forEach((item) => {
        return item.remove();
    })

    updateMessage();
})