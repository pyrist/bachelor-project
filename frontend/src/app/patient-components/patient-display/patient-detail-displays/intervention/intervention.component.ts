import {Component, Input, OnInit} from '@angular/core';
import {Intervention} from "../../../../../types/intervention";
import {Apollo, gql} from "apollo-angular";
import {ArrayToStringService} from "../../../../array-to-string.service";
import {TextCleanerService} from "../../../../text-cleaner.service";

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  @Input() id!: number | undefined
  intervention: Intervention | undefined
  interventionsPerformed: string[] = []
  text_intervention_others: string | null = ""
  type_intervention_intubations: string | null = ""
  other_text_intervention_intubation: string | null = ""
  type_intervention_cannulations: string | null = ""
  location_intervention_cannulations: string | null = ""
  other_text_intervention_cannulations: string | null = ""


  constructor(private apollo: Apollo, public arrayToString: ArrayToStringService, private textCleaner: TextCleanerService) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          intervention(id: ${this.id}) {
            id
            other_text_intervention_intubation
            text_intervention_others
            value_intervention_shockcs
            value_intervention_shocks
            type_intervention_cannulations
            location_intervention_cannulations
            other_text_intervention_cannulations
            type_intervention_intubations
            existing_permanent_catheter
            existing_anesthesia
            existing_cervical_collar
            existing_gastric_tube
            existing_bandages
            bandages_applied
            warmth_applied
            cooling_applied
            anesthetic_applied
            other_intervention
            emergency_intervention
            ultrasound_used
            permanent_catheter_applied
            gastric_tube_applied
            chest_compressions_performed
            baby_delivered
            transport_incubator_used
            aspiration_during_intubation
            intubation_not_possible
            no_intervention_performed
            ecg_performed
            bleeding_staunched
            iv_cannulation_performed
            io_cannulation_performed
            patient_has_port
            intubation_performed
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.intervention = res.data.intervention;

      if(this.intervention?.bandages_applied == 1){
        this.interventionsPerformed.push("Bandages");
      }
      if(this.intervention?.warmth_applied == 1){
        this.interventionsPerformed.push("Warmth");
      }
      if(this.intervention?.cooling_applied == 1){
        this.interventionsPerformed.push("Cooling");
      }
      if(this.intervention?.anesthetic_applied == 1){
        this.interventionsPerformed.push("Anesthetic");
      }
      if(this.intervention?.other_intervention == 1){
        this.interventionsPerformed.push("Other");
      }
      if(this.intervention?.permanent_catheter_applied == 1){
        this.interventionsPerformed.push("Permanent catheter");
      }
      if(this.intervention?.gastric_tube_applied == 1){
        this.interventionsPerformed.push("Gastric tube");
      }
      if(this.intervention?.chest_compressions_performed == 1){
        this.interventionsPerformed.push("Chest compressions");
      }
      if(this.intervention?.baby_delivered == 1){
        this.interventionsPerformed.push("Baby delivered");
      }
      if(this.intervention?.transport_incubator_used == 1){
        this.interventionsPerformed.push("Transport incubator");
      }
      if(this.intervention?.bleeding_staunched == 1){
        this.interventionsPerformed.push("Bleeding staunched");
      }
      if(this.intervention?.iv_cannulation_performed == 1){
        this.interventionsPerformed.push("IV cannulation");
      }
      if(this.intervention?.io_cannulation_performed == 1){
        this.interventionsPerformed.push("IO cannulation");
      }
      if(this.intervention?.intubation_performed == 1){
        this.interventionsPerformed.push("Intubation");
      }

      this.text_intervention_others = this.textCleaner.clean(this.intervention?.text_intervention_others)
      this.type_intervention_intubations = this.textCleaner.clean(this.intervention?.type_intervention_intubations)
      this.other_text_intervention_intubation = this.textCleaner.clean(this.intervention?.other_text_intervention_intubation)
      this.type_intervention_cannulations = this.textCleaner.clean(this.intervention?.type_intervention_cannulations)
      this.location_intervention_cannulations = this.textCleaner.clean(this.intervention?.location_intervention_cannulations)
      this.other_text_intervention_cannulations = this.textCleaner.clean(this.intervention?.other_text_intervention_cannulations)
    });
  }
}
