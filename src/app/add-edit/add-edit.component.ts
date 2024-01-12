// add-edit.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  userForm: FormGroup;
  userRole: string[] = ['Admin', 'User'];
  mode: 'add' | 'edit';
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data.mode || 'add';

    this.userForm = this.fb.group({
      firstName: [data.user ? data.user.firstName : '', Validators.required],
      lastName: [data.user ? data.user.lastName : '', Validators.required],
      email: [data.user ? data.user.email : '', [Validators.required, Validators.email]],
      dob: [data.user ? data.user.dob : '', Validators.required],
      gender: [data.user ? data.user.gender : '', Validators.required],
      role: [data.user ? data.user.role : '', Validators.required],
    });
  }

  ngOnInit(): void {}

  onCancel() {
    this.dialogRef.close();
  }

  onFormSubmit() {

    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
