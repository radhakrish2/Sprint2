import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlacementComponent } from './placement/placement.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,PlacementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PlacementManagementApp';
}
