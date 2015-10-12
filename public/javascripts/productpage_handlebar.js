$('document').ready(function(e){
	function dispalyitem(e)
	{
	//get all data from server
		 $.ajax({
			   url: "/products",
			   dataType: "json",
			   type: "get",
			   success:function(mydata)
			   {
				for(var i=0;i<mydata.length;i++)
				 	{		
                        var template = Handlebars.compile( $('#add_tpl').html() );
				        	$('div.page').append(template(mydata[i]));
				  	}
				}
				       
			   });
	};
	dispalyitem(e);
	
    $("#add").on('click',function(e){
		e.preventDefault();
		
		var	itmname= $("#additem").val();
		var	itmdesc= $("#description").val();
		var	itmprice= $("#price").val();
			
		$.ajax({
            url : "/products",
            type : "post",			
            data : {itmname,itmdesc,itmprice},
			success : function(result){
				var template = Handlebars.compile( $('#add_tpl').html() );
				$('div.page').append(template(result));
				$("#additem").val("");
				$("#description").val("");
				$("#price").val("");
            }
			});
	
    	});
	

	$(".page").on('click','.glyphicon',function(e){
		var c = confirm("Are you sure you want to delete it??");
		if(c === true)
		{
			var del_item = $(this).prop('id');
			
			var del_item1 = $(this).closest('div.alert');
			
		$.ajax({
				
			url : '/products/'+del_item,
			type : "DELETE",
			data : {"id":del_item},
			success : function(){
				console.log($(this));
				del_item1.remove();				
			}
			});
		}
        
    });
});