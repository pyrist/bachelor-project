//nodemon src/api/server.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schemaOther = require("./schema")
const QueryStream = require('pg-query-stream')
const csvWriter = require("csv-write-stream");
const {Pool} = require("pg");
const pool = new Pool({
  host: 'localhost',
  database: 'medical_data',
  port: 5432,
  user: 'postgres',
  password: 'admin',
})

const lungDiseaseSql = "select patient_table_references.case_id, \n" +
  "condition_vitals.etc_o2_1,\n" +
  "condition_vitals.etc_o2_2,\n" +
  "blood_pressure.*,\n" +
  "cardio.cardiac_arrest,\n" +
  "cardio.heart_attack_stemi,\n" +
  "cardio.heart_attack_nstemi,\n" +
  "condition_vitals.pulse,\n" +
  "condition_vitals.pulse_rate,\n" +
  "condition_vitals.hr,\n" +
  "condition_vitals.rr,\n" +
  "condition_vitals.normal_table_result,\n" +
  "condition_vitals.abnormal_table_result,\n" +
  "condition_vitals.severe_table_result,\n" +
  "condition_vitals.sp_o2,\n" +
  "condition_vitals.temp,\n" +
  "condition_vitals.pulse_rhythm_irregular_destination,\n" +
  "condition_vitals.pulse_rhythm_irregular,\n" +
  "condition_vitals.pulse_rhythm_regular_destination,\n" +
  "condition_vitals.pulse_rhythm_regular,\n" +
  "condition_vitals.po2,\n" +
  "condition_vitals.pco2,\n" +
  "condition_vitals.ph,\n" +
  "condition_consciousness.state_of_consciousness_awake,\n" +
  "condition_consciousness.state_of_consciousness_unconscious,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_speech,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_pain,\n" +
  "condition_consciousness.state_of_consciousness_under_general_anesthetic,\n" +
  "condition_consciousness.state_of_consciousness_not_determinable,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes,\n" +
  "intervention.other_intervention,\n" +
  "intervention.emergency_intervention,\n" +
  "intervention.chest_compressions_performed,\n" +
  "intervention.aspiration_during_intubation,\n" +
  "intervention.intubation_not_possible,\n" +
  "intervention.intubation_performed,\n" +
  "intervention.iv_cannulation_performed,\n" +
  "intervention.io_cannulation_performed,\n" +
  "respiratory.amount_intervention_oxygens,\n" +
  "respiratory.freq,\n" +
  "respiratory.amv,\n" +
  "respiratory.ie,\n" +
  "respiratory.ie2,\n" +
  "respiratory.asb,\n" +
  "respiratory.pinsp,\n" +
  "respiratory.trigger,\n" +
  "respiratory.in_tr,\n" +
  "respiratory.vt,\n" +
  "respiratory.rr,\n" +
  "respiratory.peep,\n" +
  "respiratory.fio2,\n" +
  "respiratory.p_max,\n" +
  "respiratory.energy,\n" +
  "respiratory.obj_resp_airway_managements_spontaneous,\n" +
  "respiratory.obj_resp_airway_managements_cpap,\n" +
  "respiratory.obj_resp_airway_managements_controlled,\n" +
  "respiratory.obj_resp_airway_managements_assisted,\n" +
  "respiratory.obj_resp_airway_managements_other,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_other,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_assisted,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_spontaneous,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_controlled,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_cpap,\n" +
  "respiratory.airways_ruddy,\n" +
  "respiratory.airways_wet,\n" +
  "respiratory.airways_dry,\n" +
  "respiratory.blood_in_airways,\n" +
  "respiratory.breathing_stable,\n" +
  "respiratory.sibilant_rhonchi,\n" +
  "respiratory.shortness_of_breath,\n" +
  "respiratory.copd,\n" +
  "respiratory.coughing,\n" +
  "respiratory.spastic_breathing,\n" +
  "respiratory.rales,\n" +
  "respiratory.weak_breathing,\n" +
  "respiratory.clear_airways,\n" +
  "respiratory.stridor,\n" +
  "respiratory.aspiration,\n" +
  "respiratory.tracheostoma,\n" +
  "respiratory.respiration_normal,\n" +
  "respiratory.apnea,\n" +
  "respiratory.cyanosis,\n" +
  "respiratory.no_respiratory_intervention,\n" +
  "respiratory.removal_of_fluids_by_suction,\n" +
  "respiratory.jaw_thrust_maneuver_performed,\n" +
  "respiratory.cervical_collar_administered,\n" +
  "respiratory.patient_placed_in_recovery_position,\n" +
  "respiratory.foreign_object_removed_from_airway,\n" +
  "respiratory.non_rebreather_mask_administered,\n" +
  "respiratory.intubated,\n" +
  "respiratory.other_abnormality,\n" +
  "respiratory.hyperventilation,\n" +
  "respiratory.assisted_breathing_administered,\n" +
  "respiratory.abnormal_table_result,\n" +
  "respiratory.normal_table_result,\n" +
  "respiratory.severe_table_result,\n" +
  "patient_information.age,\n" +
  "illness_assessment.diagnosis_worsening_condition,\n" +
  "illness_assessment.diagnosis_copd,\n" +
  "illness_assessment.diagnosis_illness,\n" +
  "illness_assessment.diagnosis_infection,\n" +
  "illness_assessment.diagnosis_respiratory_disease\n" +
  "from patient_table_references\n" +
  "full join patient_information on patient_table_references.patient_information_id = patient_information.id\n" +
  "full join cardio on patient_table_references.cardio_id = cardio.id\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join respiratory on patient_table_references.respiratory_id = respiratory.id\n" +
  "full join blood_pressure on patient_table_references.blood_pressure_id = blood_pressure.id\n" +
  "full join intervention on patient_table_references.intervention_id = intervention.id\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "where illness_assessment.lung_disease = 1";

