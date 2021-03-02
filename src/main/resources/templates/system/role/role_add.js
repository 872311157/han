$(function(){
    var pageInfo = new InfoPage();
    pageInfo.setDefaultData();
    pageInfo.vueId = "role_add";
    var vue = pageInfo.createVue();
    vue.checkData = function(arg){
        var moduleName = arg.moduleName;
        var moduleUrl = arg.moduleUrl;
        var moduleType = arg.moduleType;
        var parentId = arg.parentId;
        var iconFont = arg.iconFont;
        if(!pageInfo.checkIsNotNull(moduleName)){
            alert("请填写模块名称!");
            return false;
        }
        if(!pageInfo.checkIsNotNull(moduleType)){
            alert("请填写类别!");
            return false;
        }
        return true;
    };
})