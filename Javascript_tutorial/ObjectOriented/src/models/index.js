import { HTTP } from '../utils/Http';

class IndexModel extends HTTP {
  constructor() {
    super();
  }

  getGoodsList() {
    return new Promise((resolve, reject) => {
      this.ajax({
        url: 'Shopping_cart/getGoodsList',
        type: 'POST',
        dataType: 'JSON',
        success() {
          resolve(data);
        }
      })
    });
  }
}

export { IndexModel };