const cnsDiseaseSql = "select patient_table_references.case_id, \n" +
  "condition_consciousness.light_reflex_left, \n" +
  "condition_consciousness.light_reflex_right, \n" +
  "condition_consciousness.light_reflex_left_assessment_exam_dest, \n" +
  "condition_consciousness.light_reflex_right_assessment_exam_dest, \n" +
  "condition_consciousness.pupil_left_eyes_narrow, condition_consciousness.pupil_left_eyes_middle, \n" +
  "condition_consciousness.pupil_left_eyes_wide, condition_consciousness.pupil_left_eyes_dyscoria, \n" +
  "condition_consciousness.pupil_right_eyes_narrow, condition_consciousness.pupil_right_eyes_middle, \n" +
  "condition_consciousness.pupil_right_eyes_wide, condition_consciousness.pupil_right_eyes_dyscoria,\n" +
  "condition_consciousness.normal_table_result,\n" +
  "condition_consciousness.abnormal_table_result,\n" +
  "condition_consciousness.severe_table_result,\n" +
  "body_sensitivity.movement_of_the_extremities_left_arm,\n" +
  "body_sensitivity.movement_of_the_extremities_left_arm_assessment_exam_dest,\n" +
  "body_sensitivity.movement_of_the_extremities_left_leg,\n" +
  "body_sensitivity.movement_of_the_extremities_left_leg_assessment_exam_dest,\n" +
  "body_sensitivity.movement_of_the_extremities_right_arm,\n" +
  "body_sensitivity.movement_of_the_extremities_right_arm_assessment_exam_dest,\n" +
  "body_sensitivity.movement_of_the_extremities_right_leg,\n" +
  "body_sensitivity.movement_of_the_extremities_right_leg_assessment_exam_dest,\n" +
  "body_sensitivity.sensibility_left_arm,\n" +
  "body_sensitivity.sensibility_left_arm_assessment_exam_dest,\n" +
  "body_sensitivity.sensibility_left_leg,\n" +
  "body_sensitivity.sensibility_left_leg_assessment_exam_dest,\n" +
  "body_sensitivity.sensibility_right_arm,\n" +
  "body_sensitivity.sensibility_right_arm_assessment_exam_dest,\n" +
  "body_sensitivity.sensibility_right_leg,\n" +
  "body_sensitivity.sensibility_right_leg_assessment_exam_dest,\n" +
  "body_sensitivity.normal_table_result,\n" +
  "body_sensitivity.abnormal_table_result,\n" +
  "body_sensitivity.severe_table_result,\n" +
  "neurology.neurology_normal,\n" +
  "neurology.neurology_normal_assessment_exam_dest,\n" +
  "neurology.text_primary_assessment_neuro_states_awake,\n" +
  "neurology.text_primary_assessment_neuro_states_reacts_to_speech,\n" +
  "neurology.text_primary_assessment_neuro_states_unconscious,\n" +
  "neurology.text_primary_assessment_neuro_states_under_general_anesthesia,\n" +
  "neurology.text_primary_assessment_neuro_states_reacts_to_pain,\n" +
  "neurology.text_primary_assessment_neuro_states_not_determinable,\n" +
  "neurology.text_objectiv_neuro_states_reacts_to_speech,\n" +
  "neurology.text_objectiv_neuro_states_awake,\n" +
  "neurology.text_objectiv_neuro_states_unconscious,\n" +
  "neurology.text_objectiv_neuro_states_reacts_to_pain,\n" +
  "neurology.text_objectiv_neuro_states_not_determinable,\n" +
  "neurology.text_objectiv_neuro_states_under_general_anesthetic,\n" +
  "neurology.no_neurological_abnormalities,\n" +
  "neurology.dementia,\n" +
  "neurology.neurological_deficit,\n" +
  "neurology.speech_disorder,\n" +
  "neurology.sight_disorder,\n" +
  "neurology.excretion_disorder,\n" +
  "neurology.lateralizing_signs,\n" +
  "neurology.psyche_other,\n" +
  "neurology.abnormal_table_result,\n" +
  "neurology.normal_table_result,\n" +
  "cardio.stroke_unit_no,\n" +
  "cardio.stroke_unit_yes,\n" +
  "cardio.stroke_unit_refused,\n" +
  "cardio.wake_up_stroke,\n" +
  "condition_consciousness.gcs_eye_assessment,\n" +
  "condition_consciousness.gcs_motor_assessment,\n" +
  "condition_consciousness.gcs_verbal_assessment,\n" +
  "patient_information.age,\n" +
  "illness_assessment.diagnosis_worsening_condition,\n" +
  "illness_assessment.diagnosis_seizure,\n" +
  "illness_assessment.diagnosis_fainting,\n" +
  "illness_assessment.diagnosis_stroke,\n" +
  "illness_assessment.diagnosis_nervous_system_disease,\n" +
  "illness_assessment.diagnosis_pain,\n" +
  "illness_assessment.diagnosis_severity,\n" +
  "illness_assessment.cns_disease,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes,\n" +
  "condition_pre.pre_existing_cancer,\n" +
  "condition_pre.pre_existing_apoplexy,\n" +
  "condition_pre.pre_existing_epilepsy,\n" +
  "condition_vitals.body_temperature,\n" +
  "condition_vitals.body_temperature_assess_vital_signs_destination\n" +
  "from patient_table_references\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join patient_information on patient_table_references.patient_information_id = patient_information.id\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join cardio on patient_table_references.cardio_id = cardio.id\n" +
  "full join neurology on patient_table_references.neurology_id = neurology.id\n" +
  "full join body_sensitivity on patient_table_references.body_sensitivity_id = body_sensitivity.id\n" +
  "where illness_assessment.cns_disease = 1";

const cardiovascularDiseaseSql = "select patient_table_references.case_id, \n" +
  "condition_vitals.pulse_rate,\n" +
  "condition_vitals.pulse_rhythm_irregular_destination,\n" +
  "condition_vitals.pulse_rhythm_irregular,\n" +
  "condition_vitals.pulse_rhythm_regular_destination,\n" +
  "condition_vitals.pulse_rhythm_regular,\n" +
  "condition_vitals.hr,\n" +
  "condition_vitals.rr,\n" +
  "condition_vitals.pain_scale,\n" +
  "condition_vitals.hr_assess_vital_signs_destination,\n" +
  "condition_vitals.pulse_rate_assess_vital_signs_destination,\n" +
  "condition_vitals.hr_vital_trend_tables_hr,\n" +
  "condition_vitals.systol,\n" +
  "condition_vitals.diastol,\n" +
  "condition_vitals.systol_vital_trend_tables_nibp,\n" +
  "condition_vitals.diastol_vital_trend_tables_nibp,\n" +
  "condition_vitals.pulse,\n" +
  "condition_vitals.respiratory_rate,\n" +
  "condition_vitals.time_vital_trend_tables_pulse,\n" +
  "condition_vitals.time_vital_trend_tables_nibp,\n" +
  "condition_vitals.time_vital_trend_tables_rr,\n" +
  "condition_vitals.vas,\n" +
  "condition_vitals.normal_table_result,\n" +
  "condition_vitals.abnormal_table_result,\n" +
  "condition_vitals.severe_table_result,\n" +
  "condition_consciousness.gcs_eye_assessment,\n" +
  "condition_consciousness.gcs_verbal_assessment,\n" +
  "condition_consciousness.gcs_motor_assessment,\n" +
  "condition_basic.time_gcs,\n" +
  "condition_consciousness.state_of_consciousness_awake,\n" +
  "condition_consciousness.state_of_consciousness_unconscious,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_speech,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_pain,\n" +
  "condition_consciousness.state_of_consciousness_under_general_anesthetic,\n" +
  "condition_consciousness.state_of_consciousness_not_determinable,\n" +
  "condition_consciousness.normal_table_result,\n" +
  "condition_consciousness.abnormal_table_result,\n" +
  "condition_consciousness.severe_table_result,\n" +
  "intervention.chest_compressions_performed,\n" +
  "intervention.emergency_intervention,\n" +
  "intervention.other_intervention,\n" +
  "intervention.ecg_performed,\n" +
  "intervention.time_intervention_pacer,\n" +
  "cardio.ecg_lead_transmission_yes,\n" +
  "cardio.ecg_lead_transmission_no,\n" +
  "cardio.ecg_lead_transmission_result_direct_to_emergency,\n" +
  "cardio.ecg_lead_transmission_result_no_response,\n" +
  "cardio.ecg_lead_transmission_result_direct_to_ptca,\n" +
  "cardio.ecg_lead_no_transmission_not_medically_necessary,\n" +
  "cardio.ecg_lead_no_transmission_other_reason,\n" +
  "cardio.left_bundle_branch_block,\n" +
  "cardio.right_bundle_branch_block,\n" +
  "cardio.bundle_branch_block,\n" +
  "cardio.premature_heart_beat,\n" +
  "cardio.stable,\n" +
  "cardio.sinus_rhythm,\n" +
  "cardio.atrial_fibrillation,\n" +
  "cardio.arrhythmia,\n" +
  "cardio.narrow_qrs_tachycardia,\n" +
  "cardio.wide_qrs_tachycardia,\n" +
  "cardio.pacemaker,\n" +
  "cardio.heart_attack_nstemi,\n" +
  "cardio.heart_attack_stemi,\n" +
  "cardio.cardiac_arrest,\n" +
  "cardio.normal_table_result,\n" +
  "cardio.abnormal_table_result,\n" +
  "cardio.severe_table_result,\n" +
  "cardio.twelve_lead_ecg_right_heart,\n" +
  "cardio.normal_table_result,\n" +
  "cardio.abnormal_table_result,\n" +
  "cardio.severe_table_result,\n" +
  "blood_pressure.*,\n" +
  "respiratory.breathing_stable,\n" +
  "respiratory.shortness_of_breath,\n" +
  "respiratory.copd,\n" +
  "respiratory.spastic_breathing,\n" +
  "respiratory.weak_breathing,\n" +
  "respiratory.respiration_normal,\n" +
  "respiratory.apnea,\n" +
  "respiratory.cyanosis,\n" +
  "respiratory.hyperventilation,\n" +
  "respiratory.other_abnormality,\n" +
  "respiratory.abnormal_table_result,\n" +
  "respiratory.normal_table_result,\n" +
  "respiratory.severe_table_result,\n" +
  "illness_assessment.diagnosis_acute_coronary_syndrome,\n" +
  "illness_assessment.diagnosis_worsening_condition,\n" +
  "illness_assessment.diagnosis_high_blood_pressure,\n" +
  "illness_assessment.diagnosis_stroke,\n" +
  "illness_assessment.diagnosis_circulatory_dysregulation,\n" +
  "illness_assessment.diagnosis_heart_issues,\n" +
  "illness_assessment.diagnosis_heart_failure,\n" +
  "illness_assessment.diagnosis_pain,\n" +
  "illness_assessment.diagnosis_severity,\n" +
  "illness_assessment.cardiovascular_disease,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes\n" +
  "from patient_table_references\n" +
  "full join cardio on patient_table_references.cardio_id = cardio.id\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join respiratory on patient_table_references.respiratory_id = respiratory.id\n" +
  "full join blood_pressure on patient_table_references.blood_pressure_id = blood_pressure.id\n" +
  "full join intervention on patient_table_references.intervention_id = intervention.id\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join condition_basic on patient_table_references.condition_basic_id = condition_basic.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "where illness_assessment.cardiovascular_disease = 1";

