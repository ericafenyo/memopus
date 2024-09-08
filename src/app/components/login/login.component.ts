import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "@/services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = new FormControl<string>("username", [Validators.required]);
  password = new FormControl<string>("password", [Validators.required]);

  constructor(
    private service: LoginService,
    private router: Router
  ) {
  }

  onSubmit(event: Event) {
    // Prevent the form from automatically submitting.
    // We will handle the submission ourselves.
    event.preventDefault()

    // Validate the form values
    // if (this.username.invalid || this.password.invalid) {
    //
    // }

    // // Get the values from the form controls
    // const values: FormValues = {
    //   username: this.username.value || "",
    //   password: this.password.value || ""
    // }

    // If there are no errors, submit the form.

    console.log('Submitting form', this.username.value, this.password.value)
    this.service.login(
      {
        username: this.username.value ?? "",
        password: this.password.value ?? ""
      }
    )
      .subscribe({
        next: async (session) => {
          // Handle the successful login
          console.log('Login successful', session)
          await this.router.navigate(["board"])
        },
        error: (error) => {
          // Handle the login error
          console.error('Login error', error)
        }
      })
  }
}
