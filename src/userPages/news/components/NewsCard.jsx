import React from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router";

const NewsCard = ({ item,time,views}) => {
  
  return (
    <Link to={`/news/${item.id}`}>
      <div  className="w-[360px] border border-gray-300 bg-white dark:bg-[#212121] dark:border-0 shadow-lg rounded-2xl p-4 cursor-pointer">
        <img src="https://ik.imagekit.io/l1q0yhfbyy/newsimg.png?updatedAt=1746445046795" className="rounded-2xl mb-2" width={360} alt="" />
        <div className="flex justify-between items-center mb-2">
          <p className="text-[#014DF5]">{time}</p>
          <div className="flex items-center">
            <Eye size={16} />
            <p className="text-[#5A5A5A] pl-2">{views}</p>
          </div>
        </div>
        <h1 className="font-bold text-[20px] mb-1">{item.title}</h1>
        <p className="text-[#5A5A5A] line-clamp-3">{item.text}</p>
      </div>
    </Link>
  );
};

export default NewsCard;