const respiratoryDiseaseSql = "select patient_table_references.case_id, \n" +
  "condition_vitals.etc_o2_1,\n" +
  "condition_vitals.etc_o2_2,\n" +
  "blood_pressure.*,\n" +
  "cardio.cardiac_arrest,\n" +
  "cardio.heart_attack_stemi,\n" +
  "cardio.heart_attack_nstemi,\n" +
  "condition_vitals.pulse,\n" +
  "condition_vitals.pulse_rate,\n" +
  "condition_vitals.hr,\n" +
  "condition_vitals.rr,\n" +
  "condition_vitals.normal_table_result,\n" +
  "condition_vitals.abnormal_table_result,\n" +
  "condition_vitals.severe_table_result,\n" +
  "condition_vitals.sp_o2,\n" +
  "condition_vitals.temp,\n" +
  "condition_vitals.pulse_rhythm_irregular_destination,\n" +
  "condition_vitals.pulse_rhythm_irregular,\n" +
  "condition_vitals.pulse_rhythm_regular_destination,\n" +
  "condition_vitals.pulse_rhythm_regular,\n" +
  "condition_vitals.po2,\n" +
  "condition_vitals.pco2,\n" +
  "condition_vitals.ph,\n" +
  "condition_consciousness.state_of_consciousness_awake,\n" +
  "condition_consciousness.state_of_consciousness_unconscious,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_speech,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_pain,\n" +
  "condition_consciousness.state_of_consciousness_under_general_anesthetic,\n" +
  "condition_consciousness.state_of_consciousness_not_determinable,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes,\n" +
  "intervention.other_intervention,\n" +
  "intervention.emergency_intervention,\n" +
  "intervention.chest_compressions_performed,\n" +
  "intervention.aspiration_during_intubation,\n" +
  "intervention.intubation_not_possible,\n" +
  "intervention.intubation_performed,\n" +
  "intervention.iv_cannulation_performed,\n" +
  "intervention.io_cannulation_performed,\n" +
  "respiratory.amount_intervention_oxygens,\n" +
  "respiratory.freq,\n" +
  "respiratory.amv,\n" +
  "respiratory.ie,\n" +
  "respiratory.ie2,\n" +
  "respiratory.asb,\n" +
  "respiratory.pinsp,\n" +
  "respiratory.trigger,\n" +
  "respiratory.in_tr,\n" +
  "respiratory.vt,\n" +
  "respiratory.rr,\n" +
  "respiratory.peep,\n" +
  "respiratory.fio2,\n" +
  "respiratory.p_max,\n" +
  "respiratory.energy,\n" +
  "respiratory.obj_resp_airway_managements_spontaneous,\n" +
  "respiratory.obj_resp_airway_managements_cpap,\n" +
  "respiratory.obj_resp_airway_managements_controlled,\n" +
  "respiratory.obj_resp_airway_managements_assisted,\n" +
  "respiratory.obj_resp_airway_managements_other,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_other,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_assisted,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_spontaneous,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_controlled,\n" +
  "respiratory.primary_assessment_resp_airway_mgt_cpap,\n" +
  "respiratory.airways_ruddy,\n" +
  "respiratory.airways_wet,\n" +
  "respiratory.airways_dry,\n" +
  "respiratory.blood_in_airways,\n" +
  "respiratory.breathing_stable,\n" +
  "respiratory.sibilant_rhonchi,\n" +
  "respiratory.shortness_of_breath,\n" +
  "respiratory.copd,\n" +
  "respiratory.coughing,\n" +
  "respiratory.spastic_breathing,\n" +
  "respiratory.rales,\n" +
  "respiratory.weak_breathing,\n" +
  "respiratory.clear_airways,\n" +
  "respiratory.stridor,\n" +
  "respiratory.aspiration,\n" +
  "respiratory.tracheostoma,\n" +
  "respiratory.respiration_normal,\n" +
  "respiratory.apnea,\n" +
  "respiratory.cyanosis,\n" +
  "respiratory.no_respiratory_intervention,\n" +
  "respiratory.removal_of_fluids_by_suction,\n" +
  "respiratory.jaw_thrust_maneuver_performed,\n" +
  "respiratory.cervical_collar_administered,\n" +
  "respiratory.patient_placed_in_recovery_position,\n" +
  "respiratory.foreign_object_removed_from_airway,\n" +
  "respiratory.non_rebreather_mask_administered,\n" +
  "respiratory.intubated,\n" +
  "respiratory.other_abnormality,\n" +
  "respiratory.hyperventilation,\n" +
  "respiratory.assisted_breathing_administered,\n" +
  "respiratory.abnormal_table_result,\n" +
  "respiratory.normal_table_result,\n" +
  "respiratory.severe_table_result,\n" +
  "patient_information.age,\n" +
  "illness_assessment.diagnosis_worsening_condition,\n" +
  "illness_assessment.diagnosis_copd,\n" +
  "illness_assessment.diagnosis_illness,\n" +
  "illness_assessment.diagnosis_infection,\n" +
  "illness_assessment.diagnosis_respiratory_disease\n" +
  "from patient_table_references\n" +
  "full join patient_information on patient_table_references.patient_information_id = patient_information.id\n" +
  "full join cardio on patient_table_references.cardio_id = cardio.id\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join respiratory on patient_table_references.respiratory_id = respiratory.id\n" +
  "full join blood_pressure on patient_table_references.blood_pressure_id = blood_pressure.id\n" +
  "full join intervention on patient_table_references.intervention_id = intervention.id\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "where illness_assessment.respiratory_disease = 1";

