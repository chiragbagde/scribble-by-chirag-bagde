import React, { useEffect, useState } from "react";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  ProSidebarProvider,
} from "react-pro-sidebar";
import { Switch, Route, useParams } from "react-router-dom";

import CategoriesApi from "apis/categories";
import PageLoader from "components/PageLoader";

import Detail from "./Detail";

const SideMenu = ({ history }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState([]);
  const [title, setTitle] = useState("");
  const [active, setActive] = useState(null);
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const params = useParams();
  const [paramsCategory, paramsTitle] = params[0].split("/");

  const handleClick = ({ title, description, created_at }, category) => {
    setTitle(title);
    setDescription(description);
    setCreatedAt(created_at);
    setActive(title);
    setCategory(category);
    history.push(`/public/${category}/${title}`);
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await CategoriesApi.list();
      setCategories(categories.sort((a, b) => (a.order > b.order ? 1 : -1)));
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (params[0] === "") history.push(`/public/General/scribble`);
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      params[0] === "" &&
        history.push(
          `/public/${categories[0]["category"]}/${categories[0].assigned_articles[0].title}`
        );
      const categoryData = categories.filter(
        ({ category }) => category === paramsCategory
      );
      const paramsArticle = categoryData[0].assigned_articles.filter(
        ({ title }) => title === paramsTitle
      )[0];
      setTitle(paramsArticle.title);
      setDescription(paramsArticle.description);
      setCreatedAt(paramsArticle.created_at);
      setCategory(categoryData[0]["category"]);
      setActive(paramsArticle.title);
    }
  }, [categories]);

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
                {category["assigned_articles"].map(
                  ({ title, description, created_at }, idx) => (
                    <MenuItem
                      className={`${active === title && "text-indigo-600"}`}
                      key={idx}
                      active={
                        category["category"] === paramsCategory &&
                        title === paramsTitle
                      }
                      onClick={() =>
                        handleClick(
                          { title, description, created_at },
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
            path={`/public/${category}/${title}`}
            render={props => (
              <Detail
                {...props}
                category={category}
                created_at={createdAt}
                description={description}
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
