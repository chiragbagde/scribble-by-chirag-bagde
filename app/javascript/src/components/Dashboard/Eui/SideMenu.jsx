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

const SideMenu = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [active, setActive] = useState(null);
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleClick = ({ slug, title, description, created_at }, category) => {
    setTitle(title);
    setDescription(description);
    setCreatedAt(created_at);
    setActive(slug);
    setCategory(category);
    setSlug(slug);
    history.push(`/public/${category}/${slug}`);
  };

  const params = useParams();
  const [paramsCategory, paramsSlug] = params[0].split("/");

  const findFirstNonNullArgument = (...args) =>
    args
      .filter(({ articles }) => articles.length > 0)
      .filter(({ slug }) => slug !== null)[0];

  const firstArticleDetails = categories => {
    if (params[0] === "") {
      const category = findFirstNonNullArgument(...categories);
      history.push(
        `/public/${category.category}/${category["articles"][0]["slug"]}`
      );
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
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
      const paramsArticle = categoryData[0].articles.filter(
        ({ slug }) => slug === paramsSlug
      )[0];
      setTitle(paramsArticle.title);
      setSlug(paramsArticle.slug);
      setDescription(paramsArticle.description);
      setCreatedAt(paramsArticle.created_at);
      setCategory(categoryData[0]["category"]);
      setActive(paramsArticle.slug);
    }
  }, [categories, paramsCategory, paramsSlug, loading]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
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
                  ({ slug, title, description, created_at }, idx) =>
                    slug && (
                      <MenuItem
                        className={`${active === slug && "text-indigo-600"}`}
                        key={idx}
                        active={
                          category["category"] === paramsCategory &&
                          title === paramsSlug
                        }
                        onClick={() =>
                          handleClick(
                            { slug, title, description, created_at },
                            category["category"]
                          )
                        }
                      >
                        {title}
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
            path={`/public/${category}/${slug}`}
            render={props => (
              <Detail
                {...props}
                category={category}
                created_at={createdAt}
                description={description}
                history={history}
                title={title}
              />
            )}
          />
        </Switch>
      </div>
    </ProSidebarProvider>
  );
};

export default SideMenu;
