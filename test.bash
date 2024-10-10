$appId = (firebase apps:list | Select-String "myApp" | ForEach-Object { $_.Split()[0] })
echo $appId