const abdominalDiseaseSql = "select case_id,\n" +
  "expert_comment.normal_skin,\n" +
  "expert_comment.pale_skin,\n" +
  "expert_comment.decreased_skin_turgor,\n" +
  "expert_comment.sweaty_skin,\n" +
  "expert_comment.cold_skin,\n" +
  "expert_comment.warm_skin,\n" +
  "expert_comment.stable_vitals,\n" +
  "expert_comment.patient_transported_in_ambulance,\n" +
  "expert_comment.bleeding_lower_torso,\n" +
  "expert_comment.bleeding_neck,\n" +
  "expert_comment.bleeding_upper_extremities,\n" +
  "expert_comment.bleeding_lower_extremities,\n" +
  "expert_comment.bleeding_other,\n" +
  "expert_comment.patient_transferred,\n" +
  "expert_comment.ruled_out_acute_coronary_syndrome,\n" +
  "expert_comment.ruled_out_stroke,\n" +
  "expert_comment.ruled_out_spinal_disc_herniation,\n" +
  "expert_comment.ruled_out_fracture,\n" +
  "expert_comment.ruled_out_concussion,\n" +
  "expert_comment.pain_noted,\n" +
  "expert_comment.fainting_noted,\n" +
  "expert_comment.bleeding_noted,\n" +
  "expert_comment.worsening_condition_noted,\n" +
  "expert_comment.fracture_noted,\n" +
  "expert_comment.infection_noted,\n" +
  "expert_comment.dizziness_noted,\n" +
  "expert_comment.joint_locking_noted,\n" +
  "expert_comment.nausea_noted,\n" +
  "expert_comment.morphine_administered,\n" +
  "expert_comment.epinephrine_administered,\n" +
  "expert_comment.bleeding_upper_torso,\n" +
  "expert_comment.catecholamine_required,\n" +
  "expert_comment.weak_pulse,\n" +
  "expert_comment.strong_pulse,\n" +
  "expert_comment.normal_table_result,\n" +
  "expert_comment.abnormal_table_result,\n" +
  "expert_comment.severe_table_result,\n" +
  "condition_consciousness.state_of_consciousness_unconscious,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_speech,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_pain,\n" +
  "condition_consciousness.state_of_consciousness_under_general_anesthetic,\n" +
  "condition_consciousness.state_of_consciousness_not_determinable,\n" +
  "condition_consciousness.state_of_consciousness_awake,\n" +
  "patient_information.age,\n" +
  "illness_assessment.other_diagnosis,\n" +
  "illness_assessment.diagnosis_worsening_condition,\n" +
  "illness_assessment.diagnosis_illness,\n" +
  "illness_assessment.diagnosis_infection,\n" +
  "illness_assessment.diagnosis_pain,\n" +
  "illness_assessment.diagnosis_severity,\n" +
  "condition_pre.pregnant_possible_but_not_pregnant,\n" +
  "condition_pre.pregnant_possible,\n" +
  "condition_pre.pregnant_not_possible,\n" +
  "condition_pre.pregnant_possible_and_pregnant,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes,\n" +
  "condition_pre.last_excretion_less_than_one_hour_ago,\n" +
  "condition_pre.last_excretion_less_than_four_hours_ago,\n" +
  "condition_pre.last_excretion_less_than_twelve_hours_ago,\n" +
  "condition_pre.last_excretion_less_than_one_day_ago,\n" +
  "condition_pre.last_excretion_less_than_one_week_ago,\n" +
  "condition_vitals.temp,\n" +
  "condition_vitals.body_temperature,\n" +
  "condition_vitals.body_temperature_assess_vital_signs_destination,\n" +
  "condition_vitals.normal_table_result,\n" +
  "condition_vitals.abnormal_table_result,\n" +
  "condition_vitals.severe_table_result,\n" +
  "condition_vitals.systol,\n" +
  "condition_vitals.diastol,\n" +
  "condition_vitals.systol_vital_trend_tables_nibp,\n" +
  "condition_vitals.diastol_vital_trend_tables_nibp,\n" +
  "condition_vitals.pulse_rate,\n" +
  "condition_vitals.hr,\n" +
  "condition_vitals.hr_assess_vital_signs_destination,\n" +
  "condition_vitals.pulse_rate_assess_vital_signs_destination,\n" +
  "condition_vitals.hr_vital_trend_tables_hr,\n" +
  "condition_vitals.pulse,\n" +
  "condition_vitals.ph,\n" +
  "blood_pressure.*\n" +
  "from patient_table_references\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join patient_information on patient_table_references.patient_information_id = patient_information.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join expert_comment on patient_table_references.expert_comment_id = expert_comment.id\n" +
  "full join blood_pressure on patient_table_references.blood_pressure_id = blood_pressure.id\n" +
  "where illness_assessment.abdominal_disease = 1";

const psychiatricDiseaseSql = "select case_id,\n" +
  "condition_consciousness.state_of_consciousness_unconscious,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_speech,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_pain,\n" +
  "condition_consciousness.state_of_consciousness_under_general_anesthetic,\n" +
  "condition_consciousness.state_of_consciousness_not_determinable,\n" +
  "condition_consciousness.state_of_consciousness_awake,\n" +
  "condition_consciousness.gcs_eye_assessment,\n" +
  "condition_consciousness.gcs_motor_assessment,\n" +
  "condition_consciousness.gcs_verbal_assessment,\n"  +
  "condition_consciousness.pupil_left_eyes_narrow, condition_consciousness.pupil_left_eyes_middle, \n" +
  "condition_consciousness.pupil_left_eyes_wide, condition_consciousness.pupil_left_eyes_dyscoria, \n" +
  "condition_consciousness.pupil_right_eyes_narrow, condition_consciousness.pupil_right_eyes_middle, \n" +
  "condition_consciousness.pupil_right_eyes_wide, condition_consciousness.pupil_right_eyes_dyscoria,\n" +
  "patient_information.age,\n" +
  "illness_assessment.other_diagnosis,\n" +
  "illness_assessment.diagnosis_worsening_condition,\n" +
  "illness_assessment.diagnosis_intoxicated,\n" +
  "illness_assessment.diagnosis_psychological_issue,\n" +
  "illness_assessment.diagnosis_pain,\n" +
  "illness_assessment.diagnosis_severity,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes,\n" +
  "condition_vitals.rr,\n" +
  "condition_vitals.temp,\n" +
  "condition_vitals.body_temperature,\n" +
  "condition_vitals.body_temperature_assess_vital_signs_destination,\n" +
  "condition_vitals.normal_table_result,\n" +
  "condition_vitals.abnormal_table_result,\n" +
  "condition_vitals.severe_table_result,\n" +
  "expert_comment.normal_skin,\n" +
  "expert_comment.pale_skin,\n" +
  "expert_comment.decreased_skin_turgor,\n" +
  "expert_comment.sweaty_skin,\n" +
  "expert_comment.cold_skin,\n" +
  "expert_comment.warm_skin,\n" +
  "condition_mental.intoxicated_drugs,\n" +
  "condition_mental.psyche_euphoric,\n" +
  "condition_mental.psyche_normal,\n" +
  "condition_mental.psyche_anxious,\n" +
  "condition_mental.psyche_slow,\n" +
  "condition_mental.psyche_agitated,\n" +
  "condition_mental.psyche_confused,\n" +
  "condition_mental.psyche_depressed,\n" +
  "condition_mental.psyche_restless,\n" +
  "condition_mental.psyche_aggressive,\n" +
  "condition_mental.psyche_suicidal,\n" +
  "condition_mental.psyche_delusional,\n" +
  "condition_mental.intoxicated_alcohol,\n" +
  "condition_mental.unconscious,\n" +
  "condition_mental.drowsy,\n" +
  "condition_mental.sensibility,\n" +
  "condition_mental.normal_table_result,\n" +
  "condition_mental.abnormal_table_result,\n" +
  "condition_mental.severe_table_result\n" +
  "from patient_table_references\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join patient_information on patient_table_references.patient_information_id = patient_information.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join condition_mental on patient_table_references.condition_mental_id = condition_mental.id\n" +
  "full join expert_comment on patient_table_references.expert_comment_id = expert_comment.id\n" +
  "where illness_assessment.psychiatric_disease = 1";

