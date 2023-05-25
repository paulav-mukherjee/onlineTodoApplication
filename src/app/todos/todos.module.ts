import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './pipe/filter.pipe';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


@NgModule({
  declarations: [
    TodosComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    TodosRoutingModule,
    NgxPaginationModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class TodosModule { }
