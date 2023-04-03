const graphql = require('graphql')
const {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema,
} = graphql
const pgPromise = require('pg-promise');
const {GraphQLList, GraphQLFloat, GraphQLScalarType} = require("graphql");
const connStr = 'postgresql://postgres:admin@localhost:5432/medical_data';
const pgp = pgPromise({}); // empty pgPromise instance
const psql = pgp(connStr); // get connection to your PG db instance


const BloodPressureItemType = new GraphQLObjectType({
  name: 'BloodPressureItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    sbp: { type: GraphQLInt },
    dbp: { type: GraphQLInt },
    ibp_sys: { type: GraphQLInt },
    ibp_dia: { type: GraphQLInt },
    ibp_sys_assess_vital_signs_destination: { type: GraphQLInt },
    ibp_dia_assess_vital_signs_destination: { type: GraphQLInt },
    sbp_assess_vital_signs_destination: { type: GraphQLInt },
    dbp_assess_vital_signs_destination: { type: GraphQLInt },
    method_of_blood_pressure: { type: GraphQLInt },
    method_of_blood_pressure_assess_vital_signs_destination: { type: GraphQLInt },
    low_blood_pressure: { type: GraphQLInt },
    high_blood_pressure: { type: GraphQLInt },
    normal_blood_pressure: { type: GraphQLInt },
    normal_table_result: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    severe_table_result: { type: GraphQLInt }
  })
})

