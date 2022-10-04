import React, { useState, useEffect } from "react";

import { Container } from "@bigbinary/neetoui/layouts";

import articlesApi from "apis/articles";
import PageLoader from "components/PageLoader";

import Header from "./Header";
import SideBar from "./SideBar";
import Table from "./Table";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list();
      setArticles(articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <Container>
        <Header />
        <Table data={articles} />
      </Container>
    </div>
  );
};

export default Articles;
