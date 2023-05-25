import { Component, OnInit } from '@angular/core';
import { TodosService } from './service/todos.service';
import { Todo, TodoItem } from '../todos/Interfaces/todo.interface';
import { MyTodo } from './Models/model.todos';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  faTrash = faTrash;
  faPencilSquare = faPencil;

  public todoList: Todo[] = []
  public pageSize: number = 1
  public totalTodos: number = 0
  public isTdoLoaded: boolean = false;
  public searchedKey: string = ''
  public isEdit: boolean = false
  public myTodo = new MyTodo("", "", "")

  constructor(private _todoService: TodosService) {
    let today = new Date()

    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let sec = today.getSeconds()
    let timeFormat = hour > 12 ? "PM" : "AM";
    let currentDate = `${date}/${month}/${year} ${hour}:${minute}:${sec} ${timeFormat}`;
    this.myTodo.created = currentDate
    // console.log(this.myTodo);

  }

  getTodos() {
    this._todoService.getTodos().subscribe((res: Todo[]) => {
      // console.log(res);
      if (res.length === 0) {
        this.isTdoLoaded = false
      } else {
        setTimeout(() => {
          this.todoList = res
          this.totalTodos = res.length
          this.isTdoLoaded = true
        }, 1000)
      }
    })
    var title = document.getElementById('title') as HTMLInputElement
    title.focus()
  }


  ngOnInit(): void {
    this.getTodos()

  }

  onSubmit(title: string, desc: string) {

    if (this.isEdit) {
      console.log('is edit true');
      this.updatetodo(title, desc)

    } else {
      let addTodo = {
        title: this.myTodo.title,
        desc: this.myTodo.description,
        created: this.myTodo.created
      }

      console.log(addTodo);

      if (confirm(`Are you sure to add this todo?`)) {

        this._todoService.addTodos(addTodo).subscribe((res: any) => {
          console.log(res)
          alert(res.msg)
          this.getTodos()
        })
      }
      this.myTodo = {
        title: '',
        description: '',
        created: this.myTodo.created
      }
    }


  }

  public updateTodoItem: TodoItem = {
    title: '',
    desc: '',
    created: ''
  }

  public todoId: string = ''

  onAction(todos: any) {
    this.isEdit = true
    this.myTodo = {
      title: todos.title,
      description: todos.description,
      created: this.myTodo.created
    }
    console.log(this.myTodo);


    this.todoId = todos._id


  }
  updatetodo(title: string, desc: string) {
    console.log(this.todoId);
    this.updateTodoItem = {
      title: title,
      desc: desc,
      created: this.myTodo.created
    }
    console.log(this.updateTodoItem);

    if (confirm(`sure, want to update : ${this.updateTodoItem.title.toUpperCase()} ?`)) {
      this._todoService.updateTodos(this.todoId, this.updateTodoItem).subscribe((res: any) => {
        console.log(res);
        this.getTodos()
        alert(res.msg)
      })
    }
    this.myTodo = {
      title: '',
      description: '',
      created: this.myTodo.created
    }
    this.isEdit = !true
  }
  back() {
    this.myTodo = {
      title: '',
      description: '',
      created: ''
    }
    this.isEdit = false
  }


  deleteTodo(todos: any) {
    if (confirm('Are you sure to delete this items?')) {
      this._todoService.deleteTodo(todos._id).subscribe((res) => {
        console.log(res);
        this.getTodos()
      })

    }

  }
}
