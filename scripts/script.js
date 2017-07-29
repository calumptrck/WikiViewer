$(document).ready(function(){
  $(".mainentry").keyup(function(event){
    if(event.keyCode == 13){
        $(".search").click();
    }
});
  $('.search').on("click",function(){
    var input = $('input');
    var title = input.val();
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';

    $.ajax({
      url: api + title + cb,
      dataType: 'jsonp',
      success: function(data){
        $('.entries').html("");
        var results = data.query.pages;
        for (var key in results) {
          var cUrl = page + results[key].pageid;
          createEntry(results[key].title,results[key].extract,cUrl);
        }
      }

    });

});
});

function createEntry(title,desc,url) {

  var basehtml = '<a href="'+url+'"> \
    <div class="entry"> \
    <h3 class="thetitle">'+title+'</h3> \
    <p class="thedesc">'+desc+'</p> \
  </div></a>';
  $('.entries').append(basehtml);
}
