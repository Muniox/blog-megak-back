// @ts-ignore
// eslint-disable-next-line no-unused-vars
namespace NodeJS {
    interface ProcessEnv {
        // NODE
        NODE_ENV: 'production' | 'development';
        PORT: string;
        ADDRESS: string;
        // DATABASE
        DBHOST: string;
        DBPORT: string;
        DBNAME: string;
        DBPASSWORD: string;
        DBUSER: string;
    }
}
