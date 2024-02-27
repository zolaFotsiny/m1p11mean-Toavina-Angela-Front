import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../../app.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-fiche',
  standalone: true,
  imports: [],
  templateUrl: './employee-fiche.component.html',
  styleUrl: './employee-fiche.component.scss'
})
export class EmployeeFicheComponent implements OnInit {

  @Input() empId!: string;

  emp: any;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService,
    public activeModal: NgbActiveModal // Injection de NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.empId !== null) {
      this.servicesService.findEmpById(this.empId).subscribe(
        data => {
          console.log("ggggggggggggggggggggggg", data.data);
          this.emp = data.data;
          console.log(this.emp);
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      console.error('Error: id is null');
    }

  }
}