const ConditionBasicItemType = new GraphQLObjectType({
  name: 'ConditionBasicItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    no_disease_determined: { type: GraphQLInt },
    no_vitals: { type: GraphQLInt },
    normal: { type: GraphQLInt },
    normal_assessment_exam_dest: { type: GraphQLInt },
    jaundice: { type: GraphQLInt },
    hypertension: { type: GraphQLInt },
    hypotension: { type: GraphQLInt },
    tachycardia: { type: GraphQLInt },
    cold_skin: { type: GraphQLInt },
    warm_skin: { type: GraphQLInt },
    text_primary_assessment_circulation_comment: { type: GraphQLString },
    text_observation_circulation_comment: { type: GraphQLString },
    normal_table_result: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    severe_table_result: { type: GraphQLInt }
  })
})
const ConditionConsciousnessItemType = new GraphQLObjectType({
  name: 'ConditionConsciousnessItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    pain_scale_assess_vital_signs_destination: { type: GraphQLInt },
    light_reflex_left: { type: GraphQLInt },
    light_reflex_right: { type: GraphQLInt },
    light_reflex_left_assessment_exam_dest: { type: GraphQLInt },
    light_reflex_right_assessment_exam_dest: { type: GraphQLInt },
    pupil_left_eyes_narrow: { type: GraphQLInt },
    pupil_left_eyes_middle: { type: GraphQLInt },
    pupil_left_eyes_wide: { type: GraphQLInt },
    pupil_left_eyes_dyscoria: { type: GraphQLInt },
    pupil_right_eyes_narrow: { type: GraphQLInt },
    pupil_right_eyes_middle: { type: GraphQLInt },
    pupil_right_eyes_wide: { type: GraphQLInt },
    pupil_right_eyes_dyscoria: { type: GraphQLInt },
    state_of_consciousness_awake: { type: GraphQLInt },
    state_of_consciousness_unconscious: { type: GraphQLInt },
    state_of_consciousness_reacts_to_speech: { type: GraphQLInt },
    state_of_consciousness_reacts_to_pain: { type: GraphQLInt },
    state_of_consciousness_under_general_anesthetic: { type: GraphQLInt },
    state_of_consciousness_not_determinable: { type: GraphQLInt },
    gcs_eye_assessment: { type: GraphQLInt },
    gcs_verbal_assessment: { type: GraphQLInt },
    gcs_motor_assessment: { type: GraphQLInt },
    normal_table_result: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    severe_table_result: { type: GraphQLInt }
  })
})
const ConditionMentalItemType = new GraphQLObjectType({
  name: 'ConditionMentalItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    mean_arterial_pressure: { type: GraphQLInt },
    total_gcs: { type: GraphQLInt },
    mean_arterial_pressure_destination: { type: GraphQLInt },
    total_gcs_destination: { type: GraphQLInt },
    intoxicated_drugs: { type: GraphQLInt },
    fast_face_no: { type: GraphQLInt },
    fast_face_unknown: { type: GraphQLInt },
    fast_face_yes: { type: GraphQLInt },
    fast_arms_no: { type: GraphQLInt },
    fast_arms_yes: { type: GraphQLInt },
    fast_arms_unknown: { type: GraphQLInt },
    fast_speech_no: { type: GraphQLInt },
    fast_speech_yes: { type: GraphQLInt },
    fast_speech_unknown: { type: GraphQLInt },
    fast_face_left: { type: GraphQLInt },
    fast_face_right: { type: GraphQLInt },
    fast_arms_left: { type: GraphQLInt },
    fast_arms_right: { type: GraphQLInt },
    psyche_euphoric: { type: GraphQLInt },
    psyche_normal: { type: GraphQLInt },
    psyche_anxious: { type: GraphQLInt },
    psyche_slow: { type: GraphQLInt },
    psyche_agitated: { type: GraphQLInt },
    psyche_confused: { type: GraphQLInt },
    psyche_depressed: { type: GraphQLInt },
    psyche_restless: { type: GraphQLInt },
    psyche_aggressive: { type: GraphQLInt },
    psyche_suicidal: { type: GraphQLInt },
    psyche_delusional: { type: GraphQLInt },
    unconscious: { type: GraphQLInt },
    intoxicated_alcohol: { type: GraphQLInt },
    drowsy: { type: GraphQLInt },
    communication_difficult_or_not_possible: { type: GraphQLInt },
    sensibility: { type: GraphQLInt },
    normal_table_result: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    severe_table_result: { type: GraphQLInt },
    text_primary_assessment_psyches: { type: GraphQLString },
    text_psychological_condition_comment: { type: GraphQLString }
  })
})
const ConditionPreItemType = new GraphQLObjectType({
  name: 'ConditionPreItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    pre_existing_condition: { type: GraphQLString },
    pregnant_possible_but_not_pregnant: { type: GraphQLInt },
    pregnant_not_possible: { type: GraphQLInt },
    pregnant_possible: { type: GraphQLInt },
    pregnant_possible_and_pregnant: { type: GraphQLInt },
    bacterial_infection: { type: GraphQLInt },
    chief_complaint_pain: { type: GraphQLInt },
    chief_complaint_shortness_of_breath: { type: GraphQLInt },
    chief_complaint_worsening_condition: { type: GraphQLInt },
    chief_complaint_consciousness_disorder: { type: GraphQLInt },
    chief_complaint_fainting: { type: GraphQLInt },
    chief_complaint_bleeding: { type: GraphQLInt },
    chief_complaint_pain_or_discomfort_chest: { type: GraphQLInt },
    chief_complaint_pain_or_discomfort_stomach: { type: GraphQLInt },
    chief_complaint_vertigo: { type: GraphQLInt },
    chief_complaint_pain_or_discomfort_extremities: { type: GraphQLInt },
    chief_complaint_pain_or_discomfort_head: { type: GraphQLInt },
    chief_complaint_nausea: { type: GraphQLInt },
    chief_complaint_vomiting: { type: GraphQLInt },
    chief_complaint_malaise: { type: GraphQLInt },
    chief_complaint_pain_or_discomfort_lumbar: { type: GraphQLInt },
    chief_complaint_seizure: { type: GraphQLInt },
    chief_complaint_diarrhea: { type: GraphQLInt },
    chief_complaint_fever: { type: GraphQLInt },
    chief_complaint_provoked_by_walking: { type: GraphQLInt },
    chief_complaint_provoked_by_pressure: { type: GraphQLInt },
    chief_complaint_provoked_by_laying: { type: GraphQLInt },
    chief_complaint_provoked_by_movement: { type: GraphQLInt },
    chief_complaint_provoked_by_sitting: { type: GraphQLInt },
    chief_complaint_provoked_by_standing: { type: GraphQLInt },
    chief_complaint_provoked_by_pain: { type: GraphQLInt },
    chief_complaint_provoked_by_strain: { type: GraphQLInt },
    chief_complaint_always_present: { type: GraphQLInt },
    chief_complaint_provoked_by_breathing: { type: GraphQLInt },
    chief_complaint_trembling: { type: GraphQLInt },
    chief_complaint_caused_by_fall_or_tripping: { type: GraphQLInt },
    chief_complaint_caused_by_accident: { type: GraphQLInt },
    chief_complaint_caused_by_fight: { type: GraphQLInt },
    risk_factor_age: { type: GraphQLInt },
    risk_factor_smoking: { type: GraphQLInt },
    risk_factor_high_blood_pressure: { type: GraphQLInt },
    risk_factor_sedentary: { type: GraphQLInt },
    risk_factor_diabetes: { type: GraphQLInt },
    risk_factor_overweight: { type: GraphQLInt },
    risk_factor_alcohol: { type: GraphQLInt },
    risk_factor_stress: { type: GraphQLInt },
    last_excretion_less_than_one_hour_ago: { type: GraphQLInt },
    last_excretion_less_than_four_hours_ago: { type: GraphQLInt },
    last_excretion_less_than_twelve_hours_ago: { type: GraphQLInt },
    last_meal_less_than_twelve_hours_ago: { type: GraphQLInt },
    last_meal_less_than_four_hours_ago: { type: GraphQLInt },
    last_meal_less_than_one_hour_ago: { type: GraphQLInt },
    last_meal_less_than_one_day_ago: { type: GraphQLInt },
    last_excretion_less_than_one_day_ago: { type: GraphQLInt },
    last_excretion_less_than_one_week_ago: { type: GraphQLInt },
    last_excretion_less_than_one_month_ago: { type: GraphQLInt },
    last_meal_less_than_one_week_ago: { type: GraphQLInt },
    last_meal_less_than_one_month_ago: { type: GraphQLInt },
    last_mens_current: { type: GraphQLInt },
    last_mens_less_than_a_week_ago: { type: GraphQLInt },
    last_mens_less_than_one_month_ago: { type: GraphQLInt },
    last_mens_more_than_a_month_ago: { type: GraphQLInt },
    chief_complaint_severity_score: { type: GraphQLInt },
    chief_complaint_palliation_protective_posture: { type: GraphQLInt },
    chief_complaint_palliation_laying: { type: GraphQLInt },
    chief_complaint_palliation_sitting: { type: GraphQLInt },
    chief_complaint_palliation_cooling: { type: GraphQLInt },
    chief_complaint_palliation_warming: { type: GraphQLInt },
    chief_complaint_palliation_standing: { type: GraphQLInt },
    chief_complaint_quality_pressure: { type: GraphQLInt },
    chief_complaint_quality_stabbing: { type: GraphQLInt },
    chief_complaint_quality_pulling: { type: GraphQLInt },
    chief_complaint_quality_dizzy: { type: GraphQLInt },
    chief_complaint_quality_burning: { type: GraphQLInt },
    chief_complaint_quality_tearing: { type: GraphQLInt },
    chief_complaint_pain_or_discomfort_radiating: { type: GraphQLInt },
    chief_complaint_began_less_than_an_hour_ago: { type: GraphQLInt },
    chief_complaint_began_less_than_four_hours_ago: { type: GraphQLInt },
    chief_complaint_began_less_than_twelve_hours_ago: { type: GraphQLInt },
    chief_complaint_began_less_than_twenty_four_hours_ago: { type: GraphQLInt },
    chief_complaint_began_less_than_one_week_ago: { type: GraphQLInt },
    chief_complaint_began_less_than_one_month_ago: { type: GraphQLInt },
    chief_complaint_not_changing: { type: GraphQLInt },
    chief_complaint_improving_condition: { type: GraphQLInt },
    chief_complaint_comes_and_goes: { type: GraphQLInt },
    allergic_to_penicillin: { type: GraphQLInt },
    allergic_to_pollen_grass_dust: { type: GraphQLInt },
    taking_medicine: { type: GraphQLInt },
    no_pre_existing_condition: { type: GraphQLInt },
    pre_existing_illness: { type: GraphQLInt },
    pre_existing_cancer: { type: GraphQLInt },
    pre_existing_asthma: { type: GraphQLInt },
    pre_existing_apoplexy: { type: GraphQLInt },
    pre_existing_heart_disease: { type: GraphQLInt },
    pre_existing_heart_failure: { type: GraphQLInt },
    pre_existing_epilepsy: { type: GraphQLInt },
    pre_existing_psychological_issues: { type: GraphQLInt },
    pre_existing_atrial_fibrillation: { type: GraphQLInt },
    pre_existing_copd: { type: GraphQLInt },
    chief_complaint_narrative: { type: GraphQLString },
    chief_complaint_provocation: { type: GraphQLString },
    anamnese_info: { type: GraphQLString },
    event_beginn: { type: GraphQLString },
    risk_factors: { type: GraphQLString },
    chief_complaint_region: { type: GraphQLString },
    allergy: { type: GraphQLString },
    medication: { type: GraphQLString },
    chief_complaint_psychological_issue: { type: GraphQLInt }
  })
})
const ConditionVitalsItemType = new GraphQLObjectType({
  name: 'ConditionVitalsItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    hr: { type: GraphQLInt },
    pulse_rate: { type: GraphQLInt },
    blood_glucose_level: { type: GraphQLInt },
    body_temperature: { type: GraphQLFloat },
    pain_scale: { type: GraphQLInt },
    cohb_1: { type: GraphQLInt },
    etc_o2_1: { type: GraphQLInt },
    no_vitals_assess_vital_signs_destination: { type: GraphQLInt },
    hr_assess_vital_signs_destination: { type: GraphQLInt },
    pulse_rate_assess_vital_signs_destination: { type: GraphQLInt },
    pulse_oximetry_assess_vital_signs_destination: { type: GraphQLInt },
    co2_assess_vital_signs_destination: { type: GraphQLInt },
    blood_glucose_level_assess_vital_signs_destination: { type: GraphQLInt },
    body_temperature_assess_vital_signs_destination: { type: GraphQLFloat },
    cohb_assess_vital_signs_destination: { type: GraphQLInt },
    etco2_assess_vital_signs_destination: { type: GraphQLFloat },
    po2: { type: new GraphQLList(GraphQLInt) },
    pco2: { type: new GraphQLList(GraphQLInt) },
    ph: { type: new GraphQLList(GraphQLInt) },
    sbic: { type: new GraphQLList(GraphQLInt) },
    pulse_oximetry: { type: GraphQLInt },
    bs: { type: new GraphQLList(GraphQLInt) },
    cohb_2: { type: new GraphQLList(GraphQLInt) },
    co: { type: new GraphQLList(GraphQLFloat) },
    etc_o2_2: { type: new GraphQLList(GraphQLFloat) },
    hr_vital_trend_tables_hr: { type: new GraphQLList(GraphQLInt) },
    systol: { type: new GraphQLList(GraphQLInt) },
    diastol: { type: new GraphQLList(GraphQLInt) },
    systol_vital_trend_tables_nibp: { type: new GraphQLList(GraphQLInt) },
    diastol_vital_trend_tables_nibp: { type: new GraphQLList(GraphQLInt) },
    vas: { type: new GraphQLList(GraphQLInt) },
    pulse: { type: new GraphQLList(GraphQLInt) },
    rr: { type: new GraphQLList(GraphQLInt) },
    sp_o2: { type: new GraphQLList(GraphQLInt) },
    temp: { type: new GraphQLList(GraphQLFloat) },
    respiratory_rate: { type: GraphQLInt },
    co2: { type: GraphQLInt },
    blood_glucose_too_high: { type: GraphQLInt },
    blood_glucose_too_low: { type: GraphQLInt },
    pulse_oximetry_under_oxygen_assess_vital_signs_destination: { type: GraphQLInt },
    pulse_oximetry_under_oxygen: { type: GraphQLInt },
    blood_glucose_too_low_destination: { type: GraphQLInt },
    blood_glucose_too_high_destination: { type: GraphQLInt },
    pulse_rhythm_irregular_destination: { type: GraphQLInt },
    pulse_rhythm_regular_destination: { type: GraphQLInt },
    pulse_rhythm_irregular: { type: GraphQLInt },
    pulse_rhythm_regular: { type: GraphQLInt },
    normal_table_result: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    severe_table_result: { type: GraphQLInt }
  })
})
const DeathItemType = new GraphQLObjectType({
  name: 'DeathItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    reason_cpr_discontinued_dnr: { type: GraphQLInt },
    reason_cpr_discontinued_underlying_disease_known: { type: GraphQLInt },
    reason_cpr_discontinued_other_factors: { type: GraphQLInt },
    death_result_hospital_admission_ROSC: { type: GraphQLInt },
    death_result_death_at_location: { type: GraphQLInt },
    death_result_hospital_admission_ongoing_resuscitation: { type: GraphQLInt },
    ascertainment_of_death_natural: { type: GraphQLInt },
    ascertainment_of_death_unknown: { type: GraphQLInt },
    ascertainment_of_death_unnatural: { type: GraphQLInt }
  })
})
const ExpertCommentItemType = new GraphQLObjectType({
  name: 'ExpertCommentItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    comment: { type: GraphQLString },
    comment_assess_vital_signs_destination: { type: GraphQLString },
    other_text_providers_impressions: { type: GraphQLString },
    text: { type: GraphQLString },
    text_trend_defib_notes: { type: GraphQLString },
    text_objectiv_circulation_others: { type: GraphQLString },
    text_objectiv_circulations: { type: GraphQLString },
    text_objectiv_skin_assessment: { type: GraphQLString },
    text_pri_assessment_circ_others: { type: GraphQLString },
    text_pri_assessment_circulation: { type: GraphQLString },
    text_pri_assessment_skin: { type: GraphQLString },
    type_providers_impressions_open: { type: GraphQLInt },
    type_providers_impressions_closed: { type: GraphQLInt },
    stable_vitals: { type: GraphQLInt },
    vital_measurement_not_necessary: { type: GraphQLInt },
    patient_transported_in_ambulance: { type: GraphQLInt },
    bleeding_lower_torso: { type: GraphQLInt },
    bleeding_neck: { type: GraphQLInt },
    bleeding_upper_extremities: { type: GraphQLInt },
    bleeding_lower_extremities: { type: GraphQLInt },
    bleeding_other: { type: GraphQLInt },
    patient_transferred: { type: GraphQLInt },
    ruled_out_acute_coronary_syndrome: { type: GraphQLInt },
    ruled_out_stroke: { type: GraphQLInt },
    ruled_out_spinal_disc_herniation: { type: GraphQLInt },
    ruled_out_fracture: { type: GraphQLInt },
    ruled_out_concussion: { type: GraphQLInt },
    pain_noted: { type: GraphQLInt },
    fainting_noted: { type: GraphQLInt },
    bleeding_noted: { type: GraphQLInt },
    worsening_condition_noted: { type: GraphQLInt },
    fracture_noted: { type: GraphQLInt },
    infection_noted: { type: GraphQLInt },
    dizziness_noted: { type: GraphQLInt },
    joint_locking_noted: { type: GraphQLInt },
    nausea_noted: { type: GraphQLInt },
    morphine_administered: { type: GraphQLInt },
    epinephrine_administered: { type: GraphQLInt },
    bleeding_upper_torso: { type: GraphQLInt },
    catecholamine_required: { type: GraphQLInt },
    weak_pulse: { type: GraphQLInt },
    strong_pulse: { type: GraphQLInt },
    normal_skin: { type: GraphQLInt },
    pale_skin: { type: GraphQLInt },
    decreased_skin_turgor: { type: GraphQLInt },
    sweaty_skin: { type: GraphQLInt },
    cold_skin: { type: GraphQLInt },
    warm_skin: { type: GraphQLInt },
    acute_coronary_syndrome_noted: { type: GraphQLInt },
    heart_issue_noted: { type: GraphQLInt },
    normal_table_result: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    severe_table_result: { type: GraphQLInt }
  })
})
const IllnessAssessmentItemType = new GraphQLObjectType({
  name: 'IllnessAssessmentItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    illness_group: { type: GraphQLString },
    illness_type: { type: GraphQLString },
    injury_detail: { type: GraphQLString },
    sickness: { type: GraphQLInt },
    injury: { type: GraphQLInt },
    burn: { type: GraphQLInt },
    frostbite: { type: GraphQLInt },
    other_diagnosis: { type: GraphQLInt },
    diagnosis_worsening_condition: { type: GraphQLInt },
    diagnosis_acute_coronary_syndrome: { type: GraphQLInt },
    diagnosis_fainting: { type: GraphQLInt },
    diagnosis_seizure: { type: GraphQLInt },
    diagnosis_high_blood_pressure: { type: GraphQLInt },
    diagnosis_intoxicated: { type: GraphQLInt },
    diagnosis_stroke: { type: GraphQLInt },
    diagnosis_copd: { type: GraphQLInt },
    diagnosis_illness: { type: GraphQLInt },
    diagnosis_infection: { type: GraphQLInt },
    diagnosis_circulatory_dysregulation: { type: GraphQLInt },
    diagnosis_psychological_issue: { type: GraphQLInt },
    main_diagnosis_yes_or_no: { type: GraphQLInt },
    diagnosis_heart_issues: { type: GraphQLInt },
    diagnosis_heart_failure: { type: GraphQLInt },
    diagnosis_injury: { type: GraphQLInt },
    diagnosis_respiratory_disease: { type: GraphQLInt },
    diagnosis_nervous_system_disease: { type: GraphQLInt },
    diagnosis_fracture: { type: GraphQLInt },
    diagnosis_pain: { type: GraphQLInt },
    diagnosis_severity: { type: GraphQLInt },
    infections: { type: GraphQLInt },
    lung_disease: { type: GraphQLInt },
    cardiovascular_disease: { type: GraphQLInt },
    abdominal_disease: { type: GraphQLInt },
    metabolic_disease: { type: GraphQLInt },
    other_diseases: { type: GraphQLInt },
    cns_disease: { type: GraphQLInt },
    respiratory_disease: { type: GraphQLInt },
    psychiatric_disease: { type: GraphQLInt },
    gyn_obstetrics_emergencies: { type: GraphQLInt }
  })
})
const InjuryItemType = new GraphQLObjectType({
  name: 'InjuryItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    wound_size: { type: new GraphQLList(GraphQLInt) },
    summary_hemostasis: { type: GraphQLString },
    other_text: { type: GraphQLString },
    comment_injury_reason: { type: GraphQLString },
    injury_type: { type: GraphQLString },
    burn_percentage: { type: new GraphQLList(GraphQLInt) },
    naca: { type: GraphQLInt },
    bleeding_staunched_by_tourniquet: { type: GraphQLInt },
    bleeding_staunched_by_bandage: { type: GraphQLInt },
    bleeding_staunched_by_pelvic_belt: { type: GraphQLInt },
    bleeding_staunched_by_quikclot: { type: GraphQLInt },
    circulation_normal: { type: GraphQLInt },
    circulation_none: { type: GraphQLInt },
    circulation_reduced: { type: GraphQLInt },
    motoric_normal: { type: GraphQLInt },
    motoric_none: { type: GraphQLInt },
    motoric_reduced: { type: GraphQLInt },
    wound_open: { type: GraphQLInt },
    wound_closed: { type: GraphQLInt },
    blunt_trauma: { type: GraphQLInt },
    penetrating_trauma: { type: GraphQLInt },
    venous_bleeding: { type: GraphQLInt },
    arterial_bleeding: { type: GraphQLInt },
    spine_trauma_details_with_neurology: { type: GraphQLInt },
    spine_trauma_details_without_neurology: { type: GraphQLInt },
    amputation_detail_total: { type: GraphQLInt },
    amputation_detail_subtotal: { type: GraphQLInt },
    severity: { type: GraphQLInt },
    location_head: { type: GraphQLInt },
    location_extremities: { type: GraphQLInt },
    location_throat: { type: GraphQLInt },
    location_lower_torso: { type: GraphQLInt },
    location_upper_torso: { type: GraphQLInt },
    bandages_applied: { type: GraphQLInt },
    pain_noted: { type: GraphQLInt },
    ruled_out_fracture: { type: GraphQLInt },
    injury_caused_by_fall: { type: GraphQLInt },
    fracture: { type: GraphQLInt },
    bruise: { type: GraphQLInt },
    laceration: { type: GraphQLInt },
    abrasion: { type: GraphQLInt },
    traumatic_brain_injury: { type: GraphQLInt },
    dislocation: { type: GraphQLInt },
    trauma: { type: GraphQLInt },
    amputation: { type: GraphQLInt },
    other_injury_type: { type: GraphQLInt },
    bite_wound: { type: GraphQLInt },
    no_injury: { type: GraphQLInt },
    burn_degree: { type: GraphQLInt }
  })
})
const InterventionItemType = new GraphQLObjectType({
  name: 'InterventionItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    other_text_intervention_intubation: { type: GraphQLString },
    text_intervention_others: { type: GraphQLString },
    value_intervention_shockcs: { type: new GraphQLList(GraphQLInt) },
    value_intervention_shocks: { type: new GraphQLList(GraphQLInt) },
    type_intervention_cannulations: { type: GraphQLString },
    location_intervention_cannulations: { type: GraphQLString },
    other_text_intervention_cannulations: { type: GraphQLString },
    type_intervention_intubations: { type: GraphQLString },
    existing_permanent_catheter: { type: GraphQLInt },
    existing_anesthesia: { type: GraphQLInt },
    existing_cervical_collar: { type: GraphQLInt },
    existing_gastric_tube: { type: GraphQLInt },
    existing_bandages: { type: GraphQLInt },
    bandages_applied: { type: GraphQLInt },
    warmth_applied: { type: GraphQLInt },
    cooling_applied: { type: GraphQLInt },
    anesthetic_applied: { type: GraphQLInt },
    other_intervention: { type: GraphQLInt },
    emergency_intervention: { type: GraphQLInt },
    ultrasound_used: { type: GraphQLInt },
    permanent_catheter_applied: { type: GraphQLInt },
    gastric_tube_applied: { type: GraphQLInt },
    chest_compressions_performed: { type: GraphQLInt },
    baby_delivered: { type: GraphQLInt },
    transport_incubator_used: { type: GraphQLInt },
    aspiration_during_intubation: { type: GraphQLInt },
    intubation_not_possible: { type: GraphQLInt },
    no_intervention_performed: { type: GraphQLInt },
    ecg_performed: { type: GraphQLInt },
    bleeding_staunched: { type: GraphQLInt },
    iv_cannulation_performed: { type: GraphQLInt },
    io_cannulation_performed: { type: GraphQLInt },
    patient_has_port: { type: GraphQLInt },
    intubation_performed: { type: GraphQLInt }
  })
})
const NeurologyItemType = new GraphQLObjectType({
  name: 'NeurologyItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    text_objectiv_neuro_abnorms: { type: GraphQLString },
    text_objectiv_psyches: { type: GraphQLString },
    text_primary_assessment_neuro_abnorms: { type: GraphQLString },
    neurology_comment: { type: GraphQLString },
    neurology_comment_assessment_exam_dest: { type: GraphQLString },
    observation_psychological_condition_comment: { type: GraphQLString },
    neurology_normal: { type: GraphQLInt },
    neurology_normal_assessment_exam_dest: { type: GraphQLInt },
    text_primary_assessment_neuro_states_awake: { type: GraphQLInt },
    text_primary_assessment_neuro_states_reacts_to_speech: { type: GraphQLInt },
    text_primary_assessment_neuro_states_unconscious: { type: GraphQLInt },
    text_primary_assessment_neuro_states_under_general_anesthesia: { type: GraphQLInt },
    text_primary_assessment_neuro_states_reacts_to_pain: { type: GraphQLInt },
    text_primary_assessment_neuro_states_not_determinable: { type: GraphQLInt },
    text_objectiv_neuro_states_reacts_to_speech: { type: GraphQLInt },
    text_objectiv_neuro_states_awake: { type: GraphQLInt },
    text_objectiv_neuro_states_unconscious: { type: GraphQLInt },
    text_objectiv_neuro_states_reacts_to_pain: { type: GraphQLInt },
    text_objectiv_neuro_states_not_determinable: { type: GraphQLInt },
    text_objectiv_neuro_states_under_general_anesthetic: { type: GraphQLInt },
    no_neurological_abnormalities: { type: GraphQLInt },
    dementia: { type: GraphQLInt },
    neurological_deficit: { type: GraphQLInt },
    speech_disorder: { type: GraphQLInt },
    sight_disorder: { type: GraphQLInt },
    excretion_disorder: { type: GraphQLInt },
    lateralizing_signs: { type: GraphQLInt },
    psyche_other: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    normal_table_result: { type: GraphQLInt }
  })
})

