import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CustomerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PlacementManagementApp';
}
