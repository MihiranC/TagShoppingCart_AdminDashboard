import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from '../user/user.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DistrictComponent } from '../district/district.component';
import { StockMainComponent } from '../stock-main/stock-main.component';
import { StockWiseImagesComponent } from '../stock-wise-images/stock-wise-images.component';

export const CommonLayoutRoutes: Routes = [
  {
    path: 'User',
    component: UserComponent
  },
  {
    path: 'Dashboard',
    component: DashboardComponent
  },
  {
    path: 'Districts',
    component: DistrictComponent
  },
  {
    path: 'Cities',
    component: DistrictComponent
  },
  {
    path: 'ActionAgainstComplaints',
    component: DistrictComponent
  },
  {
    path: 'Stock',
    component: StockMainComponent
  },
  {
    path: 'StockWiseImages',
    component: StockWiseImagesComponent
  }
];

