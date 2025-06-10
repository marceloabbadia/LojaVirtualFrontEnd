import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { AppModalComponent } from "./shared/modal/modal";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, AppModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'loja-hm';
}
