import React, { useEffect, useState } from "react";
import Lee from "../../../lib/Lee";
import DelayLink from "../../../lib/DelayLink";
import ProductsListItem from "./ProductsListItem/ProductsListItem";

import "./ProductsList.scss";

const ProductsList = (props: any) => {
  const products: any = props.products;

  return (
    <div className="products-list parents" id="ProductsList">
      <div className="products-list__contents parents">
        {products.length > 0 ? (
          <>
            <ul className="products-list__contents__lists parents">
              {products.map((product: any, index: number) => {
                return (
                  <ProductsListItem
                    key={`product-${index}`}
                    thumbnail={product.thumbnail}
                    paragraph={product.paragraph}
                    title={product.title}
                    price={product.price}
                    start_date={product.start_date}
                    end_date={product.end_date}
                    trader_name={product.trader_name}
                    trader_avatar={product.trader_avatar}
                  />
                );
              })}
            </ul>
          </>
        ) : (
          <div className="products-list__contents__none parents">
            <div className="products-list__contents__none__title">
              등록된 패키지가 없습니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
