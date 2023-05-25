import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../Interfaces/todo.interface';

@Pipe({
  name: 'todo_filter'
})
export class FilterPipe implements PipeTransform {

  transform(totalArray: Todo[], searchedItem: string) {
    if(totalArray.length>=3){
      let searchTodo = totalArray.filter((item: Todo) => {
        return (
          item.title.toLowerCase().trim().includes(searchedItem.toLowerCase().trim())
          || item.description.toLowerCase().trim().includes(searchedItem.toLowerCase().trim())
          )
      });
      return searchTodo;
    }
    return totalArray;
  }

}
