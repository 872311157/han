/*菜单*/
Vue.component('vue-tree2', {
    props: ['bean'],
    template: '<ol class="tree">'+
        '<li class="folderOne" v-for="module in modules">'+
            '<input v-if="box" type="checkbox" id="folder1"><label v-on:click="extend_nodes" v-bind:style="{\'background\': \'url(\'+module.imgUrl+\') no-repeat right center\', \'background-position\':\'3% 50%\'}" :nid="module.id">{{module.mName}}</label>'+
            '<ol style="display: none;" v-for="child in module.childMs" ><li class="file folderTwo"><label v-on:click="open_page" :nid="child.id" :psrc="child.mAddress">{{child.mName}}</label></li></ol>'+
        '</li>'+
    '</ol>',
    data: function () {
        this.checkedNid = '';
        this.modules = this.init_modules();
        return {modules: this.modules,box: false}
    },
    methods: {
        init_modules: function(){
            debugger
            var modules;
            var userid = this.bean.userid;
            var url = this.bean.dataUrl;
            $.ajax({
                type: "post",
                async: false,//同步，异步
                url: url, //请求的服务端地址
                data: {userid: this.bean.userid},
                dataType: "json",
                success:function(data){
//                    $(data).each(function(i, item){
//                        var childs = item.childs;
//                        $(childs).each(function(j, child){
//                            var mtype = child.mtype;
//                            if("1" == mtype){
//                                child.maddress = pageurl + child.maddress;
//                            }
//                        })
//                    })
                    modules = data;
                    console.log(data);
                },
                error:function(i, s, e){
                    flag = false;
                    alert('error'); //错误的处理
                }
            });
            return modules;
        },
        extend_nodes: function(arg){
            var ols = arg.target.parentNode.getElementsByTagName("ol");
            var len = ols.length;
            if(len > 0){
                Array.prototype.slice.call(ols).forEach(function(item, i){
                    var e = item.style.display;
                    if("block" == e || "" == e){
                        item.style.display = "none";
                    }else{
                        item.style.display = "block";
                    }
                })
            }
        },
        open_page: function(arg){
            debugger
            var target = arg.target;
            var firstNode = $(target).parents(".folderOne");
            if(firstNode){
                var firstName = firstNode.children("label:first").text();
                this.$parent.bean.firstName = firstName;
            }
            var secondNode = $(target).parents(".folderTwo");
            if(secondNode){
                var secondName = secondNode.children("label:first").text();
                this.$parent.bean.secondName = secondName;
            }
            if(!this.checkedMs){
                this.checkedNid = target.getAttribute("nid");
            }
            $(".active").each(function(i, item){
                item.className = "";
            })

            var ol = target.parentElement.parentElement;
            ol.className = "active";
            var src = target.getAttribute("psrc");
            var server = this.$parent.bean.config.server;
            this.$parent.bean.pageUrl = server + src;
        }
    }
})

