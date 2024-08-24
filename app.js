const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = (todo) => {
  const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <input type="checkbox" class="toggle-completed" />
      <span class="todo-text">${todo}</span>
      <i class="fas fa-pencil-alt edit"></i>
      <i class="far fa-trash-alt delete"></i>
    </li>
  `;
  list.innerHTML += html;
};

list.addEventListener('change', (e) => {
  if (e.target.classList.contains('toggle-completed')) {
    e.target.parentElement.classList.toggle('completed');
  }
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    const span = e.target.parentElement.querySelector('.todo-text');
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    input.classList.add('form-control');
    input.classList.add('edit-input');
    span.parentNode.insertBefore(input, span);
    span.style.display = 'none';
    input.focus();
    
    input.addEventListener('blur', (e) => {
      span.textContent = input.value;
      span.style.display = '';
      input.parentNode.removeChild(input);
    });
  }
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

const filterTodos = (term) => {
  Array.from(list.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.add('filtered'));

  Array.from(list.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('input', () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});
