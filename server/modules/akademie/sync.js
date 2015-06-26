module.exports = (req, res) => {
  console.log(req.body.measures.length);
  res.jsonp({
    error: null,
    body: req.body
  });

  return res.end();
};