const metabolicDiseaseSql = "select case_id,\n" +
  "condition_consciousness.state_of_consciousness_unconscious,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_speech,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_pain,\n" +
  "condition_consciousness.state_of_consciousness_under_general_anesthetic,\n" +
  "condition_consciousness.state_of_consciousness_not_determinable,\n" +
  "condition_consciousness.state_of_consciousness_awake,\n" +
  "condition_consciousness.gcs_eye_assessment,\n" +
  "condition_consciousness.gcs_motor_assessment,\n" +
  "condition_consciousness.gcs_verbal_assessment,\n" +
  "condition_basic.time_gcs,\n" +
  "illness_assessment.other_diagnosis,\n" +
  "illness_assessment.diagnosis_worsening_condition,\n" +
  "illness_assessment.diagnosis_illness,\n" +
  "illness_assessment.diagnosis_infection,\n" +
  "illness_assessment.diagnosis_pain,\n" +
  "illness_assessment.diagnosis_severity,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes,\n" +
  "condition_vitals.body_temperature,\n" +
  "condition_vitals.temp,\n" +
  "condition_vitals.body_temperature_assess_vital_signs_destination,\n" +
  "condition_vitals.time_vital_trend_tables_temp,\n" +
  "condition_vitals.blood_glucose_level,\n" +
  "condition_vitals.blood_glucose_level_assess_vital_signs_destination,\n" +
  "condition_vitals.bs,\n" +
  "condition_vitals.time_vital_trend_tables_bs,\n" +
  "condition_vitals.hr,\n" +
  "condition_vitals.pulse_rate,\n" +
  "condition_vitals.hr_assess_vital_signs_destination,\n" +
  "condition_vitals.pulse_rate_assess_vital_signs_destination,\n" +
  "condition_vitals.hr_vital_trend_tables_hr,\n" +
  "condition_vitals.systol,\n" +
  "condition_vitals.diastol,\n" +
  "condition_vitals.systol_vital_trend_tables_nibp,\n" +
  "condition_vitals.diastol_vital_trend_tables_nibp,\n" +
  "condition_vitals.pulse,\n" +
  "condition_vitals.rr,\n" +
  "condition_vitals.respiratory_rate,\n" +
  "condition_vitals.time_vital_trend_tables_hrs,\n" +
  "condition_vitals.time_vital_trend_tables_ibp,\n" +
  "condition_vitals.time_vital_trend_tables_pulse,\n" +
  "condition_vitals.time_vital_trend_tables_rr,\n" +
  "condition_vitals.time_vital_trend_tables_nibp,\n" +
  "condition_vitals.normal_table_result,\n" +
  "condition_vitals.abnormal_table_result,\n" +
  "condition_vitals.severe_table_result,\n" +
  "condition_vitals.blood_glucose_too_high,\n" +
  "condition_vitals.blood_glucose_too_low,\n" +
  "condition_vitals.blood_glucose_too_high_destination,\n" +
  "condition_vitals.blood_glucose_too_low_destination,\n" +
  "condition_mental.total_gcs,\n" +
  "respiratory.assisted_breathing_administered,\n" +
  "respiratory.intubated,\n" +
  "respiratory.non_rebreather_mask_administered,\n" +
  "respiratory.cervical_collar_administered,\n" +
  "respiratory.jaw_thrust_maneuver_performed,\n" +
  "respiratory.removal_of_fluids_by_suction,\n" +
  "respiratory.no_respiratory_intervention,\n" +
  "respiratory.respiration_normal,\n" +
  "respiratory.normal_table_result,\n" +
  "respiratory.abnormal_table_result,\n" +
  "respiratory.severe_table_result,\n" +
  "respiratory.airways_ruddy,\n" +
  "respiratory.airways_wet,\n" +
  "respiratory.airways_dry,\n" +
  "respiratory.blood_in_airways,\n" +
  "respiratory.breathing_stable,\n" +
  "respiratory.sibilant_rhonchi,\n" +
  "respiratory.shortness_of_breath,\n" +
  "respiratory.copd,\n" +
  "respiratory.coughing,\n" +
  "respiratory.spastic_breathing,\n" +
  "respiratory.rales,\n" +
  "respiratory.weak_breathing,\n" +
  "respiratory.clear_airways,\n" +
  "respiratory.stridor,\n" +
  "respiratory.aspiration,\n" +
  "respiratory.tracheostoma,\n" +
  "respiratory.apnea,\n" +
  "respiratory.cyanosis,\n" +
  "respiratory.other_abnormality,\n" +
  "respiratory.hyperventilation,\n" +
  "intervention.chest_compressions_performed,\n" +
  "intervention.intubation_performed,\n" +
  "blood_pressure.*,\n" +
  "patient_information.estimated_body_weight\n" +
  "from patient_table_references\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join condition_mental on patient_table_references.condition_mental_id = condition_mental.id\n" +
  "full join condition_basic on patient_table_references.condition_basic_id = condition_basic.id\n" +
  "full join respiratory on patient_table_references.respiratory_id = respiratory.id\n" +
  "full join intervention on patient_table_references.intervention_id = intervention.id\n" +
  "full join blood_pressure on patient_table_references.blood_pressure_id = blood_pressure.id\n" +
  "full join patient_information on patient_table_references.patient_information_id = patient_information.id\n" +
  "where illness_assessment.metabolic_disease = 1";

