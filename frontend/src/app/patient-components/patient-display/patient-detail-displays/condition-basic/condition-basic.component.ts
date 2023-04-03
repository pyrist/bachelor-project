import {Component, Input, OnInit} from '@angular/core';
import {ConditionBasic} from "../../../../../types/conditionBasic";
import {Apollo, gql} from "apollo-angular";
import {TextCleanerService} from "../../../../text-cleaner.service";

@Component({
  selector: 'app-condition-basic',
  templateUrl: './condition-basic.component.html',
  styleUrls: ['./condition-basic.component.css']
})
export class ConditionBasicComponent implements OnInit {
  @Input() id!: number | undefined
  conditionBasic: ConditionBasic | undefined
  text_observation_circulation_comment = ""
  text_primary_assessment_circulation_comment = ""

  constructor(private apollo: Apollo, private textCleaner: TextCleanerService) { }

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

      this.text_observation_circulation_comment = this.textCleaner.clean(this.conditionBasic?.text_observation_circulation_comment)
      this.text_primary_assessment_circulation_comment = this.textCleaner.clean(this.conditionBasic?.text_primary_assessment_circulation_comment)
    });
  }
}
