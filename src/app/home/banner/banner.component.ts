import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'home-banner',
  standalone: true,
  imports: [NzCarouselModule, CommonModule, LoginComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  images = ['assets/hello.png', 'assets/pngegg(2).png', 'assets/huhu.png'];
  ensemblesDeTexte: { titre: string; sousTitre: string }[] = [
    {
      titre: "Se détendre et s'indulger",
      sousTitre: "Profitez d'un moment de luxe et de bien-être. Notre salon de beauté vous propose des soins de qualité pour prendre soin de votre peau et de votre esprit."
    },
    {
      titre: "Renaître et revivre",
      sousTitre: "Découvrez notre gamme de services de soins capillaires conçus pour rafraîchir et restaurer votre beauté naturelle."
    },
    {
      titre: "Se détendre et découvrir",
      sousTitre: "Découvrez le relaxation ultime avec nos services de spa qui vous font se sentir rajeuni et renouvelé."
    }
  ];


}
