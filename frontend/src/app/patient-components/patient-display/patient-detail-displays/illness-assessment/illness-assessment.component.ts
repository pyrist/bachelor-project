import {Component, Input, OnInit} from '@angular/core';
import {IllnessAssessment} from "../../../../../types/illnessAssessment";
import {Apollo, gql} from "apollo-angular";
import {TextCleanerService} from "../../../../text-cleaner.service";
import {ArrayToStringService} from "../../../../array-to-string.service";

@Component({
  selector: 'app-illness-assessment',
  templateUrl: './illness-assessment.component.html',
  styleUrls: ['./illness-assessment.component.css']
})
export class IllnessAssessmentComponent implements OnInit {
  @Input() id!: number | undefined
  illnessAssessment: IllnessAssessment | undefined
  diagnoses: string[] = []
  injury_detail: string | null = ""
  illness_group: string | null = ""
  illness_type: string | null = ""

  constructor(private apollo: Apollo, private textCleaner: TextCleanerService, public arrayToString: ArrayToStringService) { }

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

      if(this.illnessAssessment?.frostbite == 1){
        this.diagnoses.push("Frostbite");
      }
      if(this.illnessAssessment?.burn == 1){
        this.diagnoses.push("Burn");
      }
      if(this.illnessAssessment?.diagnosis_worsening_condition == 1){
        this.diagnoses.push("Worsening condition");
      }
      if(this.illnessAssessment?.diagnosis_acute_coronary_syndrome == 1){
        this.diagnoses.push("ACS");
      }
      if(this.illnessAssessment?.diagnosis_fainting == 1){
        this.diagnoses.push("Fainting");
      }
      if(this.illnessAssessment?.diagnosis_seizure == 1){
        this.diagnoses.push("Seizure");
      }
      if(this.illnessAssessment?.diagnosis_high_blood_pressure == 1){
        this.diagnoses.push("Hypertension");
      }
      if(this.illnessAssessment?.diagnosis_intoxicated == 1){
        this.diagnoses.push("Intoxication");
      }
      if(this.illnessAssessment?.diagnosis_stroke == 1){
        this.diagnoses.push("Stroke");
      }
      if(this.illnessAssessment?.diagnosis_copd == 1){
        this.diagnoses.push("COPD");
      }
      if(this.illnessAssessment?.diagnosis_illness == 1){
        this.diagnoses.push("Illness");
      }
      if(this.illnessAssessment?.diagnosis_infection == 1){
        this.diagnoses.push("Infection");
      }
      if(this.illnessAssessment?.diagnosis_circulatory_dysregulation == 1){
        this.diagnoses.push("Circulatory dysregulation");
      }
      if(this.illnessAssessment?.diagnosis_psychological_issue == 1){
        this.diagnoses.push("Psychological issue");
      }
      if(this.illnessAssessment?.other_diagnosis == 1){
        this.diagnoses.push("Other");
      }
      if(this.illnessAssessment?.diagnosis_heart_issues == 1){
        this.diagnoses.push("Heart issues");
      }
      if(this.illnessAssessment?.diagnosis_heart_failure == 1){
        this.diagnoses.push("Heart failure");
      }
      if(this.illnessAssessment?.diagnosis_injury == 1){
        this.diagnoses.push("Injury");
      }
      if(this.illnessAssessment?.respiratory_disease == 1){
        this.diagnoses.push("Respiratory / lung disease");
      }
      if(this.illnessAssessment?.diagnosis_nervous_system_disease == 1){
        this.diagnoses.push("CNS disease");
      }
      if(this.illnessAssessment?.diagnosis_fracture == 1){
        this.diagnoses.push("Fracture");
      }
      if(this.illnessAssessment?.diagnosis_pain == 1){
        this.diagnoses.push("Pain");
      }

      this.injury_detail = this.textCleaner.clean(this.illnessAssessment?.injury_detail)
      this.illness_group = this.textCleaner.clean(this.illnessAssessment?.illness_group)
      this.illness_type = this.textCleaner.clean(this.illnessAssessment?.illness_type)

    });
  }
}
