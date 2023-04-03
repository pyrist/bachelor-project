import {Component, Input, OnInit} from '@angular/core';
import {ConditionPre} from "../../../../../types/conditionPre";
import {Apollo, gql} from "apollo-angular";
import {TextCleanerService} from "../../../../text-cleaner.service";
import {ArrayToStringService} from "../../../../array-to-string.service";

@Component({
  selector: 'app-condition-history',
  templateUrl: './condition-history.component.html',
  styleUrls: ['./condition-history.component.css']
})
export class ConditionHistoryComponent implements OnInit {
  @Input() id!: number | undefined
  conditionPre: ConditionPre | undefined
  chiefComplaintIdentified: string[] = [];
  chiefComplaintProvocation: string[] = [];
  riskFactorIdentified: string[] = [];
  preExistingConditionIdentified: string[] = [];
  anamnese_info: string | null = "";
  pre_existing_condition: string | null = "";
  chief_complaint_narrative: string | null = "";
  chief_complaint_provocation: string | null = "";
  event_beginn: string | null = "";
  risk_factors: string | null = "";
  chief_complaint_region: string | null = "";
  allergy: string | null = "";
  medication: string | null = "";

  constructor(private apollo: Apollo, private textCleaner: TextCleanerService, public arrayToString: ArrayToStringService) { }

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
        this.chiefComplaintIdentified.push("Pain");
      }
      if (this.conditionPre?.chief_complaint_shortness_of_breath == 1){
        this.chiefComplaintIdentified.push("Shortness of breath");
      }
      if (this.conditionPre?.chief_complaint_worsening_condition == 1){
        this.chiefComplaintIdentified.push("Worsening condition");
      }
      if (this.conditionPre?.chief_complaint_consciousness_disorder == 1){
        this.chiefComplaintIdentified.push("Consciousness disorder");
      }
      if (this.conditionPre?.chief_complaint_fainting == 1){
        this.chiefComplaintIdentified.push("Fainting");
      }
      if (this.conditionPre?.chief_complaint_bleeding == 1){
        this.chiefComplaintIdentified.push("Bleeding");
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_chest == 1){
        this.chiefComplaintIdentified.push("Pain or discomfort in chest");
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_stomach == 1){
        this.chiefComplaintIdentified.push("Pain or discomfort in stomach");
      }
      if (this.conditionPre?.chief_complaint_vertigo == 1){
        this.chiefComplaintIdentified.push("Vertigo");
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_extremities == 1){
        this.chiefComplaintIdentified.push("Pain or discomfort in extremities");
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_head == 1){
        this.chiefComplaintIdentified.push("Pain or discomfort in head");
      }
      if (this.conditionPre?.chief_complaint_nausea == 1){
        this.chiefComplaintIdentified.push("Nausea");
      }
      if (this.conditionPre?.chief_complaint_vomiting == 1){
        this.chiefComplaintIdentified.push("Vomiting");
      }
      if (this.conditionPre?.chief_complaint_malaise == 1){
        this.chiefComplaintIdentified.push("Malaise");
      }
      if (this.conditionPre?.chief_complaint_pain_or_discomfort_lumbar == 1){
        this.chiefComplaintIdentified.push("Pain or discomfort in lumbar region");
      }
      if (this.conditionPre?.chief_complaint_seizure == 1){
        this.chiefComplaintIdentified.push("Seizure");
      }
      if (this.conditionPre?.chief_complaint_diarrhea == 1){
        this.chiefComplaintIdentified.push("Diarrhea");
      }
      if (this.conditionPre?.chief_complaint_fever == 1){
        this.chiefComplaintIdentified.push("Fever");
      }
      if (this.conditionPre?.chief_complaint_trembling == 1){
        this.chiefComplaintIdentified.push("Trembling");
      }
      if (this.conditionPre?.chief_complaint_psychological_issue == 1){
        this.chiefComplaintIdentified.push("Psychological issue");
      }
      if (this.chiefComplaintIdentified.length == 0){
        this.chiefComplaintIdentified.push("None");
      }

      if (this.conditionPre?.chief_complaint_provoked_by_walking == 1){
        this.chiefComplaintProvocation.push("Walking");
      }
      if (this.conditionPre?.chief_complaint_provoked_by_pressure == 1){
        this.chiefComplaintProvocation.push("Pressure");
      }
      if (this.conditionPre?.chief_complaint_provoked_by_laying == 1){
        this.chiefComplaintProvocation.push("Laying");
      }
      if (this.conditionPre?.chief_complaint_provoked_by_movement == 1){
        this.chiefComplaintProvocation.push("Movement");
      }
      if (this.conditionPre?.chief_complaint_provoked_by_sitting == 1){
        this.chiefComplaintProvocation.push("Sitting");
      }
      if (this.conditionPre?.chief_complaint_provoked_by_standing == 1){
        this.chiefComplaintProvocation.push("Standing");
      }
      if (this.conditionPre?.chief_complaint_provoked_by_pain == 1){
        this.chiefComplaintProvocation.push("Pain");
      }
      if (this.conditionPre?.chief_complaint_provoked_by_strain == 1){
        this.chiefComplaintProvocation.push("Strain");
      }
      if (this.conditionPre?.chief_complaint_provoked_by_breathing == 1){
        this.chiefComplaintProvocation.push("Breathing");
      }

      if (this.conditionPre?.risk_factor_age == 1){
        this.riskFactorIdentified.push("Age");
      }
      if (this.conditionPre?.risk_factor_alcohol == 1){
        this.riskFactorIdentified.push("Alcohol");
      }
      if (this.conditionPre?.risk_factor_smoking == 1){
        this.riskFactorIdentified.push("Smoking");
      }
      if (this.conditionPre?.risk_factor_high_blood_pressure == 1){
        this.riskFactorIdentified.push("High blood pressure");
      }
      if (this.conditionPre?.risk_factor_sedentary == 1){
        this.riskFactorIdentified.push("Sedentary lifestyle");
      }
      if (this.conditionPre?.risk_factor_diabetes == 1){
        this.riskFactorIdentified.push("Diabetes");
      }
      if (this.conditionPre?.risk_factor_overweight == 1){
        this.riskFactorIdentified.push("Overweight");
      }
      if (this.conditionPre?.risk_factor_stress == 1){
        this.riskFactorIdentified.push("Stress");
      }

      if (this.conditionPre?.no_pre_existing_condition == 1){
        this.preExistingConditionIdentified.push("None");
      }
      if (this.conditionPre?.pre_existing_apoplexy == 1){
        this.preExistingConditionIdentified.push("Apoplexy");
      }
      if (this.conditionPre?.pre_existing_illness == 1){
        this.preExistingConditionIdentified.push("Illness");
      }
      if (this.conditionPre?.pre_existing_cancer == 1){
        this.preExistingConditionIdentified.push("Cancer");
      }
      if (this.conditionPre?.pre_existing_asthma == 1){
        this.preExistingConditionIdentified.push("Asthma");
      }
      if (this.conditionPre?.pre_existing_heart_disease == 1){
        this.preExistingConditionIdentified.push("Heart disease");
      }
      if (this.conditionPre?.pre_existing_heart_failure == 1){
        this.preExistingConditionIdentified.push("Heart failure");
      }
      if (this.conditionPre?.pre_existing_epilepsy == 1){
        this.preExistingConditionIdentified.push("Epilepsy");
      }
      if (this.conditionPre?.pre_existing_psychological_issues == 1){
        this.preExistingConditionIdentified.push("Psychological issues");
      }
      if (this.conditionPre?.pre_existing_atrial_fibrillation == 1){
        this.preExistingConditionIdentified.push("Atrial fibrillation");
      }
      if (this.conditionPre?.pre_existing_copd == 1){
        this.preExistingConditionIdentified.push("COPD");
      }

      this.anamnese_info = this.textCleaner.clean(this.conditionPre?.anamnese_info)
      this.pre_existing_condition = this.textCleaner.clean(this.conditionPre?.pre_existing_condition)
      this.chief_complaint_narrative = this.textCleaner.clean(this.conditionPre?.chief_complaint_narrative)
      this.chief_complaint_provocation = this.textCleaner.clean(this.conditionPre?.chief_complaint_provocation)
      this.event_beginn = this.textCleaner.clean(this.conditionPre?.event_beginn)
      this.risk_factors = this.textCleaner.clean(this.conditionPre?.risk_factors)
      this.chief_complaint_region = this.textCleaner.clean(this.conditionPre?.chief_complaint_region)
      this.allergy = this.textCleaner.clean(this.conditionPre?.allergy)
      this.medication = this.textCleaner.clean(this.conditionPre?.medication)
    });
  }
}
