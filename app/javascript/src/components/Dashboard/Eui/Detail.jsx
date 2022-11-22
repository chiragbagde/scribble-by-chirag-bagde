import React from "react";

import { ExternalLink } from "neetoicons";
import { Button, Tag, Typography } from "neetoui";
import { Container } from "neetoui/layouts";

import { formatDateAndTime } from "../Articles/utils";

const Detail = ({ activeArticle, category, history }) => {
  const handleClick = () => {
    history.push("/");
  };

  return (
    <>
      <Container className="mx-10">
        <Typography className="my-5" style="h1">
          {activeArticle.title}
        </Typography>
        {activeArticle.title && (
          <span className="my-3 flex">
            {" "}
            <Tag label={category} />{" "}
            <span className="mx-2 text-gray-600">
              {formatDateAndTime(activeArticle.created_at)}
            </span>
          </span>
        )}
        <p>{activeArticle.description}</p>
      </Container>
      <div className="h-32 w-32">
        <div className="right-1 sticky bottom-0 mr-12 h-16 w-16">
          <Button
            icon={ExternalLink}
            label="Articles"
            style="secondary"
            tooltipProps={{
              content: "Go To article",
              position: "bottom",
            }}
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default Detail;
