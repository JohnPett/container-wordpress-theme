<?php
  /*
    Add and enqueue CSS and JS to the <header>
  */
  function add_scripts() {
    wp_enqueue_script('script', get_stylesheet_directory_uri() . '/index.js', null, null);
    wp_enqueue_style( 'style', get_stylesheet_uri() );
  }
  add_action('wp_enqueue_scripts', 'add_scripts');

  /*
    Responsive <img> srcset
  */
  function acf_responsive_image($image_id, $image_size, $max_width){
    // set the default src image size
    $image_src = wp_get_attachment_image_url( $image_id, $image_size );
    // set the srcset with various image sizes
    $image_srcset = wp_get_attachment_image_srcset( $image_id, $image_size );
    // generate the markup for the responsive image
    echo 'src="'.$image_src.'" srcset="'.$image_srcset.'" sizes="(max-width: '.$max_width.') 100vw, '.$max_width.'"';
  }

  /*
    Get the slug
  */
  function the_slug($echo=true){
    $slug = basename(get_permalink());
    do_action('before_slug', $slug);
    $slug = apply_filters('slug_filter', $slug);
    if( $echo ) echo $slug;
    do_action('after_slug', $slug);
    return $slug;
  }

  /*
    Add options page
  */
  if( function_exists('acf_add_options_page') ) {
    acf_add_options_page();
  }
?>
