import { useEffect, useState } from "react";
import "./App.css";

const data = [
  {
    total: 0,
    amt1: 0,
    amt2: 0,
    amt3: 0,
    title: "zuber",
  },
  {
    total: 0,
    amt1: 0,
    amt2: 0,
    amt3: 0,
    title: "kabir",
  },
  {
    total: 0,
    amt1: 0,
    amt2: 0,
    amt3: 0,
    title: "sachine",
  },
  {
    total: 0,
    amt1: 0,
    amt2: 0,
    amt3: 0,
    title: "rohit",
  },
];

const defaultTotal = {
  total: 0,
  total1: 0,
  total2: 0,
  total3: 0,
};

const App = () => {
  const [records, setRecords] = useState(data);
  const [totalObj, setTotalObj] = useState(defaultTotal);

  const handleOnChange = (e, column, index) => {
    if (
      Number.isNaN(e.target.value) ||
      e.target.value === "" ||
      e.target.value === null
    ) {
      return;
    }
    const newArray = records.map((item, i) => {
      if (i === index) {
        const rec = records[index];
        let { amt1, amt2, amt3 } = rec;
        const value = Number.parseInt(e.target.value);
        if (column === "amt1") {
          amt1 = value;
        } else if (column === "amt2") {
          amt2 = value;
        } else if (column === "amt3") {
          amt3 = value;
        }
        const total = amt1 + amt2 + amt3;
        return {
          ...rec,
          amt1,
          amt2,
          amt3,
          total,
        };
      }
      return item;
    });
    setRecords([...newArray]);
  };

  useEffect(() => {
    const total = records.reduce(
      (total, item) => {
        return {
          total: total.total + item.total,
          total1: total.total1 + item.amt1,
          total2: total.total2 + item.amt2,
          total3: total.total3 + item.amt3,
        };
      },
      { total: 0, total1: 0, total2: 0, total3: 0 }
    );
    setTotalObj(total);
  }, [records]);

  const handleSubmit = () => {
    alert(JSON.stringify(records));
  };

  return (
    <div className="App">
      <table>
        <thead>
          <th>index</th>
          <th>title</th>
          <th>total</th>
          <th>amt 1</th>
          <th>amt 2</th>
          <th>amt 3</th>
        </thead>
        <tbody>
          {records.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.total}</td>
                <td>
                  <input
                    type="text"
                    id={`amt1 ${index}`}
                    value={item.amt1}
                    onChange={(e) => handleOnChange(e, "amt1", index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id={`amt2 ${index}`}
                    value={item.amt2}
                    onChange={(e) => handleOnChange(e, "amt2", index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id={`amt3 ${index}`}
                    value={item.amt3}
                    onChange={(e) => handleOnChange(e, "amt3", index)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}></td>
            <td>Total : {totalObj.total}</td>
            <td>Amt total1 : {totalObj.total1}</td>
            <td>Amt total2 : {totalObj.total2}</td>
            <td>Amt total3 : {totalObj.total3}</td>
          </tr>
        </tfoot>
      </table>
      <br />
      <br />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
