import path from 'path';
import dotenv from 'dotenv';

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    NODE_ENV: 'production' | 'development';
    PORT: number | undefined;
    ADDRESS: string | undefined;
    DBHOST: string | undefined;
    DBPORT: number | undefined;
    DBNAME: string | undefined;
    DBPASSWORD: string | undefined;
    DBUSER: string | undefined;
}

interface Config {
    NODE_ENV: 'production' | 'development';
    PORT: number;
    ADDRESS: string;
    DBHOST: string;
    DBPORT: number;
    DBNAME: string;
    DBPASSWORD: string;
    DBUSER: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => ({
  // @ts-ignore
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  ADDRESS: process.env.ADDRESS,
  DBHOST: process.env.DBHOST,
  DBPORT: process.env.DBPORT ? Number(process.env.PORT) : undefined,
  DBNAME: process.env.DBNAME,
  DBPASSWORD: process.env.DBPASSWORD,
  DBUSER: process.env.DBUSER,
});

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.

const getSanitizedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (key === 'NODE_ENV') {
      if (!(value === 'production' || value === 'development')) throw new Error('NODE_ENV should be development or production');
    }
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
