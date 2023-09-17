import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import Meta from "../components/Meta";

const HomePage = () => {
  return (
    <div>
      <Meta title="Home" />
      <Header activeHeading={1} activeItem={"home"} />
      <Hero />
      <Categories />
      <BestDeals />
      <section class="py-10">
        <div class="container mx-auto">
          <h1 class="text-3xl font-semibold text-gray-800 mb-6">
            Popular Products
          </h1>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://res.cloudinary.com/bramuels/image/upload/v1690619857/products/ncexczvd9hqllvdnh5ke.jpg"
                alt="Product 1"
                class="w-full h-48 object-cover object-center"
              />
              <div class="p-4">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">
                  Product Name 1
                </h2>
                <p class="text-gray-600">$99.99</p>
                <a
                  href="#"
                  class="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </a>
              </div>
            </div>

            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://res.cloudinary.com/bramuels/image/upload/v1690619857/products/ncexczvd9hqllvdnh5ke.jpg"
                alt="Product 2"
                class="w-full h-48 object-cover object-center"
              />
              <div class="p-4">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">
                  Product Name 2
                </h2>
                <p class="text-gray-600">$79.99</p>
                <a
                  href="#"
                  class="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-10">
        <div class="container mx-auto">
          <h1 class="text-3xl font-semibold text-gray-800 mb-6">
            Popular Products
          </h1>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://res.cloudinary.com/bramuels/image/upload/v1690619857/products/ncexczvd9hqllvdnh5ke.jpg"
                alt="Product 1"
                class="w-full h-48 object-cover object-center"
              />
              <div class="p-4">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">
                  Product Name 1
                </h2>
                <p class="text-gray-600">$99.99</p>
                <ul class="mt-2">
                  <li class="text-gray-600">Feature 1: Lorem ipsum</li>
                  <li class="text-gray-600">Feature 2: Dolor sit amet</li>
                  <li class="text-gray-600">
                    Feature 3: Consectetur adipiscing elit
                  </li>
                </ul>
                <div class="mt-3">
                  <p class="text-gray-600">Sale Ends In:</p>
                  <div
                    id="countdown-timer-1"
                    class="text-xl font-semibold text-blue-600"
                  ></div>
                </div>
                <a
                  href="#"
                  class="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </a>
              </div>
            </div>

            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="https://res.cloudinary.com/bramuels/image/upload/v1690619857/products/ncexczvd9hqllvdnh5ke.jpg"
                alt="Product 2"
                class="w-full h-48 object-cover object-center"
              />
              <div class="p-4">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">
                  Product Name 2
                </h2>
                <p class="text-gray-600">$79.99</p>
                <ul class="mt-2">
                  <li class="text-gray-600">Feature 1: Lorem ipsum</li>
                  <li class="text-gray-600">Feature 2: Dolor sit amet</li>
                  <li class="text-gray-600">
                    Feature 3: Consectetur adipiscing elit
                  </li>
                </ul>
                <div class="mt-3">
                  <p class="text-gray-600">Sale Ends In:</p>
                  <div
                    id="countdown-timer-2"
                    class="text-xl font-semibold text-blue-600"
                  ></div>
                </div>
                <a
                  href="#"
                  class="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Events /> */}
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
