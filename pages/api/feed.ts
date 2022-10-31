const ical2json = require("ical2json");

export default async function getFeed(req, res) {
  const url =
    "https://iusd.instructure.com/feeds/calendars/user_oAQbGWzXv6PnOTvZrK860MedEicqM9mI6ltvR2ko.ics";
  const response = await fetch(url);
  const data = await response.text();

  res.status(200).json(ical2json.convert(data));
}
