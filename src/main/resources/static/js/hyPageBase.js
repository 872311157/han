/*
列表
*/
var HySearchPage = function(){
    this.vue;
    this.vueId;
    this.module_server;
    this.searchName = "queryPageList";
    this.delName = "delete";
    this.saveName = "save";
    this.modifyName = "modify";
//    this.configMap;
//    this.moduleName;
    this.insertPage;
    this.modifyPage;
    this.detailPage;
    this.modelInfo = {
        model: '',
        id: ''
    }
    this.params= {
        pageNum: 1,
        pageSize: 10
    };

    /*
    * 表单页面
    * src 页面地址
    * width 页面宽度
    * height 页面高度
    */
    this.setPageInfo = function(width, height){
        this.pageWidth = width;
        this.pageHeight = height;
    };

    this.createVue = function(){
        debugger
        if(this.vueId){
            this.vue = new Vue({
                el: "#" + this.vueId,
                data: {
                    pageInfo: this,
                    modelInfo: this.modelInfo,
                    params: this.params,
                    config: {
                        searchName: this.searchName,
                        delName: this.delName,
//                        configMap: this.configMap,
                        module_server: this.module_server
                    }
                },
                methods: {
                    innerSearch: function(){
                        debugger
                        var vueTable = this.$refs.VueTable;
                        if(vueTable){
                            vueTable.pageNum = 1;
                            vueTable.search();
                        }
                    },
                    innerRest: function(){
                        this.params = {};
                        var vueTable = this.$refs.VueTable;
                        if(vueTable){
                            vueTable.pageNum = 1;
                            vueTable.params = {};
                            vueTable.search();
                        }
                    },
                    closePage: function(){
                        var vueInfoPage = this.$refs.VueInfoPage;
                        if(vueInfoPage){
                            vueInfoPage.closePage();
                        }
                    },
                    openPageInfo: function(temp){
                        switch(this.modelInfo.model){
                            case "insert":
                                temp.pageName = "新增页面";
                                break;
                            case "modify":
                                temp.pageName = "修改页面";
                                break;
                            case "view":
                                temp.pageName = "查看页面";
                                break;
                        }
                        temp.width = this.pageInfo.pageWidth;
                        temp.height = this.pageInfo.pageHeight;
                        var vueInfoPage = this.$refs.VueInfoPage;
                        if(vueInfoPage){
                            vueInfoPage.loadPageInfo(temp);
                        }
                    },
                    openInsertPage: function(){
                        debugger;
                        var pageSrc = this.pageInfo.insertPage;
                        this.modelInfo.model = "insert";//model 新增-"insert" 修改-"modify" 查看-"view"
                        var temp = {
                            model: this.modelInfo.model,
                            src: pageSrc
                        };
                        this.openPageInfo(temp);
                    },
                    openModifyPage: function(arg){
                        //修改
                        debugger
                        var pageSrc = this.pageInfo.modifyPage;
                        this.modelInfo.model = "modify";//model 新增-"insert" 修改-"modify" 查看-"view"
                        this.modelInfo.id = arg;
                        var temp = {
                            model: this.modelInfo.model,
                            src: pageSrc,
                            id: arg
                        };
                        this.openPageInfo(temp);
                    },
                    openDetailPage: function(arg){
                        //修改
                        debugger
                        var pageSrc = this.pageInfo.detailsPage;
                        this.modelInfo.model = "view";//model 新增-"insert" 修改-"modify" 查看-"view"
                        this.modelInfo.id = arg;
                        var temp = {
                            model: this.modelInfo.model,
                            src: pageSrc,
                            id: arg
                        };
                        this.openPageInfo(temp);
                    }
                }
            })
        }else{
            alert("not found HyTableObj.vueId!");
        }
    }
}

