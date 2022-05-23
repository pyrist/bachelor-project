import {Component, Input, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {BodySensitivity} from "../../../types/BodySensitivity";

@Component({
  selector: 'app-body-sensitivity',
  templateUrl: './body-sensitivity.component.html',
  styleUrls: ['./body-sensitivity.component.css']
})
export class BodySensitivityComponent implements OnInit {
  @Input() id!: number | undefined
  bodySensitivity: BodySensitivity | undefined

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          bodySensitivity(id: ${this.id}) {
            id
            movement_of_the_extremities_left_arm
            movement_of_the_extremities_left_arm_assessment_exam_dest
            movement_of_the_extremities_left_leg
            movement_of_the_extremities_left_leg_assessment_exam_dest
            movement_of_the_extremities_right_arm_assessment_exam_dest
            movement_of_the_extremities_right_leg_assessment_exam_dest
            sensibility_left_arm_assessment_exam_dest
            sensibility_left_leg_assessment_exam_dest
            sensibility_right_arm_assessment_exam_dest
            sensibility_right_leg_assessment_exam_dest
            movement_of_the_extremities_right_arm
            movement_of_the_extremities_right_leg
            sensibility_left_arm
            sensibility_left_leg
            sensibility_right_arm
            sensibility_right_leg
            pupil_left_assessment_exam_dest_middle
            pupil_left_assessment_exam_dest_narrow
            pupil_left_assessment_exam_dest_wide
            pupil_left_assessment_exam_dest_not_determinable
            pupil_left_assessment_exam_dest_dyscoria
            pupil_right_assessment_exam_dest_middle
            pupil_right_assessment_exam_dest_narrow
            pupil_right_assessment_exam_dest_wide
            pupil_right_assessment_exam_dest_not_determinable
            pupil_right_assessment_exam_dest_dyscoria
            pupil_right_not_determinable
            pupil_left_not_determinable
            normal_table_result
            abnormal_table_result
            severe_table_result
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.bodySensitivity = res.data.bodySensitivity;
    });
  }

}
