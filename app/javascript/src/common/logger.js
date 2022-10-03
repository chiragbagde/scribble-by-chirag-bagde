export const initializeLogger = () => {
    const Logger = require("js-logger");
    Logger.useDefaults();
    if (process.env.RAILS_ENV === "production") {
      Logger.setLevel(Logger.OFF);
    }
  };
  