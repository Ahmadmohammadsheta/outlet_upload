import axios from "axios";
import React, { useState } from "react";

import "./oneClientProductStyle.scss";
import heart from "./heart.gif";
import { MdOutlineCompareArrows } from "react-icons/md";
import { AiTwotoneStar, AiTwotoneHeart } from "react-icons/ai";

import { Link, useNavigate } from "react-router-dom";
import { productsInWishlistNumber } from "../../Redux/countInCartSlice";
import { useDispatch } from "react-redux";

const OneClintProduct = ({ product, refetch }) => {
    const navigate = useNavigate();

    console.log(product);

    const dispatch = useDispatch();

    const goToDetails = (item) => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        navigate(`/products/product/${item.id}`);
    };

    const getWishlistProductsCount = async () => {
        let getToken = JSON.parse(localStorage.getItem("clTk"));
        try {
            const res = await axios.get(
                `${process.env.MIX_APP_URL}/api/wishlists/`,
                {
                    headers: { Authorization: `Bearer ${getToken}` },
                }
            );
            let wishlistCount = res.data.data.length;
            dispatch(productsInWishlistNumber(wishlistCount));
        } catch (er) {
            console.log(er);
        }
    };

    const [wishlistBtn, setWishlistBtn] = useState(false);
    const saveToWishList = async (product) => {
        console.log(product);
        let getToken = JSON.parse(localStorage.getItem("clTk"));
        if (getToken) {
            setWishlistBtn(true);
            try {
                await axios
                    .post(
                        `${process.env.MIX_APP_URL}/api/wishlists`,
                        {
                            item_id: product,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${getToken}`,
                            },
                        }
                    )
                    .then(async (resp) => {
                        console.log(resp);
                        setWishlistBtn(false);
                        getWishlistProductsCount();
                        refetch();
                    });
            } catch (er) {
                console.log(er);
            }
            // axios
            //     .get(`${process.env.MIX_APP_URL}/` + "sanctum/csrf-cookie")
            //     .then(async (res) => {
            //         try {
            //             await axios
            //                 .post(
            //                     `${process.env.MIX_APP_URL}/api/wishlists`,
            //                     {
            //                         item_id: product,
            //                     },
            //                     {
            //                         headers: {
            //                             Authorization: `Bearer ${getToken}`,
            //                         },
            //                     }
            //                 )
            //                 .then(async (resp) => {
            //                     setWishlistBtn(false);
            //                     getWishlistProductsCount();
            //                     refetch();
            //                 });
            //         } catch (er) {
            //             console.log(er);
            //         }
            //     });
        } else {
            navigate("/clientLogin");
        }
    };

    return (
        <div className="relative">
            <Link
                to={`/products/product/${product.id}`}
                className="one-product-div block h-fit p-3 shadow-lg rounded-lg relative"
                dir="rtl"
                style={{ width: "300px" }}
            >
                <div
                    className="product-img "
                    style={{ width: "200px", height: "250px" }}
                >
                    <img
                        className="mx-auto h-full w-full"
                        src={`${process.env.MIX_APP_URL}/assets/images/uploads/items/${product?.itemImages[0]?.img}`}
                        alt="لا يوجد صورة"
                    />
                </div>
                <h5
                    className="text-line-text-decoration-line-through"
                    style={{ textDecorationColor: "red" }}
                >
                    {product.name}
                </h5>
                <h5 className="mt-2">السعر: {product.sale_price} جنية</h5>
                <h5 className="mt-2">{product?.available}</h5>
                {/* <div className="stock-count-div">
                    <div>عدد القطع المتوفرة: {product?.stock}</div>
                </div> */}
                <div className="rate-div flex gap-2 my-3">
                    {Array.from(Array(product.allRates).keys()).map((star) => (
                        <AiTwotoneStar
                            key={star}
                            className="text-md text-amber-300"
                        />
                    ))}
                </div>

                <div
                    onClick={() => goToDetails(product)}
                    className="details font-bold cursor-pointer mt-2 border-zinc-400 border-b-2 p-2 rounded-md bg-slate-200"
                >
                    تفاصيل المنتج
                </div>
            </Link>
            <div className="wichlist-product absolute top-0 right-0 p-2 rounded-md bg-slate-100 opacity-4">
                <span className="mb-4 hover:text-red-600">
                    {!wishlistBtn ? (
                        <AiTwotoneHeart
                            onClick={() => saveToWishList(product.id)}
                            className={`cursor-pointer ${
                                product.wishlist == true && "text-red-500"
                            }`}
                        />
                    ) : (
                        <img className="w-5 h-5" src={heart} alt="" />
                    )}
                </span>
                <span className="my-3 py-3 ">
                    <MdOutlineCompareArrows className="cursor-pointer text-lg mt-3 hover:text-orange-400" />
                </span>
            </div>
        </div>
    );
};

export default OneClintProduct;