const RespiratoryItemType = new GraphQLObjectType({
  name: 'RespiratoryItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    primary_assessment_airways_comment: { type: GraphQLString },
    primary_assessment_breathing_comment: { type: GraphQLString },
    text_primary_assessment_resp_lung_sounds: { type: GraphQLString },
    text_primary_assessment_airways: { type: GraphQLString },
    text_primary_assessment_respirations: { type: GraphQLString },
    observation_airways_comment: { type: GraphQLString },
    observation_breathing_comment: { type: GraphQLString },
    respiratory_rate_assess_vital_signs_destination: { type: GraphQLInt },
    text_intervention_airways: { type: GraphQLString },
    text_intervention_breathings: { type: GraphQLString },
    text_objectiv_airways: { type: GraphQLString },
    text_objectiv_resperation_lung_sounds: { type: GraphQLString },
    text_objectiv_resperations: { type: GraphQLString },
    amount_intervention_oxygens: { type: new GraphQLList(GraphQLInt) },
    freq: { type: new GraphQLList(GraphQLInt) },
    amv: { type: new GraphQLList(GraphQLFloat) },
    ie: { type: GraphQLFloat },
    ie2: { type: GraphQLFloat },
    asb: { type: new GraphQLList(GraphQLInt) },
    pinsp: { type: new GraphQLList(GraphQLInt) },
    trigger: { type: new GraphQLList(GraphQLInt) },
    in_tr: { type: GraphQLInt },
    text_intervention_rescues: { type: GraphQLString },
    mode: { type: GraphQLString },
    vt: { type: new GraphQLList(GraphQLInt) },
    rr: { type: new GraphQLList(GraphQLInt) },
    peep: { type: new GraphQLList(GraphQLInt) },
    fio2: { type: new GraphQLList(GraphQLInt) },
    p_max: { type: new GraphQLList(GraphQLInt) },
    energy: { type: new GraphQLList(GraphQLInt) },
    obj_resp_airway_managements_spontaneous: { type: GraphQLInt },
    obj_resp_airway_managements_cpap: { type: GraphQLInt },
    obj_resp_airway_managements_controlled: { type: GraphQLInt },
    obj_resp_airway_managements_assisted: { type: GraphQLInt },
    obj_resp_airway_managements_other: { type: GraphQLInt },
    primary_assessment_resp_airway_mgt_other: { type: GraphQLInt },
    primary_assessment_resp_airway_mgt_spontaneous: { type: GraphQLInt },
    primary_assessment_resp_airway_mgt_assisted: { type: GraphQLInt },
    primary_assessment_resp_airway_mgt_controlled: { type: GraphQLInt },
    primary_assessment_resp_airway_mgt_cpap: { type: GraphQLInt },
    airways_ruddy: { type: GraphQLInt },
    airways_wet: { type: GraphQLInt },
    airways_dry: { type: GraphQLInt },
    blood_in_airways: { type: GraphQLInt },
    breathing_stable: { type: GraphQLInt },
    sibilant_rhonchi: { type: GraphQLInt },
    shortness_of_breath: { type: GraphQLInt },
    copd: { type: GraphQLInt },
    coughing: { type: GraphQLInt },
    spastic_breathing: { type: GraphQLInt },
    rales: { type: GraphQLInt },
    weak_breathing: { type: GraphQLInt },
    clear_airways: { type: GraphQLInt },
    stridor: { type: GraphQLInt },
    aspiration: { type: GraphQLInt },
    tracheostoma: { type: GraphQLInt },
    respiration_normal: { type: GraphQLInt },
    apnea: { type: GraphQLInt },
    cyanosis: { type: GraphQLInt },
    no_respiratory_intervention: { type: GraphQLInt },
    removal_of_fluids_by_suction: { type: GraphQLInt },
    jaw_thrust_maneuver_performed: { type: GraphQLInt },
    cervical_collar_administered: { type: GraphQLInt },
    patient_placed_in_recovery_position: { type: GraphQLInt },
    foreign_object_removed_from_airway: { type: GraphQLInt },
    non_rebreather_mask_administered: { type: GraphQLInt },
    intubated: { type: GraphQLInt },
    other_abnormality: { type: GraphQLInt },
    hyperventilation: { type: GraphQLInt },
    patient_reclined: { type: GraphQLInt },
    patient_placed_on_mattress: { type: GraphQLInt },
    patient_sat: { type: GraphQLInt },
    patient_carried: { type: GraphQLInt },
    assisted_breathing_administered: { type: GraphQLInt },
    normal_table_result: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    severe_table_result: { type: GraphQLInt }
  })
})

