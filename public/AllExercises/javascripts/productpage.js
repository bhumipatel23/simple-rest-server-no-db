$('document').ready(function(e){
  function dispalyitem(e)
  {
    var items = [];
    $.getJSON('/products',function(data){
      console.log( "success" );
      items.push('<div id="maindiv">');
      $.each(data, function( key, val ) {
                items.push('<div class="alert alert-info"> \
                <button id='+val.id+' type="button" class="btn btn-default pull-right">X</button> \
                <h4 > <strong id="s1"> ' + val.additem + '</strong><button id="btn1" type="button" class="btn btn-primary pull-right">$'+ val.price+'</button> </h4> \
                <p id="p1">'+ val.description+'</p>\
                </div>');
        $('<div>', { html: items.join( "" )}).appendTo("#d1");
      });
      items.push('</div>');
    })
  };
  dispalyitem(e);
  
  //append data on current page
  
    $("#add").on('click',function(e){
    e.preventDefault();
    var x={
      additem: $("#additem").val(),
      description: $("#description").val(),
      price:$("#price").val(),
      
    };
    console.log(x);
        $.ajax({
            url : "/products",
            type : "post",      
            data : x,
      success : function(result){
        console.log(result);
                var additem1=result.additem;
        var desc1=result.description;
        var price1=result.price;        
        $("#d1").append('<div><div class="alert alert-info"> \
                <button id='+result.id+' type="button" class="btn btn-default pull-right">X</button> \
                <h4 > <strong id="s1"> ' + additem1 + '</strong><button id="btn1" type="button" class="btn btn-primary pull-right"> $'+ price1+'</button> </h4> \
                <p id="p1">'+ desc1+'</p>\
                </div></div>');
      $("#additem").val("");
      $("#description").val("");
      $("#price").val("");
            }
        });
    });
  
  //delete data
  $("div").on('click','.btn-default',function(e){
    var c=confirm("Are you sure you want to delete the item?");
    if(c === true)
    {
      var deleteitem=$(this).prop('id');
      console.log(deleteitem);
      var deleteitem2=$(this).closest('div.alert');
      console.log(deleteitem2);
      $.ajax({
        url : '/products/'+deleteitem,
        type : "DELETE",
        data : {"id":deleteitem},
        success : function(){
          console.log($(this));
          deleteitem2.remove();       
        }
      });
    }
        
    });
});