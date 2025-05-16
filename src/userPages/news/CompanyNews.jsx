import React, { useState, useEffect } from "react";
import NewsCard from "./components/NewsCard";
import NewsDetail from "./components/NewsDetail";
import { Link } from "react-router";
import { GetData } from "../../../fetchers/CRUD";
import { newsUrl } from "../../../fetchers/URL_SERVER";

const CompanyNews = ({ asBlock }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedNews, setSelectedNews] = useState();
  const time = new Date().toLocaleDateString();
  const views = 123;
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    GetData(newsUrl, handleData);
  }, []);

  const handleData = (data, status) => {
    if (status === 200) {
      const desiredCount = 27;
      const repeatTimes = Math.ceil(desiredCount / data.length);
      const extended = Array(repeatTimes)
        .fill(data)
        .flat()
        .slice(0, desiredCount);
      setCardData(extended);
    } else {
      console.error("Ошибка загрузки данных:", status);
    }
  };

  /* const generateNewsData = () => {
    return Array(27)
      .fill()
      .map((_, index) => ({
        id: index + 1,
        title: "Такелажные перевозки. Погрузка со стропами",
        text: "Разбираем, собираем мебель. Укажите данную услугу при составлении заявки и грузчики ...",
        fullText:
          "Разбираем, собираем мебель. Укажите данную услугу при составлении заявки и грузчики ... выполнят все необходимые работы. Наши специалисты имеют многолетний опыт такелажных работ и обеспечены всем необходимым инструментом. Мы гарантируем бережное обращение с вашей мебелью и имуществом.",
        date: time,
        views: views,
        image: "newsimg.png",
      }));
  }; */

  console.log(cardData);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(cardData.length / itemsPerPage);
  const paginatedData = cardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const containerClasses = asBlock
    ? "w-full font-sans"
    : "flex flex-col items-center font-sans mt-14 mb-32";

  const gridClasses = asBlock
    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

  const renderPagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`w-10 h-10 flex items-center justify-center ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center mt-8">
        <div className="flex border border-gray-200 rounded overflow-hidden">
          <button
            className="px-4  py-2 bg-white text-gray-600 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Предыд.
          </button>

          {startPage > 1 && (
            <>
              <button
                className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
              {startPage > 2 && (
                <span className="w-10 h-10 flex items-center justify-center bg-white text-gray-600">
                  ...
                </span>
              )}
            </>
          )}

          {pageNumbers}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="w-10 h-10 flex items-center justify-center bg-white text-gray-600">
                  ...
                </span>
              )}
              <button
                className="w-10 h-10 flex items-center justify-center bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className="px-4 py-2 bg-white text-blue-600 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Вперед
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={containerClasses}>
      <div
        className={asBlock ? "w-full" : "w-full max-w-7xl px-4 sm:px-6 lg:px-8"}
      >
        {asBlock && (
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Новости компании</h2>
            <Link to={"/news"} className="text-blue-600 hover:underline">
              Все новости
            </Link>
          </div>
        )}

{asBlock ? (
  <>
    <h2 className="text-lg font-semibold mb-4">Вам может быть интересно:</h2>
    <section className="flex flex-col gap-4">
      {cardData.slice(0, 5).map((item, idx) => (
        <NewsCard key={`${item.id}-${idx}`} item={item} time={time} views={views} />
      ))}
    </section>
  </>
) : (
  <>
    <section className={gridClasses}>
      {paginatedData.map((item, idx) => (
        <NewsCard key={`${item.id}-${idx}`} item={item} time={time} views={views} />
      ))}
    </section>

    {totalPages > 1 && renderPagination()}
  </>
)}
      </div>
    </div>
  );
};

export default CompanyNews;
