var gSetColorType = ""; 
var gIsIE = document.all; 
var gIEVer = fGetIEVer();
var gLoaded = false;
var ev = null;
var gIsHtml = true;//�л����ı�

var pos = 0;
var sLength = 0;

/**
 * ��ȡevent����
 */
function fGetEv(e){
	ev = e;
}

/**
 * ��ȡIE�汾
 */
function fGetIEVer(){
	var iVerNo = 0;
	var sVer = navigator.userAgent;
	if(sVer.indexOf("MSIE")>-1){
		var sVerNo = sVer.split(";")[1];
		sVerNo = sVerNo.replace("MSIE","");
		iVerNo = parseFloat(sVerNo);
	}
	return iVerNo;
}
/**
 * ���ÿɱ༭
 */
function fSetEditable(){
	var f = window.frames["HtmlEditor"];
	f.document.designMode="on";
	if(!gIsIE)
		f.document.execCommand("useCSS",false, true);
}

/**
 *�ָ��ϴα��������
 */
function renewContent() {
	if(window.confirm('��ȷ��Ҫ�ָ��ϴα���?')) {
		var oArea = parent.$('uchome-ttHtmlEditor');
		var tagObj = parent.$('tag');
		var subjectObj = parent.$('subject');
		var f = window.frames["HtmlEditor"];
		try {
			oArea.load('UCHome');
			var oXMLDoc = oArea.XMLDocument;
			oArea.value = oXMLDoc.selectSingleNode("/ROOTSTUB/message").nodeTypedValue;
			f.document.body.innerHTML = oArea.value;
			if(tagObj != null ) tagObj.value = oXMLDoc.selectSingleNode("/ROOTSTUB/tag").nodeTypedValue;
			if(subjectObj != null ) subjectObj.value = oXMLDoc.selectSingleNode("/ROOTSTUB/subject").nodeTypedValue;
		} catch (e) {
			if(window.sessionStorage) {
				try {
					f.document.body.innerHTML = sessionStorage.getItem('message');
					if(subjectObj !=null ) subjectObj.value = sessionStorage.getItem('subject');
					if(tagObj !=null ) tagObj.value = sessionStorage.getItem('tag');
				} catch(e) {}
			}
		}
	}
}
/**
 * ���ñ༭������¼�
 */
function fSetFrmClick(){
	var f = window.frames["HtmlEditor"];
	f.document.onclick = function(){
		fHideMenu();
	}
	if(gIsIE) {
		f.document.attachEvent("onkeydown", listenKeyDown);
	} else {
		f.addEventListener('keydown', function(e) {listenKeyDown(e);}, true);
	}
}

/**
 * �������̰����¼�
 */
function listenKeyDown(event) {
	parent.gIsEdited = true;
	parent.ctrlEnter(event, 'issuance');
}

/**
 * ����onload�¼�
 */
window.onload = function(){
	try{
		gLoaded = true;
		fSetEditable();
		fSetFrmClick();
	}catch(e){
		// window.location.reload();
	}
}
window.onbeforeunload = parent.edit_save;

/**
 * ����������ɫ
 */
function fSetColor(){
	var dvForeColor =$("dvForeColor");
	if(dvForeColor.getElementsByTagName("TABLE").length == 1){
		dvForeColor.innerHTML = drawCube() + dvForeColor.innerHTML;
	}
}


/**
 * ����mousemove�¼�
 */
document.onmousemove = function(e){
	if(gIsIE) var el = event.srcElement;
	else var el = e.target;
	var tdView = $("tdView");
	var tdColorCode = $("tdColorCode");

	if(el.tagName == "IMG"){
		try{
			if(fInObj(el, "dvForeColor")){
				tdView.bgColor = el.parentNode.bgColor;
				tdColorCode.innerHTML = el.parentNode.bgColor
			}
		}catch(e){}
	}
}
/**
 * �ж�el�����Ƿ�����һ���ڵ���
 */