const TreatmentItemType = new GraphQLObjectType({
  name: 'TreatmentItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    pain_not_required: { type: GraphQLInt },
    temp_not_required: { type: GraphQLInt },
    medication_dosage: { type: new GraphQLList(GraphQLFloat) },
    medication_dosage_units: { type: new GraphQLList(GraphQLString) },
    medication_group: { type: new GraphQLList(GraphQLString) },
    medications_given: { type: new GraphQLList(GraphQLString) },
    medication_amount: { type: new GraphQLList(GraphQLString) },
    medication_name: { type: new GraphQLList(GraphQLString) },
    medication_id: { type: new GraphQLList(GraphQLString) },
    af_not_required_not_relevant: { type: GraphQLInt },
    af_not_required_not_technically_measurable: { type: GraphQLInt },
    pain_not_required_not_relevant: { type: GraphQLInt },
    pain_not_required_not_medically_measurable: { type: GraphQLInt },
    pain_not_required_not_technically_measurable: { type: GraphQLInt },
    pulse_not_required_not_medically_measurable: { type: GraphQLInt },
    pulse_not_required_not_relevant: { type: GraphQLInt },
    pulse_not_required_not_technically_measurable: { type: GraphQLInt },
    sp_o2_not_required_not_relevant: { type: GraphQLInt },
    sp_o2_not_required_not_technically_measurable: { type: GraphQLInt },
    sp_o2_not_required_not_medically_measurable: { type: GraphQLInt },
    temp_not_required_not_relevant: { type: GraphQLInt },
    temp_not_required_not_technically_measurable: { type: GraphQLInt },
    temp_not_required_not_medically_measurable: { type: GraphQLInt },
    bp_not_required_not_relevant: { type: GraphQLInt },
    bp_not_required_not_technically_measurable: { type: GraphQLInt },
    bp_not_required_not_medically_measurable: { type: GraphQLInt },
    blood_sugar_not_required_not_relevant: { type: GraphQLInt },
    blood_sugar_not_required_not_technically_measurable: { type: GraphQLInt },
    blood_sugar_not_required_not_medically_measurable: { type: GraphQLInt },
    af_not_required: { type: GraphQLInt },
    pulse_not_required: { type: GraphQLInt },
    sp_o2_not_required: { type: GraphQLInt },
    bp_not_required: { type: GraphQLInt },
    etc2_not_required: { type: GraphQLInt },
    cohb_not_required: { type: GraphQLInt },
    bz_not_required: { type: GraphQLInt },
    patient_given_medication: { type: GraphQLInt }
  })
})

