import {Component, Input, OnInit} from '@angular/core';
import {Respiratory} from "../../../../../types/respiratory";
import {Apollo, gql} from "apollo-angular";
import {ArrayToStringService} from "../../../../array-to-string.service";
import {TextCleanerService} from "../../../../text-cleaner.service";

@Component({
  selector: 'app-respiratory',
  templateUrl: './respiratory.component.html',
  styleUrls: ['./respiratory.component.css']
})
export class RespiratoryComponent implements OnInit {
  @Input() id!: number | undefined
  respiratory: Respiratory | undefined
  interventionsPerformed: string[] = []
  text_primary_assessment_airways: string | null = ""
  text_objectiv_airways: string | null = ""
  primary_assessment_airways_comment: string | null = ""
  observation_airways_comment: string | null = ""
  text_intervention_airways: string | null = ""
  text_primary_assessment_respirations: string | null = ""
  text_objectiv_resperations: string | null = ""
  primary_assessment_breathing_comment: string | null = ""
  observation_breathing_comment: string | null = ""
  text_primary_assessment_resp_lung_sounds: string | null = ""
  text_objectiv_resperation_lung_sounds: string | null = ""
  text_intervention_breathings: string | null = ""
  text_intervention_rescues: string | null = ""
  mode: string | null = ""


  constructor(private apollo: Apollo, public arrayToString: ArrayToStringService, private textCleaner: TextCleanerService) { }

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
        this.interventionsPerformed.push("Removal of fluids by suction");
      }
      if(this.respiratory?.jaw_thrust_maneuver_performed == 1){
        this.interventionsPerformed.push("Jaw thrust maneuver");
      }
      if(this.respiratory?.cervical_collar_administered == 1){
        this.interventionsPerformed.push("Cervical collar");
      }
      if(this.respiratory?.patient_placed_in_recovery_position == 1){
        this.interventionsPerformed.push("Patient placed in recovery position");
      }
      if(this.respiratory?.foreign_object_removed_from_airway == 1){
        this.interventionsPerformed.push("Foreign object removed from airway");
      }
      if(this.respiratory?.non_rebreather_mask_administered == 1){
        this.interventionsPerformed.push("Non-rebreather mask administered");
      }
      if(this.respiratory?.intubated == 1){
        this.interventionsPerformed.push("Intubated");
      }
      if(this.respiratory?.patient_reclined == 1){
        this.interventionsPerformed.push("Patient reclined");
      }
      if(this.respiratory?.patient_placed_on_mattress == 1){
        this.interventionsPerformed.push("Patient placed on mattress");
      }
      if(this.respiratory?.patient_sat == 1){
        this.interventionsPerformed.push("Patient placed in sitting position");
      }
      if(this.respiratory?.patient_carried == 1){
        this.interventionsPerformed.push("Patient carried");
      }
      if(this.respiratory?.assisted_breathing_administered == 1){
        this.interventionsPerformed.push("Assisted breathing administered");
      }

      this.text_primary_assessment_airways = this.textCleaner.clean(this.respiratory?.text_primary_assessment_airways)
      this.text_objectiv_airways = this.textCleaner.clean(this.respiratory?.text_objectiv_airways)
      this.primary_assessment_airways_comment = this.textCleaner.clean(this.respiratory?.primary_assessment_airways_comment)
      this.observation_airways_comment = this.textCleaner.clean(this.respiratory?.observation_airways_comment)
      this.text_intervention_airways = this.textCleaner.clean(this.respiratory?.text_intervention_airways)
      this.text_primary_assessment_respirations = this.textCleaner.clean(this.respiratory?.text_primary_assessment_respirations)
      this.text_objectiv_resperations = this.textCleaner.clean(this.respiratory?.text_objectiv_resperations)
      this.primary_assessment_breathing_comment = this.textCleaner.clean(this.respiratory?.primary_assessment_breathing_comment)
      this.observation_breathing_comment = this.textCleaner.clean(this.respiratory?.observation_breathing_comment)
      this.text_primary_assessment_resp_lung_sounds = this.textCleaner.clean(this.respiratory?.text_primary_assessment_resp_lung_sounds)
      this.text_objectiv_resperation_lung_sounds = this.textCleaner.clean(this.respiratory?.text_objectiv_resperation_lung_sounds)
      this.text_intervention_breathings = this.textCleaner.clean(this.respiratory?.text_intervention_breathings)
      this.text_intervention_rescues = this.textCleaner.clean(this.respiratory?.text_intervention_rescues)
      this.mode = this.textCleaner.clean(this.respiratory?.mode)
    });
  }
}
