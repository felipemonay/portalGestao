import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './components/form-debug/form-debug.component';
import { CampoControlErroComponent } from './components/campo-control-erro/campo-control-erro.component';
import { ServicesModule } from './services/services.module';
import { InputFileComponent } from './components/input-file/input-file.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorMsgComponent } from './components/error-msg/error-msg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ServicesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    InputFileComponent,
    OrderByPipe,
    SpinnerComponent
  ],
  exports: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErrorMsgComponent,
    ServicesModule,
    InputFileComponent,
    OrderByPipe,
    SpinnerComponent
  ]
})
export class SharedModule { }
