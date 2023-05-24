import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

import IProduct from "../../types/product";
import ICategory from "../../types/category";

import ProductService from "../../services/product.service";
import AdminService from "../../services/admin.service";

const ProductsListPublic: React.FC = () => {

  const [products, setProducts] = useState<IProduct[]>(new Array<IProduct>());
  const [category, setCategory] = useState<ICategory>({ name: "" });
  const [categories, setCategories] = useState<ICategory[]>();
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [sortedPrice, setSortedPrice] = useState<boolean>(false);
  const [sortedTitle, setSortedTitle] = useState<boolean>(false);

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    ProductService.getAllProduct()
      .then((response: any) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });

    AdminService.categories().then((response: any) => {
      setCategories(response.data);
      console.log(response.data);
    })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const findByTitle = () => {
    ProductService.productSearch({
      search: searchTitle,
      otPrice: "",
      doPrice: "",
      price: "",
      contract: "",
    })
      .then((response: any) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const sort = (type: string) => {
    if (type == 'title') {
      setSortedTitle(!sortedTitle);
      sortedTitle ?
        setProducts([...products].sort((a, b) =>
          a.title > b.title ? 1 : -1,
        )) :
        setProducts([...products].sort((a, b) =>
          a.title > b.title ? -1 : 1,
        ))
    }
    else if (type == 'price') {
      setSortedPrice(!sortedPrice);
      sortedPrice ?
        setProducts([...products].sort((a, b) =>
          a.price > b.price ? 1 : -1,
        )) :
        setProducts([...products].sort((a, b) =>
          a.price > b.price ? -1 : 1,
        ))
    }
  };

  const setCurrentCategory = (categoryId: string) => {
    console.log(categoryId);
    const neededState = categories?.filter(category => category.name == categoryId);
    setCategory({ id: neededState?.at(0)?.id, name: categoryId });

    if (categoryId != 'Все') {
      ProductService.getAllProduct()
        .then((response: any) => {
          var data: IProduct[] = response.data;
          setProducts(data.filter((product) => product.category == categoryId));
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    else {
      ProductService.getAllProduct()
        .then((response: any) => {
          setProducts(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  const reset = () => {
    retrieveProducts();
  };

  return (
    <>
      <div>
        <div>
          <Carousel >
            <Carousel.Item interval={2000}>
              <img width={'80%'} height={400}
                className="d-block w-100"
                src="/images/back/first.jpg"
                alt="First slide"
              />
              <Carousel.Caption>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img width={'80%'} height={400}
                className="d-block w-100"
                src="/images/back/second.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>

              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img width={'80%'} height={400}
                className="d-block w-100"
                src="/images/back/three.jpg"
                alt="Third slide"
              />
              <Carousel.Caption>

              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img width={'80%'} height={400}
                className="d-block w-100"
                src="/images/back/four.jpg"
                alt="Four slide"
              />
              <Carousel.Caption>

              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        <br></br>

        <div className="container">
          <div className="section">
            <div className="row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Для поиска введите название товара..."
                    value={searchTitle}
                    onChange={onChangeSearchTitle}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={findByTitle}
                    >
                      Поиск
                    </button>
                  </div>
                </div>
              </div>

              <div className="toolbar">
                <button className="btn btn-light" onClick={() => sort('title')}>
                  <i className="fa fa-sort-alpha-asc"></i>  Сортировать по названию
                </button>&nbsp;&nbsp;
                <button className="btn btn-light" onClick={() => sort('price')}>
                  <i className="fa fa-sort-numeric-desc"></i>  Сортировать по цене
                </button>&nbsp;&nbsp;
                <button className="btn btn-light" onClick={reset.bind(this)}>
                  <i className="fa fa-ban"></i>  Сбросить параметры сортировки
                </button>
              </div>

              <div className="col-md-8">
                <div>Фильтрация по категории:</div>
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
                    <option key={'Все'} value={'Все'}>Все</option>
                    {categories?.map((value) => (
                      <option key={value.name} value={value.name}>{value.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-lg-12 col-md-12 article">
                <br></br>
                <div className="row ">
                  {
                    products.map((product) => (
                      <div
                        className="shop col-lg-4 col-md-6 col-sm-6"
                        key={product.id}
                      >
                        <div className="border-product">
                          <Link to={`/products/public/${product.id}`}>
                            <div className="shopBack">
                              {product.imageList?.at(0) &&
                                <img src={"/images/" + product.imageList?.at(0)?.fileName} width="100" height="100" />}
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p>
                              <Link to={`/products/public/${product.id}`}>
                                {product.title}
                              </Link>
                            </p>

                            <h6>{product.category}</h6>
                            <h4>{product.price} Руб.</h4>
                          </div>
                        </div>
                        <br></br>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsListPublic;