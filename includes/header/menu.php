<ul class="hidden lg:flex justify-center content-center flex-wrap">
  <?php
    $menu_items = wp_get_nav_menu_items('Main Menu');
    foreach($menu_items as $item) {
      $title = $item->title;
      $url = $item->url;
      $slug = basename($url);
      $current_slug = the_slug(false);
      $active = $slug == $current_slug ? 'active' : '';
      echo '<li class="flex content-center flex-wrap mr-[5vw]">';
        echo '<a href="'.$url.'" class="font-bold tracking-wide flex content-center flex-wrap text-sm hover:opacity-50 ease-in-out duration-300 text-gray-700 leading-none '.$active.'">';
          echo $title;
        echo '</a>';
      echo '</li>';
    }
  ?>
</ul>
