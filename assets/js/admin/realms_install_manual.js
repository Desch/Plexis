$().ready(function() {
    // Tipsy mouseovers
    $('select[name=driver]').tipsy({trigger: 'hover', gravity: 's', delayIn: 500, delayOut: 500});
    $('select[name=ra_type]').tipsy({trigger: 'hover', gravity: 's', delayIn: 500, delayOut: 500});
    $('input[name=ra_username]').tipsy({trigger: 'hover', gravity: 's', delayIn: 500, delayOut: 500});
    $('input[name=ra_urn]').tipsy({trigger: 'hover', gravity: 's', delayIn: 500, delayOut: 500});

    /* Tabs */
    $("#tab-panel-1").createTabs();

    // Form validation
    $("#install-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 1
            },
            address: {
                required: true,
                minlength: 3
            },
            port: {
                required: true,
                minlength: 1
            },
            max_players: {
                required: true
            },
            c_address: {
                required: true,
                minlength: 3
            },
            c_port: {
                required: true,
                minlength: 1
            },
            c_address: {
                required: true,
                minlength: 3
            },
            c_username: {
                required: true
            },
            c_password: {
                required: true
            },
            c_database: {
                required: true
            },
            w_address: {
                required: true,
                minlength: 3
            },
            w_port: {
                required: true,
                minlength: 1
            },
            w_address: {
                required: true,
                minlength: 3
            },
            w_username: {
                required: true
            },
            w_password: {
                required: true
            },
            w_database: {
                required: true
            },
        }
    });

    // ===============================================
    // bind the Install form using 'ajaxForm'
    $('#install-form').ajaxForm({
        beforeSubmit: function (arr, data, options)
        {
            $('#js_message').attr('class', 'alert loading').html('Submitting Form...').slideDown(300);
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return true;
        },
        success: function (response, statusText, xhr, $form)
        {
            // Parse the JSON response
            var result = jQuery.parseJSON(response);
            if(typeof result.php_error != "undefined" && result.php_error == true)
            {
                show_php_error( result.php_error_data );
            }
            else
            {
                if (result.success == true)
                {
                    // Display our Success message, and ReDraw the table so we imediatly see our action
                    $('#install-form').html('<div class="alert ' + result.type +'">' + result.message + '. <a href="' + Plexis.url + '/admin/realms">Click here to return.</a></div>');
                }
                else
                {
                    $('#js_message').attr('class', 'alert ' + result.type).html(result.message);
                }
                $('#js_message').delay(5000).slideUp(300);
            }
        },
        error: function () {
            $.msgbox('An error ocurred while sending the ajax request.', {type : 'error'});
        },
        timeout: 5000
    });
});