function fInObj(el, id){
	if(el){
		if(el.id == id){
			return true;
		}else{
			if(el.parentNode){
				return fInObj(el.parentNode, id);
			}else{
				return false;
			}
		}
	}
}
/**
 * ��ʾ����
 */
function fDisplayObj(id){
	var o = $(id);
	if(o) o.style.display = "";
}
/**
 * ����onclick�¼�
 */
document.onclick = function(e){
	if(gIsIE) var el = event.srcElement;
	else var el = e.target;
	var dvForeColor =$("dvForeColor");
	var dvPortrait =$("dvPortrait");

	if(el.tagName == "IMG"){
		try{
			if(fInObj(el, "dvForeColor")){
				format(gSetColorType, el.parentNode.bgColor);
				dvForeColor.style.display = "none";
				return;
			}
		}catch(e){}
		try{
			if(fInObj(el, "dvPortrait")){
				format("InsertImage", el.src);
				dvPortrait.style.display = "none";
				return;
			}
		}catch(e){}
	}
	//������Ķ��β�����ֹ�ر�
	try{
		if(fInObj(el, "createUrl") || fInObj(el, "createImg") || fInObj(el, "createSwf")){
			return;
		}
	}catch(e){}
	fHideMenu();
	var hideId = "";
	if(arrMatch[el.id]){
		hideId = arrMatch[el.id];
		fDisplayObj(hideId);
	}
}
var arrMatch = {
	imgFontface:"fontface",
	imgFontsize:"fontsize",
	imgFontColor:"dvForeColor",
	imgBackColor:"dvForeColor",
	imgFace:"dvPortrait",
	imgAlign:"divAlign",
	imgList:"divList",
	imgInOut:"divInOut",
	faceBox:"editFaceBox",
	icoUrl:"createUrl",
	icoImg:"createImg",
	icoSwf:"createSwf"
}
/**
 * ִ�и�ʽ����ʾ
 */
function format(type, para){
	var f = window.frames["HtmlEditor"];
	var sAlert = "";
	if(!gIsIE){
		switch(type){
			case "Cut":
				sAlert = "�����������ȫ���ò�����༭���Զ�ִ�м��в���,��ʹ�ü��̿�ݼ�(Ctrl+X)�����";
				break;
			case "Copy":
				sAlert = "�����������ȫ���ò�����༭���Զ�ִ�п�������,��ʹ�ü��̿�ݼ�(Ctrl+C)�����";
				break;
			case "Paste":
				sAlert = "�����������ȫ���ò�����༭���Զ�ִ��ճ������,��ʹ�ü��̿�ݼ�(Ctrl+V)�����";
				break;
		}
	}
	if(sAlert != ""){
		alert(sAlert);
		return;
	}
	f.focus();
	if(!para){
		if(gIsIE){
			f.document.execCommand(type);
		}else{
			f.document.execCommand(type,false,false);
		}
	}else{
		if(type == 'insertHTML') {
			if(window.Event){
				f.document.execCommand('insertHTML', false, para);
			} else {
				var obj = f.document.selection.createRange();
				obj.pasteHTML(para);
				obj.collapse(false);
				obj.select();
			}
		} else {
			f.document.execCommand(type,false,para);
		}
	}
	f.focus();
}
/**
 * ת���༭ģʽ
 */
function setMode(bStatus){
	var sourceEditor = $("sourceEditor");
	var HtmlEditor = $("HtmlEditor");
	var divEditor = $("divEditor");
	var f = window.frames["HtmlEditor"];
	var body = f.document.getElementsByTagName("BODY")[0];
	if(bStatus){
		sourceEditor.style.display = "";
		divEditor.style.display = "none";
		sourceEditor.value = body.innerHTML;
		$('uchome-editstatus').value = 'code';
	}else{
		sourceEditor.style.display = "none";
		divEditor.style.display = "";
		body.innerHTML = sourceEditor.value;
		$('uchome-editstatus').value = 'html';
	}
}
/**
 * ����������ɫ
 */
function foreColor(e) {
	fDisplayColorBoard(e);
	gSetColorType = "foreColor";
}
/**
 * ���ñ���
 */
