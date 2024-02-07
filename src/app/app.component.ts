// import { Component } from '@angular/core';
// import { HeaderComponent } from './components/client/header/header.component';
// import { FooterComponent } from './components/client/footer/footer.component';
// import { BodyComponent } from './components/client/body/body.component';
// import { BannerComponent } from './components/client/banner/banner.component';


// @Component({
//   imports: [
//     HeaderComponent, FooterComponent, BodyComponent, BannerComponent
//   ],
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css',
//   standalone: true // This marks the component as standalone
// })
// export class AppComponent {

// }

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
//   standalone: true // Assurez-vous que cette ligne est présente
// })
// export class AppComponent {
//   title: string = 'votre-application'; // Déclaration explicite de la propriété 'title'
// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'votre-application';
}
