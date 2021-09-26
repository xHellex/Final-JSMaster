import { getProduct } from '../api';
import { parseRequestUrl } from '../utils';
import Rating from '../components/Rating';


const ProductScreen = {
  after_render: () => {
    const request = parseRequestUrl();
    document.getElementById('add-button').addEventListener('click', () => {
      document.location.hash = `/cart/${request.id}`;
    });
    },
    render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if(product.error){
      return (`<div>${product.error}</div>`)
    }
    return `
    <div class="content">
      <div class="back-to-result">
        <a href="/#/">Volver a los resultados</a>
      </div>
      <div class="details">
        <div class="details-img">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="details-info">
          <ul>
            <li>
              <h1>${product.name}</h1>
            </li>
            <li>
            ${Rating.render({
              value: product.rating,
              text: `${product.numReviews} reviews`,
            })}
            </li>
            <li>
              Precio: <strong>$${product.price}</strong>
            </li>
            <li>
              Descripción: 
              <div>
                ${product.description}
              </div>
            </li>
            <li>
              Stock: <span>${product.countInStock}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="details-action">
            <ul>
              <li>
              Precio: $${product.price}
              </li>
              <li>
              Status: ${product.countInStock > 0 
                ? `<span class="success">Disponible</span>`
                :`<span class="error">No Disponible</span>`
              }
              </li>
              <li>
                <button id="add-button" class="primary">Agregar al Carrito</button>
              </li>
            </ul>
      </div>
      </div>
    </div>
    `;
  },
};
export default ProductScreen;
