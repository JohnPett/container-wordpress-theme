
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
      echo '<div class="[&:has([style*=center])]:justify-center w-prose relative z-5 py-28 flex flex-wrap font-regular balance-text text-white">' . $text . '</div>';
    }
  echo '</section>';
?>