/**
*表格
**/
Vue.component('vue-table', {
    props: ['config', 'params'],
    template: '<div style="height:100%;"><div class="body-list"><table><tbody><tr v-for="(value, key) in sites.result">@tdHtml</tr></tbody></table></div>' +
        '<div class="table_page"><div class="table_page-left">当前第 {{sites.pageNum}} / {{sites.pageCount}} 页,每页{{sites.pageSize}}条，共 {{sites.countNum}}条记录</div><div class="table_page-right"><b v-on:click="first_page">首页</b><b v-on:click="prev_page">上一页</b><b v-on:click="next_page">下一页</b><b v-on:click="last_page">尾页</b><input type="text" v-model="toPageNum" /><b v-on:click="to_page">跳转</b></div></div>'+
        '</div>',
    data: function () {
        debugger
        this.parentPageInfo = this.$parent.pageInfo;
        this.sites = this.init_table();
        var tdHtml = this.setTdHtml(this.items);
        console.log(tdHtml);
        this.$options.template = this.$options.template.replace("@tdHtml", tdHtml);
        return {
            sites: this.sites,
            toPageNum: ''
        }
    },
    methods: {
        init_table: function(){
            debugger
            var sites;
            var moduleName = this.config.moduleName;
            var search_service = this.config.configMap.server;
            if(this.config.searchName){
                search_service += moduleName + "/" + this.config.searchName;
            }else{
                search_service += moduleName + "/queryPageList";
            }
            if(this.pageNum){
                this.params.pageNum = this.pageNum;
            }
            if(this.pageSize){
                this.params.pageSize = this.pageSize;
            }
            $.ajax({
                type: "post",
                async: false,//同步，异步
                url: search_service, //请求的服务端地址
                data: this.params,
                dataType: "json",
                success:function(data){
                    console.log(JSON.stringify(data));
                    sites = data;
                },
                error:function(i, s, e){
                    alert('error'); //错误的处理
                }
            });
            this.pageNum = sites.pageNum;
            this.pageSize = sites.pageSize;
            this.pageCount = sites.pageCount;
            return sites;
        },
        setTdHtml: function(arg){
            var tdHtml = "";
            var ths = $("thead[ct='head_names']").find("th");
            $(ths).each(function(index, item){
                var width = item.style.width;
                var md = item.getAttribute("md");
                var styleHtml = "text-align: center; width: " + width + ";";
                if("operation" == md){
                    tdHtml += "<td style='" + styleHtml + "' md='" + md + "'><a class='blue-xt' v-bind:ids='value.id' v-on:click='openDetailPage'>查看</a><a class='yellow-xt' v-bind:ids='value.id' v-on:click='openModifyPage'>修改</a><a class='red-xt' v-bind:ids='value.id' v-on:click='innerDelete'>删除</a></td>";
                }else if("index" == md){
                    tdHtml += "<td style='" + styleHtml + "' md='index'>{{key + 1}}</td>";
                }else{
                    tdHtml += "<td style='" + styleHtml + "' md='" + md + "'>{{value." + md + "}}</td>";
                }
            })
            return tdHtml;
        },
        innerDelete: function(arg){
            debugger
            var _this = this;
            var id = arg.target.getAttribute("ids");
            var del_service = this.parentPageInfo.configMap.server + this.parentPageInfo.moduleName + "/delete";
            var bean = {id: id};
            $.ajax({
                type: "post",
                async: false,//同步，异步
                url: del_service, //请求的服务端地址
                data: bean,
                dataType: "json",
                success:function(data){
                    _this.$parent.closePage();
                    _this.search();
                },
                error:function(i, s, e){
                    alert('error'); //错误的处理
                }
            });

        },
        openModifyPage: function(arg){
            debugger
            var id = arg.target.getAttribute("ids");
            this.$parent.openModifyPage(id);
        },
        openDetailPage: function(arg){
            debugger
            var id = arg.target.getAttribute("ids");
        },
        first_page: function(arg){
            //首页
            this.pageNum = 1;
            this.sites = this.init_table();
        },
        prev_page: function(arg){
            //上一页
            if (this.pageNum > 1){
                this.pageNum = this.pageNum - 1;
                this.sites = this.init_table();
            }
        },
        next_page: function(arg){
            //下一页
            if (this.pageNum < this.pageCount){
                this.pageNum = this.pageNum + 1;
                this.sites = this.init_table();
            }
        },
        last_page: function(arg){
            //尾页
            this.pageNum = parseInt(this.pageCount);
            this.sites = this.init_table();
        },
        to_page: function(arg){
            //跳转
            this.pageNum = parseInt(this.toPageNum);
            this.sites = this.init_table();
        },
        search: function(){
            this.sites = this.init_table();
        }
    }
})


Vue.component('vue-page', {
    props: [],
    template: '<div class="vue-page" v-bind:style="{\'display\': display}">'+
                '<div class="main" v-bind:style="{\'width\': width, \'height\':height}">'+
                    '<div class="top">'+
                        '<span class="close" v-on:click="closePage">X</span>'+
                        '<span>弹出层</span>'+
                    '</div>'+
                    '<div class="middle" v-bind:style="{\'height\':middleHeight}"><iframe v-bind:src="src"></iframe></div>'+
                '</div>'+
              '</div>',
    data: function () {
        return {
            src: '', // http://127.0.0.1:8090/hy/system/hyModule/hyModule_add.html
            middleHeight: '0px',
            display: 'none',
            width: '0px',
            height: '0px'
        }
    },
    methods: {
        loadPageInfo: function(temp){
            this.src = temp.src;
            this.middleHeight = parseInt(temp.height.substring(0,temp.height.length-2)) - 50 + "px";
            this.display = '';
            this.width = temp.width;
            this.height = temp.height;
        },
        closePage: function(){
            this.display = 'none';
            this.src = "";
        }
    }
})