import { FC, useEffect, useState } from "react";
import { Hits } from "../../types/DataTypes";
import fullTime from "../../assets/iconmonstr-time-full.svg";
import outlineHeart from "../../assets/iconmonstr-favorite-outline.svg";
import fullHeart from "../../assets/iconmonstr-favorite-3.svg";
import * as timeago from "timeago.js";
import "./molecules.css";

interface GridContainerProps {
  data: Hits[];
  news: string;
}

const GridContainer: FC<GridContainerProps> = ({ data, news }) => {
  const localStorageData = localStorage.dataFav;

  const initialData = localStorageData
    ? new Map<string, Hits>(JSON.parse(localStorageData))
    : new Map<string, Hits>();

  const [dataFav, setDataFav] = useState<Map<string, Hits>>(initialData);

  const openLink = (link: string) => {
    window.open(link, "_blank");
  };

  const likeHit = (el: Hits) => {
    const newDataMap = new Map(dataFav);
    const exist = newDataMap.get(el.objectID);

    if (exist) {
      newDataMap.delete(el.objectID);
    } else {
      newDataMap.set(el.objectID, el);
    }

    setDataFav(newDataMap);
  };

  useEffect(() => {
    localStorage.dataFav = JSON.stringify(Array.from(dataFav.entries()));
  }, [dataFav]);

  return (
    <>
      {/* GRID */}
      <div className="grid-container">
        {news === "All" && data && data.length > 0
          ? data.map((el, idx) => (
              <div key={idx} className="card-container">
                <div
                  className="card-time-title"
                  onClick={() => openLink(el.story_url)}
                >
                  <div className="card-time">
                    <img src={fullTime} sizes="16px" alt="" />
                    {`${timeago.format(el.created_at)} by ${el.author}`}
                  </div>
                  <div className="card-title">{el.story_title}</div>
                </div>
                <div className="card-heart">
                  {dataFav.get(el.objectID) ? (
                    <img
                      className="like-heart"
                      src={fullHeart}
                      alt=""
                      onClick={() => likeHit(el)}
                    />
                  ) : (
                    <img
                      className="like-heart"
                      src={outlineHeart}
                      alt=""
                      onClick={() => likeHit(el)}
                    />
                  )}
                </div>
              </div>
            ))
          : null}
        {news === "Favs" &&
        Array.from(dataFav.values()) &&
        Array.from(dataFav.values()).length > 0 ? (
          Array.from(dataFav.values()).map((el, idx) => (
            <div key={idx} className="card-container">
              <div
                className="card-time-title"
                onClick={() => openLink(el.story_url)}
              >
                <div className="card-time">
                  <img src={fullTime} sizes="16px" alt="" />
                  {`${timeago.format(el.created_at)} by ${el.author}`}
                </div>
                <div className="card-title">{el.story_title}</div>
              </div>
              <div className="card-heart">
                {dataFav.get(el.objectID) ? (
                  <img
                    className="like-heart"
                    src={fullHeart}
                    alt=""
                    onClick={() => likeHit(el)}
                  />
                ) : (
                  <img
                    className="like-heart"
                    src={outlineHeart}
                    alt=""
                    onClick={() => likeHit(el)}
                  />
                )}
              </div>
            </div>
          ))
        ) : news === "Favs" ? (
          <div className="no-favorites-container">
            <img src={outlineHeart} alt="" />
            <h3 className="no-favorites-yet">No favorites yet {":("}</h3>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GridContainer;
