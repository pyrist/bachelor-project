export interface Neurology {
  id: number;
  text_objectiv_neuro_abnorms: string;
  text_objectiv_psyches: string;
  text_primary_assessment_neuro_abnorms: string;
  neurology_comment: string;
  neurology_comment_assessment_exam_dest: string;
  observation_psychological_condition_comment: string;
  neurology_normal: number;
  neurology_normal_assessment_exam_dest: number;
  text_primary_assessment_neuro_states_awake: number;
  text_primary_assessment_neuro_states_reacts_to_speech: number;
  text_primary_assessment_neuro_states_unconscious: number;
  text_primary_assessment_neuro_states_under_general_anesthesia: number;
  text_primary_assessment_neuro_states_reacts_to_pain: number;
  text_primary_assessment_neuro_states_not_determinable: number;
  text_objectiv_neuro_states_reacts_to_speech: number;
  text_objectiv_neuro_states_awake: number;
  text_objectiv_neuro_states_unconscious: number;
  text_objectiv_neuro_states_reacts_to_pain: number;
  text_objectiv_neuro_states_not_determinable: number;
  text_objectiv_neuro_states_under_general_anesthetic: number;
  no_neurological_abnormalities: number;
  dementia: number;
  neurological_deficit: number;
  speech_disorder: number;
  sight_disorder: number;
  excretion_disorder: number;
  lateralizing_signs: number;
  psyche_other: number;
  abnormal_table_result: number;
  normal_table_result: number;
}
