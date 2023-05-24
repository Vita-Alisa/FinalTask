import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import AdminService from "../../services/admin.service";
import AuthService from "../../services/auth.service";

import IUser, { IUserInfo, IUpdateUserRole } from "../../types/user";


const UsersList: React.FC = () => {
    const [users, setUsers] = useState<IUserInfo[]>([]);
    const [currentSelectedUser, setCurrentSelectedUser] = useState<IUserInfo | null>(null);
    const [currentSelectedUserRole, setCurrentSelectedUserRole] = useState<IUpdateUserRole>({ role: "" });
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [currentUser, setCurrentUser] = useState<IUser | null>(AuthService.getCurrentUser());

    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
        retrieveUsers();
    }, []);

    const retrieveUsers = () => {
        AdminService.adminUsers()
            .then((response: any) => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveUsers();
        setCurrentSelectedUser(null);
        setCurrentIndex(-1);
    };

    const updateRole = () => {
        if (currentSelectedUser) {
            currentSelectedUser.role = currentSelectedUserRole.role;
            AdminService.editUserRole(currentSelectedUser.id, currentSelectedUserRole)
                .then((response: any) => {
                    console.log(response.data);
                    refreshList();
                    //window.location.reload();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        }
    };

    const setSelectedRoleInCurrentUser = (selectedRole: string) => {
        setCurrentSelectedUserRole({ role: selectedRole });
    };

    const setActiveUser = (user: IUserInfo, index: number) => {
        setCurrentSelectedUser(user);
        setCurrentIndex(index);
        setCurrentSelectedUserRole({ role: user.role });
    };

    return (
        <div className="list row">
            <div className="col-md-6">
                <h4>Пользователи:</h4>
                <ul className="list-group">
                    {users &&
                        users.map((user, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveUser(user, index)}
                                key={index}
                            >
                                {user.id} &nbsp; {user.login}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="col-md-6">
                {currentSelectedUser ? (
                    <div>
                        <h4>Пользователь</h4>
                        <div>
                            <label>
                                <strong>Номер:</strong>
                            </label>{" "}
                            {currentSelectedUser.id}
                        </div>
                        <div>
                            <label>
                                <strong>Имя пользователя:</strong>
                            </label>{" "}
                            {currentSelectedUser.login}
                        </div>
                        <div>
                            <label>
                                <strong>Роль:</strong>
                            </label>{" "}

                            <select
                                name="currentOrderStatus"
                                defaultValue={currentSelectedUserRole.role}
                                id={currentSelectedUserRole.role}
                                value={currentSelectedUserRole.role}
                                onChange={e => setSelectedRoleInCurrentUser(e.target.value)}
                            >
                                <option key={"ROLE_ADMIN"} value={"ROLE_ADMIN"}>Администратор</option>
                                <option key={"ROLE_USER"} value={"ROLE_USER"}>Пользователь</option>
                            </select>

                            <button
                                type="submit"
                                className="badge badge-success"
                                onClick={updateRole}
                            >
                                Обновить роль
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберите пользователя...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;
