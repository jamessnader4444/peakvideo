import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDeepCompareEffect } from "@fuse/hooks";
import axios from "axios";
import FusePageSimple from "@fuse/core/FusePageSimple/FusePageSimple";

export default function Product() {
  const [product, setProduct] = useState(null);
  const routeParams = useParams();
  const navigate = useNavigate();
  const { type, id, name } = routeParams;

  const getProduct = async () => {
    const res = await axios.post("api/products/get", { id });
    setProduct(res.data);
  };
  const handleNextRandomVideo = async () => {
    const res = await axios.post("api/products/getNextRandomVideo", {
      categoryId: product.categoryId,
      id,
    });
    navigate(`/products/0/${name}/${res.data}`);
  };
  useDeepCompareEffect(() => {
    getProduct();
  }, [routeParams]);

  return (
    <FusePageSimple
      header={
        <div className="flex flex-col sm:flex-row my-20 h-150 items-center px-20 sm:px-60">
          <div className="flex flex-col flex-1">
            <div className="font-bold text-[30px] text-center sm:text-left truncate w-200 md:w-[500px]">
              {product?.name}
            </div>
            <div className="text-[26px] text-center sm:text-left font-bold">
              {product?.username}
            </div>
          </div>
          <img
            className="w-full sm:w-[300px] rounded-lg h-[200px]"
            src={`${process.env.REACT_APP_UPLOAD_URL}/${product?.imageURL}`}
            alt=""
          />
        </div>
      }
      content={
        <div className="px-20 w-full mb-32 sm:px-60">
          {product && (
            <>
              <div>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className="sm:h-[500px] h-[300px]"
                    src={`${process.env.REACT_APP_UPLOAD_URL}/${product?.videoURL}`}
                    width="100%"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="text-center text-[20px] my-10 truncate">
                  {product.description}
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                  <Button
                    onClick={(e) => navigate(-1)}
                    className="p-12 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white mb-10"
                    role="button"
                  >
                    Back to Last Page
                  </Button>
                  {type === "category" && (
                    <button
                      className="p-12 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white mb-10"
                      onClick={handleNextRandomVideo}
                    >
                      Next Random Video
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      }
    ></FusePageSimple>
  );
}
