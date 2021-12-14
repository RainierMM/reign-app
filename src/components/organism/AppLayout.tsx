import { FC, useState } from "react";
import { Hits } from "../../types/DataTypes";
import "./organism.css";
import GridContainer from "../molecules/GridContainer";
import Pagination from "../molecules/Pagination";
import Select from "../atoms/Select";
import Button from "../atoms/Button";
import Header from "../molecules/Header";

interface AppLayoutProps {
  data: Hits[];
  page: number;
  maxPage: number;
  changePageNumber: (num: number) => void;
  changeQuery: (str: string) => void;
}

const AppLayout: FC<AppLayoutProps> = ({
  data,
  page,
  maxPage,
  changePageNumber,
  changeQuery,
}) => {
  const [news, setNews] = useState<string>("All");

  const changeSetNews = (str: string) => {
    setNews(str);
  };

  return (
    <div className="app-layout">
      {/* HEADER */}
      <Header />

      {/* BUTTONS */}
      <Button news={news} changeSetNews={changeSetNews} />

      {/* SELECT */}
      <Select changeQuery={changeQuery} />

      {/* GRID */}
      <GridContainer data={data} news={news} />

      {/* Pagination */}
      <Pagination
        page={page}
        maxPage={maxPage}
        changePageNumber={changePageNumber}
      />
    </div>
  );
};

export default AppLayout;
