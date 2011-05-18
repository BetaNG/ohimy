OMTEMPLATE = {
	lightBox_f : '<div id="{id}" class="light_box"><div></div><iframe \
		frameborder="0" scrolling="no" class="lb_fix"></iframe><div><table \
	 class="lb_wrap"><tbody><tr><td class="topleft"></td><td \
	 class="border"></td><td class="topright"></td></tr><tr><td \
	 class="border"></td><td class="content r10"><div class="lb_hd">{title}<a \
	 href="javascript:;" class="lb_close" ></a></div><div \
	 class="lb_bd">{body}</div></td><td class="border"></td></tr><tr><td \
	 class="bottomleft"></td><td class="border"></td><td \
	 class="bottomright"></td></tr></tbody></table></div></div>',
	lightBox : '<div><table class="lb_wrap"><tbody><tr><td class="topleft"></td><td class="border"></td><td class="topright"></td></tr><tr><td class="border"></td><td class="content r10"><div class="lb_hd"><a href="javascript:;" class="lb_close" ></a></div><div class="lb_bd">{body}</div></td><td class="border"></td></tr><tr><td class="bottomleft"></td><td class="border"></td><td class="bottomright"></td></tr></tbody></table></div>',
	lightBoxLoading : '<div class="lb_loading"><img class="fl" src="../images/loading.gif">\u8bf7\u7a0d\u540e......\uff08<a class="lb_cs" href="javascript:;">\u53d6\u6d88</a>\uff09</div>',
	addPicUp : '<div class="pic_box"><span>\u9009\u62e9\u60a8\u8981\u4e0a\u4f20\u7684\u56fe\u7247\uff08\u652f\u6301GIF/JPG/PNG\uff0c\u6700\u59272M\uff09\u3002</span><form enctype="multipart/form-data" method="POST" action="/gall/addpic" id="new_attachment_form"><input type="hidden" name="authenticity_token" id="picup_auth"><input class="gray_button r3" value="\u4ece\u7535\u8111\u4e2d\u9009\u62e9\u56fe\u7247..." type="button"><input class="tfile" name="attachment[attachment]" type="file"></form></div>',
	picFeed : '<li iid="{id}" class="p_f"><div class="r5"><a href="javascript:;" class="del"></a><img src="{src}" class="i"></div></li>',
	goodsFeed : '<li iid="{id}" class="g_f"><div class="r5 g"><a href="javascript:;" class="del"></a><img src="{src}" class="i"><img src="../images/goods_tag.png" class="tag" alt=""></div></li>',
	addGoodsStart : '<div class="goods_box"><span>\u5c06\u5546\u54c1\u7f51\u5740\u7c98\u8d34\u5230\u4e0b\u9762\u6846\u4e2d\u5373\u53ef\u3002</span><div style="overflow:hidden;zoom:1"><input class="g_url fl rl3" type="text" ><input class="g_s fl rr3" value="\u786e \u5b9a" type="button"></div><div class="support">\u5df2\u652f\u6301\u4ee5\u4e0b\u7f51\u7ad9\uff08<a class="in" href="mailto:service@mogujie.com">\u5546\u5bb6\u7533\u8bf7\u52a0\u5165</a>\uff09\uff1a<p><a style="background-image:url(../images/taobao.gif);" href="http://www.taobao.com/" target="_blank">\u6dd8\u5b9d</a><a style="background-image:url(../images/paipai.gif);" href="http://www.paipai.com/" target="_blank">\u62cd\u62cd</a><a style="background-image:url(../images/dangdang.gif);" href="http://www.dangdang.com/" target="_blank">\u5f53\u5f53</a><a style="background-image:url(../images/vancl.gif);" href="http://www.vancl.com/" target="_blank">\u51e1\u5ba2</a><a style="background-image:url(../images/360buy.gif);" href="http://www.360buy.com/" target="_blank">\u4eac\u4e1c</a><a style="background-image:url(../images/topshop.gif);" href="http://www.topshop.com/" target="_blank">TopShop</a><a style="background-image:url(../images/caomeipai.gif);" href="http://buy.caomeipai.com/" target="_blank">\u8349\u8393\u6d3e</a></p></div></div>',
	addGoodsResult : '<div class="goods_box_r"><img src="{src}"><p>{title}<span>{price}</span></p><input type="button" class="g_a r3" value="\u786e\u3000\u5b9a\uff083\uff09" /></div>',
	addShopUp : '<div class="shop_box"><span>\u5c06\u5e97\u94fa\u7f51\u5740\u7c98\u8d34\u5230\u4e0b\u9762\u6846\u4e2d\u5373\u53ef\u3002\uff08\u76ee\u524d\u53ea\u652f\u6301\u6dd8\u5b9d\u5e97\u94fa\uff09</span><div><input class="s_url fl rl3" type="text"><input class="s_s fl rr3" value="\u786e \u5b9a" type="button"></div></div> ',
	pub_goods_step1 : '<div class="pub_goods_s1"><input type="text" class="pgs1_txt fl rl3" value="\u5c06\u5546\u54c1\u7f51\u5740\u7c98\u8d34\u5728\u6b64\u5373\u53ef"/><input type="button" class="pgs1_btn fl rr3" value="\u786e\u5b9a" /><div class="goods_support">\u5df2\u652f\u6301\u7f51\u7ad9\uff1a<img src="../images/taobao.gif"><a href="http://www.taobao.com/" target="_blank">\u6dd8\u5b9d</a><img src="../images/paipai.gif"><a href="http://www.paipai.com/" target="_blank">\u62cd\u62cd</a><img src="../images/dangdang.gif"><a href="http://www.dangdang.com/" target="_blank">\u5f53\u5f53</a><img src="../images/vancl.gif"><a href="http://www.vancl.com/" target="_blank">\u51e1\u5ba2</a><img src="../images/360buy.gif"><a href="http://www.360buy.com/" target="_blank">\u4eac\u4e1c</a><img src="../images/topshop.gif"><a href="http://www.topshop.com/" target="_blank">TopShop</a><img src="../images/caomeipai.gif"><a href="http://buy.caomeipai.com/" target="_blank">\u8349\u8393\u6d3e</a></div></div>',
	pub_goods_step2 : '<div class="pub_goods_s2"><div class="pis2_img fl r5"><img class="r5" src="{img_src}"><img class="g_tag" src="../images/goods_tag_w.png"></div><div class="pis2_detail"><a class="pgs2_title" target="_blank" href="{goods_url}">{goods_title}</a><textarea id="pub_content2" class="pis2_txt r5">\u8bf4\u8bf4\u4f60\u7684\u63a8\u8350\u7406\u7531</textarea><div class="mt10"><div class="fl"><input type="button" value="\u53d1\u8868" id="pub_submit2" class="pis2_btn r5"/><a href="javascript:;" id="pub_cancel2" class="pis2_cancel">\u53d6\u6d88</a></div><div class="pub_out pis2_out fr">{sync_setting}</div></div></div></div>',
	pub_pic_step1 : '<div class="pub_pic_s1"><form id="picUploadForm2" action="/gall/addpic" method="POST" enctype="multipart/form-data">\u9009\u62e9\u60a8\u8981\u4e0a\u4f20\u7684\u56fe\u7247\uff08\u652f\u6301GIF/JPG/PNG\uff0c\u6700\u59272M\uff09<br><input type="hidden" name="pub_pic" value=""><input type="hidden" name="authenticity_token" id="pub_pic_auth"><input type="button" value="\u4ece\u7535\u8111\u4e2d\u9009\u62e9\u56fe\u7247..." class="pps1_btn r5"><input class="tfile" id="attachment_attachment" name="attachment[attachment]" type="file"></form></div>',
	pub_pic_step2 : '<div class="pub_pics_s2"><div class="pis2_img fl r5"><img class="r5" src="{imgs_src}"></div><div class="pis2_detail"><textarea id="pub_content3" class="pis2_txt r5">\u7ed9\u7167\u7247\u52a0\u4e0a\u4ecb\u7ecd\u5427</textarea><div class="mt10"><div class="fl"><input type="button" id="pub_submit3" value="\u53d1\u8868" class="pis2_btn r5"/><a href="javascript:;" id="pub_cancel3" class="pis2_cancel">\u53d6\u6d88</a></div><div class="pub_out pis2_out fr">{sync_setting}</div></div></div></div><div class="pub_pics_s2_goods rb5"><ul><li class="pps2g_add">\u5982\u679c\u7167\u7247\u4e2d\u6709\u7f51\u8d2d\u7684\u5546\u54c1\uff0c\u60a8\u53ef\u4ee5\u4e3a\u5b83\u6dfb\u52a0\u8d2d\u4e70\u94fe\u63a5\u3002<a class="pps2g_add_btn r5 mt10" href="javascript:;">\u6dfb\u52a0\u94fe\u63a5</a></li></ul></div>',
	pub_pic_step2_add_goods_step1 : '<li class="pps2g_add">{add_des}<a class="pps2g_add_btn r5 {mt10}" href="javascript:;">\u6dfb\u52a0\u94fe\u63a5</a></li>',
	pub_pic_step2_add_goods_step2 : '<li class="pps2g_input"><input class="pps2g_txt fl rl3" value="\u5c06\u5546\u54c1\u7f51\u5740\u7c98\u8d34\u5728\u6b64\u5373\u53ef" type="text"><input class="pps2g_btn fl rr3" value="\u786e\u5b9a" type="button"><div class="goods_support">\u5df2\u652f\u6301\u7f51\u7ad9\uff1a<img src="../images/taobao.gif"><a href="http://www.taobao.com/" target="_blank">\u6dd8\u5b9d</a><img src="../images/paipai.gif"><a href="http://www.paipai.com/" target="_blank">\u62cd\u62cd</a><img src="../images/dangdang.gif"><a href="http://www.dangdang.com/" target="_blank">\u5f53\u5f53</a><img src="../images/vancl.gif"><a href="http://www.vancl.com/" target="_blank">\u51e1\u5ba2</a><img src="../images/360buy.gif"><a href="http://www.360buy.com/" target="_blank">\u4eac\u4e1c</a><img src="../images/topshop.gif"><a href="http://www.topshop.com/" target="_blank">TopShop</a><img src="../images/caomeipai.gif"><a href="http://buy.caomeipai.com/" target="_blank">\u8349\u8393\u6d3e</a></div></li>',
	pub_pic_step2_goods_feed : '<li class="pps2g_feed"><img class="pps2g_cancel" gid="{goods_id}" src="../images/close_13x13_p.png"><div class="fl r3 pps2g_img"><img class="r3" src="{img_src}"></div><div class="pps2g_inf"><a class="pps2g_title" target="_blank" href="{goods_url}">{goods_title}</a>\uffe5{goods_price}</div></li>'
}
// search highlight & etc
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

