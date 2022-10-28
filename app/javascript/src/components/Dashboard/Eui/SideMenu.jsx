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
  const [slug, setSlug] = useState("");
  const [active, setActive] = useState(null);
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const handleClick = ({ slug, title, description, created_at }, category) => {
    setTitle(title);
    setDescription(description);
    setCreatedAt(created_at);
    setActive(title);
    setCategory(category);
    setSlug(slug);
    history.push(`/public/${category}/${slug}`);
  };

  const params = useParams();
  const [paramsCategory, paramsSlug] = params[0].split("/");

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await CategoriesApi.list();
      setCategories(categories.sort((a, b) => (a.order > b.order ? 1 : -1)));
      setLoading(false);
      if (params[0] === "") {
        history.push(
          `/public/${categories[0].category}/${categories[0]["assigned_articles"][0]["slug"]}`
        );
      }
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
      const categoryData = categories.filter(
        ({ category }) => category === paramsCategory
      );
      const paramsArticle = categoryData[0].assigned_articles.filter(
        ({ slug }) => slug === paramsSlug
      )[0];
      setTitle(paramsArticle.title);
      setSlug(paramsArticle.slug);
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
                  ({ slug, title, description, created_at }, idx) =>
                    slug && (
                      <MenuItem
                        className={`${active === title && "text-indigo-600"}`}
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
