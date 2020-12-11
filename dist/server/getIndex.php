<?php
// 查询数据库, 找到有多少种分类就可以了
header('Content-Type: text/html; charset=utf-8');
$cat_id = $_GET['cat_id'];
$link = mysqli_connect('localhost', 'root', 'root', 'goods');

$sql = "SELECT * FROM `goods` WHERE `cat_id` = '$cat_id'";
$res = mysqli_query($link, $sql);
$data = mysqli_fetch_all($res, MYSQLI_ASSOC);
// 返回结果给前端
echo json_encode(array(
  "message" => "获取排行榜成功",
  "code" => 1,
  "list" => $data
));
?>