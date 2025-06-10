import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalSubject = new Subject<{
    title: string;
    message: string;
    onConfirm: () => void;
  }>();

  modal$ = this.modalSubject.asObservable();

  open(title: string, message: string, onConfirm: () => void) {
    this.modalSubject.next({ title, message, onConfirm });
  }
}
