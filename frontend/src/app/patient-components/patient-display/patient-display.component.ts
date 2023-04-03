import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Patient } from "../../../types/patient";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from "rxjs";
import {saveAs} from "file-saver";
import {HttpClient} from "@angular/common/http";
import {Diagnoses} from "../../../types/diagnoses";

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
  diagnosisTermArray : string[] = [];
  diagnosis = ""
  diagnosisLink = ""
  patientBasicInformation: any[] | undefined

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.caseId = String(route.snapshot.paramMap.get('patientCaseId'))
    this.activeDetail = String(route.snapshot.paramMap.get('detailCategory'))
  }

  ngOnInit(): void {
    this.queryPatient()
      .subscribe((res: any) => {
      this.loading = res.loading
      this.patient = res.data.patient

      this.setPatientGender();
      this.setDiagnosesDescription();
      this.setPatientBasicInformation();
    });
  }

  private queryPatient(): Observable<any> {
    return this.apollo.watchQuery({
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
    }).valueChanges;
  }

  private setPatientGender(): void {
    if(this.patient?.male){
      this.patientGender = "Male"
    }
    if (this.patient?.female){
      this.patientGender = "Female"
    }
    if (this.patient?.nonbinary){
      this.patientGender = "Nonbinary"
    }
  }

  private setDiagnosesDescription(): void {
    if(this.patient){
      const diagnoses: Diagnoses = {
        infections: 0,
        lung_disease: 0,
        cardiovascular_disease: 0,
        abdominal_disease: 0,
        metabolic_disease: 0,
        other_diseases: 0,
        cns_disease: 0,
        respiratory_disease: 0,
        psychiatric_disease: 0,
        gyn_obstetrics_emergencies: 0
      };

      Object.keys(diagnoses).forEach(value => {
        // @ts-ignore
        if(this.patient[value] == 1){
          this.diagnosisTermArray.push(this.snakeCaseVariableToPresentableText(value))
        }
      });
    }

    if (this.diagnosisTermArray.length > 0) {
      this.diagnosis = this.diagnosisTermArray.join(', ')
    } else {
      this.diagnosis = "No diagnosis"
      this.diagnosisLink = "none"
    }
  }

  private setPatientBasicInformation(): void {
    this.patientBasicInformation = new Array();
    this.patientBasicInformation?.push('Case ID: ' + this.caseId)
    this.patientBasicInformation?.push('Diagnosis: ' + this.diagnosis)
    this.patientBasicInformation?.push('Deceased at any point?: ' + (this.patient?.death_id ? 'Yes' : 'No'))

    if(!!this.patientGender){this.patientBasicInformation?.push('Gender: ' + this.patientGender)}
    if(!!this.patient?.age){this.patientBasicInformation?.push('Age: ' + this.patient?.age)}
    if(!!this.patient?.nationality){this.patientBasicInformation?.push('Nationality: ' + this.patient?.nationality)}

    if(this.patient?.patient_category_high_risk == 1){this.patientBasicInformation?.push('High risk patient!')}
    if(this.patient?.patient_category_intensive_care == 1){this.patientBasicInformation?.push('Intensive care patient!')}
    if(this.patient?.patient_category_no_vital_danger == 1){this.patientBasicInformation?.push('Patient in no vital danger.')}

    if(!!this.patient?.estimated_body_weight){this.patientBasicInformation?.push('Estimated body weight: ' + this.patient?.estimated_body_weight + ' kg')}
    if(!!this.patient?.bmi){this.patientBasicInformation?.push('BMI: ' + this.patient?.bmi)}
    if(!!this.patient?.size_cm){this.patientBasicInformation?.push('Height: ' + this.patient?.size_cm + ' cm')}

    var gcs_summary_clean = this.patient?.gcs_summary?.substring(this.patient?.gcs_summary?.indexOf('GCS') + 3, this.patient?.gcs_summary?.indexOf(')') + 1)
    gcs_summary_clean = gcs_summary_clean?.replace(':', '')
    gcs_summary_clean = gcs_summary_clean?.replace(' ', '')
    if(!!gcs_summary_clean){this.patientBasicInformation?.push('GCS summary: ' + gcs_summary_clean)}
  }

  private snakeCaseVariableToPresentableText(snakeCaseText: string): string {
    return snakeCaseText.charAt(0).toUpperCase()
      .concat(snakeCaseText.slice(1).replace('_', ' '));
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
}
