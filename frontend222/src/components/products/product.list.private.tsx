import React, { useState, useEffect, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import ProductService from "../../services/product.service";
import AuthService from "../../services/auth.service";

import IProduct from "../../types/product";
import IUser from "../../types/user";
import AdminService from "../../services/admin.service";

const ProductsListPrivate: React.FC = () => {
    const [products, setProducts] = useState<IProduct[]>(new Array<IProduct>());
    const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchTitle, setSearchTitle] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<IUser | null>(AuthService.getCurrentUser());

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
        retrieveProducts();
    }, []);

    const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveProducts = () => {
        AdminService.admin()
            .then((response: any) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveProducts();
        setCurrentProduct(null);
        setCurrentIndex(-1);
        window.location.reload();
    };

    const setActiveProduct = (product: IProduct, index: number) => {
        setCurrentProduct(product);
        setCurrentIndex(index);
    };

    const removeProduct = () => {
        AdminService.deleteProduct(currentProduct?.id)
            .then((response: any) => {
                console.log(response.data);
                refreshList();
                setCurrentProduct(null);
                setCurrentIndex(-1);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const editProduct = () => {
        navigate(`/products/private/${currentProduct?.id}`);
    };

    const addProduct = () => {
        navigate("/products/add");
    };

    const findByTitle = () => {
        AdminService.productSearch({
            search: searchTitle,
            otPrice: "",
            doPrice: "",
            price: "",
            contract: "",
        })
            .then((response: any) => {
                setProducts(response.data);
                setCurrentProduct(null);
                setCurrentIndex(-1);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
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
            <div className="col-md-6">
                <h4>Товары:</h4>

                <ul className="list-group">
                    {products &&
                        products.map((product, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveProduct(product, index)}
                                key={index}
                            >
                                {product.imageList?.at(0) &&
                                    <img src={"/images/" + product.imageList?.at(0)?.fileName} width="50" height="50" />
                                } &nbsp;
                                {product.title}
                            </li>
                        ))}
                </ul>

                <button className="m-3 btn btn-sm btn-success" onClick={addProduct}>
                    Добавить новый товар
                </button>
            </div>
            <div className="col-md-6">
                {currentProduct ? (
                    <div>
                        <h4>Товар:</h4>
                        <div>
                            <label>
                                <strong>Название:</strong>
                            </label>{" "}
                            {currentProduct.title}
                        </div>
                        <div>
                            <label>
                                <strong>Цена:</strong>
                            </label>{" "}
                            {currentProduct.price} Руб.
                        </div>
                        <div>
                            <label>
                                <strong>Описание:</strong>
                            </label>{" "}
                            {currentProduct.description}
                        </div>
                        <div>
                            <label>
                                <strong>Категория:</strong>
                            </label>{" "}
                            {currentProduct.category}
                        </div>
                        <div>
                            <label>
                                <strong>Автор:</strong>
                            </label>{" "}
                            {currentProduct.seller}
                        </div>
                        <div>
                            <label>
                                <strong>Склад:</strong>
                            </label>{" "}
                            {currentProduct.warehouse}
                        </div>

                        <div className="shopBack">
                            {currentProduct.imageList &&
                                currentProduct.imageList.map((product) => (
                                    <div>
                                        <img src={"/images/" + product.fileName} width="100" height="100" />&nbsp;
                                    </div>
                                ))}
                        </div>

                        <button
                            className="m-3 btn btn-sm btn-warning"
                            onClick={editProduct}
                        >
                            Редактировать
                        </button>
                        <button
                            className="m-3 btn btn-sm btn-danger"
                            onClick={removeProduct}
                        >
                            Удалить
                        </button>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите товар...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsListPrivate;