import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./styles/fonts.scss";
import { BrowserRouter, Switch } from "react-router-dom";
import "./styles/global.scss";
import "./styles/variables.scss";
import VideoThumbnail from "./components/Shared/VideoThumbnail/VideoThumbnail";
import PublicRoutes from "./PublicRoutes";
import Layout from "./components/Shared/Layout/Layout";
import axios from "axios";
import { fetchPopularVideos } from "./redux/videos-popular/videos-popular-actions";
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
            <PublicRoutes />
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
