var pageInfo;
$(function(){
//    var configMap = window.parent.configMap;
    pageInfo = new HySearchPage();
    pageInfo.vueId = "module_list";
    pageInfo.search_server = "/han/module";
    pageInfo.searchName = "queryModuleList";
    pageInfo.insertPage = "system/module/hyModule_add.html";
    pageInfo.modifyPage = "system/module/hyModule_modify.html";
    pageInfo.setPageInfo("500px", "350px");
    pageInfo.createVue();
})