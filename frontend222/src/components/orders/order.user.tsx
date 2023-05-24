import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import OrderDataService from "../../services/order.service";
import AuthService from "../../services/auth.service";

import IOrder from '../../types/order';
import IUser from "../../types/user";

const OrdersListUser: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [currentUser, setCurrentUser] = useState<IUser | null>(AuthService.getCurrentUser());

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
        retrieveOrders();
    }, []);

    const retrieveOrders = () => {
        OrderDataService.orderUser()
            .then((response: any) => {
                setOrders(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const setActiveOrder = (order: IOrder, index: number) => {
        setCurrentOrder(order);
        setCurrentIndex(index);
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Заказы:</h4>
                <ul className="list-group">
                    {orders &&
                        orders.map((order, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveOrder(order, index)}
                                key={index}
                            >
                                {order.number}&nbsp;
                                {order.status}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentOrder ? (
                    <div>
                        <h4>Заказ</h4>
                        <div>
                            <label>
                                <strong>Номер:</strong>
                            </label>{" "}
                            {currentOrder.number}
                        </div>
                        <div>
                            <label>
                                <strong>Статус:</strong>
                            </label>{" "}
                            {currentOrder.status}
                        </div>
                        <div>
                            <label>
                                <strong>Клиент:</strong>
                            </label>{" "}
                            {currentOrder.person?.login}
                        </div>
                        <div>
                            <label>
                                <strong>Цена:</strong>
                            </label>{" "}
                            {currentOrder.price} Руб.
                        </div>
                        <div>
                            <label>
                                <strong>Количество:</strong>
                            </label>{" "}
                            {currentOrder.count}
                        </div>
                        <div>
                            <label>
                                <strong>Дата:</strong>
                            </label>{" "}
                            {new Date(currentOrder.dateTime).toLocaleString()}
                        </div>
                        <div>
                            <label>
                                <strong>Товары:</strong>
                            </label>{" "}
                            <li>
                                {currentOrder.product?.imageList?.at(0) &&
                                    <img src={"/images/" + currentOrder.product?.imageList?.at(0)?.fileName} width="100" height="100" />}&nbsp;
                                ${currentOrder.product?.price} Руб.&nbsp;
                                {currentOrder.product?.title}
                            </li>
                        </div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите заказ...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersListUser;
