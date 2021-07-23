module.exports = async function (context, req) {
    return {
      "target": "updated",
      "arguments": [req.body]
    };
}