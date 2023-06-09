export interface ConditionVitals {
  id: number;
  hr: number;
  pulse_rate: number;
  blood_glucose_level: number;
  body_temperature: number;
  pain_scale: number;
  cohb_1: number;
  etc_o2_1: number;
  no_vitals_assess_vital_signs_destination: number;
  hr_assess_vital_signs_destination: number;
  pulse_rate_assess_vital_signs_destination: number;
  pulse_oximetry_assess_vital_signs_destination: number;
  co2_assess_vital_signs_destination: number;
  blood_glucose_level_assess_vital_signs_destination: number;
  body_temperature_assess_vital_signs_destination: number;
  cohb_assess_vital_signs_destination: number;
  etco2_assess_vital_signs_destination: number;
  po2: [number];
  pco2: [number];
  ph: [number];
  sbic: [number];
  pulse_oximetry: number;
  bs: [number];
  cohb_2: [number];
  co: [number];
  etc_o2_2: [number];
  hr_vital_trend_tables_hr: [number];
  systol: [number];
  diastol: [number];
  systol_vital_trend_tables_nibp: [number];
  diastol_vital_trend_tables_nibp: [number];
  vas: [number];
  pulse: [number];
  rr: [number];
  sp_o2: [number];
  temp: [number];
  respiratory_rate: number;
  co2: number;
  blood_glucose_too_high: number;
  blood_glucose_too_low: number;
  pulse_oximetry_under_oxygen_assess_vital_signs_destination: number;
  pulse_oximetry_under_oxygen: number;
  blood_glucose_too_low_destination: number;
  blood_glucose_too_high_destination: number;
  pulse_rhythm_irregular_destination: number;
  pulse_rhythm_regular_destination: number;
  pulse_rhythm_irregular: number;
  pulse_rhythm_regular: number;
  normal_table_result: number;
  abnormal_table_result: number;
  severe_table_result: number;
}
