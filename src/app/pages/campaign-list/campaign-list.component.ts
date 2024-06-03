import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss'
})

export class CampaignListComponent implements OnInit {
  campaigns: any[] = [];
  showUpdateModal: boolean = false;
  updateForm: FormGroup;
  currentCampaignIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      campaignTitle: ['', Validators.required],
      campaignDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    const storedCampaigns = localStorage.getItem('campaigns');
    if (storedCampaigns) {
      this.campaigns = JSON.parse(storedCampaigns);
    }
  }

  saveCampaigns(): void {
    localStorage.setItem('campaigns', JSON.stringify(this.campaigns));
  }

  increasePoints(index: number): void {
    this.campaigns[index].campaignPoint++;
    this.saveCampaigns();
  }

  decreasePoints(index: number): void {
    if (this.campaigns[index].campaignPoint > 0) {
      this.campaigns[index].campaignPoint--;
      this.saveCampaigns();
    }
  }

  deleteCampaign(index: number): void {
    this.campaigns.splice(index, 1);
    this.saveCampaigns();
  }

  openUpdateModal(campaign: any, index: number): void {
    this.updateForm.setValue({
      campaignTitle: campaign.campaignTitle,
      campaignDescription: campaign.campaignDescription
    });
    this.currentCampaignIndex = index;
    this.showUpdateModal = true;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
  }

  updateCampaign(): void {
    if (this.currentCampaignIndex !== null && this.updateForm.valid) {
      this.campaigns[this.currentCampaignIndex] = {
        ...this.campaigns[this.currentCampaignIndex],
        ...this.updateForm.value
      };
      this.saveCampaigns();
      this.closeUpdateModal();
    }
  }
}