const otherDiseasesSql = "select case_id,\n" +
  "body_sensitivity.movement_of_the_extremities_left_arm,\n" +
  "body_sensitivity.movement_of_the_extremities_left_arm_assessment_exam_dest,\n" +
  "body_sensitivity.movement_of_the_extremities_left_leg,\n" +
  "body_sensitivity.movement_of_the_extremities_left_leg_assessment_exam_dest,\n" +
  "body_sensitivity.movement_of_the_extremities_right_arm,\n" +
  "body_sensitivity.movement_of_the_extremities_right_arm_assessment_exam_dest,\n" +
  "body_sensitivity.movement_of_the_extremities_right_leg,\n" +
  "body_sensitivity.movement_of_the_extremities_right_leg_assessment_exam_dest,\n" +
  "illness_assessment.other_diagnosis,\n" +
  "illness_assessment.diagnosis_worsening_condition,\n" +
  "illness_assessment.diagnosis_illness,\n" +
  "illness_assessment.diagnosis_infection,\n" +
  "illness_assessment.diagnosis_pain,\n" +
  "illness_assessment.diagnosis_severity,\n" +
  "illness_assessment.diagnosis_fainting,\n" +
  "illness_assessment.diagnosis_injury,\n" +
  "illness_assessment.diagnosis_fracture,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes,\n" +
  "condition_vitals.body_temperature,\n" +
  "condition_vitals.temp,\n" +
  "condition_vitals.body_temperature_assess_vital_signs_destination,\n" +
  "condition_vitals.time_vital_trend_tables_temp,\n" +
  "condition_vitals.hr,\n" +
  "condition_vitals.pulse_rate,\n" +
  "condition_vitals.hr_assess_vital_signs_destination,\n" +
  "condition_vitals.pulse_rate_assess_vital_signs_destination,\n" +
  "condition_vitals.hr_vital_trend_tables_hr,\n" +
  "condition_vitals.systol,\n" +
  "condition_vitals.diastol,\n" +
  "condition_vitals.systol_vital_trend_tables_nibp,\n" +
  "condition_vitals.diastol_vital_trend_tables_nibp,\n" +
  "condition_vitals.pulse,\n" +
  "condition_vitals.rr,\n" +
  "condition_vitals.respiratory_rate,\n" +
  "condition_vitals.time_vital_trend_tables_hrs,\n" +
  "condition_vitals.time_vital_trend_tables_ibp,\n" +
  "condition_vitals.time_vital_trend_tables_pulse,\n" +
  "condition_vitals.time_vital_trend_tables_rr,\n" +
  "condition_vitals.time_vital_trend_tables_nibp,\n" +
  "condition_vitals.normal_table_result,\n" +
  "condition_vitals.abnormal_table_result,\n" +
  "condition_vitals.severe_table_result,\n" +
  "condition_vitals.pulse_rhythm_irregular,\n" +
  "condition_vitals.pulse_rhythm_regular,\n" +
  "condition_vitals.pulse_rhythm_irregular_destination,\n" +
  "condition_vitals.pulse_rhythm_regular_destination,\n" +
  "condition_vitals.etc_o2_1,\n" +
  "condition_vitals.etc_o2_2,\n" +
  "condition_vitals.etco2_assess_vital_signs_destination,\n" +
  "condition_vitals.vas,\n" +
  "condition_vitals.pain_scale,\n" +
  "condition_vitals.time_vital_trend_tables_pain,\n" +
  "condition_vitals.sp_o2,\n" +
  "respiratory.assisted_breathing_administered,\n" +
  "respiratory.intubated,\n" +
  "respiratory.non_rebreather_mask_administered,\n" +
  "respiratory.cervical_collar_administered,\n" +
  "respiratory.jaw_thrust_maneuver_performed,\n" +
  "respiratory.removal_of_fluids_by_suction,\n" +
  "respiratory.no_respiratory_intervention,\n" +
  "respiratory.respiration_normal,\n" +
  "respiratory.normal_table_result,\n" +
  "respiratory.abnormal_table_result,\n" +
  "respiratory.severe_table_result,\n" +
  "intervention.chest_compressions_performed,\n" +
  "intervention.intubation_performed,\n" +
  "blood_pressure.*,\n" +
  "patient_information.age,\n" +
  "expert_comment.normal_skin,\n" +
  "expert_comment.pale_skin,\n" +
  "expert_comment.decreased_skin_turgor,\n" +
  "expert_comment.sweaty_skin,\n" +
  "expert_comment.cold_skin,\n" +
  "expert_comment.warm_skin,\n" +
  "cardio.cardiac_arrest,\n" +
  "cardio.cardiac_flatline,\n" +
  "cardio.heart_attack_stemi,\n" +
  "cardio.heart_attack_nstemi,\n" +
  "injury.burn_percentage,\n" +
  "injury.naca,\n" +
  "injury.bleeding_staunched_by_tourniquet,\n" +
  "injury.bleeding_staunched_by_bandage,\n" +
  "injury.bleeding_staunched_by_pelvic_belt,\n" +
  "injury.bleeding_staunched_by_quikclot,\n" +
  "injury.circulation_normal,\n" +
  "injury.circulation_none,\n" +
  "injury.circulation_reduced,\n" +
  "injury.motoric_normal,\n" +
  "injury.motoric_none,\n" +
  "injury.motoric_reduced,\n" +
  "injury.wound_open,\n" +
  "injury.wound_closed,\n" +
  "injury.blunt_trauma,\n" +
  "injury.penetrating_trauma,\n" +
  "injury.venous_bleeding,\n" +
  "injury.arterial_bleeding,\n" +
  "injury.spine_trauma_details_with_neurology,\n" +
  "injury.spine_trauma_details_without_neurology,\n" +
  "injury.amputation_detail_total,\n" +
  "injury.amputation_detail_subtotal,\n" +
  "injury.severity,\n" +
  "injury.location_head,\n" +
  "injury.location_extremities,\n" +
  "injury.location_throat,\n" +
  "injury.location_lower_torso,\n" +
  "injury.location_upper_torso,\n" +
  "injury.bandages_applied,\n" +
  "injury.pain_noted,\n" +
  "injury.ruled_out_fracture,\n" +
  "injury.injury_caused_by_fall,\n" +
  "injury.fracture,\n" +
  "injury.bruise,\n" +
  "injury.laceration,\n" +
  "injury.abrasion,\n" +
  "injury.traumatic_brain_injury,\n" +
  "injury.dislocation,\n" +
  "injury.trauma,\n" +
  "injury.amputation,\n" +
  "injury.other_injury_type,\n" +
  "injury.bite_wound,\n" +
  "injury.no_injury,\n" +
  "injury.burn_degree\n" +
  "from patient_table_references\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "full join expert_comment on patient_table_references.expert_comment_id = expert_comment.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join respiratory on patient_table_references.respiratory_id = respiratory.id\n" +
  "full join intervention on patient_table_references.intervention_id = intervention.id\n" +
  "full join blood_pressure on patient_table_references.blood_pressure_id = blood_pressure.id\n" +
  "full join patient_information on patient_table_references.patient_information_id = patient_information.id\n" +
  "full join body_sensitivity on patient_table_references.body_sensitivity_id = body_sensitivity.id\n" +
  "full join cardio on patient_table_references.cardio_id = cardio.id\n" +
  "full join injury on patient_table_references.injury_id = injury.id\n" +
  "where illness_assessment.other_diseases = 1";

