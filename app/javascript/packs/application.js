import "../stylesheets/application.scss";

import Rails from "@rails/ujs"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

var componentRequireContext = require.context("src", true);
var ReactRailsUJS = require("react_ujs");

ReactRailsUJS.useContext(componentRequireContext);
