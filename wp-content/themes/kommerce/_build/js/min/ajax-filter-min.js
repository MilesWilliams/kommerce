jQuery(document).ready(function($){$(".tax-filter").click(function(t){t.preventDefault?t.preventDefault():t.returnValue=!1;var a=$(this).attr("title");$(".tagged-posts").fadeOut(),data={action:"filter_posts",afp_nonce:afp_vars.afp_nonce,taxonomy:a},$.post(afp_vars.afp_ajax_url,data,function(t){t&&($(".section-wrapper").html(t),$(".section-wrapper").fadeIn())})})});