/*
表单
*/
var InfoPage = function(){
    this.vue
    this.vueId;
    this.parentPageInfo;
    this.searchName;
    this.entityBean = {};
    this.saveName = "save";
    this.modifyName = "modify";
    this.queryName = "query";

    this.setDefaultData = function(){
    debugger
        this.parentPageInfo = window.parent.pageInfo;
        this.modelInfo = this.parentPageInfo.modelInfo;
        this.configMap = this.parentPageInfo.configMap;
        this.module_server = this.parentPageInfo.module_server;
        this.saveName = this.parentPageInfo.saveName;
        this.modifyName = this.parentPageInfo.modifyName;
//        this.moduleName = this.parentPageInfo.moduleName;
        if(this.setDefaultData2){
            this.setDefaultData2(this);
        }
    }

    this.createVue = function(){
        debugger
        var model = this.modelInfo.model;
        if("modify" == model || "view" == model){
            this.afterSetPageData(this.modelInfo.id);
        }

        if(this.vueId){
            var winWidth = window.innerWidth;
            var winHeight = window.innerHeight;
            var main_height = (winHeight - 57)*100/winHeight + "%";
            var b_left = (winWidth-68)/2 + "px";
            var readOnly = "";

            this.vue = new Vue({
                el: "#" + this.vueId,
                data: {
                    main_height: main_height,
                    b_left: b_left,
                    readOnly: readOnly,
                    pageInfo: this,
                    modelInfo: this.modelInfo,
                    moduleBean: this.entityBean
                },
                methods: {
                    checkData: function(arg){
                    debugger
                        return true;
                    },
                    innerInfoSubmit: function(){
                        debugger
                        switch(this.modelInfo.model) {
                             case "insert":
                                var saveName = "save";
                                if(this.checkData(this.moduleBean)){
                                    var save_service = this.pageInfo.module_server + "/" + this.pageInfo.saveName;
                                    this.innerInsertSubmit(save_service, this.moduleBean);
                                }
                                break;
                             case "modify":
                                if(this.checkData(this.moduleBean)){
                                    var modify_service = this.pageInfo.module_server + "/" + this.pageInfo.modifyName;
                                    this.innerModifySubmit(modify_service, this.moduleBean);
                                }
                                break;
                        }
                    },
                    innerInsertSubmit: function(save_service, bean){
                        var _this = this;
                        $.ajax({
                            type: "post",
                            async: false,//同步，异步
                            url: save_service, //请求的服务端地址
                            data: JSON.stringify(bean),
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success:function(data){
                            debugger
                                var code = data.code;
                                if("200" == code){
                                    alert("保存成功！");
                                    _this.closePage();
                                    _this.innerSearch();
                                }else{
                                    alert(data.message);
                                }
                            },
                            error:function(i, s, e){
                                alert('error'); //错误的处理
                            }
                        });
                    },
                    innerModifySubmit: function(modify_service, bean){
                        var _this = this;
                        $.ajax({
                            type: "post",
                            async: false,//同步，异步
                            url: modify_service, //请求的服务端地址
                            data: JSON.stringify(bean),
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success:function(data){
                            debugger
                                var code = data.code;
                                if("200" == code){
                                    alert("修改成功！");
                                    _this.closePage();
                                    _this.innerSearch();
                                }else{
                                    alert(data.message);
                                }
                            },
                            error:function(i, s, e){
                                alert('error'); //错误的处理
                            }
                        });
                    },
                    closePage: function(){
                        this.pageInfo.parentPageInfo.vue.$refs.VueInfoPage.closePage();
                    },
                    innerSearch: function(){
                        this.pageInfo.parentPageInfo.vue.$refs.VueTable.search();
                    }
                }
            })
        }else{
            alert("not found HyTableObj.vueId!");
        }
        return this.vue;
    }

    this.afterSetPageData = function(id){
    debugger
        var query_service = this.module_server + "/" + this.queryName;
        var bean = {id: id};
        var pageData;
        $.ajax({
            type: "post",
            async: false,//同步，异步
            url: query_service, //请求的服务端地址
            data: bean,
            dataType: "json",
            success:function(data){
                pageData = data;
            },
            error:function(i, s, e){
                alert('error'); //错误的处理
            }
        });
        this.entityBean = pageData;
    }

    /**
     * 判断当前数据是否为空
     * arg: 参数值
     */
    this.checkIsNotNull = function(arg){
    	if(typeof(arg) == 'undefined' || null === arg || "" === arg){
    		return false;
    	}
    	return true;
    }
}