const CardioItemType = new GraphQLObjectType({
  name: 'CardioItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    cath_lab_refused: { type: GraphQLInt },
    twelve_lead_ecg_right_heart: { type: GraphQLInt },
    wake_up_stroke: { type: GraphQLInt },
    stroke_unit_no: { type: GraphQLInt },
    stroke_unit_yes: { type: GraphQLInt },
    stroke_unit_refused: { type: GraphQLInt },
    cath_lab_status_no: { type: GraphQLInt },
    cath_lab_status_yes: { type: GraphQLInt },
    ecg_lead_transmission_yes: { type: GraphQLInt },
    ecg_lead_transmission_no: { type: GraphQLInt },
    ecg_lead_transmission_result_direct_to_emergency: { type: GraphQLInt },
    ecg_lead_transmission_result_no_response: { type: GraphQLInt },
    ecg_lead_transmission_result_direct_to_ptca: { type: GraphQLInt },
    ecg_lead_no_transmission_not_medically_necessary: { type: GraphQLInt },
    ecg_lead_no_transmission_other_reason: { type: GraphQLInt },
    left_bundle_branch_block: { type: GraphQLInt },
    right_bundle_branch_block: { type: GraphQLInt },
    bundle_branch_block: { type: GraphQLInt },
    premature_heart_beat: { type: GraphQLInt },
    stable: { type: GraphQLInt },
    sinus_rhythm: { type: GraphQLInt },
    atrial_fibrillation: { type: GraphQLInt },
    arrhythmia: { type: GraphQLInt },
    narrow_qrs_tachycardia: { type: GraphQLInt },
    wide_qrs_tachycardia: { type: GraphQLInt },
    pacemaker: { type: GraphQLInt },
    heart_attack_nstemi: { type: GraphQLInt },
    heart_attack_stemi: { type: GraphQLInt },
    cardiac_arrest: { type: GraphQLInt },
    cardiac_flatline: { type: GraphQLInt },
    text_ecg_comment_objective: { type: GraphQLString },
    text_objectiv_ecg: { type: GraphQLString },
    text_primary_assessment_ecg: { type: GraphQLString },
    text_ecg_comment_primary_assessment: { type: GraphQLString },
    normal_table_result: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    severe_table_result: { type: GraphQLInt }
  })
})

