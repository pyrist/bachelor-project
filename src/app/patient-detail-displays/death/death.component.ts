import {Component, Input, OnInit} from '@angular/core';
import {Death} from "../../../types/death";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-death',
  templateUrl: './death.component.html',
  styleUrls: ['./death.component.css']
})
export class DeathComponent implements OnInit {
  @Input() id!: number | undefined
  death: Death | undefined

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          death(id: ${this.id}) {
            id
            reason_cpr_discontinued_dnr
            reason_cpr_discontinued_underlying_disease_known
            reason_cpr_discontinued_other_factors
            death_result_hospital_admission_ROSC
            death_result_death_at_location
            death_result_hospital_admission_ongoing_resuscitation
            ascertainment_of_death_natural
            ascertainment_of_death_unknown
            ascertainment_of_death_unnatural
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.death = res.data.death;
    });
  }
}
