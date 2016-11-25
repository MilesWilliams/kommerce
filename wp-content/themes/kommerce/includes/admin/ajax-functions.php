<?php

/*-----------     The ajax WP_Query for the single post     -----------*/
	function ajax_press_release_modal( $id ) {

	    $id = $_POST['id'];

	    $paged = get_query_var( 'paged' ) ? get_query_var( 'paged' ) : 1;
	    $args = array(
	        'p'                       => $id,
	        'post_type' 				=> 'post',
	        'update_post_term_cache' 	=> false,
	        'posts_per_page' 			=> 1,
	        'pagination'				=> false,
	        'paged'					    => $paged,
	        );


		$modalPost = new WP_Query( $args );

	  if ( $modalPost->have_posts() ) : while ( $modalPost->have_posts() ) : $modalPost->the_post();
		  global $post;
		  $post = get_post($id);

		  $next_post = get_next_post();
		  $previous_post = get_previous_post();

		  $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );?>

		<div class="modal-lockup" data-pre="<?php echo $previous_post->ID ?>" data-next="<?php echo $next_post->ID ?>" >
			<script type="text/javascript">

				var $paginationPost = $('#pagination').children('.icon'),
					$closeIcon = $('.modal-lockup').children('.icon-close');

				$closeIcon.on('click', function(){
					$('.modal-wrapper').removeClass('open');
					$('body').removeClass('modal-open');
					$('.modal-wrapper').fadeOut('slow');
				})

				$($paginationPost).on("click", function() {

					var id = $(this).data('post'),
						$ajaxUrl = $(this).attr('data-url'),
						$ajaxLoad = $('.loading-gif');

					$ajaxLoad.show();
					$.ajax({
						type: 'POST',
						url: $ajaxUrl,
						context: this,
						data: {'action': 'post_modal', id: id },
						success: function(response) {
							$ajaxLoad.hide();
							$('.modal-wrapper').html(response);
							$('.modal-wrapper').addClass('open');
							$('body').addClass('modal-open');
							return false;
						}
					});
				});
			</script>
			<script type="text/javascript">

				$(".post-like").children('a').on('click',function(e){
					e.preventDefault();

				var $heart = $(this),
					// Retrieve post ID from data attribute
					$post_id = $heart.data("post_id");

					//Ajax call
					$.ajax({
						type: "post",
						url: <?php echo admin_url('admin-ajax.php'); ?>,
						data: "action=post-like&post_like=&post_id="+post_id,
						success: function(count){
							// If vote successful
							if(count != "already")
							{
							   $heart.addClass("voted");
							   $heart.siblings(".count").text(count);
							}
						}
					});
					return false;
				});
			</script>
			<div class="icon icon-close"><?php get_template_part( '_build/icons/icon', 'close'); ?></div>
		    <div class="modal-content">
				<div class="pagination-icon-lockup" id="pagination">
					<?php if($previous_post) : ?>
						<div class="icon icon-left" data-url="<?php echo admin_url('admin-ajax.php'); ?>" data-post="<?php echo $previous_post->ID ?>"><?php get_template_part( '_build/icons/icon', 'right'); ?></div>
					<?php endif; ?>
					<?php if($next_post) : ?>
					<div class="icon icon-right" data-url="<?php echo admin_url('admin-ajax.php'); ?>" data-post="<?php echo $next_post->ID ?>" ><?php get_template_part( '_build/icons/icon', 'right'); ?></div>
					<?php endif; ?>
				</div>
		        <div class="featured-image" style="background-image:url(<?php echo $thumb[0]; ?>)">
					<div class="article-header">
			            <div class="title-box">
			                <h1><?php the_title(); ?></h1>
			                <?php $supportDesc =  get_post_meta( $id,'desc', true);
			                    if(!empty( $supportDesc ) ){
			                    ?>
			                    <h2><?php echo $supportDesc ?></h2>
			                <?php } ?>

			            </div>
						<div class="article-social">
							<?php echo getPostLikeLink($id); ?>
							<span class="divider"></span>
							<div class="social-wrapper">
								<div class="social-container">
									<?php get_template_part('includes/modules/module', 'socialShare'); ?>
								</div>
								<div class="social-link">
									<a href="#"><?php get_template_part('_build/icons/icon', 'share'); ?> Share</a>
								</div>
							</div>
						</div>

					</div>
		        </div>

		        <div class="post-content">
					<div class="article-meta">

						<p><span><?php the_author() ?></span> / <?php echo get_the_date(); ?></p>
					</div>
		            <?php the_content(); ?>
		        </div>
				<div class="comments-section">
					<ol class="commentlist">
					<?php
						//Gather comments for a specific page/post
						$comments = get_comments(array(
							'post_id' => $id,
							'status' => 'approve' //Change this to the type of comments to be displayed
						));

						//Display the list of comments
						wp_list_comments(array(
							'per_page' => 10, //Allow comment pagination
							'reverse_top_level' => false //Show the oldest comments at the top of the list
						), $comments);
					?>
				</ol>
				</div>
		    </div>
		</div>
	  <?php endwhile; ?>
	  <?php endif;

	  die();
	}

	add_action('wp_ajax_post_modal', 'ajax_press_release_modal');
	add_action('wp_ajax_nopriv_post_modal', 'ajax_press_release_modal');



