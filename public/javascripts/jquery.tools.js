/**
 * @license jQuery Tools 1.2.5 Tabs- The basics of UI design.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tabs/
 * 
 * Since: November 2008 Date: Wed Sep 22 06:02:10 2010 +0000
 */
(function($) {

	// static constructs
	$.tools = $.tools || {
		version : '1.2.5'
	};

	$.tools.tabs = {

		conf : {
			tabs : 'a',
			current : 'current',
			onBeforeClick : null,
			onClick : null,
			effect : 'default',
			initialIndex : 0,
			event : 'click',
			rotate : false,

			// 1.2
			history : false
		},

		addEffect : function(name, fn) {
			effects[name] = fn;
		}

	};

	var effects = {

		// simple "toggle" effect
		'default' : function(i, done) {
			this.getPanes().hide().eq(i).show();
			done.call();
		},

		/*
		 * configuration: - fadeOutSpeed (positive value does "crossfading") -
		 * fadeInSpeed
		 */
		fade : function(i, done) {

			var conf = this.getConf(), speed = conf.fadeOutSpeed, panes = this
					.getPanes();

			if (speed) {
				panes.fadeOut(speed);
			} else {
				panes.hide();
			}

			panes.eq(i).fadeIn(conf.fadeInSpeed, done);
		},

		// for basic accordions
		slide : function(i, done) {
			this.getPanes().slideUp(200);
			this.getPanes().eq(i).slideDown(400, done);
		},

		/**
		 * AJAX effect
		 */
		ajax : function(i, done) {
			this.getPanes().eq(0).load(this.getTabs().eq(i).attr("href"), done);
		}
	};

	var w;

	/**
	 * Horizontal accordion
	 * 
	 * @deprecated will be replaced with a more robust implementation
	 */
	$.tools.tabs.addEffect("horizontal", function(i, done) {

		// store original width of a pane into memory
		if (!w) {
			w = this.getPanes().eq(0).width();
		}

		// set current pane's width to zero
		this.getCurrentPane().animate({
			width : 0
		}, function() {
			$(this).hide();
		});

		// grow opened pane to it's original width
		this.getPanes().eq(i).animate({
			width : w
		}, function() {
			$(this).show();
			done.call();
		});

	});

	function Tabs(root, paneSelector, conf) {

		var self = this, trigger = root.add(this), tabs = root.find(conf.tabs), panes = paneSelector.jquery ? paneSelector
				: root.children(paneSelector), current;

		// make sure tabs and panes are found
		if (!tabs.length) {
			tabs = root.children();
		}
		if (!panes.length) {
			panes = root.parent().find(paneSelector);
		}
		if (!panes.length) {
			panes = $(paneSelector);
		}

		// public methods
		$.extend(this, {
			click : function(i, e) {

				var tab = tabs.eq(i);

				if (typeof i == 'string' && i.replace("#", "")) {
					tab = tabs.filter("[href*=" + i.replace("#", "") + "]");
					i = Math.max(tabs.index(tab), 0);
				}

				if (conf.rotate) {
					var last = tabs.length - 1;
					if (i < 0) {
						return self.click(last, e);
					}
					if (i > last) {
						return self.click(0, e);
					}
				}

				if (!tab.length) {
					if (current >= 0) {
						return self;
					}
					i = conf.initialIndex;
					tab = tabs.eq(i);
				}

				// current tab is being clicked
				if (i === current) {
					return self;
				}

				// possibility to cancel click action
				e = e || $.Event();
				e.type = "onBeforeClick";
				trigger.trigger(e, [ i ]);
				if (e.isDefaultPrevented()) {
					return;
				}

				// call the effect
				effects[conf.effect].call(self, i, function() {

					// onClick callback
					e.type = "onClick";
					trigger.trigger(e, [ i ]);
				});

				// default behaviour
				current = i;
				tabs.removeClass(conf.current);
				tab.addClass(conf.current);

				return self;
			},

			getConf : function() {
				return conf;
			},

			getTabs : function() {
				return tabs;
			},

			getPanes : function() {
				return panes;
			},

			getCurrentPane : function() {
				return panes.eq(current);
			},

			getCurrentTab : function() {
				return tabs.eq(current);
			},

			getIndex : function() {
				return current;
			},

			next : function() {
				return self.click(current + 1);
			},

			prev : function() {
				return self.click(current - 1);
			},

			destroy : function() {
				tabs.unbind(conf.event).removeClass(conf.current);
				panes.find("a[href^=#]").unbind("click.T");
				return self;
			}

		});

		// callbacks
		$.each("onBeforeClick,onClick".split(","), function(i, name) {

			// configuration
			if ($.isFunction(conf[name])) {
				$(self).bind(name, conf[name]);
			}

			// API
			self[name] = function(fn) {
				if (fn) {
					$(self).bind(name, fn);
				}
				return self;
			};
		});

		if (conf.history && $.fn.history) {
			$.tools.history.init(tabs);
			conf.event = 'history';
		}

		// setup click actions for each tab
		tabs.each(function(i) {
			$(this).bind(conf.event, function(e) {
				self.click(i, e);
				return e.preventDefault();
			});
		});

		// cross tab anchor link
		panes.find("a[href^=#]").bind("click.T", function(e) {
			self.click($(this).attr("href"), e);
		});

		// open initial tab
		if (location.hash && conf.tabs == "a"
				&& root.find("[href=" + location.hash + "]").length) {
			self.click(location.hash);

		} else {
			if (conf.initialIndex === 0 || conf.initialIndex > 0) {
				self.click(conf.initialIndex);
			}
		}

	}

	// jQuery plugin implementation
	$.fn.tabs = function(paneSelector, conf) {

		// return existing instance
		var el = this.data("tabs");
		if (el) {
			el.destroy();
			this.removeData("tabs");
		}

		if ($.isFunction(conf)) {
			conf = {
				onBeforeClick : conf
			};
		}

		// setup conf
		conf = $.extend({}, $.tools.tabs.conf, conf);

		this.each(function() {
			el = new Tabs($(this), paneSelector, conf);
			$(this).data("tabs", el);
		});

		return conf.api ? el : this;
	};

})(jQuery);

