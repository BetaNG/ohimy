// JS for index - unlogin

function searchFocus() {
    var $this = $("#search_query");
    if ($this.val() == $this.attr('title')) {
        $this.val("");
        $("#search_btn").addClass("typing");
        $this.parent().addClass("highlight");
    } else if ($this.val() !== "" && $this.val() !== $this.attr('title')) {
        $("#search_btn").addClass("typing");
        $this.parent().addClass("highlight");
    }
}

function searchBlur() {
    var $this = $("#search_query");
    if ($this.val() == "") {
        $this.val($this.attr('title'));
        $("#search_btn").removeClass("typing");
        $this.parent().removeClass("highlight");
    } else {
        $("#search_btn").removeClass("typing");
        $this.parent().removeClass("highlight");
    }
}

$(function() {
    //给index快捷注册页面密码确认赋值
    $('#reg_submit').click(function(){
        $('#verifypass').val($('#reg_password').val())
        })
        
    //隐藏登录弹出层
    var hideLoginPopup = function(){
        if (!$("#login_popup").is(".hidden")) {
            $("#top_login").removeClass("active");
            $("#login_popup").addClass("hidden");
        }
    };

    //隐藏注册弹出层
    var hideRegPopup = function(){
        if ($("#index_register").is(".unfold")) {
            $("#index_register").removeClass("unfold").addClass("fold");
        }
    };

    // 登录框
    $("#top_login").click(function(){
        $('#form_reg').find('.invalid').addClass('hidden');
        $(this).toggleClass("active");
        $("#login_popup").toggleClass("hidden");
        $("#log_email").focus();
        return false;
    });

    $("body").click(function(){
        hideLoginPopup();
        //hideRegPopup();
        $('#form_reg').find('.invalid').addClass('hidden');
        $('#auto_complete').addClass('hidden');

    });

    $('#login_popup,#index_register').click(function (e) {
        e.stopPropagation();
    });

    /*
    $("#login_more").click(function(){
        if ($("#login_with").is(".invisible")) {
            $("#login_form").addClass("invisible");
            $("#login_with").removeClass("invisible");
        } else {
            $("#login_form").removeClass("invisible");
            $("#login_with").addClass("invisible");
        }
        return false;
    });
    */

    $("a.close").click(function(){
        $("#login_with").addClass("invisible");
        $("#login_form").removeClass("invisible");
        return false;
    });

    //注册
    var  checkEmail=function() {
        var $input = $("#reg_email");

        if ($input.val() != null && $input.val().length > 4 && $input.val().match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)){
            $.ajax({
                type: "POST",
                url: "/ajax/querymail",
                data: "mail="+ encodeURIComponent($input.val()),
                success: function(msg){
                if(msg != '1'){
                    $('#form_reg').find('.invalid').addClass('hidden');
                    $input.next().addClass('hidden').next().html('该Email地址已被使用！<br />请 <a href="javascript:;" onclick="$(\'#top_login\').click();$(\'#log_email\').val($(\'#reg_email\').val());">直接登陆</a> 或 <a href="/member/getpassword">找回密码</a><b></b>').removeClass('hidden');
                    return false;
                }else{
                    $input.next().removeClass('hidden').next().addClass('hidden');
                }
            }
            });
        }else{
            $('#form_reg').find('.invalid').addClass('hidden');
            $input.next().addClass('hidden').next().html('请输入有效的Email地址！<b></b>').removeClass('hidden');
            return false;
        }
        return true;
    };

    var checkNickname = function(){
        var $input = $("#reg_username");
        if($input.val().length <1 || $input.val().length >12){
            $('#form_reg').find('.invalid').addClass('hidden');
            $input.next().addClass('hidden').next().removeClass('hidden');
            return false;
        }else{
            $input.next().removeClass('hidden').next().addClass('hidden');
        }
        return true;
    };

    var checkPasswords =function(){
        var $input = $('#reg_password');
        if ($input.val().length < 6 || $input.val().length > 16){
            $('#form_reg').find('.invalid').addClass('hidden');
            $input.next().next().addClass('hidden').next().removeClass('hidden');
            return false;
        }else{
            $input.next().next().removeClass('hidden').next().addClass('hidden');
        }
        return true;
    };

    var checkAgree=function(){
        var $input = $("#accept_eula");
        if(!$input.attr("checked")){
            $('#form_reg').find('.invalid').addClass('hidden');
            $input.next().next().removeClass('hidden');
            return false;
        }else{
            $input.next().next().addClass('hidden');
        }
        return true;
    };

    $("#reg_email").change(checkEmail);
    $("#reg_username").change(checkNickname);
    $("#reg_password").change(checkPasswords);
    $("#accept_eula").change(checkAgree);
    $("#form_reg").submit(function(){
        if(!checkEmail() || !checkNickname() || !checkPasswords() || !checkAgree())
            return false;
        $("#verifypass").val($('#reg_password').val());
    });

    // 快速注册
    $("#reg_email").focus(function(){
        hideLoginPopup();
        $("#index_register").removeClass("fold").addClass("unfold");
    });

    $("#index_register .txt_input:not(.reg_psw)").focus(function () {
        if ($(this).val() == $(this).attr("title")) {
            $(this).val("");
        };
    });

    $("#index_register .txt_input:not(.reg_psw)").blur(function () {
        if (!$(this).val()) {
            $(this).val($(this).attr("title"));
        };
    });

    $("#index_register .reg_psw").focus(function () {
        $(this).next(".input_text").hide();
    });

    $("#index_register .input_text").click(function () {
        $(this).hide();
        $("#index_register .reg_psw").focus();
    });

    $("#index_register .reg_psw").blur(function () {
        if (!$(this).val()) {
            $(this).next(".input_text").show();
        }
    });

    // 首页 timeline hover
    $('#index_timeline li .share_content, #wcs_timeline li .share_content').hover(function(){
        $(this).parent().addClass("active");
    }, function(){
        $(this).parent().removeClass("active");
    });

    // 载入更多

    $("a.bot_more").click(function(){
        $(this).addClass("loading").text("正在载入...");
        return false;cd
    });


    var timer=null;
    var key = '';
    var result_count=0;
    var current_index=-1;
    var bind_name = 'input';
    if (navigator.userAgent.indexOf("MSIE") != -1){
        bind_name = 'propertychange';
    }

    //$('#search').submit(function(){return false;});
    $('#search_query').bind(bind_name, function(){
        //var timestamp = (new Date()).valueOf();
        var $this = $(this);
        var val = $.trim($this.val());
        if(val==key) return;
        key = val;
        if(timer!=null) clearTimeout(timer);
        if(val.length<1){
            $('#auto_complete').html('').addClass('hidden');
            return;
        }

        timer= setTimeout(function(){
            $.ajax({
                type:'GET',
                url:'/ajax/search-index',
                dataType:'html',
                data:{key:val},
                beforeSend:function(){$("#search_btn").addClass('loading');},
                success:function(data){
                    $("#search_btn").removeClass('loading');
                    if(data!=''){
                        result_count=0;
                        current_index=-1;
                        $('#auto_complete').html(data).removeClass('hidden');
                        $('#auto_complete li.result').hover(function(){
                            $(this).addClass("selected");
                        }, function(){
                            $(this).removeClass("selected");
                        });
                    }
                }
            });
        }, 500);
    });


    $('#search_query').keydown(function(e){
        if(e.keyCode==27){//esc
            $('#auto_complete').addClass('hidden');
        }

        if(e.keyCode==13){//enter
            if(current_index>=0){
                var li = $('#auto_complete li.result').get(current_index);
                var href=$(li).find('a').attr('href');
                window.location=href;
            }
            return false;
        }

        if(e.keyCode==40){//向下键
            if($('#auto_complete').html().length<1) return;
            $('#auto_complete').removeClass('hidden');
            result_count = $('#auto_complete li.result').size();
            if(current_index>=result_count-1) current_index=-1;
            $('#auto_complete li.result').mouseout();
            $($('#auto_complete li.result')[++current_index]).mouseover();
        }

        if(e.keyCode==38){//向上键
            if($('#auto_complete').html().length<1) return;
            $('#auto_complete').removeClass('hidden');
            result_count = $('#auto_complete li.result').size();
            if(current_index<=0) current_index=result_count;
            $('#auto_complete li.result').mouseout();
            $($('#auto_complete li.result')[--current_index]).mouseover();
        }
    });
});