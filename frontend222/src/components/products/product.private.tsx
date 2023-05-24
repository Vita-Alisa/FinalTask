import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import AuthService from "../../services/auth.service";

import ICategory from "../../types/category";
import IProduct from "../../types/product";
import IUser from "../../types/user";
import IImage from "../../types/image";
import AdminService from "../../services/admin.service";
import ProductService from "../../services/product.service";
import ImageUpload from "../imageUpload";

const ProductPrivate: React.FC = () => {
    const { id } = useParams();

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
    const [imageFile1, setImageFile1] = useState<File>();
    const [imageFile2, setImageFile2] = useState<File>();
    const [imageFile3, setImageFile3] = useState<File>();
    const [imageFile4, setImageFile4] = useState<File>();
    const [imageFile5, setImageFile5] = useState<File>();
    const [categories, setCategories] = useState<ICategory[]>();
    const [message, setMessage] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<IUser | null>(AuthService.getCurrentUser());

    const getProduct = (id: any) => {
        AdminService.infoProduct(id)
            .then((response: any) => {
                setCurrentProduct(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
        if (id) {
            getProduct(id);
        }
        AdminService.categories().then((response: any) => {
            setCategories(response.data);
            console.log(response.data);
        })
            .catch((e: Error) => {
                console.log(e);
            });

    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };

    const setCurrentCategory = (categoryName: string) => {
        console.log(categoryName);
        setCurrentProduct({ ...currentProduct, ['category']: categoryName });
    };

    const updateProduct = () => {
        ProductService.editProduct(currentProduct.id, {
            title: currentProduct.title,
            description: currentProduct.description,
            warehouse: currentProduct.warehouse,
            seller: currentProduct.seller,
            file_one: imageFile1,
            file_two: imageFile2,
            file_three: imageFile3,
            file_four: imageFile4,
            file_five: imageFile5,
            categoryId: categories?.find((item) => item.name == currentProduct.category)?.id,
            price: currentProduct.price,
        })
            .then((response: any) => {
                console.log(response.data);
                setMessage("Товар успешно изменен!");
                setTimeout(function () {
                    window.location.reload();
                }, 2000);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentProduct ? (
                <div className="edit-form">
                    <h4>Товар</h4>
                    <div className="form-group">
                        <label htmlFor="title">Название</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={currentProduct.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Описание:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={currentProduct.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Цена:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            required
                            value={currentProduct.price}
                            onChange={handleInputChange}
                            name="price"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="warehouse">Склад:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="warehouse"
                            required
                            value={currentProduct.warehouse}
                            onChange={handleInputChange}
                            name="warehouse"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="seller">Автор:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="seller"
                            required
                            value={currentProduct.seller}
                            onChange={handleInputChange}
                            name="seller"
                        />
                    </div>

                    <div>
                        <label>
                            <strong>Категория:</strong>
                        </label>{" "}

                        <select
                            name="category"
                            id={currentProduct.category}
                            value={currentProduct.category}
                            onChange={e => setCurrentCategory(e.target.value)}
                        >
                            {categories?.map((value) => (
                                <option key={value.name} value={value.name}>{value.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="image1">Картинка 1:</label>
                            {currentProduct.imageList?.at(0)?.fileName &&
                                <img src={"/images/" + currentProduct.imageList?.at(0)?.fileName} width="100" height="100" />
                            }
                            <ImageUpload props={setImageFile1} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="image1">Картинка 2:</label>
                            {currentProduct.imageList?.at(1)?.fileName &&
                                <img src={"/images/" + currentProduct.imageList?.at(1)?.fileName} width="100" height="100" />
                            }
                            <ImageUpload props={setImageFile2} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="image1">Картинка 3:</label>
                            {currentProduct.imageList?.at(2)?.fileName &&
                                <img src={"/images/" + currentProduct.imageList?.at(2)?.fileName} width="100" height="100" />
                            }
                            <ImageUpload props={setImageFile3} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="image1">Картинка 4:</label>
                            {currentProduct.imageList?.at(3)?.fileName &&
                                <img src={"/images/" + currentProduct.imageList?.at(3)?.fileName} width="100" height="100" />
                            }
                            <ImageUpload props={setImageFile4} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-group">
                            <label htmlFor="image1">Картинка 5:</label>
                            {currentProduct.imageList?.at(4)?.fileName &&
                                <img src={currentProduct.imageList?.at(4)?.fileName} width="100" height="100" />
                            }
                            <ImageUpload props={setImageFile5} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateProduct}
                    >
                        Изменить
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Выберите товар...</p>
                </div>
            )}
        </div>
    );
};

export default ProductPrivate;
