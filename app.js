const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filters = document.getElementById('filter-todo');

// listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', itemCheck);
filters.addEventListener('change', filterTodo);
document.addEventListener('DOMContentLoaded', getLocalItems);

//functions
function addTodo(e) {
   e.preventDefault();

   if (!todoInput.value) return false; // stop blank items

   const todoDiv = document.createElement('div'); // creating todo item div
   todoDiv.classList.add('todo'); // adding css to todo item div

   const newTodo = document.createElement('li'); // adding new item to todo item div
   newTodo.innerText = todoInput.value;
   newTodo.classList.add('todo-item'); // adding css to new item
   todoDiv.appendChild(newTodo);

   setLocalItems(todoInput.value);

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
      removeLocalItems(todo);
      todo.addEventListener('transitionend', function() {
         todo.remove();
      });
   }

   if (item.classList[0] === 'complete-btn') { // mark completed
      const todo = item.parentElement;
      todo.classList.toggle('crossoff');
   }
}

function filterTodo(e) { // for filtering the todo list
   const items = todoList.children;

   for (let item of items) {
      switch (e.target.value) {
         case 'all':
            item.style.display = 'flex';
            break;
         case 'done':
            item.classList.contains('crossoff') ? item.style.display = 'flex' : item.style.display = 'none';
            break;
         case 'open':
            !item.classList.contains('crossoff') ? item.style.display = 'flex' : item.style.display = 'none';
            break;
      }
   }
}

function setLocalItems(item) {
   let items = checkLocalStorage();

   items.push(item);
   localStorage.setItem('items', JSON.stringify(items));
}

function getLocalItems() {
   let items = checkLocalStorage();

   items.forEach((item) => {
      const todoDiv = document.createElement('div'); // creating todo item div
      todoDiv.classList.add('todo'); // adding css to todo item div

      const newTodo = document.createElement('li'); // adding new item to todo item div
      newTodo.innerText = item;
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
   });
}

function removeLocalItems(item) {
   let items = checkLocalStorage();

   items = items.filter((todo) => todo != item.children[0].innerText);

   localStorage.setItem('items', JSON.stringify(items));
}

function checkLocalStorage() {
   if (localStorage.getItem('items') === null) {
      return [];
   } else {
      return JSON.parse(localStorage.getItem('items'));
   }
}