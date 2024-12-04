import React from "react";
import Table from "../../Components/Table/Table";
import RatioList from "../../Components/RatioList/RatioList";
import { testIncomeStatementData } from "../../Components/Table/testData";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCapTTM,
    subTitle: "Total value of all a company's shares of stock",
  },
];

const DesignPage = (props: Props) => {
  return (
    <>
      <h1>CryptoCash Design Page</h1>
      <RatioList data={testIncomeStatementData} config={tableConfig} />
      <h2>
        This is CryptoCash's design page. This is where we will house various
        design aspects of the app
      </h2>
      <Table />
    </>
  );
};

export default DesignPage;
