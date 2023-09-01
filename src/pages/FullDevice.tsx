import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemById } from "../redux/cart/selectors";
import { CartItem } from "../redux/cart/types";
import { addItem } from "../redux/cart/slice";

const FullDevice: React.FC = () => {
  const [device, setDevice] = React.useState<{
    imageUrl: string;
    title: string;
    oc: string;
    sizes: number[];
    prices: { size: number; price: number }[];
  }>();

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemById(id || ""));
  const [addedCount, setAddedCount] = React.useState<number>(
    cartItem ? cartItem.count : 0
  );
  const [selectedSize, setSelectedSize] = React.useState<number>(0);

  const [activeSize, setActiveSize] = React.useState(0);
  const [currentPrice, setCurrentPrice] = React.useState(0);

  React.useEffect(() => {
    async function fetchDevice() {
      try {
        const { data } = await axios.get(
          "https://64c696680a25021fde91ce0b.mockapi.io/items/" + id
        );
        setDevice(data);
        setCurrentPrice(data.prices[0].price);
      } catch (error) {}
    }

    fetchDevice();
  }, [id]);

  const onClickAdd = () => {
    if (id) {
      const item: CartItem = {
        id: `${id}-${selectedSize}`,
        title: device?.title || "",
        price: currentPrice,
        imageUrl: device?.imageUrl || "",
        size: selectedSize,
        count: addedCount + 1,
      };
      dispatch(addItem(item));
      setAddedCount(addedCount + 1);
    }
  };

  if (!device) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <div className="container__wrapper">
        <img src={device.imageUrl} alt={device.title} />
        <div className="container__flex">
          <h2>{device.title}</h2>
          <h4>Цена: от {currentPrice} ₽</h4>
          <h4>Операционная система: {device.oc}</h4>
          <div className="device-block__selector">
            <ul>
              {device.sizes.map((size, i) => (
                <li
                  key={size}
                  onClick={() => {
                    setActiveSize(size);
                    setSelectedSize(size);
                    setCurrentPrice(device.prices[i].price);
                  }}
                  className={activeSize === size ? "active" : ""}
                >
                  {size} гб.
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container__flex">
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Назад</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullDevice;