/*-----------     The ajax function for filtering posts by tags     -----------*/

	function ajax_filter_posts_scripts() {
	  // Enqueue script
	  wp_register_script('kommerce_afp_script', get_template_directory_uri() . '/_build/js/min/ajax-filter-min.js', array('jquery'),'1.0.0', true);
	  wp_enqueue_script('kommerce_afp_script');

	  wp_localize_script( 'kommerce_afp_script', 'modal_vars', array(
	        'modal_nonce' => wp_create_nonce( 'modal_nonce' ), // Create nonce which we later will use to verify AJAX request
	        'afp_ajax_url' => admin_url( 'admin-ajax.php' ),
	      )
	  );
	}
	add_action('wp_enqueue_scripts', 'ajax_filter_posts_scripts', 100);

	// Script for getting posts
	function ajax_filter_get_posts( $taxonomy ) {

		// Verify nonce
		if( !isset( $_POST['afp_nonce'] ) || !wp_verify_nonce( $_POST['afp_nonce'], 'afp_nonce' ) )
		die('Permission denied');

		$taxonomy = $_POST['taxonomy'];

		// WP Query
		$args = array(
		'tag' => $taxonomy,
		'post_type' => 'post',
		'posts_per_page' => 10,
		);

		// If taxonomy is not set, remove key from array and get all posts
		if( !$taxonomy ) {
		unset( $args['tag'] );
		}

		$query = new WP_Query( $args );

		if ( $query->have_posts() ) : while ( $query->have_posts() ) : $query->the_post(); ?>

		<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<?php the_excerpt(); ?>

		<?php endwhile; ?>
		<?php else: ?>
		<h2>No posts found</h2>
		<?php endif;

		die();
	}

	add_action('wp_ajax_filter_posts', 'ajax_filter_get_posts');
	add_action('wp_ajax_nopriv_filter_posts', 'ajax_filter_get_posts');






/*-----------     The ajax function for post likes    -----------*/

	add_action('wp_ajax_nopriv_post-like', 'post_like');
	add_action('wp_ajax_post-like', 'post_like');

	wp_enqueue_script('like_post', get_template_directory_uri().'/_build/js/post-like.js', array('jquery'),'1.0.0', true);
	wp_localize_script('like_post', 'ajax_var', array(
	    'url' => admin_url('admin-ajax.php'),
	    'nonce' => wp_create_nonce('ajax-nonce')
	));

	function post_like(){
	    // Check for nonce security
	    $nonce = $_POST['nonce'];

	    if ( ! wp_verify_nonce( $nonce, 'ajax-nonce' ) )
	        die ( 'Busted!');

	    if(isset($_POST['post_like'])){
	        // Retrieve user IP address
	        $ip = $_SERVER['REMOTE_ADDR'];
	        $post_id = $_POST['post_id'];

	        // Get voters'IPs for the current post
	        $meta_IP = get_post_meta($post_id, "voted_IP");
	        $voted_IP = $meta_IP[0];

	        if(!is_array($voted_IP))
	            $voted_IP = array();

	        // Get votes count for the current post
	        $meta_count = get_post_meta($post_id, "votes_count", true);

	        // Use has already voted ?
	        if(!hasAlreadyVoted($post_id))
	        {
	            $voted_IP[$ip] = time();

	            // Save IP and increase votes count
	            update_post_meta($post_id, "voted_IP", $voted_IP);
	            update_post_meta($post_id, "votes_count", ++$meta_count);

	            // Display count (ie jQuery return value)
	            echo $meta_count;
	        }
	        else
	            echo "already";
	    }
	    exit;
	}
	$timebeforerevote = 120; // = 2 hours

	function hasAlreadyVoted($post_id){

	    global $timebeforerevote;

	    // Retrieve post votes IPs
	    $meta_IP = get_post_meta($post_id, "voted_IP");
	    $voted_IP = $meta_IP[0];

	    if(!is_array($voted_IP))
	        $voted_IP = array();

	    // Retrieve current user IP
	    $ip = $_SERVER['REMOTE_ADDR'];

	    // If user has already voted
	    if(in_array($ip, array_keys($voted_IP))){
	        $time = $voted_IP[$ip];
	        $now = time();

	        // Compare between current time and vote time
	        if(round(($now - $time) / 60) > $timebeforerevote)
	            return false;

	        return true;
	    }

	    return false;
	}

	function getPostLikeLink($post_id){
	    $themename = "kommerce";

	    $vote_count = get_post_meta($post_id, "votes_count", true);
		if ($vote_count <= 0) {
			$vote_count = '0';
		}else

	    $output = '<p class="post-like">';
	    if(hasAlreadyVoted($post_id))
	        $output .= ' <span title="'.__('I like this article', $themename).'" class="like alreadyvoted"></span>';
	    else
	        $output .= '<a href="#" data-post_id="'.$post_id.'">
	                    <span  title="'.__('I like this article', $themename).'"class="qtip like"></span>
	                </a>';
	    $output .= '<span class="count">'.$vote_count.'</span></p>';

	    return $output;
	}