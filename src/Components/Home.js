import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, deleteProduct, updateProduct } from '../redux/action';
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct';


const Home = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [addProduct, setAddProduct] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [UpdateForm, setShowUpdateForm] = useState(false);


  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {


        const productList = Array.isArray(data) ? data : data.products;
        const formattedProducts = productList.map((product , i) => ({
          key:{i},
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          thumbnail: product.thumbnail,
        }));
        dispatch({ type: 'ADD_PRODUCTS', payload: formattedProducts });
      })
      .catch((error) => {
        console.log('Error fetching products:', error);
      });
  }, [dispatch]);

  const showAddProduct = () => {
    setAddProduct(true)
    setShowUpdateForm(false)
  }
  const showUpdateForm = (product) => {
    setAddProduct(false)
    setSelectedProduct(product);
    setShowUpdateForm(true);
  };
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Thumbnail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.thumbnail}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
                <button onClick={() => showUpdateForm(product)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div>
        <button onClick={showAddProduct}>Add Product</button>
      </div>
      {addProduct &&
        <div>
          <AddProduct />
        </div>
      }

      {UpdateForm && selectedProduct && (
        <UpdateProduct
          product={selectedProduct}

        />
      )}


    </div>
  );
};

export default Home;

