import {Component, Input, OnInit} from '@angular/core';
import {Treatment} from "../../../types/treatment";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  @Input() id!: number | undefined
  treatment: Treatment | undefined
  medications: string[][] | undefined

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          treatment(id: ${this.id}) {
            id
            pain_not_required
            temp_not_required
            medication_dosage
            medication_dosage_units
            medication_group
            medications_given
            medication_amount
            medication_name
            medication_id
            af_not_required_not_relevant
            af_not_required_not_technically_measurable
            pain_not_required_not_relevant
            pain_not_required_not_medically_measurable
            pain_not_required_not_technically_measurable
            pulse_not_required_not_medically_measurable
            pulse_not_required_not_relevant
            pulse_not_required_not_technically_measurable
            sp_o2_not_required_not_relevant
            sp_o2_not_required_not_technically_measurable
            sp_o2_not_required_not_medically_measurable
            temp_not_required_not_relevant
            temp_not_required_not_technically_measurable
            temp_not_required_not_medically_measurable
            bp_not_required_not_relevant
            bp_not_required_not_technically_measurable
            bp_not_required_not_medically_measurable
            blood_sugar_not_required_not_relevant
            blood_sugar_not_required_not_technically_measurable
            blood_sugar_not_required_not_medically_measurable
            af_not_required
            pulse_not_required
            sp_o2_not_required
            bp_not_required
            etc2_not_required
            cohb_not_required
            bz_not_required
            patient_given_medication
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.treatment = res.data.treatment;

      var prevUnit = "";

      const notNull = (array: [string | number] | undefined, i: number) => { return array != null && array[i] != null }
      const combineDoseAndUnit = (dosage: [any] | undefined, unit: [string] | undefined, i: number) => {
        if (notNull(dosage, i) && (isNaN(dosage![i]) || isNaN(parseFloat(dosage![i])))){
          return dosage![i].toString()
        } else if (notNull(dosage, i) && notNull(unit, i)) {
          return dosage![i].toString() + unit![i];
          prevUnit = unit![i];
        } else if (notNull(dosage, i) && unit != null && unit![i] == null) {
          return dosage![i].toString() + prevUnit;
        } else {
          return null;
        }
      }

      if (this.treatment?.medication_amount != null){
        let zip = this.treatment?.medication_amount.map((item, i) =>
          [(this.treatment?.medications_given != null ? this.treatment?.medications_given[i]?? null : '') + (this.treatment?.medication_name != null ? ' / ' + this.treatment?.medication_name[i]?? null : ''),
            notNull(this.treatment?.medication_group, i) ? this.treatment?.medication_group[i] : null,
            notNull(this.treatment?.medication_id, i) ? this.treatment?.medication_id[i] : null,
            combineDoseAndUnit(this.treatment?.medication_dosage, this.treatment?.medication_dosage_units, i),
            combineDoseAndUnit(this.treatment?.medication_amount, this.treatment?.medication_dosage_units, i)]
        );
        this.medications = zip;
      }
    });
  }
}
