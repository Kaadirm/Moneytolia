import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaign-create',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './campaign-create.component.html',
  styleUrl: './campaign-create.component.scss'
})
export class CampaignCreateComponent {
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  campaignCreateForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.campaignCreateForm = this.formBuilder.group({
      campaignTitle: ['', Validators.required],
      campaignDescription: ['', Validators.required],
      campaignPoint: [0, [Validators.required, Validators.min(0)]],
      campaignDate: [this.getCurrentDate()]
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  saveCampaign() {
    if (this.campaignCreateForm.valid) {
      const existingCampaigns = localStorage.getItem('campaigns');
      let campaigns = [];
      if (existingCampaigns) {
        campaigns = JSON.parse(existingCampaigns);
      }
      campaigns.push(this.campaignCreateForm.value);
      localStorage.setItem('campaigns', JSON.stringify(campaigns));

      this.showSuccessMessage = true;
      this.successMessage = "Kampanya başarılı bir şekilde eklenmiştir";
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
      this.campaignCreateForm.reset();
    }
  }
}


