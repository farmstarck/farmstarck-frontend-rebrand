import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import ShopNavbar from "../components/marketing/Shop/ShopNavbar";
import { BackDrop } from "../components/common/BackDrop";
import RequestProductForm from "../components/marketing/Shop/landing/RequestProductForm";
import { ShopContext } from "../context/ShopContext";
import { ProductProps } from "../pages/marketing/shop";
import CartService from "../services/CartService";
import ProductService from "../services/ProductService";
import WishlistService from "../services/WishlistService";
import { useAuth } from "../context/AuthContext";
import { errorMessageRetreiver } from "../utils/errorRetriever";

const ShopLayout = () => {
  const { state } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unit, setUnit] = useState(1);
  const [updateCart, setUpdateCart] = useState<any>();
  const [updateWishlist, setUpdateWishList] = useState<any>();
  const [cartItems, setCartItems] = useState<any[]>();
  const [cartProducts, setCartProducts] = useState<any[]>();
  const [products, setProducts] = useState<any[]>();

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  //---------- CART METHODS--------//

  // Increment quantity
  const handleIncrementUnit = async (productId: string) => {
    setUnit(unit + 1);

    //handle logic
    const updatedCart: any = cartItems?.map((item: any) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const credential = {
      productId,
      quantity: unit + 1,
    };

    if (state?.isAuthenticated) {
      try {
        await CartService.updateCart(credential);
      } catch (error: any) {
        const message = errorMessageRetreiver(error);
        toast.error(message);
      }
    }
    setUpdateCart(Date.now());
  };
  //Decrement quantity
  const handleDecrementUnit = async (productId: string) => {
    if (unit > 1) {
      setUnit(unit - 1);
      //handle logic
      const updatedCart: any = cartItems?.map((item: any) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      const credential = {
        productId,
        quantity: unit - 1,
      };

      if (state?.isAuthenticated) {
        try {
          await CartService.updateCart(credential);
        } catch (error: any) {
          const message = errorMessageRetreiver(error);
          toast.error(message);
        }
      }
    } else {
      removeFromCart(productId);
    }
    setUpdateCart(Date.now());
  };

  // Add product to cart
  const handleAddToCart = async (productId: any) => {
    const tempCart = localStorage.getItem("cart");
    const cart = tempCart ? JSON.parse(tempCart) : [];

    // Find product
    const product = products?.find(
      (item: ProductProps) => item.id === productId
    );

    cart.push({ ...product, productId, quantity: 1 });
    setCartItems(cart);

    localStorage.setItem("cart", JSON.stringify(cart));

    const credential = {
      productId,
      quantity: 1,
    };

    if (state?.isAuthenticated) {
      try {
        await CartService.addToCart(credential);
        toast.success("Product added to cart");
      } catch (error: any) {
        const message = errorMessageRetreiver(error);

        toast.error(message);
      }
    } else {
      toast.success("Product added to cart");
    }

    setUpdateCart(Date.now());
  };

  // Remove product from cart
  const removeFromCart = async (productId: string) => {
    const tempCart = localStorage.getItem("cart");
    const cart = tempCart ? JSON.parse(tempCart) : [];

    const updatedCart = cart.filter(
      (item: any) => item.productId !== productId
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (state?.isAuthenticated) {
      try {
        await CartService.removeFromCart(productId);
        toast.success("Product removed cart");
      } catch (error: any) {
        const message = errorMessageRetreiver(error);
        toast.error(message);
      }
    } else {
      toast.success("Product removed cart");
    }
    setUpdateCart(Date.now());
  };

  // toggle (add / remove)  wishlist
  const handleToggleWishlist = async (productId: string) => {
    const tempWishlist = localStorage.getItem("wishlist");
    let wishlist = tempWishlist ? JSON.parse(tempWishlist) : [];

    // Check if the product already exists in the wishlist
    const existingProductIndex = wishlist.findIndex(
      (item: any) => item.productId === productId
    );

    // Find product
    const product = products?.find(
      (item: ProductProps) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      wishlist = wishlist.filter((item: any) => item.productId !== productId);
      toast.success("Product removed from wishlist");
    } else {
      // Add new product with an initial quantity of 1
      wishlist.push({ ...product, productId });
      toast.success("Product added to wishlist!");
    }

    // Update localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    if (state?.isAuthenticated) {
      try {
        await WishlistService.toggleWishlist(productId);
        // toast.success("Product added to cart");
      } catch (error: any) {
        const message = errorMessageRetreiver(error);

        toast.error(message);
      }
    }
    setUpdateWishList(Date.now());
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId: string) => {
    const tempWishlist = localStorage.getItem("wishlist");
    const wishlist = tempWishlist ? JSON.parse(tempWishlist) : [];

    const updatedWishlist = wishlist.filter(
      (item: any) => item.id !== productId
    );
    toast.success("Product removed wishlist");

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setUpdateWishList(Date.now());
  };

  //Clear wishlist
  const clearCart = async () => {
    localStorage.removeItem("cart");

    if (state?.isAuthenticated) {
      try {
        await CartService.clearCart();
        toast.success("Cart cleared successfully");
      } catch (error: any) {
        const message = errorMessageRetreiver(error);
        toast.error(message);
      }
    } else {
      toast.success("Cart cleared successfully");
    }
    setUpdateCart(Date.now());
  };

  //Clear wishlist
  const clearWishlist = async () => {
    localStorage.removeItem("wishlist");

    if (state?.isAuthenticated) {
      try {
        await WishlistService.clearWishlist();
        toast.success("Wishlist cleared successfully");
      } catch (error: any) {
        const message = errorMessageRetreiver(error);
        toast.error(message);
      }
    } else {
      toast.success("Wishlist cleared successfully");
    }
    setUpdateWishList(Date.now());
  };

  useEffect(() => {
    // Retrive cart in local storage
    const tempCart = localStorage.getItem("cart");
    const cart = tempCart ? JSON.parse(tempCart) : [];
    // Retrive wishlist in local storage
    const tempWishlist = localStorage.getItem("wishlist");
    const wishlist = tempWishlist ? JSON.parse(tempWishlist) : [];
    // Retrive wishlistIdsfrom wishlist
    const wishlistIds = wishlist.map((ar: any) => ({
      productId: ar.productId,
    }));

    if (state?.isAuthenticated) {
      const fetchCartItems = async () => {
        try {
          const { status, data: data } = await CartService.getCart();
          if (status === 200) {
            setCartProducts(data.data.cartItem);
          }
        } catch (error) {
          console.log(error);
        }
      };
      const syncCartItems = async () => {
        const credential = {
          items: cart,
        };
        try {
          await CartService.syncUserCart(credential);
        } catch (error) {
          console.log(error);
        }
      };
      const syncWishlistItems = async () => {
        const credential = {
          items: wishlistIds,
        };
        try {
          await WishlistService.syncUserWishlist(credential);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCartItems();
      syncCartItems();
      syncWishlistItems();
    } else {
      setCartItems(cart);
    }
  }, [state]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { status, data: data } = await ProductService.getProducts();
        if (status === 200) {
          setProducts(data.data.products);
        }
      } catch (error) {
        const message = errorMessageRetreiver(error);
        console.log(message);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        updateCart,
        setUpdateCart,
        updateWishlist,
        setUpdateWishList,
        handleIncrementUnit,
        handleDecrementUnit,
        handleAddToCart,
        removeFromCart,
        handleToggleWishlist,
        cartItems,
        removeFromWishlist,
        clearWishlist,
        clearCart,
        unit,
        cartProducts,
      }}
    >
      <div>
        <header>
          <ShopNavbar
            setIsModalOpen={setIsModalOpen}
            updateCart={updateCart}
            updateWishlist={updateWishlist}
          />
        </header>
        <main>
          <Outlet />
        </main>

        <BackDrop isOpen={isModalOpen} handleClose={handleModalClose}>
          <RequestProductForm />
        </BackDrop>
      </div>
    </ShopContext.Provider>
  );
};

export default ShopLayout;
