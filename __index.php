<?php
require_once('vendor/erusev/parsedown/Parsedown.php');
$Parsedown = new Parsedown();

echo $Parsedown->text('Hello _Parsedown_!'); # prints: <p>Hello <em>Parsedown</em>!</p>