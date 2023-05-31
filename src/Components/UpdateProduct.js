import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/action';

const UpdateProductForm = ({ product }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setTitle(product.title);
        setDescription(product.description);
        setPrice(product.price);
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProduct = {
            ...product,
            title,
            description,
            price,
        };

        dispatch(updateProduct(updatedProduct));
        setTitle('');
        setDescription('');
        setPrice('');
        setDisabled(true);
    };

    return (
        <div>
            <div>
                <h2>Update Product</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProductForm;