/**
 * @license jQuery Tools 1.2.5 Slideshow - Extend it.
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/tabs/slideshow.html
 * 
 * Since: September 2009 Date: Wed Sep 22 06:02:10 2010 +0000
 */
(function($) {

	var tool;

	tool = $.tools.tabs.slideshow = {

		conf : {
			next : '.forward',
			prev : '.backward',
			disabledClass : 'disabled',
			autoplay : false,
			autopause : true,
			interval : 3000,
			clickable : true,
			api : false
		}
	};

	function Slideshow(root, conf) {

		var self = this, fire = root.add(this), tabs = root.data("tabs"), timer, stopped = true;

		// next / prev buttons
		function find(query) {
			var el = $(query);
			return el.length < 2 ? el : root.parent().find(query);
		}

		var nextButton = find(conf.next).click(function() {
			tabs.next();
		});

		var prevButton = find(conf.prev).click(function() {
			tabs.prev();
		});

		// extend the Tabs API with slideshow methods
		$.extend(self, {

			// return tabs API
			getTabs : function() {
				return tabs;
			},

			getConf : function() {
				return conf;
			},

			play : function() {

				// do not start additional timer if already exists
				if (timer) {
					return self;
				}

				// onBeforePlay
				var e = $.Event("onBeforePlay");
				fire.trigger(e);
				if (e.isDefaultPrevented()) {
					return self;
				}

				// construct new timer
				timer = setInterval(tabs.next, conf.interval);
				stopped = false;

				// onPlay
				fire.trigger("onPlay");

				return self;
			},

			pause : function() {

				if (!timer) {
					return self;
				}

				// onBeforePause
				var e = $.Event("onBeforePause");
				fire.trigger(e);
				if (e.isDefaultPrevented()) {
					return self;
				}

				timer = clearInterval(timer);

				// onPause
				fire.trigger("onPause");

				return self;
			},

			// when stopped - mouseover won't restart
			stop : function() {
				self.pause();
				stopped = true;
			}

		});

		// callbacks
		$.each("onBeforePlay,onPlay,onBeforePause,onPause".split(","),
				function(i, name) {

					// configuration
					if ($.isFunction(conf[name])) {
						$(self).bind(name, conf[name]);
					}

					// API methods
					self[name] = function(fn) {
						return $(self).bind(name, fn);
					};
				});

		/* when mouse enters, slideshow stops */
		if (conf.autopause) {
			tabs.getTabs().add(nextButton).add(prevButton).add(tabs.getPanes())
					.hover(self.pause, function() {
						if (!stopped) {
							self.play();
						}
					});
		}

		if (conf.autoplay) {
			self.play();
		}

		if (conf.clickable) {
			tabs.getPanes().click(function() {
				tabs.next();
			});
		}

		// manage disabling of next/prev buttons
		if (!tabs.getConf().rotate) {

			var disabled = conf.disabledClass;

			if (!tabs.getIndex()) {
				prevButton.addClass(disabled);
			}

			tabs.onBeforeClick(function(e, i) {
				prevButton.toggleClass(disabled, !i);
				nextButton
						.toggleClass(disabled, i == tabs.getTabs().length - 1);
			});
		}
	}

	// jQuery plugin implementation
	$.fn.slideshow = function(conf) {

		// return existing instance
		var el = this.data("slideshow");
		if (el) {
			return el;
		}

		conf = $.extend({}, tool.conf, conf);

		this.each(function() {
			el = new Slideshow($(this), conf);
			$(this).data("slideshow", el);
		});

		return conf.api ? el : this;
	};

})(jQuery);

