import {GraphQLFloat, GraphQLList} from "graphql";

export interface Respiratory {
  id: number;
  primary_assessment_airways_comment: string;
  primary_assessment_breathing_comment: string;
  text_primary_assessment_resp_lung_sounds: string;
  text_primary_assessment_airways: string;
  text_primary_assessment_respirations: string;
  observation_airways_comment: string;
  observation_breathing_comment: string;
  respiratory_rate_assess_vital_signs_destination: number;
  text_intervention_airways: string;
  text_intervention_breathings: string;
  text_objectiv_airways: string;
  text_objectiv_resperation_lung_sounds: string;
  text_objectiv_resperations: string;
  amount_intervention_oxygens: [number];
  freq: [number];
  amv: [number];
  ie: number;
  ie2: number;
  asb: [number];
  pinsp: [number];
  trigger: [number];
  in_tr: number;
  text_intervention_rescues: string;
  mode: string;
  vt: [number];
  rr: [number];
  peep: [number];
  fio2: [number];
  p_max: [number];
  energy: [number];
  obj_resp_airway_managements_spontaneous: number;
  obj_resp_airway_managements_cpap: number;
  obj_resp_airway_managements_controlled: number;
  obj_resp_airway_managements_assisted: number;
  obj_resp_airway_managements_other: number;
  primary_assessment_resp_airway_mgt_other: number;
  primary_assessment_resp_airway_mgt_spontaneous: number;
  primary_assessment_resp_airway_mgt_assisted: number;
  primary_assessment_resp_airway_mgt_controlled: number;
  primary_assessment_resp_airway_mgt_cpap: number;
  airways_ruddy: number;
  airways_wet: number;
  airways_dry: number;
  blood_in_airways: number;
  breathing_stable: number;
  sibilant_rhonchi: number;
  shortness_of_breath: number;
  copd: number;
  coughing: number;
  spastic_breathing: number;
  rales: number;
  weak_breathing: number;
  clear_airways: number;
  stridor: number;
  aspiration: number;
  tracheostoma: number;
  respiration_normal: number;
  apnea: number;
  cyanosis: number;
  no_respiratory_intervention: number;
  removal_of_fluids_by_suction: number;
  jaw_thrust_maneuver_performed: number;
  cervical_collar_administered: number;
  patient_placed_in_recovery_position: number;
  foreign_object_removed_from_airway: number;
  non_rebreather_mask_administered: number;
  intubated: number;
  other_abnormality: number;
  hyperventilation: number;
  patient_reclined: number;
  patient_placed_on_mattress: number;
  patient_sat: number;
  patient_carried: number;
  assisted_breathing_administered: number;
  normal_table_result: number;
  abnormal_table_result: number;
  severe_table_result: number;
}