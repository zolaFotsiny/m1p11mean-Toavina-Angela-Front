import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ServicesService } from '../../../app.service';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';



interface Utilisateur {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  type_utilisateur: string;
  __v: number;
}

interface Employee {
  _id: string;
  id_utilisateur: Utilisateur;
  date_creation: string;
  __v: number;
}

interface Service {
  isOffreSpeciale: boolean;
  _id: string;
  designation: string;
  prix: number;
  duree: number;
  commission_pourcentage: number;
  etat: number;
  date_insertion: string;
  __v: number;
}

interface Tache {
  _id: string;
  id_employee: Employee;
  id_service: Service;
  id_rendezvous: string;
  date_debut: string;
  remarque: string;
  etat: number;
  __v: number;
  date_fait: string;
}

@Component({
  selector: 'app-drag',
  standalone: true,
  imports: [DragDropModule, CommonModule, NzBadgeModule, NzCardModule, NgbPopoverModule],
  templateUrl: './drag.component.html',
  styleUrl: './drag.component.scss'
})
export class DragComponent {
  title = 'angular-drag-drop-tutorial';
  todo: Tache[] = [];
  done: Tache[] = [];

  constructor(private servicesService: ServicesService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.servicesService.getTaches().subscribe(taches => {
      // Ici, vous pouvez décider quelles tâches vont dans 'todo' et lesquelles vont dans 'done'
      this.todo = taches.filter(tache => tache.etat === 1);
      this.done = taches.filter(tache => tache.etat !== 1);
    });
  }

  drop(event: CdkDragDrop<Tache[]>) {
    if (event.previousContainer === event.container) {
      // Reorder items within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move items between lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    if (event.container.id === 'done') {
      const tache = event.container.data[event.currentIndex];
      this.servicesService.validateTask(tache._id).subscribe(() => {
        console.log('Tâche validée avec succès.');
      }, error => {
        console.error('Erreur lors de la validation de la tâche', error);
      });
    }

  }


}
