"use client";

import { useState, useEffect } from "react";
import UserPromptCard from "../UserPromptCard/UserPromptCard";

const PromptCardList = ({ userData, handleTagClick }) => {
  return (
    <div className="flex justify-start gap-8 w-full flex-wrap">
      {userData.map((data) => (
        <UserPromptCard
          key={data._id}
          data={data}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const HomeFeed = () => {
  const [searchText, setSearchText] = useState("");
  const [userPrompts, setUserPrompts] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchUserPost = async () => {
    const resp = await fetch("/api/prompt");
    const respData = await resp.json();
    setUserPrompts(respData);
  };

  useEffect(() => {
    fetchUserPost();
  }, []);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return userPrompts.filter(
      (prompt) =>
        regex.test(prompt.creator.username) ||
        regex.test(prompt.prompt) ||
        regex.test(prompt.tag)
    );
  };
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagname) => {
    setSearchText(tagname);
    const searchResult = filterPrompts(tagname);
    setSearchedResults(searchResult);
  };

  return (
    <section className="p-8">
      <form className=" w-full flex-center mb-8 ">
        <input
          type="text"
          placeholder="Search for a username or tag"
          value={searchText}
          onChange={handleSearch}
          className="search_input"
        />
      </form>
      <h1 className=" text-4xl mb-6 font-extrabold  blue_gradient">Feeds</h1>
      {searchText ? (
        <PromptCardList
          userData={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          userData={userPrompts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default HomeFeed;
