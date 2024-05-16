import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CollegeComponent } from './college/college.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CollegeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PlacementManagementApp';
}
