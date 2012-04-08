$(function(){
  
//  var graph = new NodeGraph();
  graph = new NodeGraph();  // declared in script portion of index.html
  
  // consider moving to NodeGraph
  $("#canvas").mouseup(function(e){
     if (openWin.css("display") == "none"){
       var children = $(e.target).children();
       if (children.length > 0){
         var type = children[0].tagName;
         if (type == "desc" || type == "SPAN"){
           graph.addNodeAtMouse();
         }
       }
     }
  });
  
  // ui code
  var openWin = $("#openWin");
  openWin.hide();
 
  $(".btn").mouseenter(function(){
    $(this).animate({"backgroundColor" : "white"}, 200);
  }).mouseleave(function(){
    $(this).animate({"backgroundColor" : "#efefef"});
  });
  $("#clear").click(function(){
    graph.clearAll();
  });
  $("#help").click(function(){
    window.open("http://www.zreference.com/znode", "_blank");
  });
  
  $("#save").click(saveFile);
  
  function saveFile(){
    var name = filename.val();
    if (name == "" || name == nameMessage){
      alert("Please Name Your File");
      filename[0].focus();
      return;
    }
    $.post("json/save.php", {data:graph.toJSON(), name:name}, function(data){
      alert("Your file was saved.");
    });
  }
  
  $("#canvas").mousedown(function(){
    openWin.fadeOut();
  });
  
  $("#open").click(function(){
    var fileList =  $("#files");
    fileList.html("<div>loading...<\/div>");
    openWin.fadeIn();
    fileList.load("json/files.php?"+Math.random()*1000000);
  });
  
  var nameMessage = "Enter your file name";
  var filename = $("#filename").val(nameMessage);

  filename.focus(function(){
    if ($(this).val() == nameMessage){
      $(this).val("");
    }
  }).blur(function(){
    if ($(this).val() == ""){
      $(this).val(nameMessage);
    }
  });
  
  $("#nameForm").submit(function(e){
    e.preventDefault();
    saveFile();
  });
  
  $(".file").live('click', function() {
    var name = $(this).text();
    $.getJSON("files/" + name + ".json", {n:Math.random()}, function(data){
       graph.fromJSON(data);
       
       filename.val(name);
    });
  }).live('mouseover', function(){
    $(this).css({"background-color": "#ededed"});
  }).live("mouseout", function(){
    $(this).css({"background-color": "white"});
  });
  
  
  
  
  
  $("#findvar").click(function(){
    //var tmp = $("#varname").val();
    // NEED TO ADD IN AN ALERT IF NO MATCHES!
    //var nodesfound = $("pre:contains(" + tmp + ")").parent().show().parent().css('background-color','yellow');
    parseForVariables();
    parseForFunctions();
  });
  
  function highlightVars(whichString) {
    //var tmp = $("#varname").val();
    // NEED TO ADD IN AN ALERT IF NO MATCHES!
    clearHighlights();
    if (whichString.length > 0) {
      var nodesfound = $("pre:contains(" + whichString + ")").parent().show().parent().css('background-color','yellow');
    }
  }
  
  function clearHighlights() {
    var nodesfound = $(".node").css('background-color','white');    
  }

  $("#clearvar").click(function(){
    clearHighlights();
  });

  $("#compviewclose").click(function(){
    $("#compview").hide();
  });
    
});