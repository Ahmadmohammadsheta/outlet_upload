import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Checkbox from "@mui/material/Checkbox";

import TextEditorFunction from "../TextEditorClassComponent/TextEditorFunction";

const UpdateTraderProductModal = ({ traderProductInfo }) => {
    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    const navig = useNavigate();

    const [apiMessage, setApiMessage] = useState("");

    const [isImported, setIsImported] = useState(false);

    // (----------------------------- (types التصنيفات select) -----------------------------)
    const [categoriesArray, setCategoriesArray] = useState([]);
    const [categoryId, setcategoryId] = useState("");
    const [seletedSubName, setSeletedSubName] = useState("");
    // (----------------------------- (types التصنيفات select) -----------------------------)

    // (----------------------------- (Product Info) -----------------------------)
    const [productName, setProdcutName] = useState("");

    // (----------------------------- (item unit id وحدة المنتج-- select) -----------------------------)
    const [itemsUnitsArr, setItemsUnitsArr] = useState([]);
    const [itemUnitId, setItemUnitId] = useState("0"); // send as (id):Number from select
    // (----------------------------- (item unit id وحدة المنتج-- select) -----------------------------)

    // (----------------------------- (العدد داخل الوحدة) -----------------------------)
    const [unitPartsCount, setUnitPartsCount] = useState("1");
    // (----------------------------- (العدد داخل الوحدة) -----------------------------)

    const [salePrice, setSalePrice] = useState("");

    const [buyPrice, setBuyPrice] = useState("");

    const [itemCode, setItemCode] = useState("");

    const [barCode, setBarCode] = useState("");

    const [spareBarCode, setSpareBarCode] = useState("");

    const [productDescription, setProductDescription] = useState("");

    // (----------------------------- (manufactory الشركة المصنعة او المنتجة select) -----------------------------)
    const [manufactoryArray, setManufactoryArray] = useState([]);
    const [manufactoryID, setManufactoryID] = useState("0");

    // (----------------------------- (manufactory الشركة المصنعة او المنتجة select) -----------------------------)

    // (----------------------------- (manufactory الشركة المستوردة   select) -----------------------------)
    const [importedCompArray, setImportedCompArray] = useState([]);
    const [importedCompId, setImportedCompId] = useState("0");
    // (----------------------------- (manufactory الشركة المستوردة  select) -----------------------------)

    // (----------------------------- (Distribute companies الشركة الموزعة select) ------------------------)
    const [distributeCompaniesArray, setDistributeCompaniesArray] = useState(
        []
    );
    const [distributeCompanyId, setDistributeCompanyId] = useState("0");
    // (----------------------------- (Distribute companies الشركة الموزعة select) ------------------------)

    const [importBoolean, setImportBoolean] = useState("");

    const [checkedValue, setCheckValue] = useState(false);

    //  (---------------------- discount ------------------- )
    const [discountValue, setDiscountValue] = useState("");
    const [precentDiscount, setPrecentDiscount] = useState("");
    const [discountByPercentage, setDiscountByPercentage] = useState("");

    useEffect(() => {
        let discountAmount = (discountByPercentage * salePrice) / 100;
        setPrecentDiscount(discountAmount);
        setDiscountValue(discountAmount);
    }, [discountByPercentage]);

    //  (---------------------- discount ------------------- )

    const [successMsg, setSuccessMsg] = useState("");

    //1- if token in local storage then make request
    // if response true get all data regarde to this trader
    useEffect(() => {
        const cancelRequest = axios.CancelToken.source();
        let traderTk = JSON.parse(localStorage.getItem("trTk"));
        // وحدات المنتج
        const getItemUnits = async () => {
            try {
                const res = await axios.get(
                    `${process.env.MIX_APP_URL}/api/itemUnits`,
                    {
                        cancelRequest: cancelRequest.token,
                    }
                );
                setItemsUnitsArr(res.data.data);
            } catch (error) {
                console.warn(error.message);
            }
        };
        getItemUnits();

        const getCategories = async () => {
            try {
                const res = await axios.get(
                    `${process.env.MIX_APP_URL}/api/categories`,
                    {
                        cancelRequest: cancelRequest.token,
                    }
                );
                setCategoriesArray(res.data.data);
                console.log(res);
            } catch (error) {
                console.warn(error.message);
            }
        };
        getCategories();

        return () => {
            cancelRequest.cancel();
        };
    }, []);

    useEffect(() => {
        setProdcutName(traderProductInfo.name);
        setItemUnitId(traderProductInfo.itemUnit.id);
        setcategoryId(traderProductInfo.category.id);
        setSeletedSubName(traderProductInfo.category.name);
        setUnitPartsCount(traderProductInfo.unit_parts_count);
        setSalePrice(traderProductInfo.sale_price);
        setItemCode(traderProductInfo.code);
        setDiscountValue(traderProductInfo.discount);
    }, []);

    // (------------------------ (Start adding product Function) -----------------------------)
    const validFirst = () => {
        updateProductFunc();
        // let regNum = /[0-9]/;
        // if (
        //     salePrice.match(regNum) &&
        //     buyPrice.match(regNum) &&
        //     productName != "" &&
        //     unitPartsCount.match(regNum)
        // ) {
        //     console.log("valid");
        //     addProductFunc();
        // } else {
        //     console.log("not valid");
        // }
    };
    console.log(traderProductInfo, " product info");
    const updateProductFunc = async () => {
        let userTk = JSON.parse(localStorage.getItem("uTk"));

        console.log(traderProductInfo.trader.id, "trader id");
        console.log(traderProductInfo.id, "trader id");

        try {
            const res = await axios.put(
                `${process.env.MIX_APP_URL}/api/items/${traderProductInfo.id}`,
                {
                    name: productName,
                    item_unit_id: itemUnitId,
                    unit_parts_count: unitPartsCount,
                    category_id: categoryId,
                    sale_price: salePrice,
                    buy_price: buyPrice,
                    discount: discountByPercentage,
                    item_code: itemCode,
                    barcode: barCode,
                    trader_id: traderProductInfo.trader.id,
                    spare_barcode: spareBarCode,
                    description: productDescription,
                },

                {
                    headers: {
                        Authorization: `Bearer ${userTk}`,
                    },
                }
            );
            setApiMessage(res.data.message);
            setTimeout(() => {
                setApiMessage("");
            }, 4000);
            console.log(res.data);
        } catch (er) {
            console.log(er.response);
        }
    };
    // (------------------------ (End adding product Function) -------------------------)

    //  (------------------------ (Import checkBox) --------------------------)
    const openImportedInput = (e) => {
        if (e.target.checked == true) {
            setImportBoolean("1");
        } else {
            setImportBoolean("");
        }
        setIsImported(!isImported);
        setCheckValue(!checkedValue);
    };
    //  (------------------------ (Import checkBox) ------------------------------)

    // (------------------------ handle Text Editor Value ----------------------)
    const textEditorValue = (text) => {
        setProductDescription(text);
    };
    // (------------------------ handle Text Editor Value ----------------------)

    const whatImportedComp = (impCompany) => {
        setImportedCompId(impCompany.target.value);
        // if (impCompany.target.value != "0") {
        // } else {
        //     console.log("zero not valid");
        // }
    };

    const whatManufactor = (manufactor) => {
        console.log(manufactor.target.value);
        setManufactoryID(manufactor.target.value);
        // if (manufactor.target.value != "0") {
        // } else {
        //     console.log("zero not valid");
        // }
    };

    const whatDistribute = (distribure) => {
        setDistributeCompanyId(distribure.target.value);
        // if (distribure.target.value != "0") {
        // } else {
        //     console.log("zero not valid");
        // }
    };

    // (handle item unints select)
    const whatItem = (e) => {
        setItemUnitId(e.target.value);
    };
    // (handle item unints select)

    const whatSub = (sub) => {
        setcategoryId(sub.id);
        setSeletedSubName(sub.name);
    };

    return (
        <div>
            <h1>اضافة منتجات</h1>
            {apiMessage.length > 0 && (
                <div className="fixed top-32 z-50 text-center w-full left-0 bg-green-500">
                    {apiMessage}
                </div>
            )}

            <div className="update-product-inputs">
                <div className="grid lg:grid-cols-2 gap-x-12 gap-y-3 p-3">
                    <div className="product-name-div">
                        <div className="mt-3 mb-2">إسم المنتج</div>
                        <input
                            className="border-none shadow-md rounded-md"
                            type="text"
                            value={productName}
                            placeholder="اسم المنتج"
                            onChange={(e) => setProdcutName(e.target.value)}
                        />
                    </div>

                    {/*-------------------- sub Category (Select list) ---------------------*/}
                    {/*-------------------------- (اسم الصنيف) -------------------------------*/}

                    {/*-------------------- sub Category (Select list) ---------------------*/}
                    {/*-------------------------- (اسم الصنيف) ----------------------------*/}
                    <div className="types-div mt-3">
                        <h1 className="font-bold"> إختر التصنيف </h1>
                        <h1>
                            التصنيف الذى تم اختيارة :{" "}
                            {seletedSubName.length > 0 ? (
                                <span className="border-b-2 font-bold shadow-md">
                                    {seletedSubName}
                                </span>
                            ) : (
                                "لم يتم الاختيار بعد"
                            )}
                        </h1>
                        <div className="category-container-add-prodcut">
                            <div className="main-category-btn relative rounded-md p-1">
                                <span className="cursor-pointer">
                                    التصنيفات
                                </span>
                                <div className="category-div-toggle hidden bg-blue-600 rounded-md">
                                    {categoriesArray &&
                                        categoriesArray.map((categ) => (
                                            <div
                                                key={categ.id}
                                                className="categoy-name bg-slate-100 text-black cursor-pointer relative"
                                            >
                                                <h1 className="p-1 m-3">
                                                    {categ.name}
                                                </h1>
                                                <div className="subCateg bg-white shadow-lg rounded-md absolute hidden">
                                                    <div className="subCategory-div">
                                                        {categ.subCategories &&
                                                            categ.subCategories.map(
                                                                (sub) => (
                                                                    <button
                                                                        onClick={() =>
                                                                            whatSub(
                                                                                sub
                                                                            )
                                                                        }
                                                                        className="rounded-md shadow-md text-black"
                                                                        key={
                                                                            sub.id
                                                                        }
                                                                    >
                                                                        {
                                                                            sub.name
                                                                        }
                                                                    </button>
                                                                )
                                                            )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        {/* <select
                            className="rounded-md cursor-pointer"
                            onChange={whatCategory}
                            name="type"
                            id="type"
                            value={categoryId}
                        >
                            <option value={"0"}>لم تختر بعد</option>
                            {categoriesArray &&
                                categoriesArray.map((oneType) => (
                                    <option value={oneType.id} key={oneType.id}>
                                        {oneType.name}
                                    </option>
                                ))}
                        </select> */}
                    </div>

                    {/*-------------------- sub Category (Select list) ---------------------*/}

                    {/*-------------------- sub Category (Select list) ---------------------*/}

                    {/* ------------------------------- قطعة أو علبة ---------------------------------- */}
                    <div className="item-units-select-div p-2 rounded-md flex items-start gap-1 flex-col">
                        <span>إختر وحدة المنتج</span>
                        <select
                            className="rounded-md cursor-pointer"
                            onChange={whatItem}
                            name="itemunit"
                            id="itemunit"
                            value={itemUnitId}
                        >
                            <option value={"0"}>اختر</option>
                            {itemsUnitsArr &&
                                itemsUnitsArr.map((oneItemUnit) => (
                                    <option
                                        value={oneItemUnit.id}
                                        key={oneItemUnit.id}
                                    >
                                        {oneItemUnit.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {/* ------------------------------- قطعة أو علبة ---------------------------------- */}

                    <div className="unit-parts-count-div">
                        <div className="mt-3 mb-2">عدد داخل الوحدة</div>
                        <input
                            className="border-none shadow-md rounded-md"
                            type="number"
                            min={1}
                            value={unitPartsCount}
                            placeholder="العدد داخل القطعة او الوحدة او العلبة"
                            onChange={(e) => setUnitPartsCount(e.target.value)}
                        />
                    </div>
                    {/*  سعر البيع  */}
                    <div className="sale-price-div">
                        <div className="mt-3 mb-2">سعر البيع</div>
                        <input
                            className="border-none shadow-md rounded-md"
                            type="number"
                            min={1}
                            value={salePrice}
                            placeholder="سعر البيع"
                            onChange={(e) => setSalePrice(e.target.value)}
                        />
                    </div>
                    {/*  سعر الشراء  */}
                    {/* <div className="buy-price-div">
                        <div className="mt-3 mb-2">سعر الشراء</div>
                        <input
                            className="border-none shadow-md rounded-md"
                            type="number"
                            value={buyPrice}
                            min={1}
                            placeholder="سعر الشراء"
                            onChange={(e) => setBuyPrice(e.target.value)}
                        />
                    </div> */}

                    {/*  كود المنتج */}
                    <div className="product-code-div">
                        <div className="mt-3 mb-2">كود المنتج</div>
                        <input
                            className="border-none shadow-md rounded-md"
                            type="number"
                            min={0}
                            value={itemCode}
                            placeholder="كود المنتج"
                            onChange={(e) => setItemCode(e.target.value)}
                        />
                    </div>

                    <div className="discount-div">
                        <div className="">إختر الخصم (ضع النسبة)</div>
                        <div>
                            <div>{precentDiscount} جنية</div>
                            <input
                                className="border-none shadow-md rounded-md"
                                type="text"
                                min={0}
                                value={discountByPercentage}
                                placeholder="10%"
                                onChange={(e) =>
                                    setDiscountByPercentage(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* <div className="product-barcode-div">
                        <div className="mt-3 mb-2">بار كود</div>
                        <input
                            className="border-none shadow-md rounded-md"
                            type="number"
                            value={barCode}
                            min={0}
                            placeholder="بار كود"
                            onChange={(e) => setBarCode(e.target.value)}
                        />
                    </div> */}

                    {/* <div className="product-spare-barcode-div">
                        <div className="mt-3 mb-2">بار كود إضافى</div>
                        <input
                            className="border-none shadow-md rounded-md"
                            type="number"
                            min={0}
                            value={spareBarCode}
                            placeholder="بار كود"
                            onChange={(e) => setSpareBarCode(e.target.value)}
                        />
                    </div> */}

                    {/*-------------------- الشركة المستوردة (Select list) ---------------------*/}
                    {/* <div className="import-checkbox-div mt-4 p-1 rounded-md shadow-md w-fit h-fit">
                            <div>هل هذا المنتج مستورد ؟</div>
                            <Checkbox onChange={openImportedInput} {...label} />
                            {isImported && (
                                <div>
                                    <div className="imported-company-div">
                                        <h1>اختر</h1>
                                        <select
                                            onChange={whatImportedComp}
                                            name="imported-company"
                                            id="imported-company"
                                            vlaue={importedCompId}
                                            className="rounded-md cursor-pointer"
                                        >
                                            <option value="0">لا يوجد</option>
                                            {importedCompArray &&
                                                importedCompArray.map(
                                                    (oneImporedComp) => (
                                                        <option
                                                            value={
                                                                oneImporedComp.id
                                                            }
                                                            key={oneImporedComp.id}
                                                        >
                                                            {oneImporedComp.name}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div> */}
                    {/*-------------------- الشركة المستوردة (Select list)  ---------------------*/}

                    {/*---------------------- الشركة المصنعة او المنتجة  ---------------------*/}
                    {/* <div className="manufactories-companies my-3">
                        <h1>الشركات المصنعة</h1>
                        <select
                            className="rounded-md cursor-pointer"
                            onChange={whatManufactor}
                            name="manufactories-companies"
                            id="manufactories-companies"
                            value={manufactoryID}
                        >
                            <option value={"0"}>لا يوجد</option>
                            {manufactoryArray &&
                                manufactoryArray.map((oneManufactor) => (
                                    <option
                                        value={oneManufactor.id}
                                        key={oneManufactor.id}
                                    >
                                        {oneManufactor.name}
                                    </option>
                                ))}
                        </select>
                    </div> */}
                    {/*---------------------- الشركة المصنعة او المنتجة  ---------------------*/}

                    {/* ----------------------- Distribute Company Select ------------------- */}
                    {/* <div className="distribute-companies">
                        <h1>الشركة الموزعة</h1>
                        <select
                            className="rounded-md cursor-pointer"
                            onChange={whatDistribute}
                            name="distribute-companies"
                            id="distribute-companies"
                            value={distributeCompanyId}
                        >
                            <option value={"0"}>لا يوجد</option>

                            {distributeCompaniesArray &&
                                distributeCompaniesArray.map(
                                    (oneDistributeComp) => (
                                        <option
                                            value={oneDistributeComp.id}
                                            key={oneDistributeComp.id}
                                        >
                                            {oneDistributeComp.name}
                                        </option>
                                    )
                                )}
                        </select>
                    </div> */}
                    {/* ----------------------- Distribute Company Select ------------------- */}
                    <h1>وصف جديد للمنتج</h1>
                    <TextEditorFunction textEditorValue={textEditorValue} />
                </div>
                <button
                    onClick={validFirst}
                    className="bg-blue-600 mx-3 rounded-md p-2 my-3 text-white"
                >
                    تعديل هذا المنتج
                </button>
            </div>
        </div>
    );
};

export default UpdateTraderProductModal;
