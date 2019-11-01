import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TplEditService {
  private id: number = 1;

  constructor() {}

  genId() {
    this.id += 1;
    return this.id;
  }
}
