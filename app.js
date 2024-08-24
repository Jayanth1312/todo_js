const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");

const generateTemplate = (todo) => {
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <input type="checkbox" class="toggle-completed" />
        <span>${todo}</span>
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

const filterTodos = (filter) => {
    Array.from(list.children).forEach((todo) => {
      switch (filter) {
        case 'completed':
          !todo.classList.contains('completed') ? todo.classList.add('filtered') : todo.classList.remove('filtered');
          break;
        case 'active':
          todo.classList.contains('completed') ? todo.classList.add('filtered') : todo.classList.remove('filtered');
          break;
        default:
          todo.classList.remove('filtered');
      }
    });
  };

  document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterTodos(filter);
    });
  });
