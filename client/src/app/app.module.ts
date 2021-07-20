import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NewOffersComponent } from './new-offers/new-offers.component';
import { BrandsComponent } from './brands/brands.component';
import { TestimonialsShowcaseComponent } from './testimonials-showcase/testimonials-showcase.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { ProductCardComponent } from './product-card/product-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NewOffersComponent,
    BrandsComponent,
    TestimonialsShowcaseComponent,
    LatestNewsComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
