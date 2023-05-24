import React, { useState, useEffect, ChangeEvent, Ref, RefObject } from "react";
import { useNavigate } from 'react-router-dom';

import ProductService from "../../services/product.service";
import AuthService from "../../services/auth.service";

import IUser from "../../types/user";
import ICategory from "../../types/category";
import AdminService from "../../services/admin.service";
import ImageUpload from "../imageUpload";

const AddProduct: React.FC = () => {

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image1, setImage1] = useState<File>();
  const [image2, setImage2] = useState<File>();
  const [image3, setImage3] = useState<File>();
  const [image4, setImage4] = useState<File>();
  const [image5, setImage5] = useState<File>();
  const [warehouse, setWarehouse] = useState<string>("");
  const [seller, setSeller] = useState<string>("");
  const [category, setCategory] = useState<ICategory>({ name: "" });
  const [categories, setCategories] = useState<ICategory[]>();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = React.useState('');
  const [currentUser, setCurrentUser] = useState<IUser | null>(AuthService.getCurrentUser());

  let navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }

    AdminService.categories().then((response: any) => {
      setCategories(response.data);
      console.log(response.data);
    })
      .catch((e: Error) => {
        console.log(e);
      });
  }, []);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError('Title is required');
    }
    setTitle(e.target.value);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError('Description is required');
    }
    setDescription(e.target.value);
  };

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError('Price is required');
    }
    setPrice(Number(e.target.value));
  };

  const onChangeSeller = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError('Seller is required');
    }
    setSeller(e.target.value);
  };

  const onChangeWarehouse = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setError('Warehouse is required');
    }
    setWarehouse(e.target.value);
  };

  const redirectToProductList = () => {
    navigate("/products/private");
    window.location.reload();
  };

  const saveProduct = () => {
    ProductService.addProduct(
      {
        title: title,
        description: description,
        warehouse: warehouse,
        seller: seller,
        price: price,
        file_one: image1,
        file_two: image2,
        file_three: image3,
        file_four: image4,
        file_five: image5,
        categoryId: categories?.find((item) => item.name == category.name)?.id,
      }).then((response: any) => {
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  const setCurrentCategory = (categoryId: string) => {
    const neededState = categories?.filter(category => category.name == categoryId);
    setCategory({ id: neededState?.at(0)?.id, name: categoryId });
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Вы успешно добавили!</h4>
          <button className="btn btn-success" onClick={redirectToProductList}>
            Вернуться в каталог товаров
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Название:</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={title}
              onChange={onChangeTitle}
              name="title"
              aria-describedby="title-error"
              aria-invalid={!!error}
            />
            {error && <strong id="title-error" role="alert">{error}</strong>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание:</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={description}
              onChange={onChangeDescription}
              name="description"
              aria-describedby="description-error"
              aria-invalid={!!error}
            />
            {error && <strong id="description-error" role="alert">{error}</strong>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Цена:</label>
            <input
              type="text"
              className="form-control"
              id="price"
              required
              value={price}
              onChange={onChangePrice}
              name="price"
              aria-describedby="price-error"
              aria-invalid={!!error}
            />
            {error && <strong id="price-error" role="alert">{error}</strong>}
          </div>

          <div className="form-group">
            <label htmlFor="warehouse">Склад:</label>
            <input
              type="text"
              className="form-control"
              id="warehouse"
              required
              value={warehouse}
              onChange={onChangeWarehouse}
              name="warehouse"
              aria-describedby="warehouse-error"
              aria-invalid={!!error}
            />
            {error && <strong id="warehouse-error" role="alert">{error}</strong>}
          </div>

          <div className="form-group">
            <label htmlFor="seller">Автор:</label>
            <input
              type="text"
              className="form-control"
              id="seller"
              required
              value={seller}
              onChange={onChangeSeller}
              name="seller"
              aria-describedby="seller-error"
              aria-invalid={!!error}
            />
            {error && <strong id="seller-error" role="alert">{error}</strong>}
          </div>

          <div>
            <label>
              <strong>Категория:</strong>
            </label>{" "}

            <select
              name="currentOrderStatus"
              value={category.name}
              id={category.name}
              onChange={e => setCurrentCategory(e.target.value)}
            >
              {categories?.map((value) => (
                <option key={value.name} value={value.name}>{value.name}</option>
              ))}
            </select>
          </div>
          <br></br>
          Выбрать можно до пяти картинок товара.
          <div className="form-group">
            <label htmlFor="image1">Картинка 1:</label>
            <ImageUpload props={setImage1} />
          </div>

          <div className="form-group">
            <label htmlFor="image2">Картинка 2:</label>
            <ImageUpload props={setImage2} />
          </div>

          <div className="form-group">
            <label htmlFor="image3">Картинка 3:</label>
            <ImageUpload props={setImage3} />
          </div>

          <div className="form-group">
            <label htmlFor="image4">Картинка 4:</label>
            <ImageUpload props={setImage4} />
          </div>

          <div className="form-group">
            <label htmlFor="image5">Картинка 5:</label>
            <ImageUpload props={setImage5} />
          </div>

          <button onClick={saveProduct} className="btn btn-success">
            Добавить на сайт
          </button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
