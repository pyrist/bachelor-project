export interface ConditionBasic{
  id: number;
  no_disease_determined: number;
  no_vitals: number;
  normal: number;
  normal_assessment_exam_dest: number;
  jaundice: number;
  hypertension: number;
  hypotension: number;
  tachycardia: number;
  cold_skin: number;
  warm_skin: number;
  text_primary_assessment_circulation_comment: string;
  text_observation_circulation_comment: string;
  normal_table_result: number;
  abnormal_table_result: number;
  severe_table_result: number;
}
