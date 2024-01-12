// employee-list.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class UserListComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'role', 'edit'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private userDataService: UserDataService) {}

  ngOnInit(): void {
    const users = this.userDataService.getUserData(); // Assuming your service has a method to get user data
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  editUser(user: any): void {
    // Open the AddEditComponent dialog with the user data
    const dialogRef = this.dialog.open(AddEditComponent, {
      width: '400px',
      data: { mode: 'edit', user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result if needed after the dialog is closed
      console.log('Dialog result:', result);
    });
  }
}