/**
 * @license jQuery Tools 1.2.5 / Flashembed - New wave Flash embedding
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/toolbox/flashembed.html
 * 
 * Since : March 2008 Date : Wed Sep 22 06:02:10 2010 +0000
 */
(function() {

	var IE = document.all, URL = 'http://www.adobe.com/go/getflashplayer', JQUERY = typeof jQuery == 'function', RE = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/, GLOBAL_OPTS = {
		// very common opts
		width : '100%',
		height : '100%',
		id : "_" + ("" + Math.random()).slice(9),

		// flashembed defaults
		allowfullscreen : true,
		allowscriptaccess : 'always',
		quality : 'high',

		// flashembed specific options
		version : [ 3, 0 ],
		onFail : null,
		expressInstall : null,
		w3c : false,
		cachebusting : false
	};

	// version 9 bugfix:
	// (http://blog.deconcept.com/2006/07/28/swfobject-143-released/)
	if (window.attachEvent) {
		window.attachEvent("onbeforeunload", function() {
			__flash_unloadHandler = function() {
			};
			__flash_savedUnloadHandler = function() {
			};
		});
	}

	// simple extend
	function extend(to, from) {
		if (from) {
			for ( var key in from) {
				if (from.hasOwnProperty(key)) {
					to[key] = from[key];
				}
			}
		}
		return to;
	}

	// used by asString method
	function map(arr, func) {
		var newArr = [];
		for ( var i in arr) {
			if (arr.hasOwnProperty(i)) {
				newArr[i] = func(arr[i]);
			}
		}
		return newArr;
	}

	window.flashembed = function(root, opts, conf) {

		// root must be found / loaded
		if (typeof root == 'string') {
			root = document.getElementById(root.replace("#", ""));
		}

		// not found
		if (!root) {
			return;
		}

		if (typeof opts == 'string') {
			opts = {
				src : opts
			};
		}

		return new Flash(root, extend(extend({}, GLOBAL_OPTS), opts), conf);
	};

	// flashembed "static" API
	var f = extend(
			window.flashembed,
			{

				conf : GLOBAL_OPTS,

				getVersion : function() {
					var fo, ver;

					try {
						ver = navigator.plugins["Shockwave Flash"].description
								.slice(16);
					} catch (e) {

						try {
							fo = new ActiveXObject(
									"ShockwaveFlash.ShockwaveFlash.7");
							ver = fo && fo.GetVariable("$version");

						} catch (err) {
							try {
								fo = new ActiveXObject(
										"ShockwaveFlash.ShockwaveFlash.6");
								ver = fo && fo.GetVariable("$version");
							} catch (err2) {
							}
						}
					}

					ver = RE.exec(ver);
					return ver ? [ ver[1], ver[3] ] : [ 0, 0 ];
				},

				asString : function(obj) {

					if (obj === null || obj === undefined) {
						return null;
					}
					var type = typeof obj;
					if (type == 'object' && obj.push) {
						type = 'array';
					}

					switch (type) {

					case 'string':
						obj = obj.replace(new RegExp('(["\\\\])', 'g'), '\\$1');

						// flash does not handle %- characters well. transforms
						// "50%" to "50pct" (a dirty hack, I admit)
						obj = obj.replace(/^\s?(\d+\.?\d+)%/, "$1pct");
						return '"' + obj + '"';

					case 'array':
						return '[' + map(obj, function(el) {
							return f.asString(el);
						}).join(',') + ']';

					case 'function':
						return '"function()"';

					case 'object':
						var str = [];
						for ( var prop in obj) {
							if (obj.hasOwnProperty(prop)) {
								str.push('"' + prop + '":'
										+ f.asString(obj[prop]));
							}
						}
						return '{' + str.join(',') + '}';
					}

					// replace ' --> " and remove spaces
					return String(obj).replace(/\s/g, " ").replace(/\'/g, "\"");
				},

				getHTML : function(opts, conf) {

					opts = extend({}, opts);

					/** ***** OBJECT tag and it's attributes ****** */
					var html = '<object width="' + opts.width + '" height="'
							+ opts.height + '" id="' + opts.id + '" name="'
							+ opts.id + '"';

					if (opts.cachebusting) {
						opts.src += ((opts.src.indexOf("?") != -1 ? "&" : "?") + Math
								.random());
					}

					if (opts.w3c || !IE) {
						html += ' data="' + opts.src
								+ '" type="application/x-shockwave-flash"';
					} else {
						html += ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
					}

					html += '>';

					/** ***** nested PARAM tags ****** */
					if (opts.w3c || IE) {
						html += '<param name="movie" value="' + opts.src
								+ '" />';
					}

					// not allowed params
					opts.width = opts.height = opts.id = opts.w3c = opts.src = null;
					opts.onFail = opts.version = opts.expressInstall = null;

					for ( var key in opts) {
						if (opts[key]) {
							html += '<param name="' + key + '" value="'
									+ opts[key] + '" />';
						}
					}

					/** ***** FLASHVARS ****** */
					var vars = "";

					if (conf) {
						for ( var k in conf) {
							if (conf[k]) {
								var val = conf[k];
								vars += k
										+ '='
										+ (/function|object/.test(typeof val) ? f
												.asString(val)
												: val) + '&';
							}
						}
						vars = vars.slice(0, -1);
						html += '<param name="flashvars" value=\'' + vars
								+ '\' />';
					}

					html += "</object>";

					return html;
				},

				isSupported : function(ver) {
					return VERSION[0] > ver[0] || VERSION[0] == ver[0]
							&& VERSION[1] >= ver[1];
				}

			});

	var VERSION = f.getVersion();

	function Flash(root, opts, conf) {

		// version is ok
		if (f.isSupported(opts.version)) {
			root.innerHTML = f.getHTML(opts, conf);

			// express install
		} else if (opts.expressInstall && f.isSupported([ 6, 65 ])) {
			root.innerHTML = f.getHTML(extend(opts, {
				src : opts.expressInstall
			}), {
				MMredirectURL : location.href,
				MMplayerType : 'PlugIn',
				MMdoctitle : document.title
			});

		} else {

			// fail #2.1 custom content inside container
			if (!root.innerHTML.replace(/\s/g, '')) {
				root.innerHTML = "<h2>Flash version "
						+ opts.version
						+ " or greater is required</h2>"
						+ "<h3>"
						+ (VERSION[0] > 0 ? "Your version is " + VERSION
								: "You have no flash plugin installed")
						+ "</h3>"
						+

						(root.tagName == 'A' ? "<p>Click here to download latest version</p>"
								: "<p>Download latest version from <a href='"
										+ URL + "'>here</a></p>");

				if (root.tagName == 'A') {
					root.onclick = function() {
						location.href = URL;
					};
				}
			}

			// onFail
			if (opts.onFail) {
				var ret = opts.onFail.call(this);
				if (typeof ret == 'string') {
					root.innerHTML = ret;
				}
			}
		}

		// http://flowplayer.org/forum/8/18186#post-18593
		if (IE) {
			window[opts.id] = document.getElementById(opts.id);
		}

		// API methods for callback
		extend(this, {

			getRoot : function() {
				return root;
			},

			getOptions : function() {
				return opts;
			},

			getConf : function() {
				return conf;
			},

			getApi : function() {
				return root.firstChild;
			}

		});
	}

	// setup jquery support
	if (JQUERY) {

		// tools version number
		jQuery.tools = jQuery.tools || {
			version : '1.2.5'
		};

		jQuery.tools.flashembed = {
			conf : GLOBAL_OPTS
		};

		jQuery.fn.flashembed = function(opts, conf) {
			return this.each(function() {
				$(this).data("flashembed", flashembed(this, opts, conf));
			});
		};
	}

})(jQuery);

(function(h) {
	var m = h.scrollTo = function(b, c, g) {
		h(window).scrollTo(b, c, g)
	};

	m.defaults = {
		axis : 'y',
		duration : 1
	};

	m.window = function(b) {
		return h(window).scrollable()
	};

	h.fn.scrollable = function() {
		return this
				.map(function() {
					var b = this.parentWindow || this.defaultView, c = this.nodeName == '#document' ? b.frameElement
							|| b
							: this, g = c.contentDocument
							|| (c.contentWindow || c).document, i = c.setInterval;
					return c.nodeName == 'IFRAME' || i && h.browser.safari ? g.body
							: i ? g.documentElement : this
				})
	};

	h.fn.scrollTo = function(r, j, a) {
		if (typeof j == 'object') {
			a = j;
			j = 0
		}
		if (typeof a == 'function')
			a = {
				onAfter : a
			};

		a = h.extend({}, m.defaults, a);
		j = j || a.speed || a.duration;
		a.queue = a.queue && a.axis.length > 1;
		if (a.queue)
			j /= 2;
		a.offset = n(a.offset);
		a.over = n(a.over);
		return this
				.scrollable()
				.each(
						function() {
							var k = this, o = h(k), d = r, l, e = {}, p = o
									.is('html,body');
							switch (typeof d) {
							case 'number':
							case 'string':
								if (/^([+-]=)?\d+(px)?$/.test(d)) {
									d = n(d);
									break
								}
								d = h(d, this);
							case 'object':
								if (d.is || d.style)
									l = (d = h(d)).offset()
							}
							h
									.each(
											a.axis.split(''),
											function(b, c) {
												var g = c == 'x' ? 'Left'
														: 'Top', i = g
														.toLowerCase(), f = 'scroll'
														+ g, s = k[f], t = c == 'x' ? 'Width'
														: 'Height', v = t
														.toLowerCase();
												if (l) {
													e[f] = l[i]
															+ (p ? 0
																	: s
																			- o
																					.offset()[i]);
													if (a.margin) {
														e[f] -= parseInt(d
																.css('margin'
																		+ g)) || 0;
														e[f] -= parseInt(d
																.css('border'
																		+ g
																		+ 'Width')) || 0
													}
													e[f] += a.offset[i] || 0;
													if (a.over[i])
														e[f] += d[v]()
																* a.over[i]
												} else
													e[f] = d[i];
												if (/^\d+$/.test(e[f]))
													e[f] = e[f] <= 0 ? 0 : Math
															.min(e[f], u(t));
												if (!b && a.queue) {
													if (s != e[f])
														q(a.onAfterFirst);
													delete e[f]
												}
											});
							q(a.onAfter);
							function q(b) {
								o.animate(e, j, a.easing, b && function() {
									b.call(this, r, a)
								})
							}
							;

							function u(b) {
								var c = 'scroll' + b, g = k.ownerDocument;
								return p ? Math.max(g.documentElement[c],
										g.body[c]) : k[c]
							}
						}).end()
	};

	function n(b) {
		return typeof b == 'object' ? b : {
			top : b,
			left : b
		}
	}
})(jQuery);

// 下拉
(function($) {
	$.fn.personalDropMenu = function(settings) {
		var defaults = {
			menuDiv : '#personal_hover',
			tplDiv : '#personal_hover_tpl',
			dropdownArrow : '#personal_menu_down',
			myUid : 0
		};

		$.extend(defaults, settings);

		var $menuDiv, menuDiv_html, $tplDiv;
		$menuDiv = $(defaults.menuDiv);
		$tplDiv = $(defaults.tplDiv);
		menuDiv_html = $tplDiv.val();// 保存原始的html
		$menuDiv.bind('mouseleave', function() {
			$(this).hide();
		});
		window.isFriendshipQueryed = false;
		var friends;
		var setFriendHtml = function(uid, $obj) {
			$obj.next().remove();
			if (uid == defaults.myUid) {
				$obj.html('<strong>你自己</strong>');
				$menuDiv.find('#personal_block_usr').remove();
				$menuDiv.find('#personal_msgsned').remove();
			} else if (!friends) {
				$obj
						.after('<span class="be_stranger"><a href="javascript:;" onclick="attention('
								+ uid + ',1);">(加关注)</a></span>');
			} else if (friends['f_' + uid] && friends['f_' + uid] == "1") {
				$obj
						.after('<span class="be_stranger"> 已关注 <a href="/member/attention/uid/'
								+ uid
								+ '/type/2" onclick="return confirm(\'确定要取消吗？\');">(取消关注)</a></span>');
			} else if (friends['f_' + uid] && friends['f_' + uid] == "2") {
				$obj
						.after('<span class="be_stranger"> 已关注 <a href="/member/attention/uid/'
								+ uid
								+ '/type/2" onclick="return confirm(\'确定要取消吗？\');">(取消关注)</a></span>');
			} else if (friends['f_' + uid] && friends['f_' + uid] == "3") {
				$obj
						.after('<span class="be_stranger"> 已加入黑名单 <a href="/member/attention/uid/'
								+ uid
								+ '/type/2" onclick="return confirm(\'确定要取消吗？\');">(取消)</a></span>');
				$menuDiv.find('#personal_block_usr').remove();
				$menuDiv.find('#personal_msgsned').remove();
			} else {
				$obj
						.after('<span class="be_stranger"><a href="javascript:;" onclick="attention('
								+ uid + ',1);">(加关注)</a></span>');
			}
		};

		return this.each(function() {
			var $this;
			$this = $(this);
			$this.mouseover(function() {
				var params = {
					uid : $this.attr('href').replace('/u/', ''),
					avatar : $this.find('img').attr('src'),
					nick_name : $this.attr('title'),
					gmt_access : $this.attr('rel')
				};
				if (params.gmt_access != '')
					params.gmt_access = "来访时间: " + params.gmt_access;
				var html = menuDiv_html.parseTpl(params);
				var rects = $this[0].getBoundingClientRect();
				var bodyRects = $('body')[0].getBoundingClientRect();
				var left = rects.left - bodyRects.left - 6;
				var top = rects.top - bodyRects.top - 6;
				$menuDiv.css({
					'top' : top,
					'left' : left
				});
				$menuDiv.html(html).show();
				if (params.gmt_access == '')
					$menuDiv.find('#personal_hover_link').attr('title', '');
				$menuDiv.find(defaults.dropdownArrow).click(function() {
					var $this = $(this);
					var $next = $this.next();
					$this.toggleClass('active')
					$next.toggle();
					if ($next.css('display') != 'block')
						return;
					$relation = $next.find('.be_contacts');
					if (params.uid == defaults.myUid) {
						setFriendHtml(params.uid, $relation);
						return;
					}
					if (isFriendshipQueryed) {
						setFriendHtml(params.uid, $relation);
						return;
					}
					if (!myUid)
						return;
					$relation.after($loading2);
					$.getJSON('/member/get-friends', function(data) {
						try {
							$relation.next().remove();
							if (data.status == 'failed') {
								return false;
							}
							isFriendshipQueryed = true;
							friends = data.friends;
							setFriendHtml(params.uid, $relation);
						} catch (e) {
							alert('Warning:something wrong! Please retry!');
							return;
						}
					});
				});
			});
		});
	};
})(jQuery);
