Param($name)
$FName = "fbi-" + $name

egret publish --version $FName

$Src1 = ".\bin-release\web\"+ $FName+ "\*"
$src2 = ".\bin-release\web\assets\fbapp-config.json"
$Dst  = ".\bin-release\web\" + $FName + ".zip"

Compress-Archive -Force -Path $Src1,$Src2 -DestinationPath $Dst
