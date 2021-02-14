const todoForm = document.querySelector('#jsTodoForm');
const todoInput = document.querySelector('#jsTodoInput');
const todoList = document.querySelector('#jsTodoList');
let todos = [];

const TODOS = 'todos';


const addTodo = (todo) => {
    const todoContainer = document.createElement('li');
    const li = document.createElement('div');
    const check = document.createElement('span');
    const textContainer = document.createElement('form');
    const p = document.createElement('p');
    const editBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    const expandBtn = document.createElement('button');
    const timeStamp = document.createElement('div');

    timeStamp.innerText = `${String(todo.createdAt.year)}년 ${todo.createdAt.month}월 ${todo.createdAt.date}일`;
    timeStamp.classList.add('timeStamp');

    li.id = todo.id;
    li.classList.add("todo-list__item__title");
    
    check.classList.add('checkBtn');

    p.innerText = todo.text;
    textContainer.appendChild(p);
    textContainer.classList.add('textContainer');
    textContainer.addEventListener('submit', handleChange);

    if(todo.checked){
        check.innerHTML = '<i class="far fa-check-square"></i>';
        p.style.textDecoration = 'line-through';
        check.addEventListener('click', handleDecheck);
        editBtn.classList.add('edit');
        expandBtn.classList.add('edit');
    }else{
        check.innerHTML = '<i class="far fa-square"></i>';
        check.addEventListener('click', handleCheck);
    }
    
    editBtn.classList.add('editBtn');
    editBtn.id = "jsEditBtn";
    editBtn.innerHTML = '<i class="fas fa-pen"></i>';
    editBtn.addEventListener('click', handleEdit);
    
    delBtn.classList.add('deleteBtn');
    delBtn.id = "jsDelBtn";
    delBtn.innerHTML = '<i class="fas fa-times"></i>';
    delBtn.addEventListener('click', handleDelete);
    
    expandBtn.classList.add('expandBtn');
    expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    expandBtn.addEventListener('click', expandDetail);
    
    cancelBtn.classList.add('cancel');
    cancelBtn.innerHTML = "취소";
    cancelBtn.addEventListener('click', handleEditCancel);
    
    li.appendChild(check);
    li.appendChild(textContainer);
    li.appendChild(editBtn);
    li.appendChild(expandBtn);
    li.appendChild(delBtn);  
    li.appendChild(cancelBtn);
    

    /*todo - deatil*/
    const todoDetail = document.createElement('div');
    todoDetail.classList.add('todo-list__item__detail');
    todoDetail.appendChild(timeStamp);

    todoContainer.classList.add('todo-list__item');
    todoContainer.appendChild(li);
    todoContainer.appendChild(todoDetail);
    todoContainer.draggable = "true";
    todoContainer.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text", li.id);
        console.log(li.id);
    });
    todoContainer.addEventListener('dragexit', (e) => {
        console.log(e);
    });
    todoContainer.addEventListener('dragover', e => {
        e.preventDefault()
        todoContainer.style.marginBottom = "55px";
    });
    todoContainer.addEventListener('dragleave', e => {
        e.preventDefault()
        todoContainer.style.marginBottom = "0";
    });
    todoContainer.addEventListener('drop', e => {
        todoContainer.style.marginBottom = "0";
        // const id = todoContainer.children[0].id;
        const movedId = e.dataTransfer.getData('text');
        const movedTodo = todos.find(todo => todo.id == movedId);
        let movedIdx = -1;
        let movedBeforeIdx = -1;
        const movedBeforeId = todoContainer.children[0].id;
        todos.forEach((todo, idx) => {
            if(todo.id == movedBeforeId){
                movedBeforeIdx = idx;
            }
            if(todo.id == movedId){
                movedIdx = idx;
            }
        });
        if(movedIdx !== movedBeforeIdx){
            if(movedIdx > movedBeforeIdx){
                console.log("생각할 필요 없음");
                todos = todos.filter((todo, idx) => idx !== movedIdx);
                todos.splice(movedBeforeIdx+1, 0, movedTodo);
                saveTodo();
                todos = [];
                todoList.innerHTML = "";
                loadTodo();
            }else if(movedIdx < movedBeforeIdx){
                console.log("생각해야됨");
                todos = todos.filter((todo, idx) => idx !== movedIdx);
                todos.splice(movedBeforeIdx, 0, movedTodo);
                saveTodo();
                todos = [];
                todoList.innerHTML = "";
                loadTodo();
            }
        }
        // todos = todos.filter(todo => {
        //     return todo.id !== movedTodo.id;
        // });
    });
    todoList.appendChild(todoContainer);
    
}

const loadTodo = () => {
    todos = JSON.parse(localStorage.getItem(TODOS)) || [];
    todos.forEach(todo => {
        addTodo(todo);
    });
}

const generateId =  () => {
    return Date.now()+""+ Math.floor(Math.random()*100);
}

