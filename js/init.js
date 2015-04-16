/*
	Strata by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.init({
		reset: 'full',
		containers: '100%',
		breakpoints: {
			global: { href: 'css/style.css', grid: { gutters: ['2.5em', 0] } },
			xlarge: { media: '(max-width: 1800px)', href: 'css/style-xlarge.css' },
			large: { media: '(max-width: 1280px)', href: 'css/style-large.css', grid: { gutters: ['2em', 0] } },
			medium: { media: '(max-width: 980px)', href: 'css/style-medium.css'},
			small: { media: '(max-width: 736px)', href: 'css/style-small.css', grid: { gutters: ['1.5em', 0] }, viewport: { scalable: false } },
			xsmall: { media: '(max-width: 480px)', href: 'css/style-xsmall.css' }
		}
	});
        
        function scrollToElement( speed, elem ) {
            speed = speed || 500;
            elem = elem || null;
            if( elem ) {        // elem exist
                console.log(elem);
                var $target = $( elem );
                if( $target.length ) {
                    // Target exists
                    $( 'html, body' ).animate( {
                        scrollTop: $target.offset().top
                    }, speed );
                }
            }
        }
        $(function() {
                // Selezioniamo i link che hanno un hash
                $( "a[href^='#']" ).click(function( e ) {
                        e.preventDefault(); // Blocchiamo l'azione predefinita
                        var linkHash = $( this ).attr( "href" ); // Otteniamo l'hash
                        scrollToElement( 400, linkHash );
                });
        });
        
        // Setup avatar image
        $(function() {
                // Get window height
                var height = window.innerHeight;
                if( height < 700 ) {
                    $('.avatar').css( 'display', 'hidden');
                }
        });

	$(function() {

		var $window = $(window),
			$body = $('body'),
			$header = $('#header');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// Touch?
			if (skel.vars.isMobile) {

				// Turn on touch mode.
					$body.addClass('is-touch');

				// Height fix (mostly for iOS).
					window.setTimeout(function() {
						$window.scrollTop($window.scrollTop() + 1);
					}, 0);

			}

		// Forms (IE<10).

			if (skel.vars.IEVersion < 10) {

				var $form = $('form');

				if ($form.length > 0) {

					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();

				}

			}
                        
        });
        
        // Setup contact form submission
        $(function() {
                        
                // Get the form
                        var form = $('#contact-form');
                      
                // Get the messages div
                        var formMessages = $('#form-messages');
                        
                // Get Submit button
                        var submit = form.find(':submit');
                                
                // Event listener for the form
                        $(form).submit(function(event) {
                                event.preventDefault();
                                
                                
                                // Serialize form data
                                        var formData = $(form).serialize();
                                
                                // Avoid further submissions
                                        submit.val('Sending...');
                                        submit.attr('disabled', 'disabled');
                                        
                                // Submit the form using ajax
                                        $.ajax({
                                                type: "POST",
                                                url: $(form).attr('action'),
                                                data: formData
                                        })
                                                .done(function( response ) {
                                                // Make sure the formMessages div has the success class
                                                        $(formMessages).removeClass('error');
                                                        $(formMessages).addClass('success');
                                                        
                                                // Set the message text
                                                        $(formMessages).text(response);
                                                
                                                // Cleat the form
                                                        $('#name').val('');
                                                        $('#email').val('');
                                                        $('#message').val('');
                                        })     
                                                .fail(function(data) {
                                                // Make sure the formMessages div has the success class
                                                        $(formMessages).addClass('error');
                                                        $(formMessages).removeClass('success');
                                                        
                                                // Set the message text
                                                        console.log("Response text: " + data.responseText);
                                                        if(data.responseText !== '') {
                                                            $(formMessages).text(data.responseText);
                                                        } else {
                                                            $(formMessages).text('Oops! An error occured and your message could not be sent.')
                                                        }
                                        });
                                        
                                        // Ripristinate submit         
                                                submit.val( "Send Message" );
                                                submit.removeAttr( "disabled" );
                        });
                        
	});

})(jQuery);