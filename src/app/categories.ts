export interface Category {
  name: string;
  linkname: string;
  relevantFeaturesStringList: string;
}

export const categories = [
  { name: 'Lung disease',
    linkname: 'lung-disease',
    relevantFeaturesStringList: 'EtCO2, blood pressure, cardiac arrest, heart attack, pulse, respiratory rate, SpO2, ' +
      'body temperature, pulse rhythm, PO2, PCO2, pH, state of consciousness, chief complaint narrative, risk factors, ' +
      'respiratory interventions, respiratory frequency, AMV, IE, IE2, ASB, pInsp, Trigger, InTr, VT, PEEP, FiO2, P-Max, ' +
      'energy, airway and breathing assessments, age, respiratory diagnoses'
  },
  { name: 'CNS disease',
    linkname: 'cns-disease',
    relevantFeaturesStringList: 'Pupil shape, pupil reflex to light, movement of the extremities, arm and leg ' +
      'sensibility, neurological status and comments, neurological diagnoses, stroke status, GCS score, age, diagnosis, ' +
      'chief complaint narrative, risk factors, pre-existing conditions, body temperature'
  },
  { name: 'Cardiovascular disease',
    linkname: 'cardiovascular-disease',
    relevantFeaturesStringList: 'Pulse rate and rhythm, respiratory rate, pain score, blood pressure, visual analog pain ' +
      'scale, GCS score, state of consciousness, whether CPR or emergency interventions were performed, if an ECG lead ' +
      'transmission was sent and the response, cardiology diagnosis and notes, respiratory breathing qualities, ' +
      'diagnosis notes'
  },
  { name: 'Respiratory disease',
    linkname: 'respiratory-disease',
    relevantFeaturesStringList: 'EtCO2, blood pressure, cardiac arrest, heart attack, pulse, respiratory rate, SpO2, ' +
      'body temperature, pulse rhythm, PO2, PCO2, pH, state of consciousness, chief complaint narrative, risk factors, ' +
      'respiratory interventions, respiratory frequency, AMV, IE, IE2, ASB, pInsp, Trigger, InTr, VT, PEEP, FiO2, P-Max, ' +
      'energy, airway and breathing assessments, age, respiratory diagnoses'
  },
  { name: 'Abdominal disease',
    linkname: 'abdominal-disease',
    relevantFeaturesStringList: 'Skin assessment, bleeding assessment, expert comments, state of consciousness, age, ' +
      'diagnoses, chief complaint narrative, pregnancy possibility, last excretion, risk factors, body temperature, ' +
      'blood pressure, heart rate, pH'
  },
  { name: 'Psychiatric disease',
    linkname: 'psychiatric-disease',
    relevantFeaturesStringList: 'State of consciousness, GCS scores, pupil status, age, diagnoses, chief complaint ' +
      'narrative, risk factors, respiratory rate, body temperature, skin assessment, intoxication status, psychological ' +
      'status'
  },
  { name: 'Metabolic disease',
    linkname: 'metabolic-disease',
    relevantFeaturesStringList: 'State of consciousness, GCS scores, diagnoses, chief complaint narrative, body ' +
      'temperature, blood glucose level, heart rate, blood pressure, respiratory rate, time vital trend tables, ' +
      'respiratory interventions, airway and breathing assessments, blood pressure, estimated body weight'
  },
  { name: 'Gyn-obstetrics emergencies',
    linkname: 'gyn-obstetrics-emergencies',
    relevantFeaturesStringList: 'Expert comments, age, BMI, state of consciousness, pregnancy possibility, chief ' +
      'complaint narrative, risk factors, last menstruation cycle, body temperature, heart rate, childbirth, ultrasound ' +
      'use'
  },
  { name: 'Other diseases',
    linkname: 'other-diseases',
    relevantFeaturesStringList: 'Movement of extremities, diagnoses, chief complaint narrative, body temperature, ' +
      'heart rate, blood pressure, respiratory rate, time vital trend tables, pulse rhythm, EtCO2, VAS, pain score, ' +
      'SpO2, respiratory interventions, age, skin assessment, cardiac arrest, cardiac flatline, heart attack, injury ' +
      'assessment and location'
  },
  { name: 'Infections',
    linkname: 'infections',
    relevantFeaturesStringList: 'Skin assessment, expert comments, age, BMI, state of consciousness, diagnoses, ' +
      'pregnancy possibility, chief complaint narrative, body temperature, heart rate, SpO2, blood glucose level, ' +
      'cardio stability, cardio assessment'
  }
  ];
