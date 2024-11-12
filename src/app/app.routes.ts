import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CrearEventoComponent } from './componentes/crear-evento/crear-evento.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { HistorialEventosComponent } from './componentes/historial-eventos/historial-eventos.component';
import { CambiarPasswordComponent } from './componentes/cambiar-password/cambiar-password.component';
import { ActivarCuentaComponent } from './componentes/activar-cuenta/activar-cuenta.component';
import { EnviarCodigoComponent } from './componentes/enviar-codigo/enviar-codigo.component';
import { CrearCuponComponent } from './componentes/crear-cupon/crear-cupon.component';
import { EditarCuponComponent } from './componentes/editar-cupon/editar-cupon.component';
import { VistaCuponComponent } from './componentes/vista-cupon/vista-cupon.component';
import { EventosAdminComponent } from './componentes/eventos-admin/eventos-admin.component';
import { EditarPerfilComponent } from './componentes/editar-perfil/editar-perfil.component';
import { PagosEventoComponent } from './componentes/pagos-evento/pagos-evento.component';
import { VistaEventoComponentComponent } from './componentes/vista-evento-component/vista-evento-component.component';
import { EditarEventoComponent } from './componentes/editar-evento/editar-evento.component';
import { CrearLocalidadComponent } from './componentes/crear-localidad/crear-localidad.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';

export const routes: Routes = [
   { path: '', component: PrincipalComponent },
   { path: 'inicio', component: InicioComponent },
   { path: 'registro', component: RegistroComponent },
   { path: "historial-eventos", component: HistorialEventosComponent },
   { path: 'gestion-eventos', component: GestionEventosComponent },
   { path: 'cambiar-password', component: CambiarPasswordComponent },
   { path: 'activar-cuenta', component: ActivarCuentaComponent },
   { path: 'enviar-codigo', component: EnviarCodigoComponent },
   { path: 'pagar-evento', component: PagosEventoComponent },
   { path: 'eventos-admin', component: EventosAdminComponent },
   { path: 'evento/:id', component : VistaEventoComponentComponent},
   { path: 'editar-evento/:id', component : EditarEventoComponent },
   { path: 'crear-localidad', component : CrearLocalidadComponent},
   { path: 'principal', component : PrincipalComponent},
   { path: 'crear-cupon', component : CrearCuponComponent},
   { path: 'editar-cupon', component : EditarCuponComponent},
   { path: 'vista-cupon', component : VistaCuponComponent},
   { path: 'vista-carrito', component : CarritoComponent},
   { path: 'editar-perfil', component : EditarPerfilComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] }},
   { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
   { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
   { path: 'crear-evento', component: CrearEventoComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   { path: "gestion-eventos", component: GestionEventosComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   //{ path: 'panel-admin', component: PanelAdminComponent, canActivate: [RolesGuard], data: { expectedRole: ["ADMINISTRADOR"] } },
   //{ path: "historial-compras", component: HistorialComprasComponent, canActivate: [RolesGuard], data: { expectedRole: ["CLIENTE"] } }
   { path: "**", pathMatch: "full", redirectTo: "" }
];