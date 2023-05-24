import { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";

import EventBus from "./common/EventBus";

import ProductPrivate from "./components/products/product.private";
import ProductPublic from "./components/products/product.public";
import ProductsListPrivate from "./components/products/product.list.private";
import ProductsListPublic from "./components/products/product.list.public";
import AddProduct from "./components/products/add-product"

import OrderUser from "./components/orders/order.user";
import OrderAdmin from "./components/orders/order.admin";

import Basket from "./components/basket/basket";

import UsersList from "./components/users/users.list";

type Props = {};

type State = {
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (

      <div>
        <header>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <Link to={"/"} className="navbar-brand">
                LIBRARIA
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/home"} className="nav-link">
                    Товары
                  </Link>
                </li>
              </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              {currentUser ? (
                <div className="navbar-nav ml-auto">

                  {(currentUser.role == 'ROLE_USER') ? (
                    <div className="navbar-nav ml-auto">
                      <li className="navbar-nav mr-auto">
                        <Link to={"/basket"} className="nav-link">
                          Корзина
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/orders/user"} className="nav-link">
                          Мои заказы
                        </Link>
                      </li>
                    </div>
                  ) : (<div></div>)}

                  {(currentUser.role == 'ROLE_ADMIN') ? (
                    <div className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link to={"/products/private"} className="nav-link">
                          Работа с товарами
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/orders/admin"} className="nav-link">
                          Работа с заказами
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/users"} className="nav-link">
                          Пользователи
                        </Link>
                      </li>
                    </div>
                  ) : (<div></div>)}

                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      Личный кабинет
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      Выйти
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Войти
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Регистрация
                    </Link>
                  </li>
                </div>
              )}
            </div>
          </nav>
        </header>

        <div className="container mt-3">
          <Routes>
            <Route path="/products/public/:id" element={<ProductPublic />} />
            <Route path="/products/private/:id" element={<ProductPrivate />} />
            <Route path="/products/private" element={<ProductsListPrivate />} />
            <Route path="/products/public" element={<ProductsListPublic />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/orders/user" element={<OrderUser />} />
            <Route path="/orders/admin" element={<OrderAdmin />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/" element={<ProductsListPublic />} />
            <Route path="/home" element={<ProductsListPublic />} />
            <Route path="/basket" element={< Basket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        { /*<AuthVerify logOut={this.logOut}/> */}
        <div className='container'>
          <footer className='row row-col-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top'>
            <div className='col mb-3'>
              <a className=''>
                <img src='images/logo.png' className='bi me-2' width={180} height={180}>
                </img>
              </a>
              <p>
              </p>
            </div>
            <div className='col mb-3'>

            </div>
            <div className='col mb-4'>
              <h5>Покупателям</h5>
              <ul className='nav flex-column'>
                <li className='nav-item mb-3'>
                  <a className='nav-link p-0 text-muted'> Как оформить заказ</a>
                </li>
                <li className='nav-item mb-3'>
                  <a className='nav-link p-0 text-muted'> Способы оплаты</a>
                </li>
                <li className='nav-item mb-3'>
                  <a className='nav-link p-0 text-muted'> Доставка</a>
                </li>
                <li className='nav-item mb-3'>
                  <a className='nav-link p-0 text-muted'> Статус заказа</a>
                </li>
              </ul>
            </div>

            <div className='col mb-4'>
              <h5>Время работы</h5>
              <ul className='nav flex-column'>
                <li className="footer__item">
                  Пн - Пт с 9:00 до 18:00 (GMT +3)
                </li>
                <li className="footer__item">
                  Сб - Вс, праздники - выходной
                </li>
              </ul>
            </div>

            <div className='col mb-4'>
              <h5>Контакты</h5>
              <ul className='nav flex-column'>
                <li className="footer__item">
                  <a className="nav-link p-0 text-muted" href="">+7 (999) 888-77-66</a>
                </li>
                <li className="footer__item">
                  <a className="phnav-link p-0 text-mutedone" href="">+7 (999) 888-77-67</a>
                </li>
              </ul>
            </div>
          </footer >
        </div >
      </div>

    );
  }
}

export default App;