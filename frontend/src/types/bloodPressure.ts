export interface BloodPressure {
  id: number;
  sbp: number;
  dbp: number;
  ibp_sys: number;
  ibp_dia: number;
  ibp_sys_assess_vital_signs_destination: number;
  ibp_dia_assess_vital_signs_destination: number;
  sbp_assess_vital_signs_destination: number;
  dbp_assess_vital_signs_destination: number;
  method_of_blood_pressure: number;
  method_of_blood_pressure_assess_vital_signs_destination: number;
  low_blood_pressure: number;
  high_blood_pressure: number;
  normal_blood_pressure: number;
  normal_table_result: number;
  abnormal_table_result: number;
  severe_table_result: number;
}
