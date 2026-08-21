import React from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import { ExternalLink } from "neetoicons";

const NoArticle = ({ history }) => (
  <>
    <div className="h-32 w-32">
      <div className="left-1 sticky bottom-0 mr-12 h-16 w-16">
        <Button
          icon={ExternalLink}
          label="Articles"
          style="secondary"
          tooltipProps={{
            content: "Go To article",
            position: "bottom",
          }}
          onClick={() => history.push("/")}
        />
      </div>
    </div>
    <div className="flex h-screen w-screen flex-row  justify-center">
      <Typography style="h1">No articles present</Typography>
    </div>
  </>
);

export default NoArticle;
