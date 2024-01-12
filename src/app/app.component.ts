
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-1';

  constructor(private _dialog: MatDialog, private router: Router) { }

  openAddEditForm() {
    this._dialog.open(AddEditComponent, {
      data: { mode: 'add' } 
    });
  }

  openEmployeeList() {
    console.log('Navigating to Employee List');
    this.router.navigate(['/employee-list']);
  }

  openUserList() {
    this.router.navigate(['/user-list']);
  }
}
