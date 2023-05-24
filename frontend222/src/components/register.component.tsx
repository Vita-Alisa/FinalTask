import { Component } from "react";
import { Navigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import AuthService from "../services/auth.service";

type Props = {};

type State = {
  redirect: string | null,
  username: string,
  password: string,
  successful: boolean,
  message?: string | null
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
      redirect: null,
      username: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      this.setState({ redirect: "/home" });
    };
  }

  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "Длина",
          "Имя пользователя должно быть не менее трех символов и не более 20.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("Данное поле требуется заполнить для регистрации!"),
      password: Yup.string()
        .test(
          "Длина",
          "мя пользователя должно быть не менее 6 символов и не более 40.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("Данное поле требуется заполнить для регистрации!"),
    });
  }

  handleRegister(formValue: { username: string; password: string }) {
    const { username, password } = formValue;

    this.setState({
      message: "",
      successful: false
    });

    AuthService.resultRegistration(
      username,
      password
    ).then(
      response => {
        this.setState({
          message: "Вы зарегистрировались",
          successful: true,
          redirect: "/home"
        });
        window.location.reload();
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    const { successful, message } = this.state;

    const initialValues = {
      username: "",
      email: "",
      password: "",
    };

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleRegister}
          >
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username"> Имя пользователя </label>
                    <Field name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password"> Пароль </label>
                    <Field
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Зарегистрировать</button>
                  </div>
                </div>
              )}

              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}