function faceBox(e) {
	if(gIsIE){
		var e = window.event;
	}
	var dvFaceBox = $("editFaceBox");
	var iX = e.clientX;
	var iY = e.clientY;
	dvFaceBox.style.display = "";
	dvFaceBox.style.left = (iX-140) + "px";
	dvFaceBox.style.top = 33 + "px";
	dvFaceBox.innerHTML = "";
	var faceul = document.createElement("ul");
	for(i=1; i<31; i++) {
		var faceli = document.createElement("li");
		faceli.innerHTML = '<img src="image/face/'+i+'.gif" onclick="insertImg(this.src);" style="cursor:pointer;" />';
		faceul.appendChild(faceli);
	}
	dvFaceBox.appendChild(faceul);
	return true;
}

function insertImg(src) {
	format("insertHTML", '<img src="' + src + '"/>');
}

//��Ϳѻ��
function doodleBox(event, id) {
	if(parent.$(id) != null) {
		parent.ajaxmenu(event, id, 1);
	} else {
		alert("�Ҳ���Ϳѻ���ʼ������");
	}
}
/**
 * ���ñ���ɫ
 */
function backColor(e){
	var sColor = fDisplayColorBoard(e);
	if(gIsIE)
		gSetColorType = "backcolor";
	else
		gSetColorType = "backcolor";
}

/**
 * ��ʾ��ɫʰȡ��
 */
function fDisplayColorBoard(e){

	if(gIsIE){
		var e = window.event;
	}
	if(gIEVer<=5.01 && gIsIE){
		var arr = showModalDialog("ColorSelect.htm", "", "font-family:Verdana; font-size:12; status:no; dialogWidth:21em; dialogHeight:21em");
		if (arr != null) return arr;
		return;
	}
	var dvForeColor =$("dvForeColor");
	// fSetColor();
	var iX = e.clientX;
	var iY = e.clientY;
	dvForeColor.style.display = "";
	dvForeColor.style.left = (iX-30) + "px";
	dvForeColor.style.top = 33 + "px";
	// EV.stopEvent();
	return true;
}

/**
 * ��������
 */
function createLink(e, show) {
	if(typeof show == 'undefined') {
		var urlObj = $('insertUrl');
		var sURL = urlObj.value;
		if ((sURL!=null) && (sURL!="http://")){
			setCaret();
			format("CreateLink", sURL);
		}
		fHide($('createUrl'));
		urlObj.value = 'http://';
	} else {
		if(gIsIE){
			var e = window.event;
		}
		getCaret();
		var dvUrlBox = $("createUrl");
		var iX = e.clientX;
		var iY = e.clientY;
		dvUrlBox.style.display = "";
		dvUrlBox.style.left = (iX-300) + "px";
		dvUrlBox.style.top = 33 + "px";
	}
}
//��ȡ��ʼ����
function getCaret() {
	if(gIsIE){
		window.frames["HtmlEditor"].focus();
		var ran = window.frames["HtmlEditor"].document.selection.createRange();
		sLength = ran.text.replace(/\r?\n/g, ' ').length;
		if(!sLength) {
			ran = window.frames["HtmlEditor"].document.body.createTextRange();
		}
		var rang = document.selection.createRange(); 
		rang.setEndPoint("StartToStart", ran);
		pos = rang.text.replace(/\r?\n/g, ' ').length;
	}
}
//���轹��
function setCaret() {
	if(gIsIE){
		window.frames["HtmlEditor"].focus();
		//����ѡ���ַ���
		var r = window.frames["HtmlEditor"].document.body.createTextRange();
		var textLen = r.text.replace(/\r?\n/g, ' ').length;
		r.moveStart('character', pos);
		if(sLength) {
			var eLen = sLength - (textLen - pos);
			r.moveEnd('character', eLen);
		} else {
			r.collapse(true);
		}
		r.select();
	}
}

/**
 * ɾ������
 */
function clearLink() {
	format("Unlink", false);
}
/**
 * ����ͼƬ
 */
