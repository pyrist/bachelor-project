import {Component, Input, OnInit} from '@angular/core';
import {ConditionVitals} from "../../../../../types/conditionVitals";
import {Apollo, gql} from "apollo-angular";
import {of} from "rxjs";
import {newArray} from "@angular/compiler/src/util";
import {ArrayToStringService} from "../../../../array-to-string.service";

@Component({
  selector: 'app-condition-vitals',
  templateUrl: './condition-vitals.component.html',
  styleUrls: ['./condition-vitals.component.css']
})
export class ConditionVitalsComponent implements OnInit {
  @Input() id!: number | undefined
  conditionVitals: ConditionVitals | undefined
  bloodPressures: number[][] | undefined
  constructor(private apollo: Apollo, public arrayToString: ArrayToStringService) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          conditionVitals(id: ${this.id}) {
            id
            hr
            pulse_rate
            blood_glucose_level
            body_temperature
            pain_scale
            cohb_1
            etc_o2_1
            no_vitals_assess_vital_signs_destination
            hr_assess_vital_signs_destination
            pulse_rate_assess_vital_signs_destination
            pulse_oximetry_assess_vital_signs_destination
            co2_assess_vital_signs_destination
            blood_glucose_level_assess_vital_signs_destination
            body_temperature_assess_vital_signs_destination
            cohb_assess_vital_signs_destination
            etco2_assess_vital_signs_destination
            po2
            pco2
            ph
            sbic
            pulse_oximetry
            bs
            cohb_2
            co
            etc_o2_2
            hr_vital_trend_tables_hr
            systol
            diastol
            systol_vital_trend_tables_nibp
            diastol_vital_trend_tables_nibp
            vas
            pulse
            rr
            sp_o2
            temp
            respiratory_rate
            co2
            blood_glucose_too_high
            blood_glucose_too_low
            pulse_oximetry_under_oxygen_assess_vital_signs_destination
            pulse_oximetry_under_oxygen
            blood_glucose_too_low_destination
            blood_glucose_too_high_destination
            pulse_rhythm_irregular_destination
            pulse_rhythm_regular_destination
            pulse_rhythm_irregular
            pulse_rhythm_regular
            normal_table_result
            abnormal_table_result
            severe_table_result
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.conditionVitals = res.data.conditionVitals;

      var x = new Array((this.conditionVitals?.systol?.length ?? 0) + (this.conditionVitals?.systol_vital_trend_tables_nibp?.length ?? 0));

      for (var i = 0; i < x.length; i++) {
        x[i] = new Array(2);
      }

      var bloodPressureLength1 = this.conditionVitals?.systol?.length ?? 0
      for(var i = 0; i < bloodPressureLength1; i++){
        // @ts-ignore
        if(this.conditionVitals?.systol[i] != null && this.conditionVitals?.diastol[i] != null){
          x[i][0] = this.conditionVitals?.systol[i]
          x[i][1] = this.conditionVitals?.diastol[i]
        }
      }

      var bloodPressureLength2 = this.conditionVitals?.systol_vital_trend_tables_nibp?.length ?? 0
      for(var i = 0; i < bloodPressureLength2; i++){
        // @ts-ignore
        if(this.conditionVitals?.systol_vital_trend_tables_nibp[i] != null && this.conditionVitals?.diastol_vital_trend_tables_nibp[i] != null) {
          x[i][0] = this.conditionVitals?.systol_vital_trend_tables_nibp[i]
          x[i][1] = this.conditionVitals?.diastol_vital_trend_tables_nibp[i]
        }
      }

      this.bloodPressures = x;
    });
  }
}
