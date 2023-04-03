import {GraphQLList} from "graphql";

export interface Intervention {
  id: number;
  other_text_intervention_intubation: string;
  text_intervention_others: string;
  value_intervention_shockcs: [number];
  value_intervention_shocks: [number];
  type_intervention_cannulations: string;
  location_intervention_cannulations: string;
  other_text_intervention_cannulations: string;
  type_intervention_intubations: string;
  existing_permanent_catheter: number;
  existing_anesthesia: number;
  existing_cervical_collar: number;
  existing_gastric_tube: number;
  existing_bandages: number;
  bandages_applied: number;
  warmth_applied: number;
  cooling_applied: number;
  anesthetic_applied: number;
  other_intervention: number;
  emergency_intervention: number;
  ultrasound_used: number;
  permanent_catheter_applied: number;
  gastric_tube_applied: number;
  chest_compressions_performed: number;
  baby_delivered: number;
  transport_incubator_used: number;
  aspiration_during_intubation: number;
  intubation_not_possible: number;
  no_intervention_performed: number;
  ecg_performed: number;
  bleeding_staunched: number;
  iv_cannulation_performed: number;
  io_cannulation_performed: number;
  patient_has_port: number;
  intubation_performed: number;
}
