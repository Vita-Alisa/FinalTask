import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import OrderService from "../../services/order.service";
import BasketService from "../../services/basket.service";
import AuthService from "../../services/auth.service";

import IUser from "../../types/user";
import ICart from "../../types/cart";

const Basket: React.FC = () => {

    const [currentUser, setCurrentUser] = useState<IUser | null>(AuthService.getCurrentUser());
    const [basket, setBasket] = useState<ICart[] | null>();
    const [submitted, setSubmitted] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
        retrieveProducts();
    }, []);

    const retrieveProducts = () => {
        BasketService.cart()
            .then((item) => {
                setBasket(item.data);
                console.log(item.data);
            });
    };

    const refreshList = () => {
        retrieveProducts();
        window.location.reload();
    };

    const createOrder = () => {
        OrderService.order()
            .then((response: any) => {
                setSubmitted(true);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    const removeProduct = (id: number) => {
        BasketService.deleteProductFromCart(id);
        refreshList();
    };

    const redirectToProductList = () => {
        navigate("/products/public");
        window.location.reload();
    };

    const amount = basket?.filter((product) => product.product.price).reduce((sum, current) => sum + current.product.price, 0);

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>Вы оформили заказ!</h4>
                    <button className="btn btn-success" onClick={redirectToProductList}>
                        Вернуться в каталог товаров
                    </button>
                </div>
            ) : (
                <div>
                    <div className="container">
                        <h2>Корзина с товарами:</h2>
                        <table className="table table-bordered table-striped table-responsive-stack" id="tableOne">
                            <thead className="thead-dark">
                                <tr>
                                    <th >Изображение</th>
                                    <th >Id</th>
                                    <th >Название</th>
                                    <th >Цена</th>
                                    <th ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {basket &&
                                    basket.map((product, index) => (
                                        <tr>
                                            <th ><img src={"/images/" + product.product.imageList?.at(0)?.fileName} width="40" height="40" /></th>
                                            <th >{product.product.productId}</th>
                                            <th >{product.product.title}</th>
                                            <th >{product.product.price} Руб.</th>
                                            <th ><button
                                                type="submit"
                                                className="badge badge-danger"
                                                onClick={() => removeProduct(product.id)}
                                            >
                                                Убрать из корзины
                                            </button></th>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <label>
                            <strong>Общая сумма:</strong>
                        </label>{" "}
                        {amount} Руб.
                        {amount &&
                            <button className="m-3 btn btn-sm btn-success" onClick={createOrder}>
                                Оформить заказ
                            </button>}
                        {!amount &&
                            <button className="m-3 btn btn-sm btn-success" onClick={redirectToProductList}>
                                В каталог товаров
                            </button>
                        }
                    </div>
                </div>)
            }
        </div>
    );
};

export default Basket;
