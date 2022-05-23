export interface Cardio {
  id: number
  cath_lab_refused: number
  twelve_lead_ecg_right_heart: number
  wake_up_stroke: number
  stroke_unit_no: number
  stroke_unit_yes: number
  stroke_unit_refused: number
  cath_lab_status_no: number
  cath_lab_status_yes: number
  ecg_lead_transmission_yes: number
  ecg_lead_transmission_no: number
  ecg_lead_transmission_result_direct_to_emergency: number
  ecg_lead_transmission_result_no_response: number
  ecg_lead_transmission_result_direct_to_ptca: number
  ecg_lead_no_transmission_not_medically_necessary: number
  ecg_lead_no_transmission_other_reason: number
  left_bundle_branch_block: number
  right_bundle_branch_block: number
  bundle_branch_block: number
  premature_heart_beat: number
  stable: number
  sinus_rhythm: number
  atrial_fibrillation: number
  arrhythmia: number
  narrow_qrs_tachycardia: number
  wide_qrs_tachycardia: number
  pacemaker: number
  heart_attack_nstemi: number
  heart_attack_stemi: number
  cardiac_arrest: number
  cardiac_flatline: number
  text_ecg_comment_objective: string
  text_objectiv_ecg: string
  text_primary_assessment_ecg: string
  text_ecg_comment_primary_assessment: string
  normal_table_result: number
  abnormal_table_result: number
  severe_table_result: number
}