/**
 * 随着浏览器对H5支持度越来越高，文件上传变得很简单。原来写文件上传都是ajax异步上传，没有考虑
 * 低版本IE的兼容性，故简单写了一个兼容IE的文件上传。
 * 
 * 原理： 利用iframe、form表单模拟异步文件上传，达到不刷新页面的目的
 */
module.exports = {
	url: '',
	formId: 'uploadFileForm',
	iframeName:'uploadFileIframe',
	upload: function(opts){
		var fileElement = opts.fileElement;
		var suffixs = opts.suffixs;
		this.url = opts.url || this.url;
		this.fileElement = fileElement;
		this.fileParent = $(fileElement).parent();

		// 生成临时form
		this.makeForm();
		if(suffixs && suffixs.length > 0){
			if(!this.valiSuffixs(suffixs)){
				alert('图片格式不正确');
				this.complate();
				return ;
			}
		}
		// 提交表单
		this.form.submit();
		// 监听成功事件
		var self = this;
		self.iframe.on('load', function(){
			// 获取接口返回数据
			var data = $(this).contents().find('body').html();        
	        self.complate();
	        opts.success(JSON.parse(data));
		});
	},
	valiSuffixs: function(suffixs){
		try{
			// 验证图片格式
			var fileElement = this.fileElement;
			var file = fileElement.val();
			var suffixs = suffixs.join('-');

			var suffix = /\.[a-zA-Z]+$/.exec(file)[0].substring(1);
			if(suffixs.indexOf(suffix) < 0){
				return false;
			}
			return true;
		}catch(e){
			this.complate();
		}
	},
	complate: function(){
		console.log(this.fileParent);
		console.log(this.fileElement);
		this.fileElement.appendTo(this.fileParent);
        this.iframe.remove();
        this.form.remove();
	},
	makeForm:function(){
		// 构建form、iframe组件
		var fileElement = this.fileElement;
		var formId = this.formId;
		var iframeName = this.iframeName;
		
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