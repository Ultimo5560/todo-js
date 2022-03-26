
import {Todo} from '../classes';
import {todoList} from '../index';

// Referencias al HTML

const divTodoList = document.querySelector('.todo-list');
const spanTodoCount = document.querySelector('.todo-count');
const strongTodoCount = document.querySelector('strong');
const txtInput = document.querySelector('.new-todo');
const btnAllComplet = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')

export const crearTodoHtml = (todo) =>{

    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed': ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    crearTodoCount();

    return div.firstElementChild;
}

export const crearTodoCount = () =>{

    const htmlCount = todoList.countTodoPendientes();
    strongTodoCount.innerText = htmlCount;
    spanTodoCount.firstChild.append(strongTodoCount.firstChild);
    return strongTodoCount.firstChildt;
    
}


// Eventos

txtInput.addEventListener('keyup', (event) =>{

    if (event.keyCode === 13 && txtInput.value.length > 0) {

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    if (nombreElemento.includes('input')) {
        todoList.estadoTodo(todoId);
        todoElemento.classList.toggle('completed');
        crearTodoCount();
    } else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
        crearTodoCount();
    }
});

btnAllComplet.addEventListener('click', () =>{

    todoList.eliminarCompletados();

    for(let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        console.log(elemento);
        if (elemento.classList.contains('completed')) {

            divTodoList.removeChild(elemento);
            
        }
    }

})

ulFiltros.addEventListener('click', (event) => {
    
    const filtro = event.target.text;

    if (!filtro) {
        return;
    }

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for(const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed'); //El '.contains' pregunta si lo que esta entre parentesis contiene lo contiene el elemento
        
        switch (filtro) {
            case 'Pendientes':

                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            
            case 'Completados':

                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
})