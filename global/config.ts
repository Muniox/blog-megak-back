import path from 'path';
import dotenv from 'dotenv';

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    NODE_ENV: string;
    PORT: number | undefined;
    ADDRESS: string | undefined;
    DBHOST: string | undefined;
    DBPORT: number | undefined;
    DBNAME: string | undefined;
    DBPASSWORD: string | undefined;
    DBUSER: string | undefined;
    SECRET: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: number;
    ADDRESS: string;
    DBHOST: string;
    DBPORT: number;
    DBNAME: string;
    DBPASSWORD: string;
    DBUSER: string;
    SECRET: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  ADDRESS: process.env.ADDRESS,
  DBHOST: process.env.DBHOST,
  DBPORT: process.env.DBPORT ? Number(process.env.DBPORT) : undefined,
  DBNAME: process.env.DBNAME,
  DBPASSWORD: process.env.DBPASSWORD,
  DBUSER: process.env.DBUSER,
  SECRET: process.env.SECRET,
});

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: ENV): Config => {
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(config)) {
    if (key === 'NODE_ENV') {
      if (value === 'test') console.log('NODE is working in test Jest mode');
      if (!(value === 'production' || value === 'development' || value === 'test')) throw new Error('NODE_ENV should be test (only for Jest), development or production');
    }
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env file`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
