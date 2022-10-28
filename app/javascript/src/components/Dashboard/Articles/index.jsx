import React, { useState, useEffect } from "react";

import { Container } from "neetoui/layouts";

import articlesApi from "apis/articles";
import PageLoader from "components/PageLoader";

import DeleteAlert from "./Article/DeleteAlert";
import { FILTERING_OPTIONS } from "./constants";
import Header from "./Header";
import SideBar from "./SideBar";
import Table from "./Table";

const Articles = ({ history }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState(FILTERING_OPTIONS);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState("");
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

  const destroyArticle = async id => {
    try {
      await articlesApi.destroy(id);
      await fetchArticles();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDelete = (id, title) => {
    setDeleteId(id);
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
      <SideBar
        fetchArticles={fetchArticles}
        filteredArticles={filteredArticles}
        setFilteredArticles={setFilteredArticles}
      />
      <Container>
        <Header
          columns={columns}
          history={history}
          searchTerm={searchTerm}
          setColumns={setColumns}
          setFilteredArticles={setFilteredArticles}
          setSearchTerm={setSearchTerm}
        />
        <Table
          columns={columns}
          data={filteredArticles}
          handleDelete={handleDelete}
          history={history}
        />
        {showDeleteAlert && articles.length > 1 && (
          <DeleteAlert
            destroyArticle={destroyArticle}
            id={deleteId}
            title={title}
            onClose={() => setShowDeleteAlert(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Articles;
