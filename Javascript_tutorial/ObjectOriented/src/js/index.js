// import { Tab } from '../classes/tabES6';
// import '../css/tab.css';

// const tab = new Tab('fade');

import { IndexModel } from '../models/index';

const indexModel = new IndexModel();
indexModel.getGoodsList().then((res) => {
  console.log(res);
});