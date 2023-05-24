import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

import IUser from "../types/user";

const Profile: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(AuthService.getCurrentUser());

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      {(currentUser) ?
        <div>
          <header className="jumbotron">
            <h3>
              Профиль: <strong>{currentUser.login}</strong>
            </h3>
          </header>
          <p>
            <strong>Id:</strong>{" "}
            {currentUser!.id}
          </p>
          <strong>Роль:</strong>{" "}
          {(currentUser.role == 'ROLE_USER') ? (
            <div>Пользователь</div>
          ) : (<div></div>)}
          {(currentUser.role == 'ROLE_ADMIN') ? (
            <div>Администратор</div>
          ) : (<div></div>)}
        </div> : null}
    </div>
  );
};

export default Profile;