const handleEdit = e => {
    const li = e.target.parentNode;
    const textContainer = li.querySelector('.textContainer');
    const todo = textContainer.querySelector('p');
    const todoText = todo.innerText;

    const input = document.createElement('textarea');
    input.rows = "4";
    input.type= "text";
    input.value= todoText;
    
    textContainer.innerHTML = '';
    textContainer.appendChild(input);
    toggleEdit(li);
    input.focus();
}

const toggleEdit = (li) => {
    const check = li.querySelector('.checkBtn');
    const editBtn = li.querySelector('#jsEditBtn');
    const delBtn = li.querySelector('#jsDelBtn');
    const cancelBtn = li.querySelector('.cancel');
    const textContainer = li.querySelector('.textContainer');
    const expandBtn = li.querySelector('.expandBtn');

    textContainer.classList.toggle('edit');
    check.classList.toggle('edit');
    editBtn.classList.toggle('edit');
    delBtn.classList.toggle('edit');
    cancelBtn.classList.toggle('edit');
    expandBtn.classList.toggle('edit');
}

const handleChange = e => {
    e.preventDefault();

    const li = e.target.parentNode;
    const id = li.id;
    const textContainer = e.target;
    const todoText = e.target.children[0].value;
    
    for(let i in todos){
        if(todos[i].id == id){
            todos[i].text = todoText;
        }
    }
    saveTodo();

    
    const p = document.createElement('p');
    p.innerText = todoText;
    
    textContainer.innerHTML= '';
    textContainer.appendChild(p);
    toggleEdit(li);
}

const handleEditCancel = (e) => {
    const li = e.target.parentNode;
    const id = li.id;
    const textContainer = li.querySelector('.textContainer');
    const p = document.createElement('p');
    
    for(let i in todos){
        if(todos[i].id == id){
            p.innerText = todos[i].text;
        }
    }
    
    textContainer.innerHTML= '';
    textContainer.appendChild(p);
    toggleEdit(li);
}

const handleCheck = e => {
    const check = e.target;
    const item = e.target.parentNode;
    const editBtn = item.querySelector('#jsEditBtn');
    const expandBtn = item.querySelector('.expandBtn');
    const text = item.querySelector('p');

    const todo = todos.find(todo => todo.id == item.id);
    todo.checked = true;
    console.log(todos);
    saveTodo();
    
    editBtn.classList.add('edit');
    expandBtn.classList.add('edit');
    check.innerHTML = '<i class="far fa-check-square"></i>';
    text.style.textDecoration = "line-through";
    check.removeEventListener('click', handleCheck);
    check.addEventListener('click', handleDecheck);
}

const handleDecheck = e => {
    const check = e.target;
    const item = e.target.parentNode;
    const text = item.querySelector('p');
    const editBtn = item.querySelector('#jsEditBtn');
    const expandBtn = item.querySelector('.expandBtn');

    editBtn.classList.remove('edit');
    expandBtn.classList.remove('edit');

    const todo = todos.find(todo => todo.id == item.id);
    todo.checked = false;
    saveTodo();

    check.innerHTML = '<i class="far fa-square"></i>';
    text.style.textDecoration = "none";
    check.removeEventListener('click', handleDecheck);
    check.addEventListener('click', handleCheck);  
}

const handleSubmit = e => {
    e.preventDefault();
    const text = todoInput.value;
    todoInput.value = "";
    const today = new Date();

    const todo = {
        text,
        checked: false,
        id: generateId(),
        createdAt: {
            year: today.getFullYear(),
            month: today.getMonth()+1,
            date: today.getDate(),
            hours: today.getHours()
        }
    }
    todos.push(todo);
    saveTodo();
    addTodo(todo);
}

const expandDetail = (e) => {
    const todoDetail = e.target.parentNode.parentNode.children[1];
    const expandBtn = e.target;
    expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    expandBtn.removeEventListener('click', expandDetail);
    expandBtn.addEventListener('click', shrinkDetail);
    todoDetail.classList.add('active');
}

const shrinkDetail = (e) => {
    const todoDetail = e.target.parentNode.parentNode.children[1];
    const expandBtn = e.target;
    expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i>';
    expandBtn.removeEventListener('click', shrinkDetail);
    expandBtn.addEventListener('click', expandDetail);
    todoDetail.classList.remove('active');
}

const saveTodo = () => {
    localStorage.setItem(TODOS, JSON.stringify(todos));
}

const handleDelete = e => {
    const li = e.target.parentNode.parentNode;
    const id = e.target.parentNode.id;
    todos = todos.filter(todo => {
        return todo.id !== id
    });
    li.style.transform = "rotateZ(10deg) translateY(50%)";
    li.style.opacity = "0"//이거 해결하기
    li.addEventListener('transitionend', () => {
        todoList.removeChild(li);
    })
    saveTodo();
}

function init(){
    todoForm.addEventListener('submit', handleSubmit);
    loadTodo();
}

init();