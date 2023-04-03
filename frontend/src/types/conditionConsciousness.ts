export interface ConditionConsciousness {
  id: number;
  pain_scale_assess_vital_signs_destination: number;
  light_reflex_left: number;
  light_reflex_right: number;
  light_reflex_left_assessment_exam_dest: number;
  light_reflex_right_assessment_exam_dest: number;
  pupil_left_eyes_narrow: number;
  pupil_left_eyes_middle: number;
  pupil_left_eyes_wide: number;
  pupil_left_eyes_dyscoria: number;
  pupil_right_eyes_narrow: number;
  pupil_right_eyes_middle: number;
  pupil_right_eyes_wide: number;
  pupil_right_eyes_dyscoria: number;
  state_of_consciousness_awake: number;
  state_of_consciousness_unconscious: number;
  state_of_consciousness_reacts_to_speech: number;
  state_of_consciousness_reacts_to_pain: number;
  state_of_consciousness_under_general_anesthetic: number;
  state_of_consciousness_not_determinable: number;
  gcs_eye_assessment: number;
  gcs_verbal_assessment: number;
  gcs_motor_assessment: number;
  normal_table_result: number;
  abnormal_table_result: number;
  severe_table_result: number;
}
