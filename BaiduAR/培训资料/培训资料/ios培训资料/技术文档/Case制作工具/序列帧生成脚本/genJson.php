<?php

// part of obj list
$objList = array();
$count = 140;
$delta = 0.1;

$length = 4;

function calDelay($i) {
    return 6 + ($i - 70)/70*40*0.1;
}

for ($i=70; $i <= $count ; $i=$i+$length) {
	$id = '';
	if ($i >= 10 & $i < 99) {
		$id = "0$i";
	} else if($i >= 100) {
		$id = "$i";		
	} else {
		$id = "00$i";
	}

	$z = 0;
    if($i%2 == 0) {
        $z = 5;
    }

	$item = array();
	$item['id'] = "frame-".$i;
	$item['type'] = "plane";
	$item["position"] = "512,450,$z";
	if ($i == 70) {
		$item['scale'] = "3.7,3.7,3.7";
	} else {
		$item['scale'] = "0.0001,0.0001,0.0001";
	}
	$item["rotation"] = "0,0,180";
	$item["sizeX"] = "450";
	$item["sizeY"] = "450";
	$item["visiable"] = "1";
	$texture = array();
	$texture["type"] = "image";
	$texture["imageList"] = array("/res/image/yinghuaBG_0711_".$id.".png");
	$item['texture'] = $texture;
	array_push($objList, $item);
}

$item = array();
$animList = array();
$delay = $delta * 70;
$item['target'] = "frame-70";
$item['action'] = "geometric";
$item['persist'] = "1";
$item['forwardLogic'] = "wait";
$item['backwardLogic'] = "beCancelled";
$param = array();
$param["type"] = "scale";
$param["duration"] = "0.0001";
$param["speed"] = "1.0";
$param['delay'] = "$delay";
$param["repeatCount"] = "1";
$param["repeatMode"] = "none";
$param["timingMode"] = "none";
$param["scaleType"] = "to";
$param["scaleScalar"] = "0.00001";
$item["param"] = $param;
array_push($animList, $item);
for ($i=70 ;$i < 140; $i=$i+$length) { 
	$delay = calDelay($i); 

    $item = array();
    $item['target'] = "frame-$i";
    $item['action'] = "geometric";
    $item['persist'] = "1";
    
    $item['forwardLogic'] = "wait";
    $item['backwardLogic'] = "beCancelled";
    $param = array();
    $param["type"] = "scale";
    $param["duration"] = "0.0001";
    $param["speed"] = "1.0";
    $param["repeatCount"] = "1";
    $param["repeatMode"] = "none";
    $param["timingMode"] = "none";
    $param["scaleType"] = "to";
    $param["scaleScalar"] = "3.7";
    $param['delay'] = "$delay";
    $item["param"] = $param;
    if ($i == 70) {

    } else {
        array_push($animList, $item);
    }
   
    $item = array();
    $item['target'] = "frame-$i";
    $item['action'] = "geometric";
    
    $item['persist'] = "1";
    $item['forwardLogic'] = "wait";
    $item['backwardLogic'] = "beCancelled";
    $param = array();
    $param["type"] = "translate";
    $param["duration"] = "0.0001";
    $param["speed"] = "1.0";
    $dd = $delta * $length * 3;
    $param['delay'] = "$dd";
    $param["repeatCount"] = "1";
    $param["repeatMode"] = "none";
    $param["timingMode"] = "none";
    $param["translateType"] = "by";
    $param["translateScalar"] = "100000,0,0";
    $item["param"] = $param;

    if ($i + 3 * $length >= 140) {

    } else {
        array_push($animList, $item); 
    }
}
$delay = calDelay($i);
$item = array();
$item['target'] = "frame-$count";
$item['action'] = "geometric";
$item['persist'] = "1";
$item['forwardLogic'] = "wait";
$item['backwardLogic'] = "beCancelled";
$param = array();
$param["type"] = "scale";
$param["duration"] = "0.0001";
$param["speed"] = "1.0";
$param["repeatCount"] = "1";
$param["repeatMode"] = "none";
$param["timingMode"] = "none";
$param["scaleType"] = "to";
$param["scaleScalar"] = "3.7";
$param['delay'] = "$delay";
$item["param"] = $param;
array_push($animList, $item);


$objJS = json_encode($objList);
$animJS = json_encode($animList);
$f = fopen("json.json", "w");
fwrite($f, $objJS);
fwrite($f, "\n\n");
fwrite($f, $animJS);
fclose($f);

?>