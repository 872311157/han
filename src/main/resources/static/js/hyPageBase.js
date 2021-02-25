/*
列表
*/
var HySearchPage = function(){
    this.vue;
    this.vueId;
    this.configMap;
    this.moduleName;
    this.insertPage;
    this.modifyPage;
    this.detailPage;
    this.modelInfo = {
        model: '',
        id: ''
    }
    this.searchName = "queryPageList";
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
        if(this.vueId || this.moduleName || this.configMap.server){
            this.vue = new Vue({
                el: "#" + this.vueId,
                data: {
                    pageInfo: this,
                    modelInfo: this.modelInfo,
                    params: this.params,
                    config: {
                        moduleName: this.moduleName,
                        configMap: this.configMap,
                        searchName: this.searchName
                    }
                },
                methods: {
                    innerSearch: function(){
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
                        temp.width = this.pageInfo.pageWidth;
                        temp.height = this.pageInfo.pageHeight;
                        var vueInfoPage = this.$refs.VueInfoPage;
                        if(vueInfoPage){
                            vueInfoPage.loadPageInfo(temp);
                        }
                    },
                    openInsertPage: function(){
                        debugger;
                        var pageSrc = this.pageInfo.configMap.server + this.pageInfo.insertPage;
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
                        var pageSrc = this.pageInfo.configMap.server + this.pageInfo.modifyPage;
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
var HyInfoPage = function(){
    this.vue
    this.vueId;
    this.parentPageInfo;
    this.searchName;
    this.entityBean = {};

    this.setDefaultData = function(){
        this.parentPageInfo = window.parent.pageInfo;
        this.modelInfo = this.parentPageInfo.modelInfo;
        this.configMap = this.parentPageInfo.configMap;
        this.moduleName = this.parentPageInfo.moduleName;
        if(this.setDefaultData2){
            this.setDefaultData2(this);
        }
    }

    this.createVue = function(){
        debugger
        var model = this.modelInfo.model;
        if("modify" == model || "modify" == model){
            this.afterSetPageData(this.modelInfo.id);
        }

        if(this.vueId || this.moduleName || this.configMap.server){
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
                    saveBean: this.entityBean
                },
                methods: {
                    innerInfoSubmit: function(){
                        debugger
                        switch(this.modelInfo.model) {
                             case "insert":
                                var save_service = this.pageInfo.configMap.server + "/" + this.pageInfo.moduleName + "/save";
                                this.innerInsertSubmit(save_service, this.saveBean);
                                break;
                             case "modify":
                                var modify_service = this.pageInfo.configMap.server + "/" + this.pageInfo.moduleName + "/modify";
                                this.innerModifySubmit(modify_service, this.saveBean);
                                break;
                        }
                    },
                    innerInsertSubmit: function(save_service, bean){
                        var _this = this;
                        $.ajax({
                            type: "post",
                            async: false,//同步，异步
                            url: save_service, //请求的服务端地址
                            data: bean,
                            dataType: "json",
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
                            data: bean,
                            dataType: "json",
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
    }

    this.afterSetPageData = function(id){
    debugger
        var query_service = this.configMap.server + this.moduleName + "/query";
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
}