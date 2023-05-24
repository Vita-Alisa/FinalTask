import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import BasketService from "../../services/basket.service";
import AuthService from "../../services/auth.service";

import IImage from "../../types/image";
import IProduct from "../../types/product";
import IUser from "../../types/user";
import ProductService from "../../services/product.service";

const ProductPublic: React.FC = () => {
    let { id } = useParams();

    let navigate = useNavigate();

    const initialState: IProduct = {
        title: "",
        description: "",
        price: 0,
        warehouse: "",
        seller: "",
        imageList: new Array<IImage>(),
        category: "",
        dateTime: null
    }

    const [currentProduct, setCurrentProduct] = useState<IProduct>(initialState);
    const [currentUser, setCurrentUser] = useState<IUser | null>(AuthService.getCurrentUser());
    const [submitted, setSubmitted] = useState<boolean>(false);

    const getProduct = (id: any) => {
        ProductService.infoProduct(id)
            .then((response: any) => {
                setCurrentProduct(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getProduct(id);
    }, [id]);

    const buyProduct = () => {
        BasketService.addProductInCart(currentProduct.id);
        setSubmitted(true);
    };

    const redirectToProductList = () => {
        navigate("/products/public");
        window.location.reload();
    };

    const login = () => {
        navigate("/login")
    };

    const register = () => {
        navigate("/register")
    };

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Вы успешно добавили товар в корзину!</h4>
                    <button className="btn btn-success" onClick={redirectToProductList}>
                        Вернуться в каталог товаров
                    </button>
                </div>
            ) : (<div className="edit-form">
                <div>
                    <h4>{currentProduct.title}</h4>
                </div>
                <div>
                    <label>
                        <strong>Цена:</strong>
                    </label>{" "}
                    {currentProduct.price} Руб.
                </div>
                <div>
                    <label>
                        <strong>Автор:</strong>
                    </label>{" "}
                    {currentProduct.seller}
                </div>
                <div>
                    <label>
                        <strong>Категория:</strong>
                    </label>{" "}
                    {currentProduct.category}
                </div>
                <div>
                    <label>
                        <strong>Склад:</strong>
                    </label>{" "}
                    {currentProduct.warehouse}
                </div>
                <div>
                    <label>
                        <strong>Описание:</strong>
                    </label>{" "}
                    {currentProduct.description}
                </div>
                <div className="shopBack">
                    {currentProduct.imageList?.at(0) &&
                        currentProduct.imageList?.map((value) => (
                            <img src={"/images/" + value?.fileName} width="300" height="300" />
                        ))
                    }
                </div>
                <br></br>
                <br></br>

                {currentUser ? (
                    (currentUser.role == 'ROLE_USER') ? (
                        <button className="badge badge-danger mr-2" onClick={buyProduct}>
                            Купить
                        </button>
                    ) : (<div></div>)

                ) : (
                    <div>
                        Чтобы купить товар, войдите в систему или зарегистрируйтесь:
                        <br></br>
                        <button className="badge badge-danger mr-2" onClick={login}>
                            Войти
                        </button>
                        <button className="badge badge-danger mr-2" onClick={register}>
                            Зарегистрироваться
                        </button>
                    </div>
                )}
            </div>)
            }
        </div>
    );
};

export default ProductPublic;
