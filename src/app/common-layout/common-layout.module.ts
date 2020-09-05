import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CommonLayoutRoutes } from './common-layout.routing';
import { UserComponent } from '../user/user.component';
import { HttpClientModule  } from '@angular/common/http';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DistrictComponent } from '../district/district.component';

import { Routes, RouterModule } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms'

//Material

import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule } from '@angular/material/Datepicker'
import { MatDialogModule } from '@angular/material/Dialog'
import { MatExpansionModule } from '@angular/material/Expansion'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/Icon'
import { MatInputModule } from '@angular/material/Input'
import { MatListModule } from '@angular/material/List'
import { MatMenuModule } from '@angular/material/Menu'
//import { MatNativeDateModule } from '@angular/material/Na'
import { MatPaginatorModule } from '@angular/material/Paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatRadioModule } from '@angular/material/Radio'
//import { MatRippleModule } from '@angular/material/rip'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSliderModule } from '@angular/material/slider'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatStepperModule } from '@angular/material/stepper'
import {MatNativeDateModule} from '@angular/material/core';
import { CommonLayoutComponent } from './common-layout.component';
import {MatFormFieldModule} from '@angular/material/form-field'

@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    DistrictComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatNativeDateModule,
    RouterModule.forChild(CommonLayoutRoutes),
  ],
  providers: [],
  exports: [RouterModule]
})

export class CommonLayoutModule { }
