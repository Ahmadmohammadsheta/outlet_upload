import axios from "axios";
import React, { useEffect, useState } from "react";

import { productsInWishlistNumber } from "../../Redux/countInCartSlice";

import { AiOutlineStar, AiTwotoneHeart } from "react-icons/ai";
import { MdOutlineCompareArrows } from "react-icons/md";
import heart from "./heart.gif";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import OneClintProduct from "../OneCliendProductComponent/OneClintProduct";

const LevelTrader = () => {
    const { id } = useParams();

    const [traderInfo, setTaderInfo] = useState({});

    useEffect(() => {
        const cancelRequest = axios.CancelToken.source();
        const getOneLevelTrader = async () => {
            try {
                const res = await axios.get(
                    `${process.env.MIX_APP_URL}/api/traders/${id}`,
                    {
                        cancelRequest: cancelRequest.token,
                    }
                );

                console.log(res.data.data);
                setTaderInfo(res.data.data);
            } catch (error) {
                console.warn(error.message);
            }
        };
        getOneLevelTrader();
        return () => {
            cancelRequest.cancel();
        };
    }, []);

    const [wishlistBtn, setWishlistBtn] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

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

    const saveToWishList = (id) => {
        let getToken = JSON.parse(localStorage.getItem("clTk"));

        if (getToken) {
            setWishlistBtn(true);
            axios
                .get(`${process.env.MIX_APP_URL}/` + "sanctum/csrf-cookie")
                .then(async (res) => {
                    try {
                        await axios
                            .post(
                                `${process.env.MIX_APP_URL}/api/wishlists`,
                                {
                                    item_id: id,
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${getToken}`,
                                    },
                                }
                            )
                            .then(async (resp) => {
                                setWishlistBtn(false);
                                getWishlistProductsCount();
                                console.log(resp);
                                // refetchFn();
                            });
                    } catch (er) {
                        console.log(er);
                    }
                });
        } else {
            navigate("/clientLogin/login");
        }
    };

    const refetch = () => {
        console.log("hi");
    };

    return (
        <div>
            <div className="trader-logo-name flex flex-col gap-2 items-center justify-center my-3">
                <div className="logo-div" style={{ width: "290px" }}>
                    <img
                        className="w-1/2 mx-auto"
                        src={`${process.env.MIX_APP_URL}/app/assets/images/uploads/traders/${traderInfo.logo}`}
                        alt="لا يوجد صورة"
                    />
                </div>

                <h1
                    className="text-center p-3 shadow-md m-3 text-white rounded-md"
                    style={{ backgroundColor: "rgb(220, 26, 33" }}
                >
                    {traderInfo.f_name} {traderInfo.m_name} {traderInfo.l_name}
                </h1>
            </div>

            {!traderInfo.items > 0 && (
                <h1 className="p-4 bg-red-600 text-white text-lg">
                    <marquee direction="right">
                        Mansoura Outlet مرحبا بك فى{" "}
                    </marquee>
                </h1>
            )}

            <div className="gird-products flex flex-wrap justify-center pb-16 gap-6 my-4">
                {traderInfo.items &&
                    traderInfo.items.map((item) => (
                        <OneClintProduct
                            key={item.id}
                            product={item}
                            refetch={refetch}
                        />
                    ))}
            </div>
        </div>
    );
};

export default LevelTrader;
