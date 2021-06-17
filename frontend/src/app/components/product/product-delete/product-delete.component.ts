import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  product: Product;

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    })
  }


  deleteProduct(): void {
    this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showOMessage('Produto excluído com Sucesso!');
      this.cancel();
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }
}
