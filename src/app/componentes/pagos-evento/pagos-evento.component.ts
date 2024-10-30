import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';
import { LoginDTO } from '../../dto/CuentaDTOs/LoginDTO';
import { TokenService } from '../../servicios/token.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-pagos-evento',
  standalone: true,
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './pagos-evento.component.html',
  styleUrls: ['./pagos-evento.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class PagosEventoComponent {

}
