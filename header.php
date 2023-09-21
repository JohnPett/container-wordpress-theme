<!doctype html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <title><?php wp_title(''); ?><?php if (wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>
    <link href="//www.google-analytics.com" rel="dns-prefetch">
    <link href="<?php echo get_template_directory_uri(); ?>/favicon.ico" rel="shortcut icon">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <?php wp_head(); ?>
</head>

<body class="bg-gray-100">
  <header class="header flex content-center justify-center bg-white h-[100px]">
    <nav class="w-[90%] flex content-center justify-between max-w-screen-xl h-full">
      <div class="flex h-full">
        <?php get_template_part('includes/logo'); ?>
        <?php get_template_part('includes/menu'); ?>
      </div>
      <div class="flex justify-center content-center flex-wrap">
        <?php get_template_part('includes/language'); ?>
        <?php get_template_part('includes/search'); ?>
        <?php get_template_part('includes/button'); ?>
      </div>
    </nav>
  </header>
