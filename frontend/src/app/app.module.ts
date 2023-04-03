import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CategorySelectionComponent } from './category-display/category-selection/category-selection.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CaseSearchComponent } from './patient-components/case-search/case-search.component';
import { PatientDisplayComponent } from './patient-components/patient-display/patient-display.component';
import { RouterModule } from "@angular/router";
import { TopBarComponent } from './header/top-bar/top-bar.component';
import { NavigationBarComponent } from './header/navigation-bar/navigation-bar.component';
import { CategoryDetailsComponent } from './category-display/category-details/category-details.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { NgHttpLoaderModule } from 'ng-http-loader';
import { BloodPressureDisplayComponent } from './patient-components/patient-display/patient-detail-displays/blood-pressure/blood-pressure-display/blood-pressure-display.component';
import { BloodPressureComponent } from './patient-components/patient-display/patient-detail-displays/blood-pressure/blood-pressure.component';
import { BodySensitivityComponent } from './patient-components/patient-display/patient-detail-displays/body-sensitivity/body-sensitivity.component';
import { CardioComponent } from './patient-components/patient-display/patient-detail-displays/cardio/cardio.component';
import { ConditionBasicComponent } from './patient-components/patient-display/patient-detail-displays/condition-basic/condition-basic.component';
import { ConditionConsciousnessComponent } from './patient-components/patient-display/patient-detail-displays/condition-consciousness/condition-consciousness.component';
import { ConditionMentalComponent } from './patient-components/patient-display/patient-detail-displays/condition-mental/condition-mental.component';
import { ConditionHistoryComponent } from './patient-components/patient-display/patient-detail-displays/condition-history/condition-history.component';
import { ConditionVitalsComponent } from './patient-components/patient-display/patient-detail-displays/condition-vitals/condition-vitals.component';
import { DeathComponent } from './patient-components/patient-display/patient-detail-displays/death/death.component';
import { ExpertCommentsComponent } from './patient-components/patient-display/patient-detail-displays/expert-comments/expert-comments.component';
import { IllnessAssessmentComponent } from './patient-components/patient-display/patient-detail-displays/illness-assessment/illness-assessment.component';
import { InjuryComponent } from './patient-components/patient-display/patient-detail-displays/injury/injury.component';
import { InterventionComponent } from './patient-components/patient-display/patient-detail-displays/intervention/intervention.component';
import { NeurologyComponent } from './patient-components/patient-display/patient-detail-displays/neurology/neurology.component';
import { RespiratoryComponent } from './patient-components/patient-display/patient-detail-displays/respiratory/respiratory.component';
import { TreatmentComponent } from './patient-components/patient-display/patient-detail-displays/treatment/treatment.component';
import { SensibilityScoreDetailDisplayComponent } from './patient-components/patient-display/patient-detail-displays/body-sensitivity/sensibility-score-detail-display/sensibility-score-detail-display.component';
import { PupilDetailDisplayComponent } from './patient-components/patient-display/patient-detail-displays/body-sensitivity/pupil-detail-display/pupil-detail-display.component';
import { SimpleYesNoDetailDisplayComponent } from './patient-components/patient-display/simple-yes-no-detail-display/simple-yes-no-detail-display.component';
import { TableResultDisplayComponent } from './patient-components/patient-display/table-result-display/table-result-display.component';
import { ReflexScoreDisplayComponent } from './patient-components/patient-display/patient-detail-displays/condition-consciousness/reflex-score-display/reflex-score-display.component';
import { SimpleVariableDisplayComponent } from './patient-components/patient-display/simple-variable-display/simple-variable-display.component';

@NgModule({
  declarations: [
    AppComponent,
    CategorySelectionComponent,
    MainPageComponent,
    CaseSearchComponent,
    PatientDisplayComponent,
    TopBarComponent,
    NavigationBarComponent,
    CategoryDetailsComponent,
    BloodPressureDisplayComponent,
    BloodPressureComponent,
    BloodPressureComponent,
    BodySensitivityComponent,
    CardioComponent,
    ConditionBasicComponent,
    ConditionConsciousnessComponent,
    ConditionMentalComponent,
    ConditionHistoryComponent,
    ConditionVitalsComponent,
    DeathComponent,
    ExpertCommentsComponent,
    IllnessAssessmentComponent,
    InjuryComponent,
    InterventionComponent,
    NeurologyComponent,
    RespiratoryComponent,
    TreatmentComponent,
    SensibilityScoreDetailDisplayComponent,
    PupilDetailDisplayComponent,
    SimpleYesNoDetailDisplayComponent,
    TableResultDisplayComponent,
    ReflexScoreDisplayComponent,
    SimpleVariableDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: MainPageComponent},
      {path: 'search', component: CaseSearchComponent},
      {path: 'categories/:categoryLinkname', component: CategoryDetailsComponent},
      {path: 'patients/:patientCaseId', component: PatientDisplayComponent},
      {path: 'patients/:patientCaseId/:detailCategory', component: PatientDisplayComponent}
    ]),
    GraphQLModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
