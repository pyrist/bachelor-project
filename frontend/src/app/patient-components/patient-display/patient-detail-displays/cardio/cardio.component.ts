import {Component, Input, OnInit} from '@angular/core';
import {Cardio} from "../../../../../types/cardio";
import {Apollo, gql} from "apollo-angular";
import {TextCleanerService} from "../../../../text-cleaner.service";

@Component({
  selector: 'app-cardio',
  templateUrl: './cardio.component.html',
  styleUrls: ['./cardio.component.css']
})
export class CardioComponent implements OnInit {
  @Input() id!: number | undefined
  cardio: Cardio | undefined
  text_ecg_comment_objective = ""
  text_ecg_comment_primary_assessment = ""
  text_primary_assessment_ecg = ""
  text_objectiv_ecg = ""

  constructor(private apollo: Apollo, private textCleaner: TextCleanerService) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: gql`
        query {
          cardio(id: ${this.id}) {
            id
            cath_lab_refused
            twelve_lead_ecg_right_heart
            wake_up_stroke
            stroke_unit_no
            stroke_unit_yes
            stroke_unit_refused
            cath_lab_status_no
            cath_lab_status_yes
            ecg_lead_transmission_yes
            ecg_lead_transmission_no
            ecg_lead_transmission_result_direct_to_emergency
            ecg_lead_transmission_result_no_response
            ecg_lead_transmission_result_direct_to_ptca
            ecg_lead_no_transmission_not_medically_necessary
            ecg_lead_no_transmission_other_reason
            left_bundle_branch_block
            right_bundle_branch_block
            bundle_branch_block
            premature_heart_beat
            stable
            sinus_rhythm
            atrial_fibrillation
            arrhythmia
            narrow_qrs_tachycardia
            wide_qrs_tachycardia
            pacemaker
            heart_attack_nstemi
            heart_attack_stemi
            cardiac_arrest
            cardiac_flatline
            text_ecg_comment_objective
            text_objectiv_ecg
            text_primary_assessment_ecg
            text_ecg_comment_primary_assessment
            normal_table_result
            abnormal_table_result
            severe_table_result
          }
        }
      `
    }).valueChanges.subscribe((res: any) => {
      this.cardio = res.data.cardio;

      this.text_ecg_comment_objective = this.textCleaner.clean(this.cardio?.text_ecg_comment_objective)
      this.text_ecg_comment_primary_assessment = this.textCleaner.clean(this.cardio?.text_ecg_comment_primary_assessment)
      this.text_primary_assessment_ecg = this.textCleaner.clean(this.cardio?.text_primary_assessment_ecg)
      this.text_objectiv_ecg = this.textCleaner.clean(this.cardio?.text_objectiv_ecg)
    });
  }

}
