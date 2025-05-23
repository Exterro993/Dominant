import { Link, Route, Routes } from "react-router";
import Main from "../userPages/main/Main";
import React from 'react'
import ServicesComponent from "../userPages/services/ServicesComponent";
import AutoPark from "../userPages/autopark/AutoPark";
import Labourers from "../userPages/labourers/Labourers";
import LabourersCard from "../userPages/labourers/components/LabourersCard";
import Vacancies from "../userPages/vacancies/Vacancies.jsx";
import About from "../userPages/About/About";
import CompanyNews from "../userPages/news/CompanyNews";
import More from "../userPages/more/More";
import NewsDetail from "../userPages/news/components/NewsDetail";
import Contacts from "../userPages/contacts/Contacts";

export const route = [
  {
    component: <Main />,
    path: "/",
    name: "Главная страница",
  },
  {
    component: <ServicesComponent/>,
    path: "/services",
    name: "Услуги",
  },
  {
    component: <AutoPark/>,
    path: "/AutoPark",
    name: "Автопарк",
  },
  {
    component: <Labourers/>,
    path: "/labourers",
    name: "Разнорабочие",
  },
  {
    component: <LabourersCard/>,
    path: "/labourers/:id",
    name: "LabourersCard",
  },
  {
    component: <Vacancies/>,
    path: "/vacancies",
    name: "Вакансии",
  },
  {
    component: <About/>,
    path: "/about",
    name: "О компании",
  },
  {
    component: <CompanyNews asBlock={false}/>,
    path: "/news",
    name: "Новости",
  },
  {
    component: <NewsDetail/>,
    path: "/news/:id",
    name: "newsCard",
  },
  {
    // component: <NewsDetail/>,
    path: "/services/:id",
    name: "servicesCard",
  },
  {
    component: <Contacts/>,
    path: "/contacts",
    name: "Контакты",
  },
  {
    component: <More/>,
    path: "*",
    name: "Ещё",
  },
];
export const MakeRoute = () => {
  return <Routes>
{    route.map((elem) => (
      <Route path={elem.path} element={elem.component} key={elem.path} />
    ))}
  </Routes>
  
};
export const MakeNavbarRoute = () => {
  return route
    .filter((elem) => elem.name !== "404" && elem.name !== "Главная страница" && elem.name !== "newsCard" && elem.name !== "servicesCard" && elem.name !== "LabourersCard")
    .map((elem) => (
      <li key={elem.path} className="hover:text-[##050505] hover:font-bold font-medium duration-700 transition-colors ">
        <Link to={elem.path}>{elem.name}</Link>
      </li>
    ));
};

export const MakeNavbarRouteFooter = () => {
  const routesToShow = route
    .filter(elem => elem.name !== "404" && elem.name !== "Главная страница")
    .slice(0, 5);
 
  return routesToShow.map((elem) => (
    <li key={elem.path}>
      <Link to={elem.path}>{elem.name}</Link>
    </li>
  ));
};