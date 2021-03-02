var pageInfo;
$(function(){
//    var configMap = window.parent.configMap;
    pageInfo = new HySearchPage();
    pageInfo.vueId = "role_list";
    pageInfo.module_server = "/han/role";
    pageInfo.searchName = "queryRoleList";
    pageInfo.delName = "deleteRole";
    pageInfo.insertPage = "./role_add.html";
    pageInfo.modifyPage = "system/role/role_modify.html";
    pageInfo.setPageInfo("500px", "350px");
    pageInfo.createVue();
})