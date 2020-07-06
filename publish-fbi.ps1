Param($name)
$FName = "fbi-" + $name

egret publish --target web --version $FName

$Src1 = ".\bin-release\web\"+ $FName+ "\*"
$src2 = ".\bin-release\web\assets\fbapp-config.json"
$Dst  = ".\bin-release\web\" + $FName + ".zip"

Compress-Archive -Force -Path $Src1,$Src2 -DestinationPath $Dst

# curl -X POST "https://graph-video.facebook.com/350104029307833/assets" -F 'access_token=350104029307833|bUOHgP_WH1zu1W5lLcmEDcQtwL0' -F "type=BUNDLE" -F "'asset=@./" + $FName+ ".zip'" -F "comment=Graph API upload"

curl -X POST "https://graph-video.facebook.com/350104029307833/assets" -F "access_token=350104029307833|_Pw_q_7BT1lV_28y_hmNmmJFKuI" -F "type=BUNDLE" -F "asset=@./bin-release\web\fbi-0.2.zip" -F "comment=Graph API upload"
