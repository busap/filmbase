import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail: FC = () => {
  //State
  const [detail, setDetail] = useState<any>({});

  //Functions
  const getDetail = async (url: string) => {
    const response = await axios.get(url);
    setDetail(response.data);
  };

  //Hooks
  let params: { type: string; id: string } = useParams();
  let type = params.type.replace(":", "");
  let id = params.id.replace(":", "");

  useEffect(() => {
    getDetail(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=da0e9e70e92a41b0c9ecb97614df3b6e`
    );
  }, []);

  console.log(detail);
  return (
    <>
      <h1>{detail.title ? detail.title : detail.name}</h1>
      <img
        src={
          detail.poster_path
            ? `https://image.tmdb.org/t/p/w500/${detail.poster_path}`
            : `https://via.placeholder.com/300`
        }
        alt={detail.title ? detail.title : detail.name}
        width="300px"
      />
      <p>{detail.overview}</p>
      {/* more ... */}
    </>
  );
};

export default Detail;
