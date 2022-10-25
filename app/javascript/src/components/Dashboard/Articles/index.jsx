import React, { useState, useEffect } from "react";

import { Container } from "@bigbinary/neetoui/layouts";

import articlesApi from "apis/articles";
import PageLoader from "components/PageLoader";

import DeleteAlert from "./Article/DeleteAlert";
import Header from "./Header";
import SideBar from "./SideBar";
import Table from "./Table";

const Articles = ({ history }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteSlug, setDeleteSlug] = useState("");
  const [title, setTitle] = useState("");

  const fetchArticles = async () => {
    try {
      const {
        data: { articles },
      } = await articlesApi.list();
      setArticles(articles);
      setFilteredArticles(articles);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSearch = (e, searchTerm) => {
    if (e.key === "Enter") {
      const updatedArticles = articles.filter(
        ({ title }) =>
          title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      );
      searchTerm !== ""
        ? setFilteredArticles(updatedArticles)
        : setFilteredArticles(articles);
    }
  };

  const destroyArticle = async slug => {
    try {
      await articlesApi.destroy(slug);
      await fetchArticles();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = (slug, title) => {
    setDeleteSlug(slug);
    setTitle(title);
    setShowDeleteAlert(true);
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
    <div className="flex h-screen w-full">
      <SideBar />
      <Container>
        <Header
          handleSearch={handleSearch}
          history={history}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Table
          data={filteredArticles}
          handleDelete={handleDelete}
          history={history}
        />
        {showDeleteAlert && articles.length > 1 && (
          <DeleteAlert
            destroyArticle={destroyArticle}
            slug={deleteSlug}
            title={title}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Articles;
