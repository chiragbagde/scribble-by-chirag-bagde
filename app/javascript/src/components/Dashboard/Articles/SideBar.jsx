import React, { useState, useEffect } from "react";

import { Search, Plus } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui";
import { MenuBar } from "@bigbinary/neetoui/layouts";

import ArticlesApi from "apis/articles";
import CategoriesApi from "apis/categories";
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
        } = await ArticlesApi.filter_status({ status: menu });
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
      } = await ArticlesApi.filter_by_category({
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
      } = await CategoriesApi.list();
      setCategories(categories);
      setFilteredItems(categories);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const query = searchTerm;
    let updatedCategoryList = [...categories];
    updatedCategoryList = categories.filter(
      category =>
        category.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    searchTerm === ""
      ? setFilteredItems(categories)
      : setFilteredItems(updatedCategoryList);
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
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onCollapse={() => setIsSearchCollapsed(true)}
        onKeyDown={handleSearch}
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
        />
      ))}
    </MenuBar>
  );
};

export default SideBar;
