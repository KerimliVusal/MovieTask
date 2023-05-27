import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "antd";
import { StarIcon } from '../../components/icon/index'
import "../detail/detail.scss";

function DetailPage() {
  const { id, type } = useParams();
  const [CurrentMovie, SetCurrentMovie] = useState({});

  useEffect(() => {

    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=19d5dcc0918f5300be53acc029f125ef&language=en-US`
      )
      .then((res) => res.data)
      .then((res) => SetCurrentMovie(res));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="Detailcontainer">
      {CurrentMovie && (
        <div >
          <Row className="Detail-Background">
            <img
              src={
                CurrentMovie.backdrop_path &&
                `https://image.tmdb.org/t/p/original/${CurrentMovie.backdrop_path}`
              }
              alt=""
            />
            <Col xs={24} sm={24} md={24} lg={11} className="Detail-title">
              <p>{type == 'movie' ? CurrentMovie.title : CurrentMovie.name}/{type}</p>
              <h1>{type == 'movie' ? CurrentMovie.title : CurrentMovie.name}</h1>
            </Col>
          </Row>

          <Row
            className="Details-more"
            justify="center"
            gutter={[{ xs: 0, sm: 0, md: 20, lg: 30 }, 34]}
          >
            <Col xs={24} md={12} lg={10}>
              <div className="Detail-img">
                <img
                  src={
                    CurrentMovie.poster_path &&
                    `https://image.tmdb.org/t/p/original/${CurrentMovie.poster_path}`
                  }
                  alt=""
                />
              </div>
            </Col>
            <Col xs={24} md={12} lg={{ span: 11, push: 1 }}>
              <div className="Detail-text">
                <h2 style={{ color: 'white' }}>{CurrentMovie.tagline}</h2>
                <p className="overview">{CurrentMovie.overview}</p>

                <div className="icon_row">
                  <span className="star">
                    <StarIcon width='24px' height='24px' fill='gold' />
                    {CurrentMovie.vote_average} ({CurrentMovie.vote_count} vote)
                  </span>

                </div>

                <ul className="DetailUl">


                  {type == 'tv' ? <div className="tvdetails">
                    <div>
                      <li><p>Type:</p><h3>{type}</h3></li>
                      <li><p>First air date</p>
                        <h3>{CurrentMovie.first_air_date}</h3>
                      </li>
                      <li><p>Number of Season</p>
                        <h3>{CurrentMovie.number_of_seasons}</h3>
                      </li>
                      <li><p>Episode run time</p>
                        <h3>{CurrentMovie.episode_run_time}</h3>
                      </li>
                      <li><p>Status</p>
                        <h3>{CurrentMovie.status}</h3>
                      </li>
                    </div>
                    <div>
                      <li><p>Last air date</p>
                        <h3>{CurrentMovie.last_air_date}</h3>

                      </li>
                      <li>
                        <p>Production Companies:</p>
                        <h3>
                          {CurrentMovie.production_companies &&
                            CurrentMovie.production_companies.map(
                              (company, index) => (
                                <span key={index}>
                                  {index > 0 ? " , " : ""}
                                  {company.name}
                                </span>
                              )
                            )}
                        </h3>
                      </li>

                      <li>
                        <p>Release Date:</p>
                        <h3> {CurrentMovie.first_air_date}</h3>
                      </li>
                      <li>
                        <p>Number of episodes:</p>
                        <h3> {CurrentMovie.number_of_episodes} min</h3>
                      </li>

                      <li>
                        <p>Genres:</p>
                        <h3>
                          {CurrentMovie.genres &&
                            CurrentMovie.genres.map((genre, index) => (
                              <span key={index}>
                                {index > 0 ? " , " : ""}
                                {genre.name}
                              </span>
                            ))}
                        </h3>
                      </li>
                    </div>
                  </div>
                    : <div className="moviedetails">
                      <li><p>Type:</p><h3>{type}</h3></li>
                      <li>
                        <p>Production Companies:</p>
                        <h3>
                          {CurrentMovie.production_companies &&
                            CurrentMovie.production_companies.map(
                              (company, index) => (
                                <span key={index}>
                                  {index > 0 ? " , " : ""}
                                  {company.name}
                                </span>
                              )
                            )}
                        </h3>
                      </li>

                      <li>
                        <p>Release Date:</p>
                        <h3> {CurrentMovie.release_date}</h3>
                      </li>
                      <li>
                        <p>Run time:</p>
                        <h3> {CurrentMovie.runtime} min</h3>
                      </li>

                      <li>
                        <p>Genres:</p>
                        <h3>
                          {CurrentMovie.genres &&
                            CurrentMovie.genres.map((genre, index) => (
                              <span key={index}>
                                {index > 0 ? " , " : ""}
                                {genre.name}
                              </span>
                            ))}
                        </h3>
                      </li>

                    </div>}

                </ul>
              </div>
            </Col>
          </Row>


        </div>
      )}
    </div>
  );
}

export default DetailPage;