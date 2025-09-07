import { useState } from "react";
import foodData from "./data.json";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardElements = foodData.map((item) => {
    const isAdded = cartItems.find((cartItem) => cartItem.name === item.name);

    return (
      <div key={item.name}>
        <div className="flex flex-col">
          <img
            className="rounded-md shadow-md"
            src={item.image.mobile}
            alt={`image of ${item.name}`}
          />
          {isAdded ? (
            <div className="max-w-[160px] mx-auto flex -m-3 bg-red-700 text-white rounded-full px-5 py-2 cursor-pointer border border-stone-500 justify-between w-full">
              <button
                onClick={() => decrement(isAdded)}
                className="border border-white rounded-full h-6 w-6 flex justify-center items-center"
              >
                -
              </button>
              <p>{isAdded.quantity}</p>
              <button
                onClick={() => increment(isAdded)}
                className="border border-white rounded-full h-6 w-6 flex justify-center items-center"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item)}
              className="max-w-[160px] mx-auto flex -m-3 bg-white rounded-full px-5 py-2 cursor-pointer border border-stone-500"
            >
              <span>
                <img src="src/assets/images/icon-add-to-cart.svg" alt="" />
              </span>
              Add to Cart
            </button>
          )}
          <div className="mt-6">
            <span className="text-orange-950 text-sm">{item.category}</span>
            <h2 className="text-lg">{item.name}</h2>
            <p className="text-red-600 font-semibold text-lg">{`$${item.price.toFixed(
              2
            )}`}</p>
          </div>
        </div>
      </div>
    );
  });

  function cartElement() {
    const orderTotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (cartItems.length <= 0) {
      return (
        <div className="bg-white rounded-lg flex flex-col p-6 gap-6 shadow-lg">
          <h2 className="text-orange-700 text-2xl font-bold">Your Cart (0)</h2>
          <div className="flex flex-col justify-center items-center p-4">
            <img
              className="w-32"
              src="src/assets/images/illustration-empty-cart.svg"
              alt="empty cart image"
            />
            <p className="mt-4">Your added items will appear here</p>
          </div>
        </div>
      );
    } else {
      const cartItemElements = cartItems.map((item) => {
        return (
          <div key={item.name}>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <h4>{item.name}</h4>
                <div className="flex gap-4">
                  <span className="text-red-600 font-bold">{`${item.quantity}x`}</span>
                  <p className="text-amber-800 font-medium">{`@${item.price.toFixed(
                    2
                  )}`}</p>
                  <p className="text-amber-800 font-semibold">{`$${(
                    item.price * item.quantity
                  ).toFixed(2)}`}</p>
                </div>
              </div>
              <img
                onClick={() => removeItem(item)}
                src="src/assets/images/icon-remove-item.svg"
                alt="remove item"
                className="cursor-pointer w-5 h-5 border border-red-900 rounded-full p-1"
              />
            </div>
            <hr />
          </div>
        );
      });
      return (
        <div className="bg-white rounded-lg flex flex-col p-8 gap-6 shadow-lg">
          <h2 className="text-orange-700 text-2xl font-bold">
            Your Cart ({totalItems})
          </h2>
          {cartItemElements}
          <div className="flex justify-between items-center">
            <p>Order Total</p>
            <p className="text-3xl font-bold">{`$${orderTotal.toFixed(2)}`}</p>
          </div>
          <div className="flex gap-2 justify-center bg-orange-50 py-3 px-1 w-full text-lg mx-auto rounded-md">
            <img src="src/assets/images/icon-carbon-neutral.svg" alt="" />
            <p>
              This is a <span className="font-semibold">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          <button
            onClick={confirmOrder}
            className="w-full bg-red-600 p-4 rounded-full text-white text-lg font-semibold"
          >
            Confirm Order
          </button>
        </div>
      );
    }
  }

  function removeItem(itemToRemove) {
    setCartItems(cartItems.filter((item) => item.name !== itemToRemove.name));
  }

  function addToCart(item) {
    const alreadyAdded = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );
    if (alreadyAdded) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  }

  function increment(itemToIncrement) {
    setCartItems(
      cartItems.map((item) =>
        item.name === itemToIncrement.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decrement(itemToDecrement) {
    if (itemToDecrement.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.name === itemToDecrement.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      removeItem(itemToDecrement);
    }
  }

  function confirmOrder() {
    setIsModalOpen(true); // show modal
  }

  function closeModal() {
    setIsModalOpen(false);
    setCartItems([]); // optional: clear cart when closing modal
  }

  const orderTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-stone-100 p-6 font-text flex flex-col min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Desserts</h1>

      <main className="flex flex-col md:flex-row gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1">
          {cardElements}
        </div>
        <div className="mt-6 md:mt-0 md:w-1/3">{cartElement()}</div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
            <img
              className="mb-4"
              src="src\assets\images\icon-order-confirmed.svg"
              alt=""
            />
            <h2 className="text-2xl font-bold  mb-4">Order Confirmed</h2>
            <p className="mb-4">We hope you enjoy your food!</p>

            <div className="max-h-64 overflow-y-auto space-y-4 bg-gray-50 rounded-md shadow-md p-3">
              {cartItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image.thumbnail}
                      alt={item.name}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-orange-800">
                        {item.quantity}x @ ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">{`$${(
                    item.price * item.quantity
                  ).toFixed(2)}`}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6 border-t pt-4">
              <p className="font-semibold">Order Total:</p>
              <p className="text-xl font-bold">{`$${orderTotal.toFixed(2)}`}</p>
            </div>

            <button
              onClick={closeModal}
              className="mt-6 w-full hover:bg-red-900 bg-red-600 text-white py-3 rounded-full font-semibold"
            >
              Start New Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