const BodySensitivityItemType = new GraphQLObjectType({
  name: 'BodySensitivityItemType',
  fields: () => ({
    id: { type: GraphQLInt },
    movement_of_the_extremities_left_arm: { type: GraphQLInt },
    movement_of_the_extremities_left_arm_assessment_exam_dest: { type: GraphQLInt },
    movement_of_the_extremities_left_leg: { type: GraphQLInt },
    movement_of_the_extremities_left_leg_assessment_exam_dest: { type: GraphQLInt },
    movement_of_the_extremities_right_arm_assessment_exam_dest: { type: GraphQLInt },
    movement_of_the_extremities_right_leg_assessment_exam_dest: { type: GraphQLInt },
    sensibility_left_arm_assessment_exam_dest: { type: GraphQLInt },
    sensibility_left_leg_assessment_exam_dest: { type: GraphQLInt },
    sensibility_right_arm_assessment_exam_dest: { type: GraphQLInt },
    sensibility_right_leg_assessment_exam_dest: { type: GraphQLInt },
    movement_of_the_extremities_right_arm: { type: GraphQLInt },
    movement_of_the_extremities_right_leg: { type: GraphQLInt },
    sensibility_left_arm: { type: GraphQLInt },
    sensibility_left_leg: { type: GraphQLInt },
    sensibility_right_arm: { type: GraphQLInt },
    sensibility_right_leg: { type: GraphQLInt },
    pupil_left_assessment_exam_dest_middle: { type: GraphQLInt },
    pupil_left_assessment_exam_dest_narrow: { type: GraphQLInt },
    pupil_left_assessment_exam_dest_wide: { type: GraphQLInt },
    pupil_left_assessment_exam_dest_not_determinable: { type: GraphQLInt },
    pupil_left_assessment_exam_dest_dyscoria: { type: GraphQLInt },
    pupil_right_assessment_exam_dest_middle: { type: GraphQLInt },
    pupil_right_assessment_exam_dest_narrow: { type: GraphQLInt },
    pupil_right_assessment_exam_dest_wide: { type: GraphQLInt },
    pupil_right_assessment_exam_dest_not_determinable: { type: GraphQLInt },
    pupil_right_assessment_exam_dest_dyscoria: { type: GraphQLInt },
    pupil_right_not_determinable: { type: GraphQLInt },
    pupil_left_not_determinable: { type: GraphQLInt },
    normal_table_result: { type: GraphQLInt },
    abnormal_table_result: { type: GraphQLInt },
    severe_table_result: { type: GraphQLInt }
  })
})

