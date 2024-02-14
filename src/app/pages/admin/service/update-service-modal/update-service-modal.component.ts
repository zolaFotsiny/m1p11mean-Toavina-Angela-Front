// update-service-modal.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-service-modal',
  templateUrl: './update-service-modal.component.html',
  styleUrls: ['./update-service-modal.component.scss']
})
export class UpdateServiceModalComponent {
  @Input() service: any;
  @Output() updateService = new EventEmitter<any>();

  onUpdateService() {
    // Implement your update logic here
    // ...

    // Emit the updated service
    this.updateService.emit(this.service);
  }
}
