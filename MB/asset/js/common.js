/* Tabs */
(function(){
	var $tabContainer = $('.tabContainer');
	if($tabContainer.length < 1) return;

	$tabContainer.on('click', '.tabButton', tabClickEvent);
	$tabContainer.on('keydown', '.tabList', tabKeyEvent);
	
	function activateTab(tab) {
		if(!tab) return;
		$(tab)
			.addClass('active')
			.attr({
				'tabindex': '0',
				'aria-selected': 'true'
			})
			.focus()
			.siblings()
				.removeClass('active')
				.attr({
					'tabindex': '-1',
					'aria-selected': 'false'
				})
	}
	
	function activateTabPanel(tab) {
		if(!tab) return;

		$('#' + tab.getAttribute('aria-controls'))
			
			.attr({
				'tabindex': '0'
			})
			.prop({
				'hidden': false
			})
			.addClass('active')
			.siblings('.tabPanel')
				.attr({
					'tabindex': '-1'
				})
				.prop({
					'hidden': true
				})
				.removeClass('active')
	}
	
	function tabClickEvent(e) {
		e = e || window.event;
		e.stopPropagation();
		var currTab = e.currentTarget;
		
		activateTab(currTab);
		activateTabPanel(currTab);
	}
	
	function tabKeyEvent(e) {
		e = e || window.event;
		e.stopPropagation();
		
	var keycode = e.keyCode || e.which;				
		
		switch(keycode) {
			case 37: //left arrow
				if(e.target.previousElementSibling) {
					$(e.target)
						.attr({
							'tabindex': '-1'
						})
						.prev()
							.attr({
								'tabindex': '0'
							})
							.focus()
				} else {
					$(e.target)
						.attr({
							'tabindex': '-1'
						})
						.siblings(':last')
							.attr({
								'tabindex': '0'
							})
							.focus()
				}
				break;
				
			case 39: //right arrow
				if(e.target.nextElementSibling) {
					$(e.target)
						.attr({
							'tabindex': '-1'
						})
						.next()
							.attr({
								'tabindex': '0'
							})
							.focus()
				} else {
					$(e.target)
						.attr({
							'tabindex': '-1'
						})
						.siblings(':first')
							.attr({
								'tabindex': '0'
							})
							.focus()
				}
				break;
			case 32: // spacebar
			case 13: // enter
				e.preventDefault();
				activateTab(e.target);
				activateTabPanel(e.target);
				break;
		}
	}
})();

/* Input only Number */
(function(){
	var $target = $('.onlyNum');
	if($target.length < 1) return;

	$target.on('input', function(){
		$(this).val( $(this).val().replace(/\D/g,'') );
	});

})();

/* Search */
(function(){
	var $target = $('.search_box input[type=search]');
	if($target.length < 1) return;

	$target.on('focus', function(){
		$('.app_bottom').addClass('hide');
	});
	$target.on('blur', function(){
		$('.app_bottom').removeClass('hide');
	});
})();

/* Textarea */
(function(){
	var $target = $('.writing_box textarea');
	if($target.length < 1) return;
	
	$target.on('focus', function(){
		$(this).parent().addClass('focused');
		if(!$('.app_bottom').children('.writing_box')) {
			$('.app_bottom').addClass('hide');
		}
	});
	$target.on('blur', function(){
		if ( !$(this).val() ) {
			$(this).parent().removeClass('focused');
			$('.app_bottom').removeClass('hide');
		} else {
			return;
		}
	});
})();


