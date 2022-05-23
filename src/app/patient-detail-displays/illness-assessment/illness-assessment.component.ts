import {Component, Input, OnInit} from '@angular/core';
import {IllnessAssessment} from "../../../types/illnessAssessment";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-illness-assessment',
  templateUrl: './illness-assessment.component.html',
  styleUrls: ['./illness-assessment.component.css']
})
export class IllnessAssessmentComponent implements OnInit {
  @Input() id!: number | undefined
  illnessAssessment: IllnessAssessment | undefined
  diagnoses = ""

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          illnessAssessment(id: ${this.id}) {
            id
            illness_group
            illness_type
            injury_detail
            sickness
            injury
            burn
            frostbite
            other_diagnosis
            diagnosis_worsening_condition
            diagnosis_acute_coronary_syndrome
            diagnosis_fainting
            diagnosis_seizure
            diagnosis_high_blood_pressure
            diagnosis_intoxicated
            diagnosis_stroke
            diagnosis_copd
            diagnosis_illness
            diagnosis_infection
            diagnosis_circulatory_dysregulation
            diagnosis_psychological_issue
            main_diagnosis_yes_or_no
            diagnosis_heart_issues
            diagnosis_heart_failure
            diagnosis_injury
            diagnosis_respiratory_disease
            diagnosis_nervous_system_disease
            diagnosis_fracture
            diagnosis_pain
            diagnosis_severity
            infections
            lung_disease
            cardiovascular_disease
            abdominal_disease
            metabolic_disease
            other_diseases
            cns_disease
            respiratory_disease
            psychiatric_disease
            gyn_obstetrics_emergencies
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.illnessAssessment = res.data.illnessAssessment;

      if(this.illnessAssessment?.sickness == 1){
        this.diagnoses += ", Sickness";
      }
      if(this.illnessAssessment?.frostbite == 1){
        this.diagnoses += ", Frostbite";
      }
      if(this.illnessAssessment?.burn == 1){
        this.diagnoses += ", Burn";
      }
      if(this.illnessAssessment?.diagnosis_worsening_condition == 1){
        this.diagnoses += ", Worsening condition";
      }
      if(this.illnessAssessment?.diagnosis_acute_coronary_syndrome == 1){
        this.diagnoses += ", ACS";
      }
      if(this.illnessAssessment?.diagnosis_fainting == 1){
        this.diagnoses += ", Fainting";
      }
      if(this.illnessAssessment?.diagnosis_seizure == 1){
        this.diagnoses += ", Seizure";
      }
      if(this.illnessAssessment?.diagnosis_high_blood_pressure == 1){
        this.diagnoses += ", Hypertension";
      }
      if(this.illnessAssessment?.diagnosis_intoxicated == 1){
        this.diagnoses += ", Intoxication";
      }
      if(this.illnessAssessment?.diagnosis_stroke == 1){
        this.diagnoses += ", Stroke";
      }
      if(this.illnessAssessment?.diagnosis_copd == 1){
        this.diagnoses += ", COPD";
      }
      if(this.illnessAssessment?.diagnosis_illness == 1){
        this.diagnoses += ", Illness";
      }
      if(this.illnessAssessment?.diagnosis_infection == 1){
        this.diagnoses += ", Infection";
      }
      if(this.illnessAssessment?.diagnosis_circulatory_dysregulation == 1){
        this.diagnoses += ", Circulatory dysregulation";
      }
      if(this.illnessAssessment?.diagnosis_psychological_issue == 1){
        this.diagnoses += ", Psychological issue";
      }
      if(this.illnessAssessment?.other_diagnosis == 1){
        this.diagnoses += ", Other";
      }
      if(this.illnessAssessment?.diagnosis_heart_issues == 1){
        this.diagnoses += ", Heart issues";
      }
      if(this.illnessAssessment?.diagnosis_heart_failure == 1){
        this.diagnoses += ", Heart failure";
      }
      if(this.illnessAssessment?.diagnosis_injury == 1){
        this.diagnoses += ", Injury";
      }
      if(this.illnessAssessment?.respiratory_disease == 1){
        this.diagnoses += ", Respiratory / lung disease";
      }
      if(this.illnessAssessment?.diagnosis_nervous_system_disease == 1){
        this.diagnoses += ", CNS disease";
      }
      if(this.illnessAssessment?.diagnosis_fracture == 1){
        this.diagnoses += ", Fracture";
      }
      if(this.illnessAssessment?.diagnosis_pain == 1){
        this.diagnoses += ", Pain";
      }
      this.diagnoses = this.diagnoses?.replace(", ", "");
    });
  }
}
