import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
  { path: 'add-edit', component: AddEditComponent },
  { path: 'user-list', component: UserListComponent },
  { path: '', redirectTo: '/add-edit', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
