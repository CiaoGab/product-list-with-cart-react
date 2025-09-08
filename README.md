# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

✅ Add items to the cart and remove them
✅ Increase/decrease the number of items in the cart
✅ See an order confirmation modal when they click "Confirm Order"
✅ Reset their selections when they click "Start New Order"
✅ View the optimal layout for the interface depending on their device's screen size
✅ See hover and focus states for all interactive elements on the page

### Links

- Live Site URL: [https://app.netlify.com/projects/mock-productlistwithcart/overview]()
- Frontend Mentor - [@CiaoGab](https://www.frontendmentor.io/profile/CiaoGab)
- GitHub - [@CiaoGab](https://github.com/CiaoGab)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- Semantic HTML5 markup
- CSS Grid and Flexbox
- Mobile-first workflow
- Responsive Design

### What I learned

- Managing cart state with React's useState hook
- Building a responsive grid layout with Tailwind CSS
- Implementing a modal system for order confirmation
- Handling dynamic pricing calculations
- Creating reusable components for product cards
- Using CSS Grid for responsive product layouts

```jsx
// Example of cart state management
const [cartItems, setCartItems] = useState([]);

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
```

### Useful resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Essential for learning the utility-first CSS approach
- [React Documentation](https://react.dev/) - Great for understanding React hooks and state management
- [Vite Documentation](https://vitejs.dev/guide/) - Helpful for project setup and optimization

---

A Frontend Mentor challenge completed with React, Vite, and Tailwind CSS. The project features a responsive product grid, interactive cart functionality, and a sleek order confirmation modal.


