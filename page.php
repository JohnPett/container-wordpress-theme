<?php
  if( have_rows('page') ):
    while ( have_rows('page') ) : the_row();
      if( get_row_layout() == 'default' ):
        $title = get_sub_field('title');
        $text = get_sub_field('text');
        $background = get_sub_field('background');
        echo '<section>';
          echo '<h2>' . $title . '</h2>';
          echo '<div>' . $text . '</div>';
          echo '<img ';
            echo acf_responsive_image($background['ID'], $size, '1024px');
          echo ' />';
        echo '</section>';
      endif;
    endwhile;
  endif;
?>
