import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  userData$: Observable<any[]> = this.userDataSubject.asObservable();

  constructor() {
    this.loadUserData();
  }

  private loadUserData() {
    const dataString = localStorage.getItem('userData');
    const userData = dataString ? JSON.parse(dataString) : [];
    this.userDataSubject.next(userData);
  }

  private setUserData(data: any[]): void {
    localStorage.setItem('userData', JSON.stringify(data));
    this.userDataSubject.next(data);
  }

  getUserData(): Observable<any[]> {
    return this.userData$;
  }

  addUserData(data: any): void {
    const existingData = this.userDataSubject.getValue();
    existingData.push(data);
    this.setUserData(existingData);
  }

  deleteUserData(user: any): void {
    const existingData = this.userDataSubject.getValue();
    const index = existingData.findIndex((u) => u.email === user.email);
    if (index !== -1) {
      existingData.splice(index, 1);
      this.setUserData(existingData);
    }
  }

  updateUserData(updatedUser: any): void {
    const existingData = this.userDataSubject.getValue();
    const index = existingData.findIndex(user => user.email === updatedUser.email);
    if (index !== -1) {
      existingData[index] = updatedUser;
      this.setUserData(existingData);
    }
  }
}
