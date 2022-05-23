import {Component, Input, OnInit} from '@angular/core';
import {ExpertComment} from "../../../types/expertComment";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-expert-comments',
  templateUrl: './expert-comments.component.html',
  styleUrls: ['./expert-comments.component.css']
})
export class ExpertCommentsComponent implements OnInit {
  @Input() id!: number | undefined
  expertComment: ExpertComment | undefined
  notedAilments = "";

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          expertComment(id: ${this.id}) {
            id
            comment
            comment_assess_vital_signs_destination
            other_text_providers_impressions
            text
            text_trend_defib_notes
            text_objectiv_circulation_others
            text_objectiv_circulations
            text_objectiv_skin_assessment
            text_pri_assessment_circ_others
            text_pri_assessment_circulation
            text_pri_assessment_skin
            type_providers_impressions_open
            type_providers_impressions_closed
            stable_vitals
            vital_measurement_not_necessary
            patient_transported_in_ambulance
            bleeding_lower_torso
            bleeding_neck
            bleeding_upper_extremities
            bleeding_lower_extremities
            bleeding_other
            patient_transferred
            ruled_out_acute_coronary_syndrome
            ruled_out_stroke
            ruled_out_spinal_disc_herniation
            ruled_out_fracture
            ruled_out_concussion
            pain_noted
            fainting_noted
            bleeding_noted
            worsening_condition_noted
            fracture_noted
            infection_noted
            dizziness_noted
            joint_locking_noted
            nausea_noted
            morphine_administered
            epinephrine_administered
            bleeding_upper_torso
            catecholamine_required
            weak_pulse
            strong_pulse
            normal_skin
            pale_skin
            decreased_skin_turgor
            sweaty_skin
            cold_skin
            warm_skin
            acute_coronary_syndrome_noted
            heart_issue_noted
            normal_table_result
            abnormal_table_result
            severe_table_result
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.expertComment = res.data.expertComment;

      if(this.expertComment?.pain_noted){
        this.notedAilments += ", Pain";
      }
      if(this.expertComment?.fainting_noted){
        this.notedAilments += ", Fainting";
      }
      if(this.expertComment?.bleeding_noted){
        this.notedAilments += ", Bleeding";
      }
      if(this.expertComment?.worsening_condition_noted){
        this.notedAilments += ", Worsening condition";
      }
      if(this.expertComment?.fracture_noted){
        this.notedAilments += ", Fracture";
      }
      if(this.expertComment?.infection_noted){
        this.notedAilments += ", Infection";
      }
      if(this.expertComment?.dizziness_noted){
        this.notedAilments += ", Dizziness";
      }
      if(this.expertComment?.joint_locking_noted){
        this.notedAilments += ", Joint locking";
      }
      if(this.expertComment?.nausea_noted){
        this.notedAilments += ", Nausea";
      }
      if(this.expertComment?.heart_issue_noted){
        this.notedAilments += ", Heart issues";
      }
      if(this.expertComment?.acute_coronary_syndrome_noted){
        this.notedAilments += ", ACS";
      }
      this.notedAilments = this.notedAilments?.replace(", ", "");
    });
  }
}
