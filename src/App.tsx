import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AppLayout from "./components/organism/AppLayout";
import { Hits, ResponseObject } from "./types/DataTypes";

function App() {
  const localStoragePage = localStorage.pageNumber;

  const initialPage = localStoragePage ? JSON.parse(localStoragePage) : 1;

  const [apiItems, setApiItems] = useState<Hits[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [query, setQuery] = useState<string>("reactjs");
  const [maxPage, setMaxPage] = useState<number>(0);

  const changePageNumber = (num: number) => {
    setPage(num);
  };

  const changeQuery = (str: string) => {
    setQuery(str);
  };

  const apiFetch = useCallback(async () => {
    try {
      const { data } = await axios.get<ResponseObject>(
        `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`
      );

      setMaxPage(data.nbPages);

      if (data) {
        const cleanData = data.hits.filter(
          ({ story_title, story_url, created_at, ...rest }) => {
            if (!story_title || !story_url || !created_at) {
              return false;
            }
            return { story_title, story_url, created_at, ...rest };
          }
        );

        setApiItems(cleanData);
      }
    } catch (e) {
      console.log("Up! I did it again");
    }
  }, [page, query]);

  useEffect(() => {
    apiFetch();
  }, [page, apiFetch, query]);

  return (
    <AppLayout
      data={apiItems}
      page={page}
      changePageNumber={changePageNumber}
      changeQuery={changeQuery}
      maxPage={maxPage}
    />
  );
}

export default App;
