import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Patient } from "../../../types/patient";
import { BloodPressure } from "../../../types/bloodPressure";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {BehaviorSubject} from "rxjs";
import {saveAs} from "file-saver";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-patient-display',
  templateUrl: './patient-display.component.html',
  styleUrls: ['./patient-display.component.css']
})
export class PatientDisplayComponent implements OnInit {
  patient: Patient | undefined
  patientGender: string | undefined
  loading: boolean = true
  caseId: string
  activeDetail: string
  _displayCategory$ = new BehaviorSubject<string>("");
  displayCategory$ = this._displayCategory$.asObservable();
  diagnosis = ""
  diagnosisLink = ""
  patientBasicInformation: any[] | undefined

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.caseId = String(route.snapshot.paramMap.get('patientCaseId'))
    this.activeDetail = String(route.snapshot.paramMap.get('detailCategory'))
  }

  goToDetails(detailLink: string): void{
    this.router.navigateByUrl('/patients/' + this.caseId + '/' + detailLink);

  }

  retrieveCsv(caseId: string | undefined) {
    this.http.get("http://localhost:4000/api/csvRequest/patient/" + caseId, { responseType: 'blob' })
      .subscribe(
        (response:any) => {
          this.loading = true;
          saveAs(response,  `${caseId}.csv`)
          this.loading = false;
        });
  }

  retrieveCsvForDiagnosis(caseId: string | undefined, diagnosisLink: string | undefined) {
    this.http.get("http://localhost:4000/api/csvRequest/patient/" + caseId + "/" + diagnosisLink  , { responseType: 'blob' })
      .subscribe(
        (response:any) => {
          saveAs(response,  `${caseId}.csv`)
        });
  }


  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          patient(case_id: "${this.caseId}") {
            case_id
            estimated_body_weight
            age
            bmi
            size_cm
            gcs_summary
            male
            female
            nonbinary
            nationality
            patient_category_intensive_care
            patient_category_high_risk
            patient_category_no_vital_danger
            blood_pressure_id
            body_sensitivity_id
            cardio_id
            condition_basic_id
            condition_consciousness_id
            condition_mental_id
            condition_pre_id
            condition_vitals_id
            death_id
            expert_comment_id
            illness_assessment_id
            injury_id
            intervention_id
            neurology_id
            respiratory_id
            treatment_id
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
      this.loading = res.loading
      this.patient = res.data.patient
      if(res.data.patient?.male){
        this.patientGender = "Male"
      }
      if (res.data.patient?.female){
        this.patientGender = "Female"
      }
      if (res.data.patient?.nonbinary){
        this.patientGender = "Nonbinary"
      }

      if(this.patient?.infections == 1){
        this.diagnosis += ", Infection"
        this.diagnosisLink = "infections"
      }
      if (this.patient?.lung_disease == 1){
        this.diagnosis += ", Lung disease"
        this.diagnosisLink = "lung-disease"
      }
      if (this.patient?.cardiovascular_disease == 1){
        this.diagnosis += ", Cardiovascular disease"
        this.diagnosisLink = "cardiovascular-disease"
      }
      if (this.patient?.abdominal_disease == 1){
        this.diagnosis += ", Abdominal disease"
        this.diagnosisLink = "abdominal-disease"
      }
      if (this.patient?.metabolic_disease == 1){
        this.diagnosis += ", Metabolic disease"
        this.diagnosisLink = "metabolic-disease"
      }
      if (this.patient?.other_diseases == 1){
        this.diagnosis += ", Other diseases"
        this.diagnosisLink = "other-diseases"
      }
      if (this.patient?.cns_disease == 1){
        this.diagnosis += ", CNS disease"
        this.diagnosisLink = "infection"
      }
      if (this.patient?.respiratory_disease == 1){
        this.diagnosis += ", Respiratory disease"
        this.diagnosisLink = "respiratory-disease"
      }
      if (this.patient?.psychiatric_disease == 1){
        this.diagnosis += ", Psychiatric disease"
        this.diagnosisLink = "psychiatric-disease"
      }
      if (this.patient?.gyn_obstetrics_emergencies == 1){
        this.diagnosis += ", Gyn/Obstetrics emergencies"
        this.diagnosisLink = "gyn-obstetrics-emergencies"
      }
      if (this.diagnosis == ""){
        this.diagnosis = "No diagnosis"
        this.diagnosisLink = "none"
      }

      this.diagnosis = this.diagnosis?.replace(", ", "");

      this.patientBasicInformation = new Array();
      this.patientBasicInformation?.push('Case ID: ' + this.caseId)
      this.patientBasicInformation?.push('Diagnosis: ' + this.diagnosis)
      this.patientBasicInformation?.push('Deceased at any point?: ' + (this.patient?.death_id ? 'Yes' : 'No'))
      if(this.patientGender != null){this.patientBasicInformation?.push('Gender: ' + this.patientGender)}
      if(this.patient?.age != null){this.patientBasicInformation?.push('Age: ' + this.patient?.age)}
      if(this.patient?.nationality != null){this.patientBasicInformation?.push('Nationality: ' + this.patient?.nationality)}
      if(this.patient?.patient_category_high_risk == 1){this.patientBasicInformation?.push('High risk patient!')}
      if(this.patient?.patient_category_intensive_care == 1){this.patientBasicInformation?.push('Intensive care patient!')}
      if(this.patient?.patient_category_no_vital_danger == 1){this.patientBasicInformation?.push('Patient in no vital danger.')}
      if(this.patient?.estimated_body_weight != null){this.patientBasicInformation?.push('Estimated body weight: ' + this.patient?.estimated_body_weight + ' kg')}
      if(this.patient?.bmi != null){this.patientBasicInformation?.push('BMI: ' + this.patient?.bmi)}
      if(this.patient?.size_cm != null){this.patientBasicInformation?.push('Height: ' + this.patient?.size_cm + ' cm')}

      var gcs_summary_clean = this.patient?.gcs_summary?.substring(this.patient?.gcs_summary?.indexOf('GCS') + 3, this.patient?.gcs_summary?.indexOf(')') + 1)
      gcs_summary_clean = gcs_summary_clean?.replace(':', '')
      gcs_summary_clean = gcs_summary_clean?.replace(' ', '')
      if(gcs_summary_clean != null){this.patientBasicInformation?.push('GCS summary: ' + gcs_summary_clean)}
    });
  }
}
