import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import OrderDataService from "../../services/order.service";
import AuthService from "../../services/auth.service";

import IOrder from '../../types/order';
import IUser from "../../types/user";


const OrdersListAdmin: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [currentOrder, setCurrentOrder] = useState<IOrder | null>();
    const [currentOrderState, setCurrentOrderState] = useState<string>("Оформлен");
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchId, setSearchTitle] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<IUser | null>(AuthService.getCurrentUser());

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
        retrieveOrders();
    }, []);

    const onChangeSearchId = (e: ChangeEvent<HTMLInputElement>) => {
        const searchId = e.target.value;
        setSearchTitle(searchId);
    };

    const retrieveOrders = () => {
        OrderDataService.adminOrders()
            .then((response: any) => {
                setOrders(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveOrders();
        setCurrentOrder(null);
        setCurrentIndex(-1);
    };

    const updateStatus = () => {
        if (currentOrder) {
            currentOrder.status = currentOrderState;
            OrderDataService.editOrderStatus(currentOrder?.id, { status: currentOrderState })
                .then((response: any) => {
                    console.log(response.data);
                    refreshList();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
            refreshList();
            //window.location.reload();
        }
    };

    const setActiveOrder = (order: IOrder, index: number) => {
        setCurrentOrder(order);
        setCurrentIndex(index);
        setCurrentOrderState(order.status);
    };

    const setCurrentOrderStatus = (state: string) => {
        setCurrentOrderState(state);
    };

    const findById = () => {
        OrderDataService.orderSearch({ search: searchId })
            .then((response: any) => {
                setOrders(response.data);
                setCurrentOrder(null);
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
                        placeholder="Для поиска введите последние 4 цифры номера заказа..."
                        value={searchId}
                        onChange={onChangeSearchId}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findById}
                        >
                            Поиск
                        </button>
                    </div>
                </div>
            </div>
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
                                <strong>Статус:</strong>
                            </label>{" "}

                            <select
                                name="currentOrderStatus"
                                defaultValue={currentOrderState}
                                value={currentOrderState}
                                id={currentOrderState}
                                onChange={e => setCurrentOrderStatus(e.target.value)}
                            >
                                <option key={"Принят"} value={"Принят"}>Принят</option>
                                <option key={"Оформлен"} value={"Оформлен"}>Оформлен</option>
                                <option key={"Ожидает"} value={"Ожидает"}>Ожидает</option>
                                <option key={"Получен"} value={"Получен"}>Получен</option>
                            </select>

                            <button
                                type="submit"
                                className="badge badge-success"
                                onClick={updateStatus}
                            >
                                Обновить статус
                            </button>
                        </div>
                        <div>
                            <label>
                                <strong>Товары:</strong>
                            </label>{" "}
                            <li>
                                {currentOrder.product?.imageList?.at(0) &&
                                    <img src={"/images/" + currentOrder.product?.imageList?.at(0)?.fileName} width="100" height="100" alt={currentOrder.product?.title} />}&nbsp;
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

export default OrdersListAdmin;
