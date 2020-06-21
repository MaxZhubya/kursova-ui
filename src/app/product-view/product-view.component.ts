import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product, ProductCategory, ProductType} from '../model/product';
import {AreaService} from '../services/area.service';
import {LaboratoryService} from '../services/laboratory.service';
import {WorkerMy, WorkerMyType} from '../model/worker-my';
import {WorkerMyEdit} from '../model/worker-my-edit';
import {ProductEdit} from '../model/product-edit';

interface Type {
  value: string,
  viewValue: string;
}

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  categories: Type[] = [
    {value: '0', viewValue: 'LEHKOVIY'},
    {value: '1', viewValue: 'GRUSOVIY'},
    {value: '2', viewValue: 'AVTOBUS'}
  ];

  types: Type[] = [
    {value: '0', viewValue: 'SEDAN'},
    {value: '1', viewValue: 'HACHBEK'},
    {value: '2', viewValue: 'UNIVERSAL'},
    {value: '3', viewValue: 'SAMOSVAL'},
    {value: '4', viewValue: 'TIAGACH'},
    {value: '5', viewValue: 'PLATFORMA'}
  ];

  constructor(private productService: ProductService, private areaService: AreaService, private laboratoryService: LaboratoryService) { }

  products: Product [] = [];

  newCategory: ProductCategory = null;
  newType: ProductType = null;

  addProductEvent: boolean = false;
  editProductEvent: boolean = false;

  selectedCategory: Type = null;
  selectedType: Type = null;

  isDataChanged: boolean = false;

  ngOnInit(): void {
    this.loadAllProducts()
  }

  // -------------------------------------
  // Product methods
  // -------------------------------------

  loadAllProducts() {
    this.productService.loadAllProducts()
      .subscribe((data: []) => {
        this.products = data;
        console.log(this.products);
      })
  }

  addProduct() {
    this.addProductEvent = true;
    console.log('Add Product event');
  }

  onCategoryChange(event) {
    this.newCategory = event.value;
    console.log('This New category ' + ProductCategory[this.newCategory]);
  }

  onTypeChange(event) {
    this.newType = event.value;
    console.log('This New type ' + ProductType[this.newType]);
  }

  editProduct(product: Product) {
    console.log('Edit Product event id: ' + product.productId);
    this.newCategory = product.category;
    this.newType = product.type;
    this.setSelectedCategoryValue(product.category);
    this.setSelectedTypeValue(product.type);
    this.editProductEvent = true;
    this.isDataChanged = true;
  }

  createProduct() {
    let productEdit: ProductEdit = new ProductEdit();
    productEdit.category = ProductCategory[this.newCategory];
    productEdit.type = ProductType[this.newType];

    this.productService.createNewProduct(productEdit)
      .subscribe(
        (data: Product) => {
          this.products.push(data)
        },
        error => console.log(error)
      );

    this.clearEditValues();
    this.addProductEvent = false;
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.productId)
      .subscribe(
        (data) => {
          this.products = this.products.filter(value => value.productId !== product.productId);
          console.log('Product id: ' + product.productId + ' is deleted');
          this.clearEditValues();
        },
        error => console.log(error)
      );
  }

  saveProduct(product: Product) {
    if (this.isDataChanged) {
      console.log('Save Product id: ' + product.productId);
      let productEdit: ProductEdit = new ProductEdit();
      productEdit.category = ProductCategory[this.newCategory];
      productEdit.type = ProductType[this.newType];
      productEdit.productId = product.productId;
      if (product.area)
        productEdit.areaId = product.area.areaId;
      if (product.laboratory)
        productEdit.laboratoryId = product.laboratory.laboratoryId;

      this.productService.saveProduct(productEdit)
        .subscribe(
          (data: Product) => {
            let currentProduct: Product = this.products.find(value => value.productId === product.productId);
            Product.update(currentProduct, data);
            this.clearEditValues();
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  cancelProduct(product: Product) {
    console.log('Cancel Product id: ' + product.productId);
    if (this.isDataChanged)
      this.onAfterCollapse(product);
  }

  onAfterCollapse(product: Product) {
    console.log('OnAfterCollapse event, Product id: ' + product.productId);
    if (this.isDataChanged) {
      console.log('The Product Data changed, clear changes for Product id: ' + product.productId);
      this.productService.loadProductById(product.productId)
        .subscribe(
          (data: Product) => {
            let currentProduct: Product = this.products.find(value => value.productId === product.productId);
            Product.update(currentProduct, data);
            this.clearEditValues();
            // Update isDataChanged value top false
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  clearEditValues() {
    this.selectedCategory = null;
    this.selectedType = null;
    this.editProductEvent = false;
  }

  setSelectedTypeValue(type: ProductType) {
    this.selectedType = {
      value: ProductType[type].toString(),
      viewValue: type.toString()
    }
  }

  setSelectedCategoryValue(category: ProductCategory) {
    this.selectedCategory = {
      value: ProductCategory[category].toString(),
      viewValue: category.toString()
    }
  }
}
