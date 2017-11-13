/**
 * 随着浏览器对H5支持度越来越高，文件上传变得很简单。原来写文件上传都是ajax异步上传，没有考虑
 * 低版本IE的兼容性，故简单写了一个兼容IE的文件上传。
 * 
 * 原理： 利用iframe、form表单模拟异步文件上传，达到不刷新页面的目的
 * tip: 因为使用了iframe模拟的异步上传，要保证当前页面的document.domain和iframe的document.domain相同
 * 在获取文件尺寸时 IE兼容性不太好，如果有这方面的需求可以使用webuploder.js这个组件
 */
module.exports = {
	url: '',
	formId: 'uploadFileForm',
	iframeName:'uploadFileIframe',
	upload: function(opts){
		// var fileElement = opts.fileElement;
		// var suffixs = opts.suffixs;
		this.suffixs = opts.suffixs;
		this.url = opts.url || this.url;
		this.fileElement = opts.fileElement;
		this.fileParent = $(this.fileElement).parent();
		// 最大尺寸（单位KB）
		this.maxSize = opts.maxSize;
		// 验证不通过
		if(!this.checkFile()){
			return ;
		}
		// 生成临时form
		this.makeForm();
		// 提交表单
		this.form.submit();
		// 监听成功事件
		var self = this;
		self.iframe.on('load', function(){
			// 获取接口返回数据
			var data = $(this).contents().find('body').html();
			var arr = /[\s|\S]*(\{[\s\S]*\})[\s|\S]*/.exec(data);
			self.complate();
			if(arr && arr[1]){
				opts.success(JSON.parse(arr[1]));
			}
		});
	},
	// 文件验证
	checkFile: function(){
		var suffixs = this.suffixs;
		var fileElement = this.fileElement[0];
		var maxSize = this.maxSize;
		var fileSize;
		var path;
		var fso

		if(suffixs && suffixs.length > 0){
			if(!this.valiSuffixs(suffixs)){
				alert('图片格式不正确');
				this.complate();
				return false;
			}
		}
		try{
			fileSize = fileElement.files[0].size;
		}catch(e){
			fileElement.select();
			fileElement.blur();
			path = document.selection.createRange().text;
			fso = new ActiveXObject("Scripting.FileSystemObject");
			fileSize = fso.GetFile(path).size;
		}
		if((fileSize / 1024) / maxSize){
			alert('图片大小大于文件限制');
			this.complate();
			return false;
		}

		console.log('文件大小：'+fileSize);
		return true;
	},
	valiSuffixs: function(suffixs){
		try{
			// 验证图片格式
			var fileElement = this.fileElement;
			var file = fileElement.val();
			var suffixs = suffixs.join('-');

			var suffix = /\.[a-zA-Z]+$/.exec(file)[0].substring(1);
			if(suffixs.toLocaleLowerCase().indexOf(suffix.toLocaleLowerCase()) < 0){
				return false;
			}
			return true;
		}catch(e){
			this.complate();
		}
	},
	complate: function(){
		this.fileElement.appendTo(this.fileParent);
        this.iframe.remove();
        this.form.remove();
	},
	makeForm:function(){
		// 构建form、iframe组件
		var fileElement = this.fileElement;
		var formId = this.formId;
		var iframeName = this.iframeName;
		var url = this.url;
		
		// 存在临时form表单
		if($('#'+formId).is('form')){
			$('#'+formId).remove();
		}
		if($('iframe[name='+iframeName+']').is('iframe')){
			$('iframe[name='+iframeName+']').remove();
		}
		var iframe = $('<iframe name="'+ iframeName +'" width="0px" height="0px" frameborder="0"></iframe>');
		var form = $('<form method="post" action="'+this.url+'" id="'+formId+'" target="'+ iframeName +'" enctype="multipart/form-data">'+
			'<input name="mkey" value="2683010a90f938050dbb55c6c0b903ab"/>'+
			'<input name="pkey" value="af7e5f19cb87a3cca23296b7b8707f83"/>'+
		'</form>');
		form.append(fileElement);
		$('body').append(iframe).append(form);
		this.iframe = iframe;
		this.form = form;
	}
}