function createImg(e, show) {
	if(typeof show == 'undefined') {
		var imgObj = $('imgUrl');
		var sPhoto = imgObj.value;
		if ((sPhoto!=null) && (sPhoto!="http://")){
			setCaret();
			format("InsertImage", sPhoto);
		}
		fHide($('createImg'));
		imgObj.value = 'http://';
	} else {
		if(gIsIE){
			var e = window.event;
		}
		getCaret();
		var dvImgBox = $("createImg");
		var iX = e.clientX;
		var iY = e.clientY;
		dvImgBox.style.display = "";
		dvImgBox.style.left = (iX-300) + "px";
		dvImgBox.style.top = 33 + "px";
	}
}
/**
 * ��ƵFLASH
 */
function createFlash(e, show) {
	if(typeof show == 'undefined') {
		var flashtag = '';
		var vObj = $('videoUrl');
		var sFlash = vObj.value;
		if ((sFlash!=null) && (sFlash!="http://")){
			setCaret();
			var sFlashType = $('vtype').value;
			if(sFlashType==1) {
				flashtag = '[flash=media]';
			} else if(sFlashType==2) {
				flashtag = '[flash=real]';
			} else {
				flashtag = '[flash]';
			}
			format("insertHTML", flashtag + sFlash + '[/flash]');
		}
		fHide($('createSwf'));
		vObj.value = 'http://';
	} else {
		if(gIsIE){
			var e = window.event;
		}
		getCaret();
		var dvSwfBox = $("createSwf");
		var iX = e.clientX;
		var iY = e.clientY;
		dvSwfBox.style.display = "";
		dvSwfBox.style.left = (iX-350) + "px";
		dvSwfBox.style.top = 33 + "px";
	}
}
/**
 * ɾ���ַ������߿ո�
 */
String.prototype.trim = function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * �������ͼ��
 */
function fSetBorderMouseOver(obj) {
	obj.style.borderRight="1px solid #aaa";
	obj.style.borderBottom="1px solid #aaa";
	obj.style.borderTop="1px solid #fff";
	obj.style.borderLeft="1px solid #fff";
} 
/**
 * ����Ƴ�ͼ��
 */
function fSetBorderMouseOut(obj) {
	obj.style.border="none";
}
/**
 * ��갴��ͼ��
 */
function fSetBorderMouseDown(obj) {
	obj.style.borderRight="1px #F3F8FC solid";
	obj.style.borderBottom="1px #F3F8FC solid";
	obj.style.borderTop="1px #cccccc solid";
	obj.style.borderLeft="1px #cccccc solid";
}
/**
 * ��ʾ�����˵�
 */
function fDisplayElement(element,displayValue) {
	if(gIEVer<=5.01 && gIsIE){
		alert('ֻ֧��IE 5.01���ϰ汾');
		return;
	}
	fHideMenu();
	if ( typeof element == "string" )
		element = $(element);
	if (element == null) return;
	element.style.display = displayValue;
	if(gIsIE){
		var e = event;
		var target = e.srcElement;
	}else{
		var e = ev;
		var target = e.target;
	}
	var iX = f_GetX(target);
	element.style.display = "";
	element.style.left = (iX) + "px";
	element.style.top = 33 + "px";
	// EV.stopEvent();
	return true;
}
/**
 * ��ʾ�༭Դ����ʾ
 */
function fSetModeTip(obj){
	var x = f_GetX(obj);
	var y = f_GetY(obj);
	var dvModeTip = $("dvModeTip");
	if(!dvModeTip){
		var dv = document.createElement("DIV");
		dv.style.position = "absolute";
		dv.style.top = 33 + "px";
		dv.style.left = (x-40) + "px";
		dv.style.zIndex = "999";
		dv.style.fontSize = "12px";
		dv.id = "dvModeTip";
		dv.style.padding = "2 2 2 2px";
		dv.style.border = "1px #000000 solid";
		dv.style.backgroundColor = "#FFFFCC";
		dv.style.height = "12px";
		dv.innerHTML = "�༭Դ��";
		document.body.appendChild(dv);
	}else{
		dvModeTip.style.display = "";
	}
}
/**
 * ���ر༭Դ��
 */
