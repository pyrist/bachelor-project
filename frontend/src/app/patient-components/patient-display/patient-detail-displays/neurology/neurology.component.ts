import {Component, Input, OnInit} from '@angular/core';
import {Neurology} from "../../../../../types/neurology";
import {Apollo, gql} from "apollo-angular";
import {TextCleanerService} from "../../../../text-cleaner.service";

@Component({
  selector: 'app-neurology',
  templateUrl: './neurology.component.html',
  styleUrls: ['./neurology.component.css']
})
export class NeurologyComponent implements OnInit {
  @Input() id!: number | undefined
  neurology: Neurology | undefined
  text_primary_assessment_neuro_abnorms: string | null = ""
  text_objectiv_neuro_abnorms: string | null = ""
  neurology_comment: string | null = ""
  neurology_comment_assessment_exam_dest: string | null = ""
  text_objectiv_psyches: string | null = ""
  observation_psychological_condition_comment: string | null = ""

  constructor(private apollo: Apollo, private textCleaner: TextCleanerService) { }

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

      this.text_primary_assessment_neuro_abnorms = this.textCleaner.clean(this.neurology?.text_primary_assessment_neuro_abnorms)
      this.text_objectiv_neuro_abnorms = this.textCleaner.clean(this.neurology?.text_objectiv_neuro_abnorms)
      this.neurology_comment = this.textCleaner.clean(this.neurology?.neurology_comment)
      this.neurology_comment_assessment_exam_dest = this.textCleaner.clean(this.neurology?.neurology_comment_assessment_exam_dest)
      this.text_objectiv_psyches = this.textCleaner.clean(this.neurology?.text_objectiv_psyches)
      this.observation_psychological_condition_comment = this.textCleaner.clean(this.neurology?.observation_psychological_condition_comment)
    });
  }
}
