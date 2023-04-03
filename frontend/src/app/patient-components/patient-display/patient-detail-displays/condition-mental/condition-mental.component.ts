import {Component, Input, OnInit} from '@angular/core';
import {ConditionMental} from "../../../../../types/conditionMental";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-condition-mental',
  templateUrl: './condition-mental.component.html',
  styleUrls: ['./condition-mental.component.css']
})
export class ConditionMentalComponent implements OnInit {
  @Input() id!: number | undefined
  conditionMental: ConditionMental | undefined
  psycheStatus = "";

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          conditionMental(id: ${this.id}) {
            id
            mean_arterial_pressure
            total_gcs
            mean_arterial_pressure_destination
            total_gcs_destination
            intoxicated_drugs
            fast_face_no
            fast_face_unknown
            fast_face_yes
            fast_arms_no
            fast_arms_yes
            fast_arms_unknown
            fast_speech_no
            fast_speech_yes
            fast_speech_unknown
            fast_face_left
            fast_face_right
            fast_arms_left
            fast_arms_right
            psyche_euphoric
            psyche_normal
            psyche_anxious
            psyche_slow
            psyche_agitated
            psyche_confused
            psyche_depressed
            psyche_restless
            psyche_aggressive
            psyche_suicidal
            psyche_delusional
            unconscious
            intoxicated_alcohol
            drowsy
            communication_difficult_or_not_possible
            sensibility
            normal_table_result
            abnormal_table_result
            severe_table_result
            text_primary_assessment_psyches
            text_psychological_condition_comment
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.conditionMental = res.data.conditionMental;

      if (this.conditionMental?.psyche_euphoric == 1){
        this.psycheStatus += ", Euphoric";
      }
      if (this.conditionMental?.psyche_normal == 1){
        this.psycheStatus += ", Normal";
      }
      if (this.conditionMental?.psyche_anxious == 1){
        this.psycheStatus += ", Anxious";
      }
      if (this.conditionMental?.psyche_slow == 1){
        this.psycheStatus += ", Slow";
      }
      if (this.conditionMental?.psyche_agitated == 1){
        this.psycheStatus += ", Agitated";
      }
      if (this.conditionMental?.psyche_confused == 1){
        this.psycheStatus += ", Confused";
      }
      if (this.conditionMental?.psyche_depressed == 1){
        this.psycheStatus += ", Depressed";
      }
      if (this.conditionMental?.psyche_restless == 1){
        this.psycheStatus += ", Restless";
      }
      if (this.conditionMental?.psyche_aggressive == 1){
        this.psycheStatus += ", Aggressive";
      }
      if (this.conditionMental?.psyche_suicidal == 1){
        this.psycheStatus += ", Suicidal";
      }
      if (this.conditionMental?.psyche_delusional == 1){
        this.psycheStatus += ", Delusional";
      }
      if (this.psycheStatus == ""){
        this.psycheStatus = "None noted"
      }

      this.psycheStatus = this.psycheStatus?.replace(", ", "");
    });
  }
}