function fHideTip(){
	$("dvModeTip").style.display = "none";
}
/**
 * ��ȡ�����x����
 */
function f_GetX(e)
{
	var l=e.offsetLeft;
	while(e=e.offsetParent){				
		l+=e.offsetLeft;
	}
	return l;
}
/**
 * ��ȡ�����y����
 */
function f_GetY(e)
{
	var t=e.offsetTop;
	while(e=e.offsetParent){
		t+=e.offsetTop;
	}
	return t;
}
/**
 * ���������˵�
 */
function fHideMenu(){
	try{
		var arr = ["fontface", "fontsize", "dvForeColor", "dvPortrait", "divAlign", "divList" ,"divInOut", "editFaceBox", "createUrl", "createImg", "createSwf"];
		for(var i=0;i<arr.length;i++){
			var obj = $(arr[i]);
			if(obj){
				obj.style.display = "none";
			}
		}
		try{
			parent.LetterPaper.control(window, "hide");
		}catch(exp){}
	}catch(exp){}
}

/**
 * ��ȡ����
 */
function $(id){
	return document.getElementById(id);
}
/**
 * ���ض���
 */
function fHide(obj){
	obj.style.display="none";
}
/**
 * �л��༭ģʽ
 */
function changeEditType(flag, ev){
	gIsHtml = flag;
	try{
		var mod = parent.MM["compose"];
		mod.html = flag;
	}catch(exp){}
	try{
		var dvhtml = $("dvhtml");
		var dvtext = $("dvtext");
		var HtmlEditor = window.frames["HtmlEditor"];
		var ifmHtmlEditor = $("HtmlEditor");
		var sourceEditor = $("sourceEditor");
		var switchMode = $("switchMode");
		var sourceEditor = $("sourceEditor");
		var dvHtmlLnk = $("dvHtmlLnk");
		if(flag){
			dvhtml.style.display = "";
			dvtext.style.display = "none";
			dvHtmlLnk.style.display = "none";
			// setMode(false);
			if(switchMode.checked){
				sourceEditor.value = dvtext.value;
				$('uchome-editstatus').value = 'code';
			}else{
				//HtmlEditor.document.body.innerHTML = dvtext.value.replace(/\r\n|\n/g,"<br>");
				if(document.all){
					HtmlEditor.document.body.innerText = dvtext.value;
				} else {
					HtmlEditor.document.body.innerHTML = dvtext.value.unescapeHTML();
				}
				$('uchome-editstatus').value = 'html';
			}
		}else{
			function sub1(){
				dvhtml.style.display = "none";
				dvtext.style.display = "";
				dvHtmlLnk.style.display = "";
				if(switchMode.checked){
					dvtext.value = sourceEditor.value.unescapeHTML();
				}else{
					if(document.all){
						dvtext.value = HtmlEditor.document.body.innerText;
					}else{
						dvtext.value = HtmlEditor.document.body.innerHTML.unescapeHTML();
					}
				}
			}
			ev = ev || event;
			if(ev){
				if(window.confirm("ת��Ϊ���ı�ʱ������ʧĳЩ��ʽ��\n��ȷ��Ҫ������")){
					$('uchome-editstatus').value = 'text';
					sub1();
				}else{
					return;
				}
			}
		}
	}catch(exp){
	
	}
}
/**
 * ɾ����ǩ����
 */
String.prototype.stripTags = function(){
    return this.replace(/<\/?[^>]+>/gi, '');
};
/**
 * ת�����ı���ʽ
 */
