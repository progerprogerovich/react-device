import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemById } from "../../redux/cart/selectors";
import { CartItem } from "../../redux/cart/types";
import { addItem } from "../../redux/cart/slice";

type DeviceBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  prices: { size: number; price: number }[];
};

export const DeviceBlock: React.FC<DeviceBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  prices,
}) => {
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const [activeSize, setActiveSize] = React.useState(0);
  const [currentPrice, setCurrentPrice] = React.useState(prices[0].price);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const cartItemId = `${id}-${sizes[activeSize]}`; // Создание уникального идентификатора
    const item: CartItem = {
      id: cartItemId, // Используйте уникальный идентификатор
      title,
      price: currentPrice,
      imageUrl,
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="device-block-wrapper">
      <div className="device-block">
        <Link key={id} to={`/device/${id}`}>
          <img className="device-block__image" src={imageUrl} alt="device" />
          <h4 className="device-block__title">{title}</h4>
        </Link>
        <div className="device-block__selector">
          <ul>
            {sizes.map((size, i) => (
              <li
                key={size}
                onClick={() => {
                  setActiveSize(i);
                  setCurrentPrice(prices[i].price);
                }}
                className={activeSize === i ? "active" : ""}
              >
                {size} гб.
              </li>
            ))}
          </ul>
        </div>
        <div className="device-block__bottom">
          <div className="device-block__price">{currentPrice} ₽</div>
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
      </div>
    </div>
  );
};
