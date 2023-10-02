
//method for home page/ to view csv files lists
module.exports.home = async function(req, res){
  try{
    return res.render("home",{ 
      title: 'CSV Manager',
    })
  } catch(err){
    console.log("***Error Encountered***", err)
  }
}