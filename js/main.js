initWindow(window,750);

function appendList(data){
    var html = "";
    var len =data.length;
    var template = '<li>'+
        '<a href="javascript:GameCenter.authUrl({{itemId}},\'{{param}}\');">'+
            '<img class="imgUrl" src="{{src}}" alt="">'+
            '<div class="right">'+
                '<h5 class="name">{{name}}<img class="icon_hot" style="display:{{display}}" src="https://downqn.tuyoo.com/offical_accounts/gameBox/icon_tag@2x.png"/></h5>'+
                '<p class="des">{{description}}</span>'+
                    '<p class="howmany"><em>{{peopleNum}}</em>万人在玩</span>'+
            '</div>'+
            '<button class="goGame">进入</button>'+
        '</a>'+
    '</li>';
    for (var i = 0; i < len; i++) {
        if(data[i].isHot == 1){
            var isShow = "inline";
        }else{
            var isShow = "none";
        }
        html += GameCenter.renderTemplate(template, {
            display:isShow,
            name: data[i].name,
            itemId:data[i].itemId,
			param:data[i].wxparam,
			src: data[i].src,
            description: data[i].describe,
            peopleNum: data[i].people
        });
    }
    return html;
}
