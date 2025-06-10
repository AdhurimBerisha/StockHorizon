# StockHorizon – Real-Time Stock Tracking & Portfolio Management

![localhost_3000_](https://github.com/user-attachments/assets/26da3277-abfa-4198-b488-1d4b32ad55b9)



StockHorizon is a powerful financial application that lets you search for live stock market data and seamlessly add stocks to your personalized portfolio. Built with ReactJS, TypeScript, and Tailwind CSS, the app delivers a smooth and responsive user experience. The backend is powered by ASP.NET Core Web API and SQL Server, ensuring high performance and reliability for managing stock data and user portfolios. Whether you're tracking real-time prices or managing your investments, StockHorizon provides the tools you need to stay ahead in the market.


## Features

- Search live stock market
- Review past stock history
- Create your own portfolio    
- Admin control panel for managing users, stocks, and portfolios    


## Tech Stack

- **Frontend:** React, Typescript, Tailwind CSS  
- **Backend:**   ASP.NET Core Web API
- **Databases:** Microsoft SQL Server  

## Installation

1. Clone the repository  
    ```bash
    git clone https://github.com/AdhurimBerisha/StockHorizon.git
    ```

2. Install dependencies for frontend and backend  
    ```bash
    cd client
    npm install

    cd api
    npm install
    ```

3. Set up environment variables (see below)

4. Run the development servers  
    ```bash
    # api
    dotnet watch run

    # frontend
    npm start
    ```

## Environment Variables

This project requires a few environment variables to run properly.
- For the **frontend**, create a `.env` file.

### frontend `.env` variables include:

- `REACT_APP_API_KEY` — your_react_api_key


