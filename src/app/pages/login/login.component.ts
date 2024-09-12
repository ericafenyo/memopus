import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "@app/core/services/login.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
    private router: Router,
    private toast: ToastrService
  ) {
  }

  onSubmit(event: SubmitEvent) {
    // Prevent the form from automatically submitting.
    // We will handle the submission ourselves.
    event.preventDefault()
    this.service.login(
      {
        username: this.username.value ?? "",
        password: this.password.value ?? ""
      }
    )
      .subscribe({
        next: async () => {
          // Handle the successful login
          this.toast.success("Login successful")
          await this.router.navigate(["board"])
        },
        error: (error) => {
          // Handle the login error
          this.toast.error('Login failed', 'Invalid username or password')
          console.error('Login error', error)
        }
      })
  }
}
