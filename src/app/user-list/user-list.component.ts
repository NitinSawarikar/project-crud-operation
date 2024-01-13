import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserDataService } from '../user-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'dob', 'gender', 'role', 'edit', 'delete'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.userDataService.getUserData().subscribe(
      data => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(AddEditComponent, {
      width: '400px',
      data: { mode: 'edit', user: { ...user } },
    });

    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser !== undefined) {
        this.updateDataSource(user, updatedUser);
        this.updateUserData(updatedUser);
      }
    });
  }

  deleteUser(user: any) {
    const index = this.dataSource.data.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
      this.userDataService.deleteUserData(user);
    }
  }

  private updateDataSource(oldUser: any, newUser: any) {
    const index = this.dataSource.data.findIndex(u => u.email === oldUser.email);
    if (index !== -1) {
      this.dataSource.data[index] = newUser;
      this.dataSource._updateChangeSubscription();
    }
  }

  private updateUserData(user: any) {
    this.userDataService.updateUserData(user);
  }
}
