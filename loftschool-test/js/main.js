$(window).bind("load", function() {

	// COURSES - SET UP FILTERS
	var courses = $('.course').each(function() {
		var _h = $(this).height();
		var _filter = $($(this).find('.course-filter')[0]);
		_filter.height(_h);
	});


	//	CLICK ON COURSES
	courses.click(function() {

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


	// CHECK NUM OF COURSES AND SHOW COMPLETE IF NECESSARY
	function check_courses() {

		var courses_left = $('.course').filter(function() { return $(this).css('display') != 'none'; }).length;

		if (courses_left == 0) {
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

		}
	}

});