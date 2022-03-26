import './styles.css';
import {Todo, TodoList} from './classes';
import { crearTodoHtml, crearTodoCount } from './js/componentes';


export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml); // Opcion larga: (todo => crearTodoHtml(todo))

crearTodoCount();
