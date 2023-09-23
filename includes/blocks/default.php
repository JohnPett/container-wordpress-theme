
<?php
  $text = get_sub_field('text');
  $background = get_sub_field('background');
  $size = 'full';
  echo '<section class="flex justify-center flex-wrap relative bg-gray-800">';
    if ($background) {
      echo '<img class="w-full h-full object-cover object-center absolute" ';
        echo acf_responsive_image($background['ID'], $size, '1024px');
      echo ' />';
    }
    if ($text) {
      echo '<div class="[&:has([style*=center])]:justify-center [&:has([style*=right])]:justify-end w-[90%] relative z-5 flex flex-wrap">';
        echo '<div class="font-regular balance-text text-white py-28">' . $text . '</div>';
      echo '</div>';
    }
  echo '</section>';
?>
