import {Component, Input, OnInit} from '@angular/core';
import {Injury} from "../../../../../types/injury";
import {Apollo, gql} from "apollo-angular";
import {ArrayToStringService} from "../../../../array-to-string.service";
import {TextCleanerService} from "../../../../text-cleaner.service";

@Component({
  selector: 'app-injury',
  templateUrl: './injury.component.html',
  styleUrls: ['./injury.component.css']
})
export class InjuryComponent implements OnInit {
  @Input() id!: number | undefined
  injury: Injury | undefined
  injuryDescriptors: string[] = []
  summary_hemostasis: string | null = ""
  other_text: string | null = ""
  comment_injury_reason: string | null = ""

  constructor(private apollo: Apollo, public arrayToString: ArrayToStringService, private textCleaner: TextCleanerService) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          injury(id: ${this.id}) {
            id
            wound_size
            summary_hemostasis
            other_text
            comment_injury_reason
            injury_type
            burn_percentage
            naca
            bleeding_staunched_by_tourniquet
            bleeding_staunched_by_bandage
            bleeding_staunched_by_pelvic_belt
            bleeding_staunched_by_quikclot
            circulation_normal
            circulation_none
            circulation_reduced
            motoric_normal
            motoric_none
            motoric_reduced
            wound_open
            wound_closed
            blunt_trauma
            penetrating_trauma
            venous_bleeding
            arterial_bleeding
            spine_trauma_details_with_neurology
            spine_trauma_details_without_neurology
            amputation_detail_total
            amputation_detail_subtotal
            severity
            location_head
            location_extremities
            location_throat
            location_lower_torso
            location_upper_torso
            bandages_applied
            pain_noted
            ruled_out_fracture
            injury_caused_by_fall
            fracture
            bruise
            laceration
            abrasion
            traumatic_brain_injury
            dislocation
            trauma
            amputation
            other_injury_type
            bite_wound
            no_injury
            burn_degree
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.injury = res.data.injury;

      if(this.injury?.blunt_trauma == 1){
        this.injuryDescriptors.push("Blunt trauma");
      }
      if(this.injury?.penetrating_trauma == 1){
        this.injuryDescriptors.push("Penetrating trauma");
      }
      if(this.injury?.venous_bleeding == 1){
        this.injuryDescriptors.push("Venous bleeding");
      }
      if(this.injury?.arterial_bleeding == 1){
        this.injuryDescriptors.push("Arterial bleeding");
      }
      if(this.injury?.fracture == 1){
        this.injuryDescriptors.push("Fracture");
      }
      if(this.injury?.bruise == 1){
        this.injuryDescriptors.push("Bruising");
      }
      if(this.injury?.laceration == 1){
        this.injuryDescriptors.push("Laceration");
      }
      if(this.injury?.abrasion == 1){
        this.injuryDescriptors.push("Abrasion");
      }
      if(this.injury?.traumatic_brain_injury == 1){
        this.injuryDescriptors.push("Traumatic brain injury");
      }
      if(this.injury?.dislocation == 1){
        this.injuryDescriptors.push("Dislocation");
      }
      if(this.injury?.trauma == 1){
        this.injuryDescriptors.push("Trauma");
      }
      if(this.injury?.amputation == 1){
        this.injuryDescriptors.push("Amputation");
      }
      if(this.injury?.bite_wound == 1){
        this.injuryDescriptors.push("Bite wound");
      }
      if(this.injury?.no_injury == 1){
        this.injuryDescriptors.push("No injury present");
      }
      if(this.injury?.other_injury_type == 1){
        this.injuryDescriptors.push("Other");
      }

      this.summary_hemostasis = this.textCleaner.clean(this.injury?.summary_hemostasis)
      this.other_text = this.textCleaner.clean(this.injury?.other_text)
      this.comment_injury_reason = this.textCleaner.clean(this.injury?.comment_injury_reason)
    });
  }
}
