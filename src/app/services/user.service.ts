
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addEmployeeLocally(data: any): Observable<any> {
    const existingData = JSON.parse(localStorage.getItem('userData') || '[]');
    existingData.push(data);
    localStorage.setItem('userData', JSON.stringify(existingData));
    return of(data);
  }

  getEmployeesLocally(): any[] {
    const existingDataString = localStorage.getItem('userData');
    return existingDataString ? JSON.parse(existingDataString) : [];
  }

  clearAllEmployeesLocally(): void {
    localStorage.removeItem('userData');
  }
}
