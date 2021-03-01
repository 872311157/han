/*菜单*/
Vue.component('vue-tree', {
    props: ['bean'],
    template: '<div class="left-side-menu" ><div class="lsm-expand-btn"><div class="lsm-mini-btn"><label><input type="checkbox" checked="checked"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="25" /><path class="line--1" d="M0 40h62c18 0 18-20-17 5L31 55" /><path class="line--2" d="M0 50h80" /><path class="line--3" d="M0 60h62c18 0 18 20-17-5L31 45" /></svg></label></div></div>'
                +'<div class="lsm-container"><div class="lsm-scroll" ><div class="lsm-sidebar">'
                    +'<ul><li class="lsm-sidebar-item" v-for="module in modules"><a href="javascript:;"><i class="my-icon lsm-sidebar-icon" v-bind:class="module.iconFont"></i><span level="1">{{module.moduleName}}</span><i class="my-icon lsm-sidebar-more"></i></a>'
                        +'<ul style="display: none;"><li v-for="child in module.childList"><a href="javascript:;" v-bind:mid="child.id" v-on:click="open_page"><span level="2">{{child.moduleName}}</span></a></li></ul>'
                    +'</li></ul>'
                +'</div></div></div>'
             +'</div>',
    data: function () {
        this.firstName = '';
        this.secondName = '';
        this.thirdName = '';
        this.mMap = {};
        this.checkedNid = '';
        this.modules = this.init_modules();
        return {modules: this.modules,box: false}
    },
    mounted: function () {
        var _that = this;
        $('.lsm-scroll').slimscroll({
            height: 'auto',
            position: 'right',
            railOpacity: 1,
            size: "5px",
            opacity: .4,
            color: '#fffafa',
            wheelStep: 5,
            touchScrollStep: 50
        });
        $('.lsm-container ul ul').css("display", "none");
        // lsm-sidebar收缩展开
        $('.lsm-sidebar a').on('click',function(){
            $('.lsm-scroll').slimscroll({
                height: 'auto',
                position: 'right',
                size: "8px",
                color: '#9ea5ab',
                wheelStep: 5,
                touchScrollStep: 50
            });
            //获取导航目录
            _that.fullMenuName(this);

            if (!$('.left-side-menu').hasClass('lsm-mini')) {
                $(this).parent("li").siblings("li.lsm-sidebar-item").children('ul').slideUp(200);
                if ($(this).next().css('display') == "none") {
                    //展开未展开
                    // $('.lsm-sidebar-item').children('ul').slideUp(300);
                    $(this).next('ul').slideDown(200);
                    $(this).parent('li').addClass('lsm-sidebar-show').siblings('li').removeClass('lsm-sidebar-show');
                }else{
                    //收缩已展开
                    $(this).next('ul').slideUp(200);
                    //$('.lsm-sidebar-item.lsm-sidebar-show').removeClass('lsm-sidebar-show');
                    $(this).parent('li').removeClass('lsm-sidebar-show');
                }
            }
        });
        //lsm-mini
        $('.lsm-mini-btn svg').on('click',function(){
            if ($('.lsm-mini-btn input[type="checkbox"]').prop("checked")) {
                $('.lsm-sidebar-item.lsm-sidebar-show').removeClass('lsm-sidebar-show');
                $('.lsm-container ul').removeAttr('style');
                $('.left-side-menu').addClass('lsm-mini');
                $('.left-side-menu').stop().animate({width : 60},200);
            }else{
                $('.left-side-menu').removeClass('lsm-mini');
                $('.lsm-container ul ul').css("display", "none");
                $('.left-side-menu').stop().animate({width: '100%'},200);
            }

        });
        $(document).on('mouseover','.lsm-mini .lsm-container ul:first>li',function(){
            $(".lsm-popup.third").hide();
            $(".lsm-popup.second").length == 0 && ($(".lsm-container").append("<div class='second lsm-popup lsm-sidebar'><div></div></div>"));
            $(".lsm-popup.second>div").html($(this).html());
            $(".lsm-popup.second").show();
            $(".lsm-popup.third").hide();
            var top = $(this).offset().top;
            var d = $(window).height() - $(".lsm-popup.second>div").height();
            if(d - top <= 0 ){
                top  = d >= 0 ?  d - 8 : 0;
            }
            $(".lsm-popup.second").stop().animate({"top":top}, 100);
        });

        $(document).on('mouseover','.second.lsm-popup.lsm-sidebar > div > ul > li',function(){
            if(!$(this).hasClass("lsm-sidebar-item")){
                $(".lsm-popup.third").hide();
                return;
            }
            $(".lsm-popup.third").length == 0 && ($(".lsm-container").append("<div class='third lsm-popup lsm-sidebar'><div></div></div>"));
            $(".lsm-popup.third>div").html($(this).html());
            $(".lsm-popup.third").show();
            var top = $(this).offset().top;
            var d = $(window).height() - $(".lsm-popup.third").height();
            if(d - top <= 0 ){
                top  = d >= 0 ?  d - 8 : 0;
            }
            $(".lsm-popup.third").stop().animate({"top":top}, 100);
        });

        $(document).on('mouseleave','.lsm-mini .lsm-container ul:first, .lsm-mini .slimScrollBar,.second.lsm-popup ,.third.lsm-popup',function(){
            $(".lsm-popup.second").hide();
            $(".lsm-popup.third").hide();
        });

        $(document).on('mouseover','.lsm-mini .slimScrollBar,.second.lsm-popup',function(){
            $(".lsm-popup.second").show();
        });
        $(document).on('mouseover','.third.lsm-popup',function(){
            $(".lsm-popup.second").show();
            $(".lsm-popup.third").show();
        });
    },
    methods: {
        init_modules: function(){
            var _that = this;
            var modules;
//            modules = [{'id':1,'mName':'系统管理','icon':'icon_1','childMs':[{'id':1, 'mName':'地爆天星'},{'mName':'地爆天星'},{'mName':'地爆天星'}]},{'id':2,'mName':'角色管理','icon':'icon_2'},{'id':3,'mName':'模块管理','icon':'icon_3'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':5,'mName':'用户管理','icon':'icon_5'},{'id':4,'mName':'用户管理','icon':'icon-touxiang'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':4,'mName':'用户管理','icon':'icon_4'},{'id':4,'mName':'最后一个','icon':'icon_4'}]
            var userid = this.bean.userid;
            var url = this.bean.dataUrl;
            $.ajax({
                type: "post",
                async: false,//同步，异步
                url: url, //请求的服务端地址
                data: {userid: userid},
                dataType: "json",
                success:function(data){
                debugger
                    _that.initPageSrc(data);
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
        initPageSrc: function(data){
            var _that = this;
            data.forEach(function(item){
                var childList = item.childList;
                _that.mMap[item.id] = {'url':item.moduleUrl};
                if(childList){
                    _that.initPageSrc(childList);
                }
            })
        },
        open_page: function(arg){
            var target = arg.currentTarget;
            this.fullMenuName(target);
            var mid = target.getAttribute('mid');
            var data = this.mMap[mid];
            data.firstName = this.firstName;
            data.secondName = this.secondName;
            data.thirdName = this.thirdName;
            if(this.$parent.open_iframe){
                this.$parent.open_iframe(data);
            }else{
                alert('vue not methods define open_iframe！');
            }
        },
        fullMenuName: function(target){
            var level = $(target).find("span").attr("level");
            var mName = $(target).find("span").text();
            switch(level){
                case '1':
                    this.firstName = mName;
                    break;
                case '2':
                    this.secondName = mName;
                    break;
                case '3':
                    this.thirdName = mName;
                    break;
            }
        }
    }
})



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
            modules = [{'id':1,'mName':'系统管理','imgUrl':''},{'id':2,'mName':'角色管理','imgUrl':''},{'id':3,'mName':'模块管理','imgUrl':''},{'id':4,'mName':'用户管理','imgUrl':''}]
            var userid = this.bean.userid;
            var url = this.bean.dataUrl;
//            $.ajax({
//                type: "post",
//                async: false,//同步，异步
//                url: url, //请求的服务端地址
//                data: {userid: this.bean.userid},
//                dataType: "json",
//                success:function(data){
//                    modules = data;
//                    console.log(data);
//                },
//                error:function(i, s, e){
//                    flag = false;
//                    alert('error'); //错误的处理
//                }
//            });

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
//            var moduleName = this.config.moduleName;
            var searchName = this.config.searchName;
            var search_server = this.config.search_server;
            var search_service = search_server + "/" + searchName;
//            if(this.config.searchName){
//                search_service += moduleName + "/" + this.config.searchName;
//            }else{
//                search_service += moduleName + "/queryPageList";
//            }
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
//            var del_service = this.parentPageInfo.configMap.server + this.parentPageInfo.moduleName + "/delete";
            var del_service = this.del_service;
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