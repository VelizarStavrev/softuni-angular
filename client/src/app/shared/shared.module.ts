import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOffersComponent } from './new-offers/new-offers.component';
import { BrandsComponent } from './brands/brands.component';
import { TestimonialsShowcaseComponent } from './testimonials-showcase/testimonials-showcase.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { HeaderInfoComponent } from './header-info/header-info.component';


@NgModule({
  declarations: [
    NewOffersComponent,
    BrandsComponent,
    TestimonialsShowcaseComponent,
    LatestNewsComponent,
    ProductCardComponent,
    HeaderInfoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewOffersComponent,
    BrandsComponent,
    TestimonialsShowcaseComponent,
    LatestNewsComponent,
    ProductCardComponent,
    HeaderInfoComponent
  ]
})
export class SharedModule { }
