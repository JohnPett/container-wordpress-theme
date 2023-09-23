
<?php
  $text = get_sub_field('text');
  $background = get_sub_field('background');
  $size = 'full';
  echo '<section class="flex content-center justify-center flex-wrap relative bg-gray-800">';
    if ($background) {
      echo '<img class="w-full h-full object-cover object-center absolute" ';
        echo acf_responsive_image($background['ID'], $size, '1024px');
      echo ' />';
    }
    if ($text) {
      echo '<div class="max-w-screen-xl w-[90%] relative z-5 py-28 flex flex-wrap content-center">';
        echo '<div class="font-regular balance-text text-white w-full">' . $text . '</div>';
      echo '</div>';
    }
  echo '</section>';
?>
