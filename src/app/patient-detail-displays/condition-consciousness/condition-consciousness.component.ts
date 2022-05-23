import {Component, Input, OnInit} from '@angular/core';
import {ConditionConsciousness} from "../../../types/conditionConsciousness";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-condition-consciousness',
  templateUrl: './condition-consciousness.component.html',
  styleUrls: ['./condition-consciousness.component.css']
})
export class ConditionConsciousnessComponent implements OnInit {
  @Input() id!: number | undefined
  conditionConsciousness: ConditionConsciousness | undefined
  allStateOfConsciousnessZero = false;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          conditionConsciousness(id: ${this.id}) {
            id
            pain_scale_assess_vital_signs_destination
            light_reflex_left
            light_reflex_right
            light_reflex_left_assessment_exam_dest
            light_reflex_right_assessment_exam_dest
            pupil_left_eyes_narrow
            pupil_left_eyes_middle
            pupil_left_eyes_wide
            pupil_left_eyes_dyscoria
            pupil_right_eyes_narrow
            pupil_right_eyes_middle
            pupil_right_eyes_wide
            pupil_right_eyes_dyscoria
            state_of_consciousness_awake
            state_of_consciousness_unconscious
            state_of_consciousness_reacts_to_speech
            state_of_consciousness_reacts_to_pain
            state_of_consciousness_under_general_anesthetic
            state_of_consciousness_not_determinable
            gcs_eye_assessment
            gcs_verbal_assessment
            gcs_motor_assessment
            normal_table_result
            abnormal_table_result
            severe_table_result
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.conditionConsciousness = res.data.conditionConsciousness;
      if(this.conditionConsciousness?.state_of_consciousness_awake == 0
      && this.conditionConsciousness?.state_of_consciousness_not_determinable == 0
        && this.conditionConsciousness?.state_of_consciousness_unconscious == 0
        && this.conditionConsciousness?.state_of_consciousness_under_general_anesthetic == 0
        && this.conditionConsciousness?.state_of_consciousness_reacts_to_speech == 0
        && this.conditionConsciousness?.state_of_consciousness_reacts_to_pain == 0){
        this.allStateOfConsciousnessZero = true;
      }
    });
  }
}
