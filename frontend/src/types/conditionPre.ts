export interface ConditionPre {
  id: number;
  pre_existing_condition: string;
  pregnant_possible_but_not_pregnant: number;
  pregnant_not_possible: number;
  pregnant_possible: number;
  pregnant_possible_and_pregnant: number;
  bacterial_infection: number;
  chief_complaint_pain: number;
  chief_complaint_shortness_of_breath: number;
  chief_complaint_worsening_condition: number;
  chief_complaint_consciousness_disorder: number;
  chief_complaint_fainting: number;
  chief_complaint_bleeding: number;
  chief_complaint_pain_or_discomfort_chest: number;
  chief_complaint_pain_or_discomfort_stomach: number;
  chief_complaint_vertigo: number;
  chief_complaint_pain_or_discomfort_extremities: number;
  chief_complaint_pain_or_discomfort_head: number;
  chief_complaint_nausea: number;
  chief_complaint_vomiting: number;
  chief_complaint_malaise: number;
  chief_complaint_pain_or_discomfort_lumbar: number;
  chief_complaint_seizure: number;
  chief_complaint_diarrhea: number;
  chief_complaint_fever: number;
  chief_complaint_provoked_by_walking: number;
  chief_complaint_provoked_by_pressure: number;
  chief_complaint_provoked_by_laying: number;
  chief_complaint_provoked_by_movement: number;
  chief_complaint_provoked_by_sitting: number;
  chief_complaint_provoked_by_standing: number;
  chief_complaint_provoked_by_pain: number;
  chief_complaint_provoked_by_strain: number;
  chief_complaint_always_present: number;
  chief_complaint_provoked_by_breathing: number;
  chief_complaint_trembling: number;
  chief_complaint_caused_by_fall_or_tripping: number;
  chief_complaint_caused_by_accident: number;
  chief_complaint_caused_by_fight: number;
  risk_factor_age: number;
  risk_factor_smoking: number;
  risk_factor_high_blood_pressure: number;
  risk_factor_sedentary: number;
  risk_factor_diabetes: number;
  risk_factor_overweight: number;
  risk_factor_alcohol: number;
  risk_factor_stress: number;
  last_excretion_less_than_one_hour_ago: number;
  last_excretion_less_than_four_hours_ago: number;
  last_excretion_less_than_twelve_hours_ago: number;
  last_meal_less_than_twelve_hours_ago: number;
  last_meal_less_than_four_hours_ago: number;
  last_meal_less_than_one_hour_ago: number;
  last_meal_less_than_one_day_ago: number;
  last_excretion_less_than_one_day_ago: number;
  last_excretion_less_than_one_week_ago: number;
  last_excretion_less_than_one_month_ago: number;
  last_meal_less_than_one_week_ago: number;
  last_meal_less_than_one_month_ago: number;
  last_mens_current: number;
  last_mens_less_than_a_week_ago: number;
  last_mens_less_than_one_month_ago: number;
  last_mens_more_than_a_month_ago: number;
  chief_complaint_severity_score: number;
  chief_complaint_palliation_protective_posture: number;
  chief_complaint_palliation_laying: number;
  chief_complaint_palliation_sitting: number;
  chief_complaint_palliation_cooling: number;
  chief_complaint_palliation_warming: number;
  chief_complaint_palliation_standing: number;
  chief_complaint_quality_pressure: number;
  chief_complaint_quality_stabbing: number;
  chief_complaint_quality_pulling: number;
  chief_complaint_quality_dizzy: number;
  chief_complaint_quality_burning: number;
  chief_complaint_quality_tearing: number;
  chief_complaint_pain_or_discomfort_radiating: number;
  chief_complaint_began_less_than_an_hour_ago: number;
  chief_complaint_began_less_than_four_hours_ago: number;
  chief_complaint_began_less_than_twelve_hours_ago: number;
  chief_complaint_began_less_than_twenty_four_hours_ago: number;
  chief_complaint_began_less_than_one_week_ago: number;
  chief_complaint_began_less_than_one_month_ago: number;
  chief_complaint_not_changing: number;
  chief_complaint_improving_condition: number;
  chief_complaint_comes_and_goes: number;
  allergic_to_penicillin: number;
  allergic_to_pollen_grass_dust: number;
  taking_medicine: number;
  no_pre_existing_condition: number;
  pre_existing_illness: number;
  pre_existing_cancer: number;
  pre_existing_asthma: number;
  pre_existing_apoplexy: number;
  pre_existing_heart_disease: number;
  pre_existing_heart_failure: number;
  pre_existing_epilepsy: number;
  pre_existing_psychological_issues: number;
  pre_existing_atrial_fibrillation: number;
  pre_existing_copd: number;
  chief_complaint_narrative: string;
  chief_complaint_provocation: string;
  anamnese_info: string;
  event_beginn: string;
  risk_factors: string;
  chief_complaint_region: string;
  allergy: string;
  medication: string;
  chief_complaint_psychological_issue: number;
}
