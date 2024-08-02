import React, { Fragment, useState } from "react";
import BasicTable from "./components/BasicTable";
import Search from "./components/Search";
import { sampleData } from "./mock_data";

const App = () => {
  const [isData, setData] = useState(sampleData);
  const [checkFav, setCheck] = useState(true);
  const [favData, setFav] = useState([]);

  function getCity(data) {
    setCheck(true);
    setData(
      data === "All"
        ? sampleData
        : sampleData.filter((item) => item.city === data)
    );
  }

  function getData(data) {
    if (data.length) {
      setData(data);
      setCheck(true);
    } else {
      setCheck(false);
    }
  }

  function getBack() {
    setCheck(true);
    setData(sampleData);
  }

  return (
    <Fragment>
      <div className="container my-4 text-center">
        <Search
          getCity={getCity}
          getData={getData}
          getBack={getBack}
          favData={favData}
        />
        {!checkFav ? (
          <div className="favor-head text-secondary">
            <h1>No Favourites Available</h1>
          </div>
        ) : (
          <Fragment>
            <BasicTable mock_data={isData} setFav={setFav} />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default App;
