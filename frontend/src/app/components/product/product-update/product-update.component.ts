import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {


  product : Product = {
    name: "",
    price: null
  }
  constructor(
    private productService: ProductService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    })

  }

  updateProduct():void{
    this.productService.update(this.product).subscribe(() => {
      this.productService.showOMessage('Produto atualizado com sucesso!');
      this.cancel();
    })

  }

  cancel():void{
    this.router.navigate(['/products']);
  }
}
