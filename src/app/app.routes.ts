import {Routes} from '@angular/router';
import {LoginComponent} from "@/components/login/login.component";
import {BoardComponent} from "@/components/board/board.component";
import {authGuard} from "@/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'board',
    component: BoardComponent,
    canActivate: [authGuard]
  }
];
