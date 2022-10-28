import React, { useState, useEffect } from "react";

import { Search, Plus } from "neetoicons";
import { Typography } from "neetoui";
import { MenuBar } from "neetoui/layouts";

import articlesApi from "apis/articles";
import categoriesApi from "apis/categories";
import PageLoader from "components/PageLoader";

import { MENU_ITEMS } from "./constants";

import CreateCategories from "../Settings/CreateCategories";

const SideBar = ({ setFilteredArticles, fetchArticles }) => {
  const [isSearchCollapsed, setIsSearchCollapsed] = useState(true);
  const [createCategory, setCreateCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [active, setActive] = useState("");

  const handleUpdateStatus = async menu => {
    setActive(menu);
    setSelectedCategories([]);
    try {
      if (menu === "All") {
        await fetchArticles();
      } else {
        const {
          data: { articles },
        } = await articlesApi.filterStatus({ status: menu });
        setFilteredArticles(articles);
      }
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleUpdateCategories = async category => {
    setActive(category);
    try {
      const newSelectedCategories = [
        ...new Set([...selectedCategories, category]),
      ];
      setSelectedCategories(Array.from(newSelectedCategories));
      const {
        data: { articles },
      } = await articlesApi.filterByCategory({
        category: newSelectedCategories,
      });
      setFilteredArticles(articles);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const {
        data: { categories },
      } = await categoriesApi.list();
      setCategories(categories);
      setFilteredItems(categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSearchTerm = async () => {
    try {
      {
        const {
          data: { categories },
        } = await categoriesApi.filter({ category: searchTerm });
        setFilteredItems(categories);
      }
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <MenuBar showMenu title="Articles">
      {MENU_ITEMS.map((menu, idx) => (
        <MenuBar.Block
          className={`${active === menu && "bg-white"}`}
          key={idx}
          label={menu}
          onClick={() => handleUpdateStatus(menu)}
        />
      ))}
      <MenuBar.SubTitle
        iconProps={[
          {
            icon: Plus,
            onClick: () => setCreateCategory(createCategory => !createCategory),
          },
          {
            icon: Search,
            onClick: () =>
              setIsSearchCollapsed(isSearchCollapsed => !isSearchCollapsed),
          },
        ]}
      >
        <Typography
          component="h4"
          style="h5"
          textTransform="uppercase"
          weight="bold"
        >
          CATEGORIES
        </Typography>
      </MenuBar.SubTitle>
      <MenuBar.Search
        collapse={isSearchCollapsed}
        placeholder="Search and press Enter"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onCollapse={() => setIsSearchCollapsed(true)}
        onKeyDown={handleSearchTerm}
      />
      {setCreateCategory && (
        <CreateCategories
          createCategory={createCategory}
          fetchCategories={fetchCategories}
          length={categories.length}
          setCreateCategory={setCreateCategory}
        />
      )}
      {(isSearchCollapsed ? categories : filteredItems).map((category, idx) => (
        <MenuBar.Block
          key={idx}
          label={category.category}
          className={`${
            selectedCategories.includes(category.category) && "bg-white"
          }`}
          onClick={() => handleUpdateCategories(category.category)}
          // DblClick={}
        />
      ))}
    </MenuBar>
  );
};

export default SideBar;
