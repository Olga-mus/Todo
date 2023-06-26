const input = document.querySelector('.todo_form-input');
const buttonAdd = document.querySelector('.todo_form-add');
const template = document.querySelector('#template').content;
const list = document.querySelector('.todo_list');
const buttonDeleteAll = document.querySelector('.todo_form-delete-all');
const listChildren = list.children;
const message = document.querySelector('.todo_subtitle');
const audio = document.querySelector('.play');

const city = ['Ярославль', 'Казань', 'Москва'];
let item;

//рендер элементов массива city
function render() {
  city.forEach(renderItem);
}

//рендер одного элемента
function renderItem(city) {
  const tempHTML = template.cloneNode(true);
  tempHTML.querySelector('.todo_list-text').textContent = city;

  addListeners(tempHTML);
  list.append(tempHTML);
}

//добавление слушателей
function addListeners(el) {
  el.querySelector('.todo_list-button-delete').addEventListener(
    'click',
    handleDelete
  );
  el.querySelector('.todo_list-button-copy').addEventListener(
    'click',
    handleCopy
  );
  el.querySelector('.todo_list-button-edit').addEventListener(
    'click',
    handleEdit
  );
  el.querySelector('.todo_list-checkbox').addEventListener(
    'change',
    handleChecked
  );
}

//удаление айтема
function handleDelete(evt) {
  evt.target.closest('.todo_list-item').remove();
  if (listChildren.length === 0) {
    message.classList.remove('hidden');
    reset();
  }
  reset();
  audio.play();
}

//копирование айтема
function handleCopy(evt) {
  const text = evt.target.closest('.todo_list-item').textContent;
  renderItem(text);
  audio.play();
}

//редактирование айтема
function handleEdit(evt) {
  item = evt.target.closest('.todo_list-item');
  console.log(item);
  const text = item.innerText;
  console.log(text);
  input.value = text;
  buttonAdd.value = 'Изменить';
  buttonAdd.removeEventListener('click', handleAddItem);
  buttonAdd.addEventListener('click', handleConfirm);
  audio.play();
}

buttonAdd.addEventListener('click', handleAddItem);

//добавление айтема
function handleAddItem() {
  if (input.value) {
    renderItem(input.value);
  }
  audio.play();
  reset();
}

//подтверждение изменений
function handleConfirm() {
  item.querySelector('.todo_list-text').textContent = input.value;
  console.log(item.querySelector('.todo_list-text'));
  reset();
  buttonAdd.removeEventListener('click', handleConfirm);
  buttonAdd.addEventListener('click', handleAddItem);
  audio.play();
}

//резет формы
function reset() {
  input.value = '';
  buttonAdd.value = 'Добавить';
}

//удаление по чекбоксу
function handleChecked(evt) {
  buttonDeleteAll.addEventListener('click', function () {
    evt.target.closest('.todo_list-item').remove();
    if (listChildren.length === 0) {
      message.classList.remove('hidden');
    }
    audio.play();
  });
}

render();
