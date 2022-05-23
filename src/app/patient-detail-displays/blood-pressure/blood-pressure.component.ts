import { Component, OnInit, Input } from '@angular/core';
import {BloodPressure} from "../../../types/bloodPressure";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-blood-pressure',
  templateUrl: './blood-pressure.component.html',
  styleUrls: ['./blood-pressure.component.css']
})
export class BloodPressureComponent implements OnInit {
  @Input() id!: number | undefined
  bloodPressure: BloodPressure | undefined;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          bloodPressure(id: ${this.id}) {
            id
            sbp
            dbp
            ibp_sys
            ibp_dia
            ibp_sys_assess_vital_signs_destination
            ibp_dia_assess_vital_signs_destination
            sbp_assess_vital_signs_destination
            dbp_assess_vital_signs_destination
            method_of_blood_pressure
            method_of_blood_pressure_assess_vital_signs_destination
            low_blood_pressure
            high_blood_pressure
            normal_blood_pressure
            normal_table_result
            abnormal_table_result
            severe_table_result
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.bloodPressure = res.data.bloodPressure;
    });
  }

}