function scrollToSearch() {
	$.scrollTo(0, 300);
	searchFocus();
	$('#search_query').focus();
}

function getPageScroll() {
	var xScroll, yScroll;
	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
		xScroll = self.pageXOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) { // Explorer
		// 6
		// Strict
		yScroll = document.documentElement.scrollTop;
		xScroll = document.documentElement.scrollLeft;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
		xScroll = document.body.scrollLeft;
	}
	return new Array(xScroll, yScroll)
}

// Adapted from getPageSize() by quirksmode.com
function getPageHeight() {
	var windowHeight
	if (self.innerHeight) { // all except Explorer
		windowHeight = self.innerHeight;
	} else if (document.documentElement
			&& document.documentElement.clientHeight) { // Explorer 6 Strict
		// Mode
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowHeight = document.body.clientHeight;
	}
	return windowHeight
}
// DOM loaded
$(function() {
	// 图片延迟加载
	$("img").lazyload({
		placeholder : "/images/loading2.gif",
		threshold : 200,
		effect : "fadeIn"
	});
	$token = $("meta[name=csrf-token]").attr("content")
	// scroll to search & focus
	$('.scroll_to_search').click(function(e) {
		scrollToSearch();
	});

	// back to top... smoothly
	$('#top_anchor').click(function(e) {
		e.preventDefault();
		$.scrollTo(0, 300);
	});

	// 新幻灯
	$(".slidetabs").tabs(".images > div", {
		effect : 'fade',
		fadeOutSpeed : 200,
		rotate : true
	}).slideshow({
		autoplay : true,
		interval : 5000,
		clickable : false
	});

	// 最近浏览
	$("#recent_button").click(function(e) {
		e.preventDefault();
		$('#recent_history').toggleClass('hidden');
		$(this).toggleClass("unfold").blur();
		var $wrap = $('#recent_history').find('.recent_inner');
		if ($.trim($wrap.html()) == '') {
			$wrap.addClass('loading');
			$.post('/request/recent_view', function(data) {
				$wrap.html(data).removeClass('loading');
			});
		}
		e.preventDefault();
		return false;
	});

	// 首页 timeline hover
	$('#index_timeline li .share_content, #wcs_timeline li .share_content')
			.live('mouseover', function() {
				$(this).parent().addClass("active");
			}).live('mouseout', function() {
				$(this).parent().removeClass("active");
			});

	// 载入更多
	$("a.bot_more").click(function() {
		$(this).addClass("loading").text("正在载入...");
		alert("ws")
		return false;
	});

	var timer = null;
	var key = '';
	var result_count = 0;
	var current_index = -1;
	var bind_name = 'input';
	if (navigator.userAgent.indexOf("MSIE") != -1) {
		bind_name = 'propertychange';
	}

	var path_name = window.location.pathname, globel_channel_name = 'unknown';
	if (path_name == '/') {
		globel_channel_name = 'index';
	} else {
		var mt = /\/([a-zA-Z]*)\/?.*/.exec(path_name);
		if (mt) {
			globel_channel_name = mt[1];
		}
	}

	// $('#search').submit(function(){return false;});
	$('#search_query')
			.bind(
					bind_name,
					function() {
						// var timestamp = (new Date()).valueOf();
						var $this = $(this);
						var val = $.trim($this.val());
						if (val == key)
							return;
						key = val;
						if (timer != null)
							clearTimeout(timer);
						if (val.length < 1) {
							$('#auto_complete').html('').addClass('hidden');
							return;
						}

						timer = setTimeout(
								function() {
									$
											.ajax({
												type : 'GET',
												url : '/ajax/search-index',
												dataType : 'html',
												data : {
													key : val
												},
												beforeSend : function() {
													$("#search_btn").addClass(
															'loading');
												},
												success : function(data) {
													$("#search_btn")
															.removeClass(
																	'loading');
													if (data != '') {
														result_count = 0;
														current_index = -1;
														$('#auto_complete')
																.html(data)
																.removeClass(
																		'hidden');
														$(
																'#auto_complete li.result')
																.hover(
																		function() {
																			$(
																					this)
																					.addClass(
																							"selected");
																		},
																		function() {
																			$(
																					this)
																					.removeClass(
																							"selected");
																		});
														// 跳转统计
														var result_links = $('#auto_complete li.result a'), result_link_c = result_links ? result_links.length
																: 0;
														var pattern = /\/(artist|song|album)\/\d+/, refstr = 'ref=ac-'
																+ globel_channel_name;
														for ( var i = 0; i < result_link_c; i++) {
															var link = $(result_links[i]), href = link
																	.attr('href');
															if (pattern
																	.exec(href)) {
																link
																		.attr(
																				'href',
																				href
																						+ '?'
																						+ refstr)
															}
														}
													}
												}
											});
								}, 500);
					});

	$('#search_query').keydown(function(e) {
		if (e.keyCode == 27) {// esc
			$('#auto_complete').addClass('hidden');
		}

		if (e.keyCode == 13) {// enter
			if (current_index >= 0) {
				var li = $('#auto_complete li.result').get(current_index);
				var href = $(li).find('a').attr('href');
				window.location = href;
				return false;
			} else {
				return true;
			}

		}

		if (e.keyCode == 40) {// 向下键
			if ($('#auto_complete').html().length < 1)
				return;
			$('#auto_complete').removeClass('hidden');
			result_count = $('#auto_complete li.result').size();
			if (current_index >= result_count - 1)
				current_index = -1;
			$('#auto_complete li.result').mouseout();
			$($('#auto_complete li.result')[++current_index]).mouseover();
		}

		if (e.keyCode == 38) {// 向上键
			if ($('#auto_complete').html().length < 1)
				return;
			$('#auto_complete').removeClass('hidden');
			result_count = $('#auto_complete li.result').size();
			if (current_index <= 0)
				current_index = result_count;
			$('#auto_complete li.result').mouseout();
			$($('#auto_complete li.result')[--current_index]).mouseover();
		}
	});

	/* 导航下拉菜单 */
	$('.show_nhsysMenu').click(function() {
		if (!($(this).parent().next().css('display') == 'block')) {
			$('.nhsys_menu:visible').hide();
			$('.nh_sys_menu').removeClass('nh_selected');
			$(this).parent().next().slideDown('fast');
			if ($(this).hasClass('show_nhsysMenu')) {
				$(this).parent().parent().addClass('nh_selected');
			} else {
				$(this).parent().parent().addClass('selected');
			}
			return false;
		} else {
			$('.nhsys_menu:visible').hide();
			$('.nh_sys_menu').removeClass('nh_selected');
			return false;
		}
	});

	$('body').click(function(e) {
		$('.nhsys_menu:visible').hide();
		$('.nh_sys_menu').removeClass('nh_selected');
		$('#recent_history').addClass('hidden');
		$("#recent_button").removeClass('unfold');
	});
	/**/

	/* 用户下拉菜单 */
	$('#n_header_user b').mouseover(function() {
		$(this).addClass('hover');
	}).click(function() {
		$(this).addClass('click');
		$('#n_header_user dd').show();
	});

	$('#n_header_user').mouseleave(function() {
		$('#n_header_user b').removeClass();
		$(this).find('dd').hide();
	});
	/**/

	/* twitter */
	$(".pic div").live("click", function() {
		var n_index = $(this).index() // 第n张图片
		$hideDiv = $(this).parent().next()
		$(this).parent().hide()
		$hideDiv.find("li").eq(n_index).show()
	})

	$(".pic_b li").live("click", function() {
		$showDiv = $(this).parent().prev()
		$(this).hide()
		$showDiv.show()
	})
	$(".t_type li").live("click", function() {
		$(".pub_img").html("")
		$(".pub_txt").val("")
		$(".pgs1_txt").val("")
		$(".light_box").remove()
		$(".t_type li").removeClass('c');
		$(this).addClass('c');
		$("div[class*='pub_type']").hide()
		$(".pub_type" + $(this).index()).show()
	})
	$(".pub_opt a").live("click", function() {
		$(".light_box").remove()
	})
	$(".lb_close").live("click", function() {
		$(".light_box").remove()
	})
	$(".fw_cancel").live("click", function() {
		$(".light_box").remove()
	})
	$(".pis2_cancel").live("click", function() {
		$(".light_box").remove()
	})
	$(".add_face").live("click", function() {
		$.post("/lightbox/face", {}, function(data) {
			$("#lb_face").html(data).show()
		})
	})
	$(".add_goods").live(
			"click",
			function() {
				var lb_goods = OMTEMPLATE.lightBox_f.replace(/{title}/g, '')
						.replace(/{id}/g, "lb_goods").replace(/{body}/g,
								OMTEMPLATE.addGoodsStart);
				$("body").append(lb_goods)
				$("#lb_goods").show().css({
					top : 295,
					left : 320
				})
			})
	$(".add_pic").live(
			"click",
			function() {
				var lb_pic = OMTEMPLATE.lightBox_f.replace(/{title}/g, '')
				.replace(/{id}/g, "lb_pic").replace(/{body}/g,
						OMTEMPLATE.addPicUp);
				$("body").append(lb_pic)
				$("#lb_pic").show().css({
					top : 295,
					left : 370
				})
			})
	$(".pgs1_btn").live("click", function() {
		$.post("/gall/get_item_from_url", {
			url : $(".pgs1_txt").val(),
			tplt : "lb",
			authenticity_token : $token
		}, function(data) {
			$(".pub_type1").html(data)
		})
	})
	$(".pub_img .g_f .del").live("click", function() {
		$(this).parents("li").remove()
	})
	$(".pub_img .p_f .del").live("click", function() {
		$(this).parents("li").remove()
	})
	$(".g_s")
			.live(
					"click",
					function() {
						var t_url = $(".g_url").val()
						$(".goods_box")
								.html(
										'<div class="lb_loading"><img class="fl" src="/images/loading.gif">请稍后......（<a class="lb_cs" href="javascript:;">取消</a>）</div>')
						$.post("/gall/get_item_from_url", {
							url : t_url,
							tplt : "pub",
							authenticity_token : $token
						}, function(data) {
							$(".goods_box").parent().html(data)
						})
					})

	// twitter提交
	$("#pub_submit1").live("click", function() {
		var _num_iids = []
		var _pic_ids = []
		var _content = $("#pub_content1").val()
		$(".pub_img li").each(function() {
			if ($(this).attr("iid")) {
				_num_iids.push($(this).attr("iid"))
			}
			if ($(this).attr("pid")) {
				_pic_ids.push($(this).attr("pid"))
			}
		});
		$.post("/gall/create", {
			num_iids : _num_iids,
			pic_ids : _pic_ids,
			content : _content,
			authenticity_token : $token
		}, function(data) {
			$(".pub_img").empty()
			$(".pub_txt").val("")
			$("#wc_share .t_l").prepend(data)
			$count.html("0")
		})
	})
	$(".pps1_btn").live("click", function() {
		$(".tfile").trigger("click")
	})
	$("#picUploadForm2 .tfile").live("change", function() {
		$("#pub_pic_auth").val($token)
		setTimeout(function() {
			$("#picUploadForm2").ajaxSubmit(function(data) {
				$(".pub_type2").html(data)
			})
		}, 500)
	});
	$(".gray_button").live("click", function() {
		$(".tfile").trigger("click")
	})
	$("#new_attachment_form .tfile").live("change", function() {
		$("#picup_auth").val($token)
		setTimeout(function() {
			$("#new_attachment_form").ajaxSubmit(function(data) {
				$(".pub_img").append(data)
				$(".pub_img").show()
				$(".light_box").remove()
			})
		}, 500)
	});
	$("#pub_submit3").live("click", function() {
		var _content = $("#pub_content3").val()
		var _pic_ids = []
		_pic_ids.push($("#pub_pic_ids").val())
		$.post("/gall/create", {
			pic_ids : _pic_ids,
			content : _content,
			authenticity_token : $token
		}, function(data) {
			$(".pub_type2").html(OMTEMPLATE.pub_pic_step1)
			$("#wc_share .t_l").prepend(data)
		})
	})
	/* 评论 */
	$(".cmt").live("click", function() {
		$(this).parent().next().toggle()
	})
	/* 转发 */
	$(".fw")
			.live(
					"click",
					function() {
						var fw = OMTEMPLATE.lightBox_f
								.replace(/{title}/g,
										'<span class="lb_title">\u8f6c\u53d1\u7ed9\u6211\u7684\u7c89\u4e1d</span>')
								.replace(/{id}/g, "lb_forward").replace(
										/{body}/g, OMTEMPLATE.lightBoxLoading);
						$("body").append(fw)
						$("#lb_forward").show().css(
								{
									top : getPageScroll()[1] + getPageHeight()
											/ 10 + 100,
									left : 460
								})
						$.post("/gall/to_forward", {
							id : $(this).attr("w"),
							authenticity_token : $token
						}, function(data) {
							$("#lb_forward").find(".lb_bd").html(data)
						})
					})
	// 字数统计
	var $textarea_tweet = $('textarea');
	var $count = $('.word_count i');
	$textarea_tweet.live(
			"keyup",
			function(e) {
				var num = $textarea_tweet.val().length;
				if (num > 140)
					$count.html('<span style="color:red">' + num.toString()
							+ '</span>');
				else
					$count.html(num.toString());
			}).trigger('keyup')
});