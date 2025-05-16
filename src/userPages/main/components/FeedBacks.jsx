import React, { useEffect, useState } from "react";
import { reviews } from "../../../../fetchers/URL_SERVER";
import { GetData } from "../../../../fetchers/CRUD";
import { toast } from "react-toastify"; // Added import for toast

const FeedBacks = () => {
  const [rates, setRates] = useState([]);
  const [expandedReviews, setExpandedReviews] = useState({});

  useEffect(() => {
    GetData(reviews, handleData);
  }, []);

  const handleData = (data, status) => {
    if (status === 200) {
      setRates(data);
      // console.log(data);
    } else {
      toast.error(`Ошибка загрузки данных: ${status}`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Function to get the first letter of the name
  const getInitial = (name) => {
    return name ? name.charAt(0) : "";
  };

  // Function to truncate text
  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Toggle expanded state for a review
  const toggleExpand = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  // Display only first 2 reviews if data is available
  const displayedReviews = rates?.slice(0, 2) || [];

  return (
    <>
      <section className="w-full px-4 sm:px-6 md:px-8 mb-16 md:mb-32 font-[Manrope]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold sm:text-3xl text-center mb-6 sm:mb-8">
            Отзывы о нас
          </h2>

          {rates ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {displayedReviews.map((review, index) => {
                const isExpanded = expandedReviews[index] || false;
                const reviewText = isExpanded
                  ? review.review
                  : truncateText(review.review);
                const shouldShowButton = review.review.length > 150;

                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-[#014DF5] rounded-lg shadow-md p-4 sm:p-6 flex flex-col"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4">
                      <div className="flex items-center mb-2 sm:mb-0">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl mr-3">
                          {getInitial(review.name)}
                        </div>
                        <div>
                          <h3 className="font-medium">{review.name}</h3>
                          <p className="text-gray-500 text-xs sm:text-sm">
                            {review.city}
                          </p>
                        </div>
                      </div>
                      <div className="ml-0 sm:ml-auto flex text-xl sm:text-2xl mt-1 sm:mt-0">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 flex-grow dark:text-[#FFF]">
                      {reviewText}
                    </p>
                    {shouldShowButton && (
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-blue-500 dark:text-[#FFF] dark:hover:text-blue-400 hover:text-blue-700 mt-2 text-xs sm:text-sm font-medium"
                      >
                        {isExpanded ? "Скрыть" : "Читать полностью"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center py-8">
              <RotateLoader color="#014DF5" />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FeedBacks;
