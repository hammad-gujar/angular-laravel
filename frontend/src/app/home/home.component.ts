import { TaskService } from './../_services/task.service';
import { Task } from './../task/task';
import { AuthenticationService } from './../_services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './../task-dialog/task-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  // todo = this.store.collection('todo').valueChanges({idField: 'id'});
  // inProgress = this.store.collection('inProgress').valueChanges({idField: 'id'});
  // done = this.store.collection('done').valueChanges({idField: 'id'});
  
  todo: [];
  inProgress: [];
  done: [];
  error: string;

  currentUser: any;

  constructor(
    private dialog: MatDialog,
    private store: AngularFirestore,
    private taskService: TaskService,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.taskService.getTasks([], 'fetchTask')
    .then(data => {
          this.todo = data[0]['todo'];
          this.inProgress = data[0]['inProgress'];
          this.done = data[0]['done'];
    })
    .catch(error => {
          this.error = error;
    })
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


  drop(event: CdkDragDrop<Task[]>): void {
    if(event.previousContainer == event.container) {
      return;
    }
    const item = event.previousContainer.data[event.previousIndex];

    if(event.previousContainer.id !== event.container.id) {
      item.status = event.container.id;
    }
    this.taskService.backEndCall(item, 'updateTask')
    .then(() => {})
    .catch(error => {
      this.error = error;
    })
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  } 

  edit(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true
      }

    });

    dialogRef.afterClosed().subscribe((result: TaskDialogResult) => {
      let endpoint;
      if(result.delete) {  
        endpoint = 'deleteTask';
      } else {
        endpoint = 'updateTask';
      }
      this.taskService.backEndCall(task, endpoint)
      .then(
          data => {
          this.todo = data.original[0]['todo'];
          this.inProgress = data.original[0]['inProgress'];
          this.done = data.original[0]['done'];
          })
          .catch(error => {            
            this.error = error;
          })
    });
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {}
      }
    });
    dialogRef
    .afterClosed()
    .subscribe((result: TaskDialogResult) => {
      let data = {
        title: result.task.title,
        description: result.task.description,
        status: 'todo',
        username: this.currentUser.username
      }
      return this.taskService.backEndCall(data, 'createTask')
      .then(data => {
            this.todo = data.original[0]['todo'];
            this.inProgress = data.original[0]['inProgress'];
            this.done = data.original[0]['done'];
          })
          .catch(error => {      
            this.error = error;
          });
    })
  }

}
