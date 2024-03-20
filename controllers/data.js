const Data = require("../models/data");
const setStatistics = require("../utils/statistics");


const stats = async (req, res) => {
  try {
    const result = await Data.find({});
    const data = setStatistics(result);
    res.json({ status: "success", data: data.stats });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const search = async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      country,
      quantity,
      pagination,
    } = req.query;
    const requiredField = {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      country,
    };
    const obj = {};
    const query = (object) =>
      Object.keys(object).map((val) => object[val] && (obj[val] = object[val]));
    query(requiredField);

    const result = await Data.find(obj)
      .limit(quantity || 50)
      .skip(quantity * pagination || 0)
      .select(Object.keys(requiredField));

    const stats = setStatistics(result);

    res.json({ status: "success", data: result, ...stats });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};


module.exports = {
  stats,
  search,
};


