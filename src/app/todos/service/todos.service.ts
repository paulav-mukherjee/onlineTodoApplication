import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../todos.config';
import { TodoItem, Todo } from '../Interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http : HttpClient) { }

  getTodos(){
    return this.http.get<Todo[]>(config.API_URL_GET)
  }
  addTodos(todo : TodoItem){
    return this.http.post(config.API_URL_POST,todo)
  }
  updateTodos(id : string , data : TodoItem){
    console.log(data);
    
return this.http.put<TodoItem>(config.API_URL_PUT+id, data)
  }
  deleteTodo(id : string){
return this.http.delete(config.API_URL_DELETE+id)
  }

}
