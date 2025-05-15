import React from 'react'
import Row from '../Row/Row'
import requests from '../../../utils/requests';

function RowList() {
  return (
    <>
      <Row
        title="NetFlix Orginals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow={true}
      />

      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rating" fetchUrl={requests.fetchTopRatedMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Commedy movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Romantics movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Horror movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Documentary movies" fetchUrl={requests.fetchDocumentaries} />
    </>
  );
}

export default RowList;