const infectionsSql = "select case_id,\n" +
  "expert_comment.normal_skin,\n" +
  "expert_comment.pale_skin,\n" +
  "expert_comment.decreased_skin_turgor,\n" +
  "expert_comment.sweaty_skin,\n" +
  "expert_comment.cold_skin,\n" +
  "expert_comment.warm_skin,\n" +
  "expert_comment.stable_vitals,\n" +
  "expert_comment.patient_transported_in_ambulance,\n" +
  "expert_comment.bleeding_lower_torso,\n" +
  "expert_comment.bleeding_neck,\n" +
  "expert_comment.bleeding_upper_extremities,\n" +
  "expert_comment.bleeding_lower_extremities,\n" +
  "expert_comment.bleeding_other,\n" +
  "expert_comment.patient_transferred,\n" +
  "expert_comment.ruled_out_acute_coronary_syndrome,\n" +
  "expert_comment.ruled_out_stroke,\n" +
  "expert_comment.ruled_out_spinal_disc_herniation,\n" +
  "expert_comment.ruled_out_fracture,\n" +
  "expert_comment.ruled_out_concussion,\n" +
  "expert_comment.pain_noted,\n" +
  "expert_comment.fainting_noted,\n" +
  "expert_comment.bleeding_noted,\n" +
  "expert_comment.worsening_condition_noted,\n" +
  "expert_comment.fracture_noted,\n" +
  "expert_comment.infection_noted,\n" +
  "expert_comment.dizziness_noted,\n" +
  "expert_comment.joint_locking_noted,\n" +
  "expert_comment.nausea_noted,\n" +
  "expert_comment.morphine_administered,\n" +
  "expert_comment.epinephrine_administered,\n" +
  "expert_comment.bleeding_upper_torso,\n" +
  "expert_comment.catecholamine_required,\n" +
  "expert_comment.weak_pulse,\n" +
  "expert_comment.strong_pulse,\n" +
  "expert_comment.normal_table_result,\n" +
  "expert_comment.abnormal_table_result,\n" +
  "expert_comment.severe_table_result,\n" +
  "patient_information.age,\n" +
  "patient_information.bmi,\n" +
  "condition_consciousness.state_of_consciousness_unconscious,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_speech,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_pain,\n" +
  "condition_consciousness.state_of_consciousness_under_general_anesthetic,\n" +
  "condition_consciousness.state_of_consciousness_not_determinable,\n" +
  "condition_consciousness.state_of_consciousness_awake,\n" +
  "illness_assessment.other_diagnosis,\n" +
  "illness_assessment.diagnosis_worsening_condition,\n" +
  "illness_assessment.diagnosis_illness,\n" +
  "illness_assessment.diagnosis_infection,\n" +
  "illness_assessment.diagnosis_pain,\n" +
  "illness_assessment.diagnosis_severity,\n" +
  "illness_assessment.diagnosis_fainting,\n" +
  "condition_pre.pregnant_possible_but_not_pregnant,\n" +
  "condition_pre.pregnant_possible,\n" +
  "condition_pre.pregnant_not_possible,\n" +
  "condition_pre.pregnant_possible_and_pregnant,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes,\n" +
  "condition_vitals.body_temperature,\n" +
  "condition_vitals.temp,\n" +
  "condition_vitals.body_temperature_assess_vital_signs_destination,\n" +
  "condition_vitals.time_vital_trend_tables_temp,\n" +
  "condition_vitals.pulse,\n" +
  "condition_vitals.normal_table_result,\n" +
  "condition_vitals.abnormal_table_result,\n" +
  "condition_vitals.severe_table_result,\n" +
  "condition_vitals.sp_o2,\n" +
  "condition_vitals.blood_glucose_level,\n" +
  "condition_vitals.blood_glucose_level_assess_vital_signs_destination,\n" +
  "condition_vitals.bs,\n" +
  "cardio.stable,\n" +
  "cardio.left_bundle_branch_block,\n" +
  "cardio.right_bundle_branch_block,\n" +
  "cardio.bundle_branch_block,\n" +
  "cardio.premature_heart_beat,\n" +
  "cardio.sinus_rhythm,\n" +
  "cardio.atrial_fibrillation,\n" +
  "cardio.arrhythmia,\n" +
  "cardio.narrow_qrs_tachycardia,\n" +
  "cardio.wide_qrs_tachycardia,\n" +
  "cardio.pacemaker,\n" +
  "cardio.heart_attack_nstemi,\n" +
  "cardio.heart_attack_stemi,\n" +
  "cardio.cardiac_arrest,\n" +
  "cardio.cardiac_flatline,\n" +
  "cardio.normal_table_result,\n" +
  "cardio.abnormal_table_result,\n" +
  "cardio.severe_table_result\n" +
  "from patient_table_references\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "full join expert_comment on patient_table_references.expert_comment_id = expert_comment.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join patient_information on patient_table_references.patient_information_id = patient_information.id\n" +
  "full join body_sensitivity on patient_table_references.body_sensitivity_id = body_sensitivity.id\n" +
  "full join cardio on patient_table_references.cardio_id = cardio.id\n" +
  "where illness_assessment.infections = 1";

const gynObstetricsEmergenciesSql = "select case_id,\n" +
  "expert_comment.stable_vitals,\n" +
  "expert_comment.patient_transported_in_ambulance,\n" +
  "expert_comment.bleeding_other,\n" +
  "expert_comment.patient_transferred,\n" +
  "expert_comment.pain_noted,\n" +
  "expert_comment.fainting_noted,\n" +
  "expert_comment.bleeding_noted,\n" +
  "expert_comment.dizziness_noted,\n" +
  "expert_comment.nausea_noted,\n" +
  "expert_comment.morphine_administered,\n" +
  "expert_comment.weak_pulse,\n" +
  "expert_comment.strong_pulse,\n" +
  "expert_comment.normal_table_result,\n" +
  "expert_comment.abnormal_table_result,\n" +
  "expert_comment.severe_table_result,\n" +
  "patient_information.age,\n" +
  "patient_information.bmi,\n" +
  "condition_consciousness.state_of_consciousness_unconscious,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_speech,\n" +
  "condition_consciousness.state_of_consciousness_reacts_to_pain,\n" +
  "condition_consciousness.state_of_consciousness_under_general_anesthetic,\n" +
  "condition_consciousness.state_of_consciousness_not_determinable,\n" +
  "condition_consciousness.state_of_consciousness_awake,\n" +
  "condition_pre.pregnant_possible_but_not_pregnant,\n" +
  "condition_pre.pregnant_possible,\n" +
  "condition_pre.pregnant_not_possible,\n" +
  "condition_pre.pregnant_possible_and_pregnant,\n" +
  "condition_pre.chief_complaint_pain,\n" +
  "condition_pre.chief_complaint_shortness_of_breath,\n" +
  "condition_pre.chief_complaint_worsening_condition,\n" +
  "condition_pre.chief_complaint_consciousness_disorder,\n" +
  "condition_pre.chief_complaint_fainting,\n" +
  "condition_pre.chief_complaint_bleeding,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_chest,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_stomach,\n" +
  "condition_pre.chief_complaint_vertigo,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_extremities,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_head,\n" +
  "condition_pre.chief_complaint_nausea,\n" +
  "condition_pre.chief_complaint_vomiting,\n" +
  "condition_pre.chief_complaint_malaise,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_lumbar,\n" +
  "condition_pre.chief_complaint_seizure,\n" +
  "condition_pre.chief_complaint_diarrhea,\n" +
  "condition_pre.chief_complaint_fever,\n" +
  "condition_pre.chief_complaint_provoked_by_walking,\n" +
  "condition_pre.chief_complaint_provoked_by_pressure,\n" +
  "condition_pre.chief_complaint_provoked_by_laying,\n" +
  "condition_pre.chief_complaint_provoked_by_movement,\n" +
  "condition_pre.chief_complaint_provoked_by_sitting,\n" +
  "condition_pre.chief_complaint_provoked_by_standing,\n" +
  "condition_pre.chief_complaint_provoked_by_pain,\n" +
  "condition_pre.chief_complaint_provoked_by_strain,\n" +
  "condition_pre.chief_complaint_always_present,\n" +
  "condition_pre.chief_complaint_provoked_by_breathing,\n" +
  "condition_pre.chief_complaint_trembling,\n" +
  "condition_pre.chief_complaint_caused_by_fall_or_tripping,\n" +
  "condition_pre.chief_complaint_caused_by_accident,\n" +
  "condition_pre.chief_complaint_caused_by_fight,\n" +
  "condition_pre.risk_factor_age,\n" +
  "condition_pre.risk_factor_smoking,\n" +
  "condition_pre.risk_factor_high_blood_pressure,\n" +
  "condition_pre.risk_factor_sedentary,\n" +
  "condition_pre.risk_factor_diabetes,\n" +
  "condition_pre.risk_factor_overweight,\n" +
  "condition_pre.risk_factor_alcohol,\n" +
  "condition_pre.risk_factor_stress,\n" +
  "condition_pre.chief_complaint_severity_score,\n" +
  "condition_pre.chief_complaint_palliation_protective_posture,\n" +
  "condition_pre.chief_complaint_palliation_laying,\n" +
  "condition_pre.chief_complaint_palliation_sitting,\n" +
  "condition_pre.chief_complaint_palliation_cooling,\n" +
  "condition_pre.chief_complaint_palliation_warming,\n" +
  "condition_pre.chief_complaint_palliation_standing,\n" +
  "condition_pre.chief_complaint_quality_pressure,\n" +
  "condition_pre.chief_complaint_quality_stabbing,\n" +
  "condition_pre.chief_complaint_quality_pulling,\n" +
  "condition_pre.chief_complaint_quality_dizzy,\n" +
  "condition_pre.chief_complaint_quality_burning,\n" +
  "condition_pre.chief_complaint_quality_tearing,\n" +
  "condition_pre.chief_complaint_pain_or_discomfort_radiating,\n" +
  "condition_pre.chief_complaint_not_changing,\n" +
  "condition_pre.chief_complaint_improving_condition,\n" +
  "condition_pre.chief_complaint_comes_and_goes,\n" +
  "condition_pre.last_mens_current,\n" +
  "condition_pre.last_mens_less_than_a_week_ago,\n" +
  "condition_pre.last_mens_less_than_one_month_ago,\n" +
  "condition_pre.last_mens_more_than_a_month_ago,\n" +
  "condition_vitals.body_temperature,\n" +
  "condition_vitals.temp,\n" +
  "condition_vitals.body_temperature_assess_vital_signs_destination,\n" +
  "condition_vitals.time_vital_trend_tables_temp,\n" +
  "condition_vitals.pulse,\n" +
  "condition_vitals.normal_table_result,\n" +
  "condition_vitals.abnormal_table_result,\n" +
  "condition_vitals.severe_table_result,\n" +
  "intervention.ultrasound_used,\n" +
  "intervention.baby_delivered,\n" +
  "intervention.transport_incubator_used\n" +
  "from patient_table_references\n" +
  "full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id\n" +
  "full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id\n" +
  "full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id\n" +
  "full join expert_comment on patient_table_references.expert_comment_id = expert_comment.id\n" +
  "full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id\n" +
  "full join patient_information on patient_table_references.patient_information_id = patient_information.id\n" +
  "full join intervention on patient_table_references.intervention_id = intervention.id\n" +
  "where illness_assessment.gyn_obstetrics_emergencies = 1";

