import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InviteService } from 'src/services/invite-service/invite.service';

@Component({
  selector: 'app-invite-page',
  templateUrl: './invite-page.component.html',
  styleUrls: ['./invite-page.component.scss']
})

export class InvitePageComponent {
  loading: boolean = false;
  errorMessage: boolean = false;
  userForm!: FormGroup;
  experienceLevels: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];
  technologies: string[] = [
    'REST', 'Core Java 8+', 'Spring Boot', 'Docker', 'Kubernetes',
    'AWS', 'Kafka', 'Git/SCM', 'RDMS'
  ];

  constructor(private formBuilder: FormBuilder, private invite: InviteService) {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      job: [''],
      experience: [0],
      techCheckboxes: this.formBuilder.group(this.createTechCheckboxes())
    });
  }

  createTechCheckboxes(): FormControl {
    const checkboxes: any = {};
    this.technologies.forEach((technology: string) => {
      checkboxes[technology] = new FormControl(false);
    });
    return checkboxes;
  }

  onInviteLinkClick(): void {
    this.userForm.markAllAsTouched();
    this.loading = true;
    this.errorMessage = false;
    if (this.userForm.valid) {

      const name = this.userForm.value.firstName + ' ' + this.userForm.value.lastName;

      const selectedTechnologies: string[] = [];
      const techCheckboxes = this.userForm.value.techCheckboxes;
      for (const technology in techCheckboxes) {
        if (techCheckboxes[technology]) {
          selectedTechnologies.push(technology);
        }
      }
      // ['AWS', 'Java Core 8+']
      let skillsArr : string[] = [];
      for(let key in this.userForm.value.techCheckboxes) {
        if(this.userForm.value.techCheckboxes[key]) {
          skillsArr.push(key);
        }
      }
      
      this.invite.onInvite(
        this.userForm.value.email!,
        name,
        this.userForm.value.job!,
        this.userForm.value.experience!,
        skillsArr
      ).subscribe({
        next :(result) => {
        this.loading = result;
        },
        error: (err) => {
          this.errorMessage = true;
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

}
