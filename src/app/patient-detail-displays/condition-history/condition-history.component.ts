import {Component, Input, OnInit} from '@angular/core';
import {ConditionPre} from "../../../types/conditionPre";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-condition-history',
  templateUrl: './condition-history.component.html',
  styleUrls: ['./condition-history.component.css']
})
export class ConditionHistoryComponent implements OnInit {
  @Input() id!: number | undefined
  conditionPre: ConditionPre | undefined
  chiefComplaintIdentified = "";
  chiefComplaintProvocation = "";
  riskFactorIdentified = "";
  preExistingConditionIdentified = "";

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          conditionPre(id: ${this.id}) {
            id
            pre_existing_condition
            pregnant_possible_but_not_pregnant
            pregnant_not_possible
            pregnant_possible
            pregnant_possible_and_pregnant
            bacterial_infection
            chief_complaint_pain
            chief_complaint_shortness_of_breath
            chief_complaint_worsening_condition
            chief_complaint_consciousness_disorder
            chief_complaint_fainting
            chief_complaint_bleeding
            chief_complaint_pain_or_discomfort_chest
            chief_complaint_pain_or_discomfort_stomach
            chief_complaint_vertigo
            chief_complaint_pain_or_discomfort_extremities
            chief_complaint_pain_or_discomfort_head
            chief_complaint_nausea
            chief_complaint_vomiting
            chief_complaint_malaise
            chief_complaint_pain_or_discomfort_lumbar
            chief_complaint_seizure
            chief_complaint_diarrhea
            chief_complaint_fever
            chief_complaint_provoked_by_walking
            chief_complaint_provoked_by_pressure
            chief_complaint_provoked_by_laying
            chief_complaint_provoked_by_movement
            chief_complaint_provoked_by_sitting
            chief_complaint_provoked_by_standing
            chief_complaint_provoked_by_pain
            chief_complaint_provoked_by_strain
            chief_complaint_always_present
            chief_complaint_provoked_by_breathing
            chief_complaint_trembling
            chief_complaint_caused_by_fall_or_tripping
            chief_complaint_caused_by_accident
            chief_complaint_caused_by_fight
            risk_factor_age
            risk_factor_smoking
            risk_factor_high_blood_pressure
            risk_factor_sedentary
            risk_factor_diabetes
            risk_factor_overweight
            risk_factor_alcohol
            risk_factor_stress
            last_excretion_less_than_one_hour_ago
            last_excretion_less_than_four_hours_ago
            last_excretion_less_than_twelve_hours_ago
            last_meal_less_than_twelve_hours_ago
            last_meal_less_than_four_hours_ago
            last_meal_less_than_one_hour_ago
            last_meal_less_than_one_day_ago
            last_excretion_less_than_one_day_ago
            last_excretion_less_than_one_week_ago
            last_excretion_less_than_one_month_ago
            last_meal_less_than_one_week_ago
            last_meal_less_than_one_month_ago
            last_mens_current
            last_mens_less_than_a_week_ago
            last_mens_less_than_one_month_ago
            last_mens_more_than_a_month_ago
            chief_complaint_severity_score
            chief_complaint_palliation_protective_posture
            chief_complaint_palliation_laying
            chief_complaint_palliation_sitting
            chief_complaint_palliation_cooling
            chief_complaint_palliation_warming
            chief_complaint_palliation_standing
            chief_complaint_quality_pressure
            chief_complaint_quality_stabbing
            chief_complaint_quality_pulling
            chief_complaint_quality_dizzy
            chief_complaint_quality_burning
            chief_complaint_quality_tearing
            chief_complaint_pain_or_discomfort_radiating
            chief_complaint_began_less_than_an_hour_ago
            chief_complaint_began_less_than_four_hours_ago
            chief_complaint_began_less_than_twelve_hours_ago
            chief_complaint_began_less_than_twenty_four_hours_ago
            chief_complaint_began_less_than_one_week_ago
            chief_complaint_began_less_than_one_month_ago
            chief_complaint_not_changing
            chief_complaint_improving_condition
            chief_complaint_comes_and_goes
            allergic_to_penicillin
            allergic_to_pollen_grass_dust
            taking_medicine
            no_pre_existing_condition
            pre_existing_illness
            pre_existing_cancer
            pre_existing_asthma
            pre_existing_apoplexy
            pre_existing_heart_disease
            pre_existing_heart_failure
            pre_existing_epilepsy
            pre_existing_psychological_issues
            pre_existing_atrial_fibrillation
            pre_existing_copd
            chief_complaint_narrative
            chief_complaint_provocation
            anamnese_info
            event_beginn
            risk_factors
            chief_complaint_region
            allergy
            medication
            chief_complaint_psychological_issue
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.conditionPre = res.data.conditionPre;
      if (this.conditionPre?.chief_complaint_pain == 1){
        this.chiefComplaintIdentified += ", Pain";
      }
      if (this.conditionPre?.chief_complaint_shortness_of_breath == 1){
        this.chiefComplaintIdentified += ", Shortness of breath";
      }
      if (this.conditionPre?.chief_complaint_worsening_condition == 1){
        this.chiefComplaintIdentified += ", Worsening condition";
      }
      if (this.conditionPre?.chief_complaint_consciousness_disorder == 1){
        this.chiefComplaintIdentified += ", Consciousness disorder";
      }
      if (this.conditionPre?.chief_complaint_fainting == 1){
        this.chiefComplaintIdentified += ", Fainting";
      }
      if (this.conditionPre?.chief_complaint_bleeding == 1){
        this.chiefComplaintIdentified += ", Bleeding";
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_chest == 1){
        this.chiefComplaintIdentified += ", Pain or discomfort in chest";
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_stomach == 1){
        this.chiefComplaintIdentified += ", Pain or discomfort in stomach";
      }
      if (this.conditionPre?.chief_complaint_vertigo == 1){
        this.chiefComplaintIdentified += ", Vertigo";
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_extremities == 1){
        this.chiefComplaintIdentified += ", Pain or discomfort in extremities";
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_head == 1){
        this.chiefComplaintIdentified += ", Pain or discomfort in head";
      }
      if (this.conditionPre?.chief_complaint_nausea == 1){
        this.chiefComplaintIdentified += ", Nausea";
      }
      if (this.conditionPre?.chief_complaint_vomiting == 1){
        this.chiefComplaintIdentified += ", Vomiting";
      }
      if (this.conditionPre?.chief_complaint_malaise == 1){
        this.chiefComplaintIdentified += ", Malaise";
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_lumbar == 1){
        this.chiefComplaintIdentified += ", Pain or discomfort in lumbar region";
      }
      if (this.conditionPre?.chief_complaint_seizure == 1){
        this.chiefComplaintIdentified += ", Seizure";
      }
      if (this.conditionPre?.chief_complaint_diarrhea == 1){
        this.chiefComplaintIdentified += ", Diarrhea";
      }
      if (this.conditionPre?.chief_complaint_fever == 1){
        this.chiefComplaintIdentified += ", Fever";
      }
      if (this.conditionPre?.chief_complaint_trembling == 1){
        this.chiefComplaintIdentified += ", Trembling";
      }
      if (this.conditionPre?.chief_complaint_psychological_issue == 1){
        this.chiefComplaintIdentified += ", Psychological issue";
      }
      if (this.chiefComplaintIdentified == ""){
        this.chiefComplaintIdentified = "None";
      }
      this.chiefComplaintIdentified = this.chiefComplaintIdentified?.replace(", ", "");

      if (this.conditionPre?.chief_complaint_provoked_by_walking == 1){
        this.chiefComplaintProvocation += ", Walking";
      }
      if (this.conditionPre?.chief_complaint_provoked_by_pressure == 1){
        this.chiefComplaintProvocation += ", Pressure";
      }
      if (this.conditionPre?.chief_complaint_provoked_by_laying == 1){
        this.chiefComplaintProvocation += ", Laying";
      }
      if (this.conditionPre?.chief_complaint_provoked_by_movement == 1){
        this.chiefComplaintProvocation += ", Movement";
      }
      if (this.conditionPre?.chief_complaint_provoked_by_sitting == 1){
        this.chiefComplaintProvocation += ", Sitting";
      }
      if (this.conditionPre?.chief_complaint_provoked_by_standing == 1){
        this.chiefComplaintProvocation += ", Standing";
      }
      if (this.conditionPre?.chief_complaint_provoked_by_pain == 1){
        this.chiefComplaintProvocation += ", Pain";
      }
      if (this.conditionPre?.chief_complaint_provoked_by_strain == 1){
        this.chiefComplaintProvocation += ", Strain";
      }
      if (this.conditionPre?.chief_complaint_provoked_by_breathing == 1){
        this.chiefComplaintProvocation += ", Breathing";
      }
      this.chiefComplaintProvocation = this.chiefComplaintProvocation?.replace(", ", "");

      if (this.conditionPre?.risk_factor_age == 1){
        this.riskFactorIdentified += ", Age";
      }
      if (this.conditionPre?.risk_factor_alcohol == 1){
        this.riskFactorIdentified += ", Alcohol";
      }
      if (this.conditionPre?.risk_factor_smoking == 1){
        this.riskFactorIdentified += ", Smoking";
      }
      if (this.conditionPre?.risk_factor_high_blood_pressure == 1){
        this.riskFactorIdentified += ", High blood pressure";
      }
      if (this.conditionPre?.risk_factor_sedentary == 1){
        this.riskFactorIdentified += ", Sedentary lifestyle";
      }
      if (this.conditionPre?.risk_factor_diabetes == 1){
        this.riskFactorIdentified += ", Diabetes";
      }
      if (this.conditionPre?.risk_factor_overweight == 1){
        this.riskFactorIdentified += ", Overweight";
      }
      if (this.conditionPre?.risk_factor_stress == 1){
        this.riskFactorIdentified += ", Stress";
      }
      this.riskFactorIdentified = this.riskFactorIdentified?.replace(", ", "");

      if (this.conditionPre?.no_pre_existing_condition == 1){
        this.preExistingConditionIdentified += "None";
      }
      if (this.conditionPre?.pre_existing_apoplexy == 1){
        this.preExistingConditionIdentified += ", Apoplexy";
      }
      if (this.conditionPre?.pre_existing_illness == 1){
        this.preExistingConditionIdentified += ", Illness";
      }
      if (this.conditionPre?.pre_existing_cancer == 1){
        this.preExistingConditionIdentified += ", Cancer";
      }
      if (this.conditionPre?.pre_existing_asthma == 1){
        this.preExistingConditionIdentified += ", Asthma";
      }
      if (this.conditionPre?.pre_existing_heart_disease == 1){
        this.preExistingConditionIdentified += ", Heart disease";
      }
      if (this.conditionPre?.pre_existing_heart_failure == 1){
        this.preExistingConditionIdentified += ", Heart failure";
      }
      if (this.conditionPre?.pre_existing_epilepsy == 1){
        this.preExistingConditionIdentified += ", Epilepsy";
      }
      if (this.conditionPre?.pre_existing_psychological_issues == 1){
        this.preExistingConditionIdentified += ", Psychological issues";
      }
      if (this.conditionPre?.pre_existing_atrial_fibrillation == 1){
        this.preExistingConditionIdentified += ", Atrial fibrillation";
      }
      if (this.conditionPre?.pre_existing_copd == 1){
        this.preExistingConditionIdentified += ", COPD";
      }
      this.preExistingConditionIdentified = this.preExistingConditionIdentified?.replace(", ", "");
    });
  }
}
