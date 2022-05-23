import {Component, Input, OnInit} from '@angular/core';
import {Respiratory} from "../../../types/respiratory";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-respiratory',
  templateUrl: './respiratory.component.html',
  styleUrls: ['./respiratory.component.css']
})
export class RespiratoryComponent implements OnInit {
  @Input() id!: number | undefined
  respiratory: Respiratory | undefined
  interventionsPerformed = ""

  constructor(private apollo: Apollo) { }

  arrayToString(input: any ): string | undefined {
    var result = input?.toString().replace(new RegExp(',', 'g'), ', ')
    while(result.indexOf(', ') == 0){
      result = result.replace(', ', '')
    }
    return result;
  }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          respiratory(id: ${this.id}) {
            id
            primary_assessment_airways_comment
            primary_assessment_breathing_comment
            text_primary_assessment_resp_lung_sounds
            text_primary_assessment_airways
            text_primary_assessment_respirations
            observation_airways_comment
            observation_breathing_comment
            respiratory_rate_assess_vital_signs_destination
            text_intervention_airways
            text_intervention_breathings
            text_objectiv_airways
            text_objectiv_resperation_lung_sounds
            text_objectiv_resperations
            amount_intervention_oxygens
            freq
            amv
            ie
            ie2
            asb
            pinsp
            trigger
            in_tr
            text_intervention_rescues
            mode
            vt
            rr
            peep
            fio2
            p_max
            energy
            obj_resp_airway_managements_spontaneous
            obj_resp_airway_managements_cpap
            obj_resp_airway_managements_controlled
            obj_resp_airway_managements_assisted
            obj_resp_airway_managements_other
            primary_assessment_resp_airway_mgt_other
            primary_assessment_resp_airway_mgt_spontaneous
            primary_assessment_resp_airway_mgt_assisted
            primary_assessment_resp_airway_mgt_controlled
            primary_assessment_resp_airway_mgt_cpap
            airways_ruddy
            airways_wet
            airways_dry
            blood_in_airways
            breathing_stable
            sibilant_rhonchi
            shortness_of_breath
            copd
            coughing
            spastic_breathing
            rales
            weak_breathing
            clear_airways
            stridor
            aspiration
            tracheostoma
            respiration_normal
            apnea
            cyanosis
            no_respiratory_intervention
            removal_of_fluids_by_suction
            jaw_thrust_maneuver_performed
            cervical_collar_administered
            patient_placed_in_recovery_position
            foreign_object_removed_from_airway
            non_rebreather_mask_administered
            intubated
            other_abnormality
            hyperventilation
            patient_reclined
            patient_placed_on_mattress
            patient_sat
            patient_carried
            assisted_breathing_administered
            normal_table_result
            abnormal_table_result
            severe_table_result
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.respiratory = res.data.respiratory;

      if(this.respiratory?.removal_of_fluids_by_suction == 1){
        this.interventionsPerformed += ", Removal of fluids by suction";
      }
      if(this.respiratory?.jaw_thrust_maneuver_performed == 1){
        this.interventionsPerformed += ", Jaw thrust maneuver";
      }
      if(this.respiratory?.cervical_collar_administered == 1){
        this.interventionsPerformed += ", Cervical collar";
      }
      if(this.respiratory?.patient_placed_in_recovery_position == 1){
        this.interventionsPerformed += ", Patient placed in recovery position";
      }
      if(this.respiratory?.foreign_object_removed_from_airway == 1){
        this.interventionsPerformed += ", Foreign object removed from airway";
      }
      if(this.respiratory?.non_rebreather_mask_administered == 1){
        this.interventionsPerformed += ", Non-rebreather mask administered";
      }
      if(this.respiratory?.intubated == 1){
        this.interventionsPerformed += ", Intubated";
      }
      if(this.respiratory?.patient_reclined == 1){
        this.interventionsPerformed += ", Patient reclined";
      }
      if(this.respiratory?.patient_placed_on_mattress == 1){
        this.interventionsPerformed += ", Patient placed on mattress";
      }
      if(this.respiratory?.patient_sat == 1){
        this.interventionsPerformed += ", Patient placed in sitting position";
      }
      if(this.respiratory?.patient_carried == 1){
        this.interventionsPerformed += ", Patient carried";
      }
      if(this.respiratory?.assisted_breathing_administered == 1){
        this.interventionsPerformed += ", Assisted breathing administered";
      }
      this.interventionsPerformed = this.interventionsPerformed?.replace(", ", "");
    });
  }
}
