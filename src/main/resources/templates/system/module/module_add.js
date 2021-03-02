$(function(){
debugger
    var pageInfo = new InfoPage();
    pageInfo.setDefaultData();
    pageInfo.vueId = "module_add";
//    alert(JSON.stringify(hyInfoPage));
    var vue = pageInfo.createVue();
    vue.checkData = function(arg){
    debugger
        var moduleName = arg.moduleName;
        var moduleUrl = arg.moduleUrl;
        var moduleType = arg.moduleType;
        var parentId = arg.parentId;
        var iconFont = arg.iconFont;
        if(!pageInfo.checkIsNotNull(moduleName)){
            alert("请填写模块名称!");
            return false;
        }
//        if(!pageInfo.checkIsNotNull(moduleUrl)){
//            alert("请填写访问路径!");
//            return false;
//        }
        if(!pageInfo.checkIsNotNull(moduleType)){
            alert("请填写类别!");
            return false;
        }
//        if(!pageInfo.checkIsNotNull(parentId)){
//            alert("请选择父模块!");
//            return false;
//        }
//        if(!pageInfo.checkIsNotNull(iconFont)){
//            alert("请选择图标!");
//            return false;
//        }
        return true;
    };
})