// Create an express server and a GraphQL endpoint
const app = express()
var sql = "";

app.use(cors())

app.get('/api/csvRequest/category/:category', async (req, res) => {
  res.contentType("text/csv");
  switch(req.params.category){
    case "lung-disease":
      sql = lungDiseaseSql
      break;
    case "cns-disease":
      sql = cnsDiseaseSql
      break;
    case "cardiovascular-disease":
      sql = cardiovascularDiseaseSql
      break;
    case "respiratory-disease":
      sql = respiratoryDiseaseSql
      break;
    case "abdominal-disease":
      sql = abdominalDiseaseSql
      break;
    case "psychiatric-disease":
      sql = psychiatricDiseaseSql
      break;
    case "metabolic-disease":
      sql = metabolicDiseaseSql
      break;
    case "other-diseases":
      sql = otherDiseasesSql
      break;
    case "infections":
      sql = infectionsSql
      break;
    case "gyn-obstetrics-emergencies":
      sql = gynObstetricsEmergenciesSql
      break;
    default:
      res.status(400).send("Invalid category!")
      break;
  }

  var args = [];

  pool.connect().then(client => {
    var stream = new QueryStream(sql, args);
    var query = client.query(stream);

    var writer = csvWriter();
    query.pipe(writer);
    writer.pipe(res);

    query.on('end', () => {
      client.release();
      res.end()
    })
  });
})

app.get('/api/csvRequest/patient/:caseId/:category', async (req, res) => {
  res.contentType("text/csv");
  switch(req.params.category){
    case "lung-disease":
      sql = lungDiseaseSql
      break;
    case "cns-disease":
      sql = cnsDiseaseSql
      break;
    case "cardiovascular-disease":
      sql = cardiovascularDiseaseSql
      break;
    case "respiratory-disease":
      sql = respiratoryDiseaseSql
      break;
    case "abdominal-disease":
      sql = abdominalDiseaseSql
      break;
    case "psychiatric-disease":
      sql = psychiatricDiseaseSql
      break;
    case "metabolic-disease":
      sql = metabolicDiseaseSql
      break;
    case "other-diseases":
      sql = otherDiseasesSql
      break;
    case "infections":
      sql = infectionsSql
      break;
    case "gyn-obstetrics-emergencies":
      sql = gynObstetricsEmergenciesSql
      break;
    default:
      res.status(400).send("Invalid category!")
      break;
  }

  sql += " and patient_table_references.case_id = '" + req.params.caseId + "'"
  var args = [];

  pool.connect().then(client => {
    var stream = new QueryStream(sql, args);
    var query = client.query(stream);

    var writer = csvWriter();
    query.pipe(writer);
    writer.pipe(res);

    query.on('end', () => {
      client.release();
      res.end()
    })
  });
})

app.get('/api/csvRequest/patient/:caseId', async (req, res) => {
  res.contentType("text/csv");

  var sql = "SELECT patient_table_references.case_id, blood_pressure.*, body_sensitivity.*, cardio.*, condition_basic.*, condition_consciousness.*, condition_mental.*, condition_pre.*, condition_vitals.*, death.*, expert_comment.*, illness_assessment.*, injury.*, intervention.*, neurology.*, patient_information.*, respiratory.*, treatment.* FROM patient_table_references full join blood_pressure ON patient_table_references.blood_pressure_id = blood_pressure.id full join body_sensitivity on patient_table_references.body_sensitivity_id = body_sensitivity.id full join cardio on patient_table_references.cardio_id = cardio.id full join condition_basic on patient_table_references.condition_basic_id = condition_basic.id full join condition_consciousness on patient_table_references.condition_consciousness_id = condition_consciousness.id full join condition_mental on patient_table_references.condition_mental_id = condition_mental.id full join condition_pre on patient_table_references.condition_pre_id = condition_pre.id full join condition_vitals on patient_table_references.condition_vitals_id = condition_vitals.id full join death on patient_table_references.death_id = death.id full join expert_comment on patient_table_references.expert_comment_id = expert_comment.id full join illness_assessment on patient_table_references.illness_assessment_id = illness_assessment.id full join injury on patient_table_references.injury_id = injury.id full join intervention on patient_table_references.intervention_id = intervention.id full join neurology on patient_table_references.neurology_id = neurology.id full join patient_information on patient_table_references.patient_information_id = patient_information.id full join respiratory on patient_table_references.respiratory_id = respiratory.id full join treatment on patient_table_references.treatment_id = treatment.id WHERE patient_table_references.case_id = '" + req.params.caseId + "'"
  var args = [];

  pool.connect().then(client => {
    var stream = new QueryStream(sql, args);
    var query = client.query(stream);

    var writer = csvWriter();
    writer.pipe(res);

    query.pipe(writer);

    writer.on('end', () => {
      client.release();
    })
  });
})

app.get('/', (req, res) => {
  res.send("Hello!")
})

app.use('/graphql', graphqlHTTP({
  schema: schemaOther,
  graphiql: true,
}));

//Start the Server
const start = () => app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
if (require.main === module)
  start();

module.exports = start;
