   $.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            perPage: 16,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);

    var listElement = $this;
    var perPage = settings.perPage; 
    var children = listElement.children();
    var pager = $('.pager');

    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }

    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }

    var numItems = children.size();
    var numPages = Math.ceil(numItems/perPage);

    pager.data("curr",0);

    if (settings.showPrevNext){
        $('<li><a href="#" class="prev_link">prev</a></li>').appendTo(pager);
    }

    var curr = 0;
    while(numPages > curr && (settings.hidePageNumbers==false)){
      if(numPages > 7 && ( curr > 7)){
       $('<li class="hide" ><a href="#" data-current-index="'+ curr +'" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
      }else{
      $('<li><a href="#" data-current-index="'+ curr +'" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
      }
        
        curr++;
    }
      if(curr > 7){
      pager.find('li').last().show().before('<li class="dots"><a href="#" class="page_link dots">...</a></li>')
      }

    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link">Next</a></li>').appendTo(pager);
    }

    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link').hide();
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }
    pager.children().eq(1).addClass("active");

    children.hide();
    children.slice(0, perPage).show();

    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;

        goTo(clickedPage,perPage);
      
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        return false;
    });

    function previous(){
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }

    function next(){
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }

    function goTo(page){
        var startAt = page * perPage,
            endOn = startAt + perPage;

        children.css('display','none').slice(startAt, endOn).show();

        if (page>=1) {
            pager.find('.prev_link').show();
           pager.find('.dots').show();
           pager.find('[data-current-index="'+page+'"]').parent().next().removeClass('hide');
          pager.find('[data-current-index="'+page+'"]').parent().removeClass('hide');
          if(page >= 8){
            pager.find('.dots1').parent().remove();
             pager.children().eq(page).after('<li class="dots"><a href="#" class="page_link dots1">...</a></li>')
           var startPage = 5;
            while(page >= startPage){
              
            pager.children().eq(startPage).addClass("hide")
            startPage++
            }
            
            
          }
                    if(page > 8 && page<(numPages-1)){
            pager.find('.dots1').parent().remove();
             pager.children().eq(page).after('<li class="dots"><a href="#" class="page_link dots1">...</a></li>')
           var endPage = numPages-1;
              var stPage = page+4;        
            while(stPage <= endPage){
              
            pager.children().eq(stPage).addClass("hide")
            stPage++
            }
            
            
          }
        }
        else {
            pager.find('.prev_link').hide();
        }


        if (page<(numPages-1)) {
            pager.find('.next_link').show();
         
        }
        else {
            pager.find('.next_link').hide();
           pager.find('.dots').hide();
        }

        pager.data("curr",page);
        pager.children().removeClass("active");
        pager.children().not('.dots').eq(page+1).addClass("active");

    }
};

$(document).ready(function(){
 $('.product-collection').pageMe({pagerSelector:'.infinite-scrolling',showPrevNext:true,hidePageNumbers:false,perPage:16});
})
