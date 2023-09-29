<?php get_header(); ?>
<main class="mt-[100px]">
  hello
<?php
  if( have_rows('page') ):
    while ( have_rows('page') ) : the_row();
      get_template_part('includes/blocks/' . get_row_layout());
    endwhile;
  endif;
?>
</main>
<?php get_footer(); ?>
