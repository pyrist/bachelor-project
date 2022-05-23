import {Component, Input, OnInit} from '@angular/core';
import {Neurology} from "../../../types/neurology";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-neurology',
  templateUrl: './neurology.component.html',
  styleUrls: ['./neurology.component.css']
})
export class NeurologyComponent implements OnInit {
  @Input() id!: number | undefined
  neurology: Neurology | undefined

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          neurology(id: ${this.id}) {
            id
            text_objectiv_neuro_abnorms
            text_objectiv_psyches
            text_primary_assessment_neuro_abnorms
            neurology_comment
            neurology_comment_assessment_exam_dest
            observation_psychological_condition_comment
            neurology_normal
            neurology_normal_assessment_exam_dest
            text_primary_assessment_neuro_states_awake
            text_primary_assessment_neuro_states_reacts_to_speech
            text_primary_assessment_neuro_states_unconscious
            text_primary_assessment_neuro_states_under_general_anesthesia
            text_primary_assessment_neuro_states_reacts_to_pain
            text_primary_assessment_neuro_states_not_determinable
            text_objectiv_neuro_states_reacts_to_speech
            text_objectiv_neuro_states_awake
            text_objectiv_neuro_states_unconscious
            text_objectiv_neuro_states_reacts_to_pain
            text_objectiv_neuro_states_not_determinable
            text_objectiv_neuro_states_under_general_anesthetic
            no_neurological_abnormalities
            dementia
            neurological_deficit
            speech_disorder
            sight_disorder
            excretion_disorder
            lateralizing_signs
            psyche_other
            abnormal_table_result
            normal_table_result
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.neurology = res.data.neurology;
    });
  }
}
