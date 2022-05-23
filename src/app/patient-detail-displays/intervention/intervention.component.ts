import {Component, Input, OnInit} from '@angular/core';
import {Intervention} from "../../../types/intervention";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {
  @Input() id!: number | undefined
  intervention: Intervention | undefined
  interventionsPerformed = ""

  constructor(private apollo: Apollo) { }

  arrayToString(input: any ): string | undefined {
    var result = input?.toString().replace(new RegExp(',', 'g'), ', ')
    while(result.indexOf(', ') == 0){
      result = result.replace(', ', '')
    }
    return result;
  }

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
        this.interventionsPerformed += ", Bandages";
      }
      if(this.intervention?.warmth_applied == 1){
        this.interventionsPerformed += ", Warmth";
      }
      if(this.intervention?.cooling_applied == 1){
        this.interventionsPerformed += ", Cooling";
      }
      if(this.intervention?.anesthetic_applied == 1){
        this.interventionsPerformed += ", Anesthetic";
      }
      if(this.intervention?.other_intervention == 1){
        this.interventionsPerformed += ", Other";
      }
      if(this.intervention?.permanent_catheter_applied == 1){
        this.interventionsPerformed += ", Permanent catheter";
      }
      if(this.intervention?.gastric_tube_applied == 1){
        this.interventionsPerformed += ", Gastric tube";
      }
      if(this.intervention?.chest_compressions_performed == 1){
        this.interventionsPerformed += ", Chest compressions";
      }
      if(this.intervention?.baby_delivered == 1){
        this.interventionsPerformed += ", Baby delivered";
      }
      if(this.intervention?.transport_incubator_used == 1){
        this.interventionsPerformed += ", Transport incubator";
      }
      if(this.intervention?.bleeding_staunched == 1){
        this.interventionsPerformed += ", Bleeding staunched";
      }
      if(this.intervention?.iv_cannulation_performed == 1){
        this.interventionsPerformed += ", IV cannulation";
      }
      if(this.intervention?.io_cannulation_performed == 1){
        this.interventionsPerformed += ", IO cannulation";
      }
      if(this.intervention?.intubation_performed == 1){
        this.interventionsPerformed += ", Intubation";
      }
      this.interventionsPerformed = this.interventionsPerformed?.replace(", ", "");
    });
  }
}
