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

  constructor(private dialog: MatDialog, private router: Router) { }

  openAddEditForm() {
    this.dialog.open(AddEditComponent, {
      data: { mode: 'add' }
    });
  }

  openUserList() {
    this.router.navigate(['/user-list']);
  }
}
