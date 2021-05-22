module.exports = async function (context, req) {
  console.log(req.body)  
  return {
      "target": "updated",
      "arguments": [ req.body ]
    };
  };