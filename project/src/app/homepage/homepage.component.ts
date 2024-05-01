import { Component } from '@angular/core';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  mobileNo: string = '';
  age: string = '';
  state: string = '';
  country: string = '';
  address: string = '';

  constructor(private serviceService: ServiceService) { }
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  getPreviewUrl(): string | ArrayBuffer | null {
    if (!this.selectedFile) {
      return null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      return reader.result;
    };
    // Ensure there's a return statement in case the onload event hasn't fired yet
    return null;
  }
  
  
  
  saveForm(): void {
    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNo: this.mobileNo,
      age: this.age,
      state: this.state,
      country: this.country,
      address: this.address,
      photo: this.selectedFile ? this.selectedFile : null
    };
    console.log('Form submitted:', formData);

    // Reset form fields after successful submission
    this.resetForm();

    

    this.serviceService.addUser(formData).subscribe(
      response => {
        console.log('User added successfully:', response);
        this.resetForm();
      },
      error => {
        console.error('Error adding user:', error);
      }
    );
  }

  resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.mobileNo = '';
    this.age = '';
    this.state = '';
    this.country = '';
    this.address = '';
  }
  
}



