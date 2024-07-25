import React from "react";
import Image from "next/image";
import paytmimage from "../public/Designer.png";

const Quote = () => {
  return (
    <div className="flex justify-center h-screen">
      <Image src={paytmimage} alt="Paytm"></Image>
    </div>
  );
};

export default Quote;