const PatientItemType = new GraphQLObjectType({
  name: 'PatientItemType',
  fields: () => ({
    case_id: { type: GraphQLString },
    estimated_body_weight: { type: GraphQLFloat },
    age: { type: GraphQLInt },
    bmi: { type: GraphQLInt },
    size_cm: { type: GraphQLInt },
    gcs_summary: { type: GraphQLString },
    female: { type: GraphQLInt },
    male: { type: GraphQLInt },
    nonbinary: { type: GraphQLInt },
    nationality: { type: GraphQLString },
    patient_category_intensive_care: { type: GraphQLInt },
    patient_category_high_risk: { type: GraphQLInt },
    patient_category_no_vital_danger: { type: GraphQLInt },
    blood_pressure_id: { type: GraphQLInt },
    body_sensitivity_id: { type: GraphQLInt },
    cardio_id: { type: GraphQLInt },
    condition_basic_id: { type: GraphQLInt },
    condition_consciousness_id: { type: GraphQLInt },
    condition_mental_id: { type: GraphQLInt },
    condition_pre_id: { type: GraphQLInt },
    condition_vitals_id: { type: GraphQLInt },
    death_id: { type: GraphQLInt },
    expert_comment_id: { type: GraphQLInt },
    illness_assessment_id: { type: GraphQLInt },
    injury_id: { type: GraphQLInt },
    intervention_id: { type: GraphQLInt },
    neurology_id: { type: GraphQLInt },
    respiratory_id: { type: GraphQLInt },
    treatment_id: { type: GraphQLInt },
    infections: { type: GraphQLInt },
    lung_disease: { type: GraphQLInt },
    cardiovascular_disease: { type: GraphQLInt },
    abdominal_disease: { type: GraphQLInt },
    metabolic_disease: { type: GraphQLInt },
    other_diseases: { type: GraphQLInt },
    cns_disease: { type: GraphQLInt },
    respiratory_disease: { type: GraphQLInt },
    psychiatric_disease: { type: GraphQLInt },
    gyn_obstetrics_emergencies: { type: GraphQLInt }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    patient: {
      type: PatientItemType,
      args: {case_id: {type: GraphQLString}},
      resolve(_, {case_id}) {
        const query = `SELECT * FROM patient_information
                        FULL JOIN patient_table_references ON patient_table_references.patient_information_id = patient_information.id
                        FULL JOIN illness_assessment ON patient_table_references.illness_assessment_id = illness_assessment.id
                        WHERE case_id=\'${case_id}\'`
        return psql.oneOrNone(query);
      }
    },
    patients: {
      type: new GraphQLList(PatientItemType),
      args: {},
      resolve(_) {
        const query = `SELECT * FROM patient_information
                        FULL JOIN patient_table_references ON patient_table_references.patient_information_id = patient_information.id
                        WHERE patient_information_id < 100`
        return psql.many(query);
      }
    },
    bloodPressure: {
      type: BloodPressureItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM blood_pressure WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    bodySensitivity: {
      type: BodySensitivityItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM body_sensitivity WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    cardio: {
      type: CardioItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM cardio WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    conditionBasic: {
      type: ConditionBasicItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM condition_basic WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    conditionConsciousness: {
      type: ConditionConsciousnessItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM condition_consciousness WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    conditionMental: {
      type: ConditionMentalItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM condition_mental WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    conditionPre: {
      type: ConditionPreItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM condition_pre WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    conditionVitals: {
      type: ConditionVitalsItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM condition_vitals WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    death: {
      type: DeathItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM death WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    expertComment: {
      type: ExpertCommentItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM expert_comment WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    illnessAssessment: {
      type: IllnessAssessmentItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM illness_assessment WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    injury: {
      type: InjuryItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM injury WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    intervention: {
      type: InterventionItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM intervention WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    neurology: {
      type: NeurologyItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM neurology WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    respiratory: {
      type: RespiratoryItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM respiratory WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    },
    treatment: {
      type: TreatmentItemType,
      args: {id: {type: GraphQLInt}},
      resolve(_, {id}) {
        const query = `SELECT * FROM treatment WHERE id=${id}`
        return psql.oneOrNone(query);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
