const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', itemCheck);

//functions
function addTodo(event) {
   event.preventDefault();

   if (!todoInput.value) return false; // stop blank items

   const todoDiv = document.createElement('div'); // creating todo item div
   todoDiv.classList.add('todo'); // adding css to todo item div

   const newTodo = document.createElement('li'); // adding new item to todo item div
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item'); // adding css to new item
   todoDiv.appendChild(newTodo);

   const completedButton = document.createElement('button'); // adds complete button to new item
   completedButton.innerHTML = '<i class="fa-solid fa-square-check">';
   completedButton.classList.add('complete-btn');
   todoDiv.appendChild(completedButton);

   const deleteButton = document.createElement('button'); // adds delete button to new item
   deleteButton.innerHTML = '<i class="fa-solid fa-square-minus">';
   deleteButton.classList.add('delete-btn');
   todoDiv.appendChild(deleteButton);

   todoList.appendChild(todoDiv); // adds item and buttons to list

   todoInput.value = '';
}

function itemCheck(e) {
   const item = e.target;

   if (item.classList[0] === 'delete-btn') { // remove item from list
      const todo = item.parentElement;
      todo.classList.add('fall');
      todo.addEventListener('transitionend', function() {
         todo.remove();
      });
   }

   if (item.classList[0] === 'complete-btn') {
      const todo = item.parentElement;
      todo.classList.toggle('crossoff');
   }
}
