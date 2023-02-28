import React, { useEffect, useState } from "react";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebarProvider,
} from "react-pro-sidebar";
import { Switch, Route, useParams } from "react-router-dom";

import categoriesApi from "apis/categories";
import PageLoader from "components/PageLoader";

import Detail from "./Detail";
import NoArticle from "./NoArticle";

const SideMenu = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState([]);
  const [active, setActive] = useState(null);
  const [activeArticle, setActiveArticle] = useState([]);

  const handleClick = (article, category) => {
    setActive(article.slug);
    setActiveArticle(activeArticle);
    history.push(`/public/${category}/${article.slug}`);
  };

  const params = useParams();
  const [paramsCategory, paramsSlug] = params[0].split("/");

  const findFirstNonNullArgument = (...args) => {
    args = args.filter(({ articles }) => articles.length > 0);

    args = args.map(({ articles, category }) => {
      articles = articles.filter(({ slug }) => slug !== null);

      return [articles, category];
    });

    return args.filter(arg => arg[0].length > 0)[0];
  };

  const firstArticleDetails = categories => {
    if (params[0] === "") {
      const category = findFirstNonNullArgument(...categories);
      if (category) {
        history.push(`/public/${category[1]}/${category[0][0]["slug"]}`);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();

      const updatedCategories = categories.filter(
        ({ articles }) => articles.length >= 1
      );
      setCategories(updatedCategories);
      setLoading(false);
      firstArticleDetails(categories);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !loading) {
      firstArticleDetails(categories);
      const categoryData = categories.filter(
        ({ category }) => category === paramsCategory
      );
      if (categoryData.length) {
        const paramsArticle = categoryData[0].articles.filter(
          ({ slug }) => slug === paramsSlug
        )[0];
        setActiveArticle(paramsArticle);
        setCategory(categoryData[0]["category"]);
        setActive(paramsArticle.slug);
      }
    }
  }, [categories, paramsCategory, paramsSlug, loading]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return paramsSlug ? (
    <ProSidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <Menu>
            {categories.map((category, idx) => (
              <SubMenu
                defaultOpen={category["category"] === paramsCategory}
                key={idx}
                label={category["category"]}
              >
                {category["articles"].map(
                  (article, idx) =>
                    article.slug && (
                      <MenuItem
                        key={idx}
                        active={
                          category["category"] === paramsCategory &&
                          article.title === paramsSlug
                        }
                        className={`${
                          active === article.slug && "text-indigo-600"
                        }`}
                        onClick={() =>
                          handleClick(article, category["category"])
                        }
                      >
                        {article.title}
                      </MenuItem>
                    )
                )}
              </SubMenu>
            ))}
          </Menu>
        </Sidebar>
        <Switch>
          <Route
            exact
            path={`/public/${category}/${activeArticle.slug}`}
            render={() => (
              <Detail
                activeArticle={activeArticle}
                category={category}
                history={history}
              />
            )}
          />
        </Switch>
      </div>
    </ProSidebarProvider>
  ) : (
    <NoArticle history={history} />
  );
};

export default SideMenu;
