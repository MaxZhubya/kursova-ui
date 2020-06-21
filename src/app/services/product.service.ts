import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductEdit} from '../model/product-edit';
import {API_URL} from '../app.component';

const localUrl = API_URL + '/product';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public loadAllProducts() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list', { headers: headers, responseType: 'json' });
  }

  public loadProductById(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list/' + id, { headers: headers, responseType: 'json' });
  }

  public createNewProduct(product: ProductEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(localUrl + '/add', product, { headers: headers, responseType: 'json' });
  }

  public saveProduct(product: ProductEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.put(localUrl + '/edit', product, { headers: headers, responseType: 'json' });
  }

  public deleteProduct(id: number) {
    return this.http.delete(localUrl + '/delete/' + id);
  }

}
