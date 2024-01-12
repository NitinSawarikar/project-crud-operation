
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
    this.dataSource.data = this.userDataService.getUserData();
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
      console.log('Dialog result:', updatedUser);
      if (updatedUser !== undefined) {
        const index = this.dataSource.data.findIndex(u => u.email === user.email);
  
        this.dataSource.data[index] = updatedUser;
        this.dataSource._updateChangeSubscription(); 
  
        this.userDataService.updateUserData(updatedUser);
      }
    });
  }
  

  deleteUser(user: any) {
    console.log('Delete user:', user);

    const index = this.dataSource.data.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); 
      this.userDataService.deleteUserData(user); 
    }
  }
}
