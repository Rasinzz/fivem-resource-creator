RegisterCommand('+showUi', function(source, args)
    SendNUIMessage({
        type = 'show'
    })
end, false)

RegisterCommand('-showUi', function(source, args)
    SendNUIMessage({
        type = 'hide'
    })
end, false)
