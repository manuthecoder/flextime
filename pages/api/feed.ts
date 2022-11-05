const ical2json = require("ical2json");

export default async function getFeed(req, res) {
  const url = req.query.url;
  const response = await fetch(url);
  const data = await response.text();

  res.status(200).json(ical2json.convert(data));
}
