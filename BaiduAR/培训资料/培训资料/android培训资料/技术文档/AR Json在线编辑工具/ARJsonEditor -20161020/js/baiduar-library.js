/*
	target中的属性:
	"model"
	"hint"
	"originImage"
	"featureImage"
	"defaultTransform"
	*/
	var space=[
	"   ",
	"      ",
	"         ",
	"            ",
	"               ",
	"                  ",
	"                     ",
	"                       "]

	function pressToJsonBtn()
  {
  	var testJson = "{"+toJson()+"}";  
  	alert(testJson);
  	json = $.parseJSON(testJson);
  	editor.set(json);
  } 

  function AddIDToTextarea()
  {
  	// var testJson = toJson();  
  	$(".jsoneditor-text").attr("id","test");
  } 
	
  function insertAtCursor(myField, myValue)
  {
		//IE support
		if (document.selection)
		{
			myField.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
			sel.select();
		}
		//MOZILLA/NETSCAPE support
		else if (myField.selectionStart || myField.selectionStart == '0')
		{
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
		// save scrollTop before insert
		var restoreTop = myField.scrollTop;
		myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos,myField.value.length);
		if (restoreTop > 0)
		{
		// restore previous scrollTop
		myField.scrollTop = restoreTop;
		}
		myField.focus();
		myField.selectionStart = startPos + myValue.length;
		myField.selectionEnd = startPos + myValue.length;
		} else {
			myField.value += myValue;
			myField.focus();
		}
	}

	function toJson()
	{
		// var a='';
		// for(var i=0;i<$('#param_editor').children().length;i++)
		// {
			
		// }
		// alert($('#param_editor').children().eq(0).children("[class!='parent_title_warpper']").length)

		/*for(var i=0;i<$('#param_editor').children('.parent_warpper').length;i++)
		{
			a+= $('.parent_warpper').eq(i).attr('id')+':{\n';
			for (var j = 0; j < $('.parent_warpper').eq(i).children('.item_warpper').length; j++) {
				a+= "     "+$('.parent_warpper').eq(i).children('.item_warpper').eq(j).attr('name')+':"'+$('.parent_warpper').eq(i).find('input.item').eq(j).val()+'",\n';
				
			}
			// a=a.substring(0,a.length-2);
			if ($('.parent_warpper').eq(i).children('.item_warpper').length>0) 
				{a=a.slice(0,-2);}			
			a+= '\n}\n';
		}
		alert(a);*/
		var a='';
		return doTreeJson('param_editor',a,0);

	}
	function doTreeJson(parentid,str,space_level)
	{
		// isNeedDeletePoint是否需要去掉最后的逗号的标志位
		var isNeedDeletePoint=false;
		// alert($('#'+parentid).children().length);
		for(var i=0;i<$('#'+parentid).children().length;i++)
		{
			// 是父节点的标签类型的处理方式
			if ($('#'+parentid).children().eq(i).attr('class')=='parent_title_warpper') 
			{
				isNeedDeletePoint=false;
				if (str.charAt(str.length-1)=='}') 
				{
					str+=","
				}
				// 去掉param中的_
				if (parentid.charAt(parentid.length-1)=='_') 
				{
					str+= '"'+$('#'+parentid).attr('id').slice(0,-1)+'":{';
				}
				else
				{
					str+= '"'+$('#'+parentid).attr('id')+'":{';
				}				
			}
			// 是子节点的处理方式
			if ($('#'+parentid).children().eq(i).attr('class')=='item_warpper') 
			{
				if (str.charAt(str.length-1)=='}') 
				{
					str+=","
				}
				isNeedDeletePoint=true;
				str+= '"'+$('#'+parentid).children().eq(i).find('.item').attr('name')+'":"'+$('#'+parentid).children().eq(i).find('.item').val()+'",';
				
			}
			// 是父节点的处理方式
			if ($('#'+parentid).children().eq(i).attr('class')=='parent_warpper') 
			{
				isNeedDeletePoint=false;
				str=doTreeJson($('#'+parentid).children().eq(i).attr('id'),str,space_level+1);
			}
			// 是列表类型的处理方式
			if($('#'+parentid).children().eq(i).attr('class')=='list_warpper')
			{
				isNeedDeletePoint=false;
				str=doTreeJson($('#'+parentid).children().eq(i).attr('id'),str,space_level+1);
			}
			// 是列表标签的处理方式
			if ($('#'+parentid).children().eq(i).attr('class')=='list_title_warpper') 
			{
				if (str.charAt(str.length-1)=='}') 
				{
					str+=","
				}
				isNeedDeletePoint=false;
				str+= '"'+$('#'+parentid).attr('id')+'":[';
			}
			// 是列表单项模块的处理方式
			if ($('#'+parentid).children().eq(i).attr('class')=='listitem_warpper') 
			{
				isNeedDeletePoint=false;
				if (str.charAt(str.length-1)=='}') 
				{
					str+=","
				}
				if (str.charAt(str.length-2)=='}') 
				{
					str=str.slice(0,-1);
					str+=',';
				}
				str+="{";
				str=doTreeJson($('#'+parentid).children().eq(i).attr('id'),str,space_level+1);
				str+="}";
			}

			if (i==($('#'+parentid).children().length-1)&&$('#'+parentid).children('.parent_title_warpper').length>0) 
			{
				// 判断是否需要去掉最后的逗号
				if (isNeedDeletePoint) 
				{
					str=str.slice(0,-1);
					str+='';
				}
				str+='}';
			}	

			if (i==($('#'+parentid).children().length-1)&&$('#'+parentid).attr("class")=="listitem_warpper") 
			{
				// 判断是否需要去掉最后的逗号
				if (isNeedDeletePoint) 
				{
					str=str.slice(0,-1);
				}
			}	

			// 加]符号
			if (i==($('#'+parentid).children().length-1)&&$('#'+parentid).children('.list_title_warpper').length>0) 
			{
				/*// 判断是否需要去掉最后的逗号
				if (isNeedDeletePoint) 
				{
					str=str.slice(0,-2);
					str+='\n';
				}*/
				str+=']';
			}		
			
		}
		return str;
	}

	function clearAllItem()
	{
		$('#param_editor').empty();
	}

	function invoke_target_param(parent,key,defaultval)
	{
		if ($('.parent_warpper').attr('id')==parent)
		{
			$('<div class="item_warpper"></div>').attr("name",key).appendTo($('#'+parent));
		}
		else
		{
			$('<div class="item_warpper"></div>').attr("name",key).appendTo($('#param_editor'));
		}		
		$('<label>',{ text:key+":", }).appendTo($('.item_warpper').last()); 
		$('<input type="text" id="item1" class="item" val=""/>').attr("name",key).appendTo($('.item_warpper').last()); 			
		$('<button >默认值</button>').appendTo($('.item_warpper').last())
		.click(function(){
			$(this).parent().children("#item1").val(defaultval);
		});
		$('<button >删除</button>').appendTo($('.item_warpper').last())
		.click(function(){
			$(this).parent().remove();
		});
		$('<br />').appendTo($('.item_warpper').last());
		if ($('.parent_warpper').last().attr('id')==parent)
		{
			$('.item_warpper').last().appendTo($('.parent_warpper').last());
		}
	}

	function invoke_target_parent(parent,key)
	{

		if ($('.parent_warpper').attr('id')==parent)
		{
			$('<div class="parent_warpper"></div>').attr('id',key).appendTo($('#'+parent));
		}
		else
		{
			if ($('.listitem_warpper').last().attr('id')==parent) 
			{
				$('<div class="parent_warpper"></div>').attr('id',key).appendTo($('.listitem_warpper').last());
			}
			else
			{
				$('<div class="parent_warpper"></div>').attr('id',key).appendTo($('#param_editor'));
			}
		}
		$('<div class="parent_title_warpper"></div>').appendTo($('.parent_warpper').last());
		// 去掉param_中的下划线
		if (key.charAt(key.length-1)=='_') { key=key.slice(0,-1)};
		$('<label>',{ text:key+":", }).appendTo($('.parent_title_warpper').last());
		
		$('<button >删除</button>').appendTo($('.parent_title_warpper').last())
		.click(function(){
			$(this).parent().parent().remove();
		});
		$('<br />').appendTo($('.parent_title_warpper').last());

	}

	// 构造list类型的编辑框
	function invoke_target_list(parent,key)
	{

		if ($('.parent_warpper').last().attr('id')==parent )
		{
			$('<div class="list_warpper"></div>').attr('id',key).appendTo($('.parent_warpper').last());
		}
		else
		{	if ($('.listitem_warpper').last().attr('id')==parent) 
			{
				$('<div class="list_warpper"></div>').attr('id',key).appendTo($('.listitem_warpper').last());
			}
			else
			{
				$('<div class="list_warpper"></div>').attr('id',key).appendTo($('#param_editor'));
			}
		}

		$('<div class="list_title_warpper"></div>').appendTo($('.list_warpper').last());
		$('<label>',{ text:key+":", }).appendTo($('.list_title_warpper').last());
		
		$('<button >删除</button>').appendTo($('.list_title_warpper').last())
		.click(function(){
			$(this).parent().parent().remove();
		});
		$('<br />').appendTo($('.list_title_warpper').last());

	}

	function invoke_listitem_warpper(parent,key)
	{
		if ($('.list_warpper').last().attr('id')==parent)
		{
			$('<div class="listitem_warpper"></div>').attr("id",key).appendTo($('.list_warpper').last());
		}
		else
		{
			$('<div class="listitem_warpper"></div>').attr("id",key).appendTo($('#param_editor'));
		}		
		$('<button >删除</button>').appendTo($('.listitem_warpper').last())
		.click(function(){
			$(this).parent().remove();
		});
		$('<br />').appendTo($('.listitem_warpper').last());
		
	}

	function invoke_scene_param(parent,key,defaultval)
	{
		if ($('.listitem_warpper').last().attr('id')==parent)
		{
			$('<div class="item_warpper"></div>').attr("name",key).appendTo($('.listitem_warpper').last());
		}
		else
		{
			if ($('.parent_warpper').last().attr('id')==parent) 
			{
				$('<div class="item_warpper"></div>').attr("name",key).appendTo($('.parent_warpper').last());
			}
			else
			{
				$('<div class="item_warpper"></div>').attr("name",key).appendTo($('#param_editor'));
			}
			
		}		
		$('<label>',{ text:key+":", }).appendTo($('.item_warpper').last()); 
		$('<input type="text" id="item1" class="item" val=""/>').attr("name",key).appendTo($('.item_warpper').last()); 			
		$('<button >默认值</button>').appendTo($('.item_warpper').last())
		.click(function(){
			$(this).parent().children("#item1").val(defaultval);
		});
		$('<button >删除</button>').appendTo($('.item_warpper').last())
		.click(function(){
			$(this).parent().remove();
		});
		$('<br />').appendTo($('.item_warpper').last());
		
	}
	function invoke_scene_select(parent,key,array)
	{
		if ($('.listitem_warpper').last().attr('id')==parent)
		{
			$('<div class="item_warpper"></div>').attr("name",key).appendTo($('.listitem_warpper').last());
		}
		else
		{
			if ($('.parent_warpper').last().attr('id')==parent) 
			{
				$('<div class="item_warpper"></div>').attr("name",key).appendTo($('.parent_warpper').last());
			}
			else
			{
				$('<div class="item_warpper"></div>').attr("name",key).appendTo($('#param_editor'));
			}
			
		}		
		$('<label>',{ text:key+":", }).appendTo($('.item_warpper').last()); 
		$('<select id="item1" class="item" val=""/>').attr("name",key).appendTo($('.item_warpper').last());
		for (var i = 0; i < array.length; i++) {
			$('<option>',{ text:array[i],value:array[i] }).appendTo($('.item').last()); 
		}		 			
		$('<button >删除</button>').appendTo($('.item_warpper').last())
		.click(function(){
			$(this).parent().remove();
		});
		$('<br />').appendTo($('.item_warpper').last());
		
	}
	
	
	function invoke_posture_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('AnimationInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','type',new Array('posture'));
		invoke_scene_param('param_','duration','1000');
		invoke_scene_param('param_','length','1000');
		invoke_scene_param('param_','start','0');
		invoke_scene_param('param_','delay','0');
		invoke_scene_param('param_','updateRate','10');
		invoke_scene_param('param_','direction','1');
		invoke_target_parent('param_','interpolator');
		invoke_scene_select('interpolator','type',new Array('Linear'));
		invoke_target_parent('param_','fromPosition');
		invoke_target_parent('param_','toPosition');
		invoke_scene_select('toPosition','animDataType',new Array('absolute'));
		invoke_scene_param('toPosition','absoluteNum','0.0,0.0,0.0');
		invoke_target_parent('param_','fromScale');
		invoke_scene_select('fromScale','animDataType',new Array('absolute'));
		invoke_scene_param('fromScale','absoluteNum','1,1,1');
		invoke_target_parent('param_','toScale');
		invoke_scene_select('toScale','animDataType',new Array('absolute'));
		invoke_scene_param('toScale','absoluteNum','1,1,1');
		invoke_target_parent('param_','fromRotate');
		invoke_scene_select('fromRotate','animDataType',new Array('absolute'));
		invoke_scene_param('fromRotate','absoluteNum','180,-180,0');
		invoke_target_parent('param_','toRotate');
		invoke_scene_select('toRotate','animDataType',new Array('absolute'));
		invoke_scene_param('toRotate','absoluteNum','180,-180,0');
	}

	function invoke_position_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('AnimationInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','type',new Array('translate'));
		invoke_scene_param('param_','duration','1000');
		invoke_scene_param('param_','length','1000');
		invoke_scene_param('param_','start','0');
		invoke_scene_param('param_','delay','0');
		invoke_scene_param('param_','updateRate','10');
		invoke_scene_param('param_','direction','1');
		invoke_target_parent('param_','interpolator');
		invoke_scene_select('interpolator','type',new Array('Linear'));
		invoke_target_parent('param_','fromPosition');
		invoke_target_parent('param_','toPosition');
		invoke_scene_select('toPosition','animDataType',new Array('absolute'));
		invoke_scene_param('toPosition','absoluteNum','0.0,0.0,0.0');
	}

	function invoke_scale_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('AnimationInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','type',new Array('scale'));
		invoke_scene_param('param_','duration','1000');
		invoke_scene_param('param_','length','1000');
		invoke_scene_param('param_','start','0');
		invoke_scene_param('param_','delay','0');
		invoke_scene_param('param_','updateRate','10');
		invoke_scene_param('param_','direction','1');
		invoke_target_parent('param_','interpolator');
		invoke_scene_select('interpolator','type',new Array('Linear'));
		invoke_target_parent('param_','fromScale');
		invoke_scene_select('fromScale','animDataType',new Array('absolute'));
		invoke_scene_param('fromScale','absoluteNum','1,1,1');
		invoke_target_parent('param_','toScale');
		invoke_scene_select('toScale','animDataType',new Array('absolute'));
		invoke_scene_param('toScale','absoluteNum','1,1,1');
	}

	function invoke_rotation_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('AnimationInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','type',new Array('rotation'));
		invoke_scene_param('param_','duration','1000');
		invoke_scene_param('param_','length','1000');
		invoke_scene_param('param_','start','0');
		invoke_scene_param('param_','delay','0');
		invoke_scene_param('param_','updateRate','10');
		invoke_scene_param('param_','direction','1');
		invoke_target_parent('param_','interpolator');
		invoke_scene_select('interpolator','type',new Array('Linear'));
		invoke_target_parent('param_','fromRotate');
		invoke_scene_select('fromRotate','animDataType',new Array('absolute'));
		invoke_scene_param('fromRotate','absoluteNum','180,-180,0');
		invoke_target_parent('param_','toRotate');
		invoke_scene_select('toRotate','animDataType',new Array('absolute'));
		invoke_scene_param('toRotate','absoluteNum','180,-180,0');
	}

	function invoke_bgm_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('PlayMusicInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_param('param_','resPath','res/filename.mp3');
	}

	function invoke_playAnimation_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('PlayMd2AnimInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','playType',new Array('<single></single>','repeat'));
		invoke_scene_param('param_','md2AnimName','');

	}

	function invoke_changeScene_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('PlayMd2AnimInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_param('param_','md2AnimName','');
	}

	function invoke_changeVisible_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('ChangePropertyInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','type',new Array('change_visible'));
		invoke_scene_select('param_','visibleType',new Array('visible','invisible'));
	}

	function invoke_change_clickable_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('ChangePropertyInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','type',new Array('change_clickable'));
		invoke_scene_select('param_','clickableType',new Array('clickable','unclickable','switch','none'));
	}

	function invoke_change_playstatus_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('ChangePlayStatusInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','type',new Array('video'));
		invoke_scene_select('param_','action',new Array('start','pause','restart','reverse'));
	}

	function invoke_mute_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('ChangePropertyInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','mute',new Array('true','false'));
	}

	function invoke_change_position_screen_all()
	{
		invoke_listitem_warpper('param','paramItem')
		instructionsGeneralParams();
		invoke_scene_select('paramItem','instructType',new Array('AtomInstruction'));
		invoke_scene_select('paramItem','instructCategory',new Array('ChangePropertyInstruct'));
		invoke_target_parent('paramItem','param_');
		invoke_scene_select('param_','type',new Array('change_position_screen'));
		invoke_scene_select('param_','changeType',new Array('absolute','increase','limit_increase','rnd_increase','rnd_limit_increase'));
		invoke_scene_param('param_','toValue','0.2,0.33,100.0');
		invoke_scene_param('param_','limitLow','0.1,0.2,100.0');
		invoke_scene_param('param_','limitHigh','0.4,0.5,100.0');
	}

	function instructionsGeneralParams()
	{

		invoke_scene_param('paramItem','target','target name');
		invoke_scene_select('paramItem','forwardLogic',new Array('WaitForward'));
		invoke_scene_select('paramItem','backwardLogic',new Array('CanBeCancled'));
		invoke_scene_param('paramItem','instructId','id');
		
	}

	function useLightsTemplate()
	{
		invoke_listitem_warpper('lights','lightsItem');
		invoke_scene_select('lightsItem','type',new Array('directional'));
		invoke_scene_param('lightsItem','direction','1, 0, 0');
		invoke_scene_param('lightsItem','power','0.5');
		invoke_listitem_warpper('lights','lightsItem');
		invoke_scene_select('lightsItem','type',new Array('directional'));
		invoke_scene_param('lightsItem','direction','-1, 0, 0');
		invoke_scene_param('lightsItem','power','0.5');
		invoke_listitem_warpper('lights','lightsItem');
		invoke_scene_select('lightsItem','type',new Array('directional'));
		invoke_scene_param('lightsItem','direction','0, 1, 0');
		invoke_scene_param('lightsItem','power','0.5');
		invoke_listitem_warpper('lights','lightsItem');
		invoke_scene_select('lightsItem','type',new Array('directional'));
		invoke_scene_param('lightsItem','direction','0, -1, 0');
		invoke_scene_param('lightsItem','power','0.5');
		invoke_listitem_warpper('lights','lightsItem');
		invoke_scene_select('lightsItem','type',new Array('directional'));
		invoke_scene_param('lightsItem','direction','0, 0, 1');
		invoke_scene_param('lightsItem','power','0.5');
		invoke_listitem_warpper('lights','lightsItem');
		invoke_scene_select('lightsItem','type',new Array('directional'));
		invoke_scene_param('lightsItem','direction','0, 0, -1');
		invoke_scene_param('lightsItem','power','0.5');
	}

