import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { IProduct } from '../interfaces/request';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  sectionName: string = '';
  products:IProduct[] = [];
  
  constructor(public requestService: RequestService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ type }) => {
        switch (type) {
          case 'male':
                this.sectionName = 'МЪЖКИ';
                break;
            
            case 'female':
                this.sectionName = 'ДАМСКИ';
                break;
                
            case 'kid':
                this.sectionName = 'ДЕТСКИ';
                break;
    
            case 'sale':
                this.sectionName = 'РАЗПРОДАЖБА НА';
                break;
        }

        return this.requestService.loadProductsByCount(type);
      }),
    ).subscribe(products => this.products = products);
  }
}
