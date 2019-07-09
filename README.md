# wicked-sales

A full stack LAMP & React shopping cart app.</br>
Website: https://wicked-sales.jeremywang.dev/

## Introduction

- For this project, you will see a single-page React application and a dynamic PHP API.
- It is a mock online shopping cart app. 
- Your personal information will not be saved and order will not be delivered.

## Getting Local Installed

1. Fork this repository to your GitHub account.
2. Clone the fork to your local directory.
    ```
    git clone https://github.com/[Your_GitHub_Name]/wicked-store
    ```
3. Navigate to your local directory. 
   Install all dependencies in `package.json` with NPM.
    ```
    npm install
    ```
4. Create a new mysql database called 'wicked-sales'

5. Import file `mysql_dump.sql` under folder `/database` in the local directory to 'wicked-sales' database

6. Rename `db_connection.php.config` under folder `/server/public/api` in local directory to `db_connection.php`
   ```
   sudo cp server/public/api/db_connection.php.config server/public/api/db_connection.php
   ```
7. Open `db_connection.php`, change `'database'` to `'wicked-sales'`, </br>
    change `'hostname'`, `'username'`, `'password'` to your local mysql config. </br>**NOTE**: Keep the single quote.

8. Start the Apache web server
   ```
   sudo service apache2 start
   ```
9. Start the local MySQL database 
   ```
   sudo service mysql start
   ```
10. Run project locally. You should receive `｢wdm｣: Compiled successfully.` in the terminal.
       ```
       npm run dev
       ```
11. Open your browser, navigate to `http://localhost:3000/`. You should be seeing the app.


## NPM Scripts

- `dev` - Start Webpack Dev Server at port `localhost:3000`
- `build` - Run Webpack to build the React client into `server/public`.
