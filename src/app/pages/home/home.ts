import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Highlight } from '../../components/highlight/highlight';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Highlight],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, OnDestroy {
  currentIndex = 0;
  animate = false;

  images = [
    'assets/images/slider1.jpg',
    'assets/images/slider2.jpg',
    'assets/images/slider3.jpg',
  ];

  private intervalId!: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.nextSlide(), 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private nextSlide(): void {
    this.animate = true;

    this.currentIndex = (this.currentIndex + 1) % this.images.length;

    setTimeout(() => (this.animate = false), 1000);
  }
}
