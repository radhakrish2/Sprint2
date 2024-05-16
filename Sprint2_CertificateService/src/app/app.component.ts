import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CertificateComponent } from './certificate/certificate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CertificateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CertificateManagementApp';
}
