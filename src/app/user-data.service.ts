
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  getUserData(): any[] {
    const dataString = localStorage.getItem('userData');
    return dataString ? JSON.parse(dataString) : [];
  }

  addUserData(data: any): void {
    const existingData = this.getUserData();
    existingData.push(data);
    this.setUserData(existingData);
  }

  setUserData(data: any[]): void {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  deleteUserData(user: any): void {
    const existingData = this.getUserData();
    const index = existingData.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      existingData.splice(index, 1);
      this.setUserData(existingData); 
    }
  }

  updateUserData(updatedUser: any): void {
    const existingData = this.getUserData();
    const index = existingData.findIndex(user => user.email === updatedUser.email);
    if (index !== -1) {
      existingData[index] = updatedUser;
      this.setUserData(existingData); 
    }
  }

}
