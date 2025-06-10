import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class AppModalComponent implements OnInit, OnDestroy {
  showModal = false;
  title = '';
  message = '';
  onConfirm: () => void = () => {};

  private modalSubscription!: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalSubscription = this.modalService.modal$.subscribe((modalData) => {
      this.title = modalData.title;
      this.message = modalData.message;
      this.onConfirm = modalData.onConfirm;
      this.showModal = true;
      document.body.style.overflow = 'hidden';
    });
  }

  confirmAction() {
    this.onConfirm();
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
    document.body.style.overflow = '';
  }

  ngOnDestroy() {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
}
