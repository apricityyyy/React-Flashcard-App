import React from "react";
import img from "../assets/images/page-not-found-img.webp";
import "./NoMatchRoute.css";

export default function NoMatchRoute() {
  return <img className="not-found" src={img} alt="page-not-found-img" />;
}