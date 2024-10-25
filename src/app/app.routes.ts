import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { HistorialEventosComponent } from './componentes/historial-eventos/historial-eventos.component';
import { CambiarPasswordComponent } from './componentes/cambiar-password/cambiar-password.component';




export const routes: Routes = [
   { path: '', component: InicioComponent },
   { path: 'login', component: LoginComponent },
   { path: 'registro', component: RegistroComponent },
   { path: "historial-eventos", component: HistorialEventosComponent },
   { path: 'gestion-eventos', component: GestionEventosComponent },
   { path: 'cambiar-password', component: CambiarPasswordComponent },
   { path: "**", pathMatch: "full", redirectTo: "" }
];
