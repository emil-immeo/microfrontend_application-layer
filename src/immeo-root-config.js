import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";



window.pdp = {};

window.pdp.cart = {
  count: 0,
  addToCart() {
    window.pdp.cart.count += 1;
    window.dispatchEvent(new Event('cartChange'));
  },
};

window.pdp.product = {
  name: 'Dog 1',
  image: 'https://images.dog.ceo/breeds/puggle/IMG_071023.jpg',
  setProduct(name, image) {
    window.pdp.product.name = name;
    window.pdp.product.image = image;
    window.dispatchEvent(new Event('productChange'));
  }
};


const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();