String.prototype.unescapeHTML = function(){
    var div = document.createElement('div');
    div.innerHTML = this.stripTags();
    return div.childNodes[0].nodeValue;
};
// Draw color selector
// create 6-element array
var s = "";
var hex = new Array(6)
// assign non-dithered descriptors
hex[0] = "FF"
hex[1] = "CC"
hex[2] = "99"
hex[3] = "66"
hex[4] = "33"
hex[5] = "00"
// draw a single table cell based on all descriptors
function drawCell(red, green, blue) {
	// open cell with specified hexadecimal triplet background color
	var color = '#' + red + green + blue;
	if(color == "#000066") color = "#000000";
	s += '<TD BGCOLOR="' + color + '" style="height:12px;width:12px;" >';
	// print transparent image (use any height and width)
	s += '<IMG '+ ((document.all)?"":"src='editor_none.gif'") +' HEIGHT=12 WIDTH=12>';
	// close table cell
	s += '</TD>';
}
// draw table row based on red and blue descriptors
function drawRow(red, blue) {
	// open table row
	s += '<TR>';

	// loop through all non-dithered color descripters as green hex
	for (var i = 0; i < 6; ++i) {
		drawCell(red, hex[i], blue)
	}
	// close current table row
	s += '</TR>';
}
// draw table for one of six color cube panels
function drawTable(blue) {
	// open table (one of six cube panels)
	s += '<TABLE CELLPADDING=0 CELLSPACING=0 BORDER=0>';
	// loop through all non-dithered color descripters as red hex
	for (var i = 0; i < 6; ++i) {
		drawRow(hex[i], blue)
	}
	// close current table
	s += '</TABLE>';
}
// draw all cube panels inside table cells
function drawCube() {
	// open table
	s += '<TABLE CELLPADDING=0 CELLSPACING=0 style="border:1px #888888 solid"><TR>';
	// loop through all non-dithered color descripters as blue hex
	for (var i = 0; i < 2; ++i) {
		// open table cell with white background color
		s += '<TD BGCOLOR="#FFFFFF">';
		// call function to create cube panel with hex[i] blue hex
		drawTable(hex[i])
		// close current table cell
		s += '</TD>';
	}
	s += '</TR><TR>';
	for (var i = 2; i < 4; ++i) {
		// open table cell with white background color
		s += '<TD BGCOLOR="#FFFFFF">';
		// call function to create cube panel with hex[i] blue hex
		drawTable(hex[i])
		// close current table cell
		s += '</TD>';
	}
	// close table row and table
	s += '</TR></TABLE>';
	return s;
}

/**
 * event��������
 * 
 * @class event����
 */
function EV(){}
EV.getTarget		= fGetTarget;			// ��ȡtarget
EV.getEvent			= fGetEvent;			// ��ȡevent
EV.stopEvent		= fStopEvent;			// ȡ���¼����¼�ð��
EV.stopPropagation	= fStopPropagation;		// ȡ���¼�ð��
EV.preventDefault	= fPreventDefault;		// ȡ���¼�


function fGetTarget(ev, resolveTextNode){
	if(!ev) ev = this.getEvent();
	var t = ev.target || ev.srcElement;

	if (resolveTextNode && t && "#text" == t.nodeName) {
		return t.parentNode;
	} else {
		return t;
	}
}

function fGetEvent (e) {
	var ev = e || window.event;

	if (!ev) {
		var c = this.getEvent.caller;
		while (c) {
			ev = c.arguments[0];
			if (ev && Event == ev.constructor) {
				break;
			}
			c = c.caller;
		}
	}

	return ev;
}

function fStopEvent(ev) {
	if(!ev) ev = this.getEvent();
	this.stopPropagation(ev);
	this.preventDefault(ev);
}


function fStopPropagation(ev) {
	if(!ev) ev = this.getEvent();
	if (ev.stopPropagation) {
		ev.stopPropagation();
	} else {
		ev.cancelBubble = true;
	}
}


function fPreventDefault(ev) {
	if(!ev) ev = this.getEvent();
	if (ev.preventDefault) {
		ev.preventDefault();
	} else {
		ev.returnValue = false;
	}
}

function getExt(path) {
	return path.lastIndexOf('.') == -1 ? '' : path.substr(path.lastIndexOf('.') + 1, path.length).toLowerCase();
}