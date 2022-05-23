import {Component, Input, OnInit} from '@angular/core';
import {ConditionBasic} from "../../../types/conditionBasic";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-condition-basic',
  templateUrl: './condition-basic.component.html',
  styleUrls: ['./condition-basic.component.css']
})
export class ConditionBasicComponent implements OnInit {
  @Input() id!: number | undefined
  conditionBasic: ConditionBasic | undefined

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          conditionBasic(id: ${this.id}) {
            id
            no_disease_determined
            no_vitals
            normal
            normal_assessment_exam_dest
            jaundice
            hypertension
            hypotension
            tachycardia
            cold_skin
            warm_skin
            text_primary_assessment_circulation_comment
            text_observation_circulation_comment
            normal_table_result
            abnormal_table_result
            severe_table_result
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.conditionBasic = res.data.conditionBasic;
    });
  }
}
