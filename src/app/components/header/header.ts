import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Products } from '../../pages/products/products';
import { Login } from "../../pages/login/login";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, Login],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = true;
}
