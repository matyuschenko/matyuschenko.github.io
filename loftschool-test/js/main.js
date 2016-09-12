$(window).bind("load", function() {

	// FOOTER
	var footerHeight = 0,
	footerTop = 0,
	$footer = $($(".footer")[0]);

	positionFooter();

	function positionFooter() {

		footerHeight = $footer.height();
		footerTop = ($(window).scrollTop()+$(window).height()-footerHeight)+"px";
		$footer.css({
			position: "absolute",
			top: footerTop
		})

	}

	$(window)
		.scroll(positionFooter)
		.resize(positionFooter);


	// COURSES - PREPARE FILTERS
	var courses = $('.course').each(function() {
		var _h = $(this).height();
		var _filter = $($(this).find('.course-filter')[0]);
		_filter.height(_h);
	});


	//	CLICK ON COURSES
	courses.click(function() {

		// add filter
		//var _x = $(this).offset().left;
		//var _y = $(this).offset().top;
		//var _w = $(this).width();
		//var _h = $(this).height();
        //
		//var filter = $('<div>').css({
		//	position: 'absolute',
		//	left: _x,
		//	top: _y,
		//	width: _w,
		//	height: _h,
		//	'background-color': '#8cc34b',
		//	opacity: .2
		//});
        //
		//filter.appendTo('body').delay(1000).fadeOut();

		$(this).find('.course-filter').css({
			'background-color': '#8cc34b',
			opacity: .2
		});

		// check box
		var check = $('<i>').addClass('fa').addClass('fa-check-square').attr("aria-hidden", "true").css({
			color: '#8cc34b',
			'margin-left': '20px',
			'margin-right': '15px',
			'font-size': '18px'
		});
		$($(this).find('.course-checkbox')[0]).remove();
		$($(this).find('.course-checkbox-text')[0]).prepend(check);

		// remove course
		$(this).addClass('clicked').delay(1000).fadeOut(400, check_courses);

	});


	// CHECK NUM OF COURSES AND COMPLETE IF NECESSARY
	function check_courses() {
		var left_courses = $('.course').filter(function() { return $(this).css('display') != 'none'; }).length;
		if (left_courses == 0) {
			$('.courses-header').remove();
			$('.courses-subheader').remove();

			var complete_screen = $('<div>').addClass('complete-screen');
			var complete_tick = $('<i>').addClass('fa').addClass('fa-check').attr("aria-hidden", "true").css({
				color: '#8cc34b',
				'font-size': '41.63px'
			});
			complete_screen.append(complete_tick);
			complete_screen.append($('<span>').text(' Задание выполнено'));
			$($('.courses')[0]).append(complete_screen);

		};
	}

});