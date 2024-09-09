import {Routes} from '@angular/router';
import {LoginComponent} from "@app/pages/login/login.component";
import {BoardComponent} from "@app/pages/board/board.component";
import {authGuard} from "@app/guards/auth.guard";

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
