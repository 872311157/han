var pageInfo;
$(function(){
//    var configMap = window.parent.configMap;
    pageInfo = new HySearchPage();
    pageInfo.vueId = "module_list";
    pageInfo.module_server = "/han/module";
    pageInfo.searchName = "queryModuleList";
    pageInfo.delName = "delete";
    pageInfo.insertPage = "./module_add.html";
    pageInfo.modifyPage = "./module_modify.html";
    pageInfo.detailsPage = "./module_details.html";
    pageInfo.setPageInfo("500px", "370px");
    pageInfo.createVue();
})