/* Scroll Controls */
(function(){
	var presentTop = 0;
	var $helpContainer = $('.psuedo_container');
	var $searchContainer = $('.search_container');
	var $lnbContainer = $('.lnb_main');

	if($helpContainer.length < 1 || $lnbContainer.length < 1 || $searchContainer.length < 1) return;

	
	$helpContainer.css('height', $searchContainer.outerHeight() + $lnbContainer.outerHeight());

	$(window).on('scroll', function(){
		presentTop = $(window).scrollTop();
	
		if(presentTop > $helpContainer.offset().top ) {
			$searchContainer.css('position', 'fixed').css('top', 0);
			$lnbContainer.css('position', 'fixed').css('top', $searchContainer.outerHeight());
		} else {
			$searchContainer.css('position', 'static');
			$lnbContainer.css('position', 'static');
		}
	});
})();

/* Top Button */
(function(){
	$(window).on('scroll', function(){
		if($(window).scrollTop()>300) {
			$('.btnTop').addClass('active');	
		} else {
			$('.btnTop').removeClass('active');	
		}
	});

	$('.btnTop').on('click', function(){
		$('html, body').animate({scrollTop: '0'}, 300);
	})
})();


/* Remodal Popup */
(function(){
	$('.remodal').remodal({ hashTracking: false });
})();

/* Banner: .benefitSlider :팝업 호출시 슬라이더 오류로 인해 주석처리 */
/* (function(){
	var $slider = $('.benefitSlider');
	if($slider.length < 1) return;

	$slider.slick({
		vertical: true,
		verticalSwiping: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		// infinite: false,
		speed: 1000,
		arrows: false,
		dots: false
	});

	// Slider Rewinding Helper
	// $slider.on('afterChange', function(event, slick, currentSlide, nextSlide) {
	// 	if (currentSlide === 2) {
	// 		$slider.slick('slickGoTo', 0);
	// 	}
	// });

})(); */

/* Banner: .banner_type1 */
(function(){
	var $slider = $('.app_bottom .banner_type1');
	if($slider.length < 1) return;

	$slider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		infinite: true,
		speed: 500,
		arrows: false
	});
})();


/* Appheader - Contents View & SNS Share */
(function(){
	var $target = $('.app_header.type02');
	if($target.length < 1) return;

	$('.btnSns, .btn_share').on('click', function(){
		$('.share_container').toggleClass('active');
	});

	$('.share_container .btn_close').on('click', function(){
		$('.share_container').removeClass('active');
	});

})();


/* Accordion*/
(function(){
	var $acdnButtons = $('.acdnButton');

	function openAccordionPanel($acdnButton) {
		$acdnButton
			.closest('li').siblings().children('.acdnButton')
			.removeClass('active')
			.attr({
				'aria-label': '메뉴 열기'
			})
			.siblings('.acdnPanel')
				.slideUp(300);
				

		$acdnButton
			.addClass('active')
			.attr({
				'aria-label': '메뉴 닫기'
			})
			.siblings('.acdnPanel')
				.slideDown(300);
	}
	
	function closeAccordionPanel($acdnButton) {
		$acdnButton
		.removeClass('active')
		.attr({
			'aria-label': '메뉴 열기'
		})
		.siblings('.acdnPanel')
			.slideUp(300);
	}

	$acdnButtons.on('click', function(e){
		e = e || window.event;
		e.stopPropagation();
		var $currTarget = $(e.currentTarget); 

		var position = $('html, body').scrollTop();
		
	
		if( $currTarget.hasClass('active') ) {
			closeAccordionPanel($currTarget);
		} else {
			openAccordionPanel($currTarget);
		}

		$('html, body').animate({scrollTop: position}, 300); //slideUp scroll error fix
	});
})();



/* Input2 Animation */
(function(){
	var $target = $('.input_box2 input');
	if($target.length < 1) return;

	$target.each(function(){
		if($(this).val() != '') {
			$(this).parents('.input_box2').addClass('actived');
		}
	});
	$target.on('blur', function(){
		if($(this).val() == '') {
			$(this).parents('.input_box2').removeClass('active').removeClass('actived');
		}
	});
	$target.on('focus', function(){
		if($(this).val() == '') {
			$(this).parents('.input_box2').addClass('active');